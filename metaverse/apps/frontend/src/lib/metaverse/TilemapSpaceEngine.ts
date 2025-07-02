import * as PIXI from 'pixi.js';
import { PixiUser, PixiElement, WSMessage, UserMoveData } from '../types';
import { TilemapRenderer } from './TilemapRenderer';

export class TilemapSpaceEngine {
  private app: PIXI.Application;
  private container!: PIXI.Container;
  private users: Map<string, PIXI.Container> = new Map();
  private elements: Map<string, PIXI.Container> = new Map();
  private currentUser: PixiUser | null = null;
  private ws: WebSocket | null = null;
  private keys: Set<string> = new Set();
  private moveSpeed = 1; // Move one tile at a time
  private lastMoveTime = 0;
  private moveThrottle = 120; // ms between move updates
  private tilemapRenderer: TilemapRenderer | null = null;
  private playerSize = 32; // Size of the player for collision detection
  private initPromise: Promise<void>;
  private playerSprite: PIXI.Sprite | null = null;
  private playerTilePos = { x: 0, y: 0 };
  private playerTargetPixel = { x: 0, y: 0 };
  private isMoving = false;

  constructor(canvas: HTMLCanvasElement, spaceId: string, userId: string, username: string) {
    // Initialize PIXI Application
    this.app = new PIXI.Application();
    this.initPromise = this.app.init({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x87CEEB, // Sky blue background
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    }).then(() => {
      this.container = new PIXI.Container();
      this.app.stage.addChild(this.container);
      // Setup resize handling for responsiveness
      this.setupResizeHandling();
      // Setup input handling for player movement
      this.setupInputHandling();
      // Start the game loop
      this.app.ticker.add(this.gameLoop.bind(this));
    });
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

  private setupResizeHandling() {
    const resize = () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
  }

  private setupInputHandling() {
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

  // Load the tilemap and player sprite
  public async loadTilemap(mapUrl: string): Promise<void> {
    try {
      await this.initPromise;
      this.tilemapRenderer = new TilemapRenderer(this.app, this.container);
      await this.tilemapRenderer.loadMap(mapUrl);
      // Place player at center of map
      const bounds = this.tilemapRenderer.getMapBounds();
      const tileWidth = this.tilemapRenderer['mapData']?.tilewidth || 32;
      const tileHeight = this.tilemapRenderer['mapData']?.tileheight || 32;
      this.playerTilePos = {
        x: Math.floor((bounds.width / tileWidth) / 2),
        y: Math.floor((bounds.height / tileHeight) / 2),
      };
      // Load player sprite
      const heroTexture = await PIXI.Assets.load('/sprite/hero.png');
      this.playerSprite = new PIXI.Sprite(heroTexture);
      this.playerSprite.anchor.set(0.5, 0.5);
      this.playerSprite.width = tileWidth;
      this.playerSprite.height = tileHeight;
      this.container.addChild(this.playerSprite);
      this.updatePlayerSpritePosition();
    } catch (error) {
      console.error('Failed to load tilemap:', error);
      throw error;
    }
  }

  // Update player sprite position in world (lerp toward target)
  private updatePlayerSpritePosition() {
    if (!this.playerSprite || !this.tilemapRenderer) return;
    const tileWidth = this.tilemapRenderer['mapData']?.tilewidth || 32;
    const tileHeight = this.tilemapRenderer['mapData']?.tileheight || 32;
    // Target pixel position for the center of the tile
    this.playerTargetPixel.x = (this.playerTilePos.x + 0.5) * tileWidth;
    this.playerTargetPixel.y = (this.playerTilePos.y + 0.5) * tileHeight;
    // If not moving, snap to target
    if (!this.isMoving) {
      this.playerSprite.x = this.playerTargetPixel.x;
      this.playerSprite.y = this.playerTargetPixel.y;
    }
  }

  // Main game loop: handle player movement and camera
  private gameLoop() {
    if (!this.playerSprite || !this.tilemapRenderer) return;
    let moved = false;
    let dx = 0, dy = 0;
    // Only allow new move if not currently animating
    if (!this.isMoving) {
      if (this.keys.has('w') || this.keys.has('arrowup')) dy = -1;
      if (this.keys.has('s') || this.keys.has('arrowdown')) dy = 1;
      if (this.keys.has('a') || this.keys.has('arrowleft')) dx = -1;
      if (this.keys.has('d') || this.keys.has('arrowright')) dx = 1;
      if ((dx !== 0 || dy !== 0) && Date.now() - this.lastMoveTime > this.moveThrottle) {
        const newX = this.playerTilePos.x + dx;
        const newY = this.playerTilePos.y + dy;
        console.log('Attempting move:', { dx, dy, newX, newY, isMoving: this.isMoving });
        // Check bounds
        const mapWidth = this.tilemapRenderer['mapData']?.width || 0;
        const mapHeight = this.tilemapRenderer['mapData']?.height || 0;
        if (newX >= 0 && newY >= 0 && newX < mapWidth && newY < mapHeight) {
          // Check collision: only allow movement if not collidable
          const tileWidth = this.tilemapRenderer['mapData']?.tilewidth || 32;
          const tileHeight = this.tilemapRenderer['mapData']?.tileheight || 32;
          const px = newX * tileWidth;
          const py = newY * tileHeight;
          if (!this.tilemapRenderer.isColliding(px, py, tileWidth, tileHeight)) {
            this.playerTilePos.x = newX;
            this.playerTilePos.y = newY;
            moved = true;
            this.isMoving = true;
            this.updatePlayerSpritePosition();
            console.log('isMoving set to true');
          }
        }
        this.lastMoveTime = Date.now();
      }
    }
    // Smoothly interpolate player sprite toward target pixel position
    if (this.isMoving && this.playerSprite) {
      const speed = 0.18; // Lerp factor (0-1), higher is faster
      this.playerSprite.x += (this.playerTargetPixel.x - this.playerSprite.x) * speed;
      this.playerSprite.y += (this.playerTargetPixel.y - this.playerSprite.y) * speed;
      console.log('Lerping:', {
        currentX: this.playerSprite.x,
        currentY: this.playerSprite.y,
        targetX: this.playerTargetPixel.x,
        targetY: this.playerTargetPixel.y
      });
      // If close enough, snap to target and stop moving
      if (Math.abs(this.playerSprite.x - this.playerTargetPixel.x) < 1 && Math.abs(this.playerSprite.y - this.playerTargetPixel.y) < 1) {
        this.playerSprite.x = this.playerTargetPixel.x;
        this.playerSprite.y = this.playerTargetPixel.y;
        this.isMoving = false;
        console.log('isMoving set to false (arrived at target)');
      }
    }
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

  public async addElement(element: PixiElement) {
    if (this.elements.has(element.id)) return;

    // Wait for initialization to complete
    await this.initPromise;

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

  public getMapBounds(): { width: number; height: number } {
    if (!this.tilemapRenderer) return { width: 0, height: 0 };
    return this.tilemapRenderer.getMapBounds();
  }

  public getCollisionData() {
    if (!this.tilemapRenderer) return [];
    return this.tilemapRenderer.getCollisionData();
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
    if (this.tilemapRenderer) {
      this.tilemapRenderer.destroy();
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