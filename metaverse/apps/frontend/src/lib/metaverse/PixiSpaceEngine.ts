import * as PIXI from 'pixi.js';
import { PixiUser, PixiElement, WSMessage, UserMoveData } from '../types';

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
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/space/${spaceId}`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('Connected to space WebSocket');
      // Send user joined message
      this.sendMessage({
        type: 'user_joined',
        data: this.currentUser!,
      });
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        this.handleWebSocketMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
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
    switch (message.type) {
      case 'user_joined':
        this.addUser(message.data as PixiUser);
        break;
      case 'user_left':
        this.removeUser((message.data as PixiUser).id);
        break;
      case 'user_moved':
        this.moveUser(message.data as UserMoveData);
        break;
      default:
        console.log('Unhandled message type:', message.type);
    }
  }

  private sendMessage(message: WSMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
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
        type: 'user_moved',
        data: {
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
} 