import * as PIXI from 'pixi.js';
import { PixiUser, PixiElement, WSMessage, UserMoveData, ChatMessage } from '../types';

export class PixiSpaceEngine {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private users: Map<string, PIXI.Container> = new Map();
  private elements: Map<string, PIXI.Container> = new Map();
  private currentUser: PixiUser | null = null;
  private ws: WebSocket | null = null;
  private keys: Set<string> = new Set();
  private moveSpeed = 3;
  private lastMoveTime = 0;
  private moveThrottle = 50; // ms between move updates

  constructor(canvas: HTMLCanvasElement, spaceId: string, userId: string, username: string) {
    // Initialize PIXI Application
    this.app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x87CEEB, // Sky blue background
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    // Initialize current user
    this.currentUser = {
      id: userId,
      username,
      x: 100,
      y: 100,
      color: this.getRandomColor(),
    };

    // Setup WebSocket connection
    this.setupWebSocket(spaceId);

    // Setup input handling
    this.setupInputHandling();

    // Setup resize handling
    this.setupResizeHandling();

    // Start the game loop
    this.app.ticker.add(this.gameLoop.bind(this));
  }

  private setupWebSocket(spaceId: string) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';
    console.log('PixiSpaceEngine: Connecting to WebSocket:', wsUrl);
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('PixiSpaceEngine: Connected to space WebSocket');
      // Send join message
      this.sendMessage({
        type: 'join',
        payload: {
          spaceId: spaceId,
          userId: this.currentUser!.id,
          username: this.currentUser!.username,
          x: this.currentUser!.x,
          y: this.currentUser!.y,
          token: sessionStorage.getItem('token')
        }
      });
    };

    this.ws.onmessage = (event) => {
      try {
        console.log('PixiSpaceEngine: Raw WebSocket message received:', event.data);
        const message: WSMessage = JSON.parse(event.data);
        console.log('PixiSpaceEngine: Parsed WebSocket message:', message);
        this.handleWebSocketMessage(message);
      } catch (error) {
        console.error('PixiSpaceEngine: Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('Disconnected from space WebSocket');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleWebSocketMessage(message: WSMessage) {
    console.log('PixiSpaceEngine: Received WebSocket message:', message);
    switch (message.type) {
      case 'space-joined':
        console.log('PixiSpaceEngine: Successfully joined space');
        break;
      case 'user-joined':
        console.log('PixiSpaceEngine: User joined:', message.payload);
        if (message.payload && 'userId' in message.payload && 'username' in message.payload) {
          this.addUser({
            id: message.payload.userId as string,
            username: message.payload.username as string,
            x: (message.payload.x as number) || 100,
            y: (message.payload.y as number) || 100,
            color: this.getRandomColor()
          });
        }
        break;
      case 'user-left':
        console.log('PixiSpaceEngine: User left:', message.payload);
        if (message.payload && 'userId' in message.payload) {
          this.removeUser(message.payload.userId as string);
        }
        break;
      case 'movement':
        console.log('PixiSpaceEngine: User moved:', message.payload);
        if (message.payload && 'userId' in message.payload && 'x' in message.payload && 'y' in message.payload) {
          this.moveUser({
            userId: message.payload.userId as string,
            x: message.payload.x as number,
            y: message.payload.y as number
          });
        }
        break;
      case 'chat':
        console.log('PixiSpaceEngine: Processing chat message. Payload:', message.payload);
        console.log('PixiSpaceEngine: Chat handler available:', !!this.chatMessageHandler);
        if (message.payload && 'userId' in message.payload && 'username' in message.payload && 'message' in message.payload) {
          const chatMessage: ChatMessage = {
            userId: message.payload.userId as string,
            username: message.payload.username as string,
            message: message.payload.message as string,
            timestamp: new Date()
          };
          console.log('PixiSpaceEngine: Created chat message object:', chatMessage);
          if (this.chatMessageHandler) {
            console.log('PixiSpaceEngine: Calling chat message handler');
            this.chatMessageHandler(chatMessage);
          } else {
            console.error('PixiSpaceEngine: No chat message handler available!');
          }
        } else {
          console.error('PixiSpaceEngine: Invalid chat message payload:', message.payload);
        }
        break;
      default:
        console.log('PixiSpaceEngine: Unhandled message type:', message.type);
    }
  }

  private sendMessage(message: WSMessage) {
    console.log('PixiSpaceEngine: sendMessage called with:', message);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('PixiSpaceEngine: WebSocket is open, sending message');
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('PixiSpaceEngine: WebSocket not open. State:', this.ws?.readyState);
    }
  }

  private setupInputHandling() {
    // Keyboard events
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.key.toLowerCase());
    });

    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key.toLowerCase());
    });

    // Prevent default behavior for arrow keys and WASD
    window.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
      }
    });
  }

  private setupResizeHandling() {
    const resize = () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);
  }

  private gameLoop() {
    if (!this.currentUser) return;

    let moved = false;

    // Handle movement
    if (this.keys.has('w') || this.keys.has('arrowup')) {
      this.currentUser.y -= this.moveSpeed;
      moved = true;
    }
    if (this.keys.has('s') || this.keys.has('arrowdown')) {
      this.currentUser.y += this.moveSpeed;
      moved = true;
    }
    if (this.keys.has('a') || this.keys.has('arrowleft')) {
      this.currentUser.x -= this.moveSpeed;
      moved = true;
    }
    if (this.keys.has('d') || this.keys.has('arrowright')) {
      this.currentUser.x += this.moveSpeed;
      moved = true;
    }

    // Update current user's visual representation
    const currentUserContainer = this.users.get(this.currentUser.id);
    if (currentUserContainer) {
      currentUserContainer.x = this.currentUser.x;
      currentUserContainer.y = this.currentUser.y;
    }

    // Send movement update to server
    if (moved && Date.now() - this.lastMoveTime > this.moveThrottle) {
      this.sendMessage({
        type: 'movement',
        payload: {
          userId: this.currentUser.id,
          x: this.currentUser.x,
          y: this.currentUser.y,
        },
      });
      this.lastMoveTime = Date.now();
    }

    // Center camera on current user
    this.centerCameraOnUser();
  }

  private centerCameraOnUser() {
    if (!this.currentUser) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.container.x = centerX - this.currentUser.x;
    this.container.y = centerY - this.currentUser.y;
  }

  private addUser(user: PixiUser) {
    if (this.users.has(user.id)) return;

    const userContainer = new PIXI.Container();

    // Create user avatar (simple colored circle for now)
    const avatar = new PIXI.Graphics();
    avatar.beginFill(parseInt(user.color.replace('#', '0x')));
    avatar.drawCircle(0, 0, 15);
    avatar.endFill();

    // Add username text
    const text = new PIXI.Text(user.username, {
      fontSize: 12,
      fill: 0x000000,
      align: 'center',
    });
    text.anchor.set(0.5, 0);
    text.y = 20;

    userContainer.addChild(avatar);
    userContainer.addChild(text);
    userContainer.x = user.x;
    userContainer.y = user.y;

    this.container.addChild(userContainer);
    this.users.set(user.id, userContainer);
  }

  private removeUser(userId: string) {
    const userContainer = this.users.get(userId);
    if (userContainer) {
      this.container.removeChild(userContainer);
      this.users.delete(userId);
    }
  }

  private moveUser(moveData: UserMoveData) {
    const userContainer = this.users.get(moveData.userId);
    if (userContainer) {
      userContainer.x = moveData.x;
      userContainer.y = moveData.y;
    }
  }

  public addElement(element: PixiElement) {
    if (this.elements.has(element.id)) return;

    // Load texture and create sprite
    PIXI.Assets.load(element.imageUrl).then((texture) => {
      const sprite = new PIXI.Sprite(texture);
      sprite.x = element.x;
      sprite.y = element.y;
      sprite.width = element.width;
      sprite.height = element.height;

      this.container.addChild(sprite);
      this.elements.set(element.id, sprite);
    }).catch((error) => {
      console.error('Error loading element texture:', error);
      // Create a placeholder rectangle if image fails to load
      const placeholder = new PIXI.Graphics();
      placeholder.beginFill(0x888888);
      placeholder.drawRect(element.x, element.y, element.width, element.height);
      placeholder.endFill();

      this.container.addChild(placeholder);
      this.elements.set(element.id, placeholder as PIXI.Container);
    });
  }

  public removeElement(elementId: string) {
    const element = this.elements.get(elementId);
    if (element) {
      this.container.removeChild(element);
      this.elements.delete(elementId);
    }
  }

  public setMapBackground(backgroundUrl: string) {
    PIXI.Assets.load(backgroundUrl).then((texture) => {
      const background = new PIXI.Sprite(texture);
      background.width = this.app.screen.width;
      background.height = this.app.screen.height;
      background.x = -this.app.screen.width / 2;
      background.y = -this.app.screen.height / 2;
      
      // Add background at the bottom of the container
      this.container.addChildAt(background, 0);
    }).catch((error) => {
      console.error('Error loading background:', error);
    });
  }

  private getRandomColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  public destroy() {
    if (this.ws) {
      this.ws.close();
    }
    this.app.destroy(true);
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getUsers() {
    return Array.from(this.users.keys());
  }

  public sendChatMessage(message: string): void {
    console.log('PixiSpaceEngine: sendChatMessage called with:', message);
    console.log('PixiSpaceEngine: currentUser:', this.currentUser);
    console.log('PixiSpaceEngine: WebSocket state:', this.ws?.readyState);
    
    this.sendMessage({
      type: 'chat',
      payload: {
        userId: this.currentUser!.id,
        username: this.currentUser!.username,
        message: message
      }
    });
  }

  private chatMessageHandler?: (message: ChatMessage) => void;

  public setupChatHandler(handler: (message: ChatMessage) => void): void {
    console.log('PixiSpaceEngine: Setting up chat handler');
    this.chatMessageHandler = handler;
    console.log('PixiSpaceEngine: Chat handler set successfully');
  }

  public movePlayer(dx: number, dy: number): void {
    if (!this.currentUser) return;

    // Apply movement with speed
    this.currentUser.x += dx * this.moveSpeed;
    this.currentUser.y += dy * this.moveSpeed;

    // Send movement update to server
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'movement',
        payload: {
          x: this.currentUser.x,
          y: this.currentUser.y
        }
      }));
    }
  }

  public setZoomLevel(zoom: number): void {
    // For PixiSpaceEngine, we can implement zoom by scaling the container
    if (this.container) {
      this.container.scale.set(zoom);
    }
  }

  public getZoomLevel(): number {
    return this.container ? this.container.scale.x : 1;
  }

  public zoomIn(): void {
    const currentZoom = this.getZoomLevel();
    this.setZoomLevel(currentZoom * 1.2);
  }

  public zoomOut(): void {
    const currentZoom = this.getZoomLevel();
    this.setZoomLevel(currentZoom / 1.2);
  }

  public resetZoomAndPan(): void {
    this.setZoomLevel(1.5); // Default 150%
    if (this.container) {
      this.container.position.set(0, 0);
    }
  }
} 