import * as PIXI from 'pixi.js';
import { TilemapRenderer } from './TilemapRenderer';
import { ChatMessage } from '../types';

interface WSMessage {
  type: string;
  payload: {
    users?: User[];
    userId?: string;
    username?: string;
    x?: number;
    y?: number;
    spaceId?: string;
    message?: string;
  };
}

interface User {
  userId: string;
  username: string;
  x: number;
  y: number;
}

interface WebSocketError extends Error {
  code?: number;
  reason?: string;
}

export class TilemapSpaceEngine {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private playerSprite: PIXI.Sprite | null = null;
  private otherPlayers: Map<string, PIXI.Container> = new Map();
  private ws: WebSocket | null = null;
  private keys: Set<string> = new Set();
  private moveSpeed = 1;
  private lastMoveTime = 0;
  private moveThrottle = 120;
  private tilemapRenderer: TilemapRenderer | null = null;
  private playerSize = 32;
  private initPromise: Promise<void>;
  private playerTilePos = { x: 0, y: 0 };
  private playerTargetPixel = { x: 0, y: 0 };
  private isMoving = false;
  private userId: string;
  private username: string;

  constructor(app: PIXI.Application, userId: string, username: string) {
    this.app = app;
    this.userId = userId;
    this.username = username;
    
    // Create main container
    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    
    // Add container to stage
    this.app.stage.addChild(this.container);
    
    // Initialize promise for async operations
    this.initPromise = Promise.resolve();
    
    // Log initial state
    console.log('TilemapSpaceEngine constructor:', {
      appStage: this.app.stage ? 'exists' : 'none',
      containerAdded: this.container.parent ? 'yes' : 'no',
      containerVisible: this.container.visible
    });
  }

  public init(spaceId: string): void {
    this.setupWebSocket(spaceId);
    this.setupInputHandling();
    this.app.ticker.add(this.gameLoop);
  }

  private setupWebSocket(spaceId: string): void {
    const wsUrl = 'ws://localhost:4000';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server');
      this.sendMessage({
        type: 'join',
        payload: {
          spaceId,
          userId: this.userId,
          username: this.username,
          x: this.playerTilePos.x,
          y: this.playerTilePos.y
        }
      });
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        console.log('TilemapSpaceEngine: Raw WebSocket message received:', event.data);
        const message = JSON.parse(event.data) as WSMessage;
        console.log('TilemapSpaceEngine: Parsed WebSocket message:', message);
        void this.handleWebSocketMessage(message).catch((error: Error) => {
          console.error('TilemapSpaceEngine: Error handling WebSocket message:', error);
        });
      } catch (error) {
        const wsError = error as WebSocketError;
        console.error('TilemapSpaceEngine: Error parsing WebSocket message:', wsError.message);
      }
    };

    this.ws.onclose = (event: CloseEvent) => {
      console.log('Disconnected from WebSocket server:', event.code, event.reason);
    };

    this.ws.onerror = (event: Event) => {
      const wsError = event as ErrorEvent;
      console.error('WebSocket error:', wsError.message);
    };
  }

  private sendMessage(message: WSMessage): void {
    console.log('TilemapSpaceEngine: sendMessage called with:', message);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('TilemapSpaceEngine: WebSocket is open, sending message');
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('TilemapSpaceEngine: WebSocket not open. State:', this.ws?.readyState);
    }
  }

  private setupInputHandling(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.keys.add(event.key.toLowerCase());
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.keys.delete(event.key.toLowerCase());
  };

  private updatePlayerSpritePosition(): void {
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

  private gameLoop = (): void => {
    if (!this.playerSprite || !this.tilemapRenderer) return;

    let dx = 0, dy = 0;
    if (!this.isMoving) {
      if (this.keys.has('w') || this.keys.has('arrowup')) dy = -1;
      if (this.keys.has('s') || this.keys.has('arrowdown')) dy = 1;
      if (this.keys.has('a') || this.keys.has('arrowleft')) dx = -1;
      if (this.keys.has('d') || this.keys.has('arrowright')) dx = 1;

      if ((dx !== 0 || dy !== 0) && Date.now() - this.lastMoveTime > this.moveThrottle) {
        const newX = this.playerTilePos.x + dx;
        const newY = this.playerTilePos.y + dy;

        const mapWidth = this.tilemapRenderer['mapData']?.width || 0;
        const mapHeight = this.tilemapRenderer['mapData']?.height || 0;

        if (newX >= 0 && newY >= 0 && newX < mapWidth && newY < mapHeight) {
          const tileWidth = this.tilemapRenderer['mapData']?.tilewidth || 32;
          const tileHeight = this.tilemapRenderer['mapData']?.tileheight || 32;
          const px = newX * tileWidth;
          const py = newY * tileHeight;

          if (!this.tilemapRenderer.isColliding(px, py, tileWidth, tileHeight)) {
            this.playerTilePos.x = newX;
            this.playerTilePos.y = newY;
            this.isMoving = true;
            this.updatePlayerSpritePosition();

            // Send movement to server
            this.sendMessage({
              type: 'movement',
              payload: {
                x: newX,
                y: newY
              }
            });
          }
        }
        this.lastMoveTime = Date.now();
      }
    }

    // Update player sprite position
    if (this.isMoving && this.playerSprite) {
      const speed = 0.2;
      const dx = this.playerTargetPixel.x - this.playerSprite.x;
      const dy = this.playerTargetPixel.y - this.playerSprite.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        this.playerSprite.x += dx * speed;
        this.playerSprite.y += dy * speed;
      } else {
        this.playerSprite.x = this.playerTargetPixel.x;
        this.playerSprite.y = this.playerTargetPixel.y;
        this.isMoving = false;
      }
    }
  };

  private async createPlayerSprite(userId: string, username: string, x: number, y: number): Promise<PIXI.Container> {
    const playerContainer = new PIXI.Container();
    
    // Load and create player sprite
    const heroTexture = await PIXI.Assets.load('/sprite/hero.png');
    const sprite = new PIXI.Sprite(heroTexture);
    sprite.anchor.set(0.5, 0.5);
    sprite.width = this.playerSize;
    sprite.height = this.playerSize;
    
    // Create username text
    const usernameText = new PIXI.Text(username, {
      fontSize: 12,
      fill: 0xFFFFFF,
      align: 'center',
      stroke: 0x000000
    });
    usernameText.anchor.set(0.5, 1);
    usernameText.y = -sprite.height / 2 - 5;
    
    // Add sprite and text to container
    playerContainer.addChild(sprite);
    playerContainer.addChild(usernameText);
    
    // Position container
    playerContainer.position.set(
      (x + 0.5) * this.playerSize,
      (y + 0.5) * this.playerSize
    );
    
    return playerContainer;
  }

  private async handleWebSocketMessage(message: WSMessage): Promise<void> {
    try {
      switch (message.type) {
        case 'space-joined':
          console.log('Successfully joined space:', message.payload);
          // Handle initial state of other players if provided
          const users = message.payload.users;
          if (users) {
            for (const user of users) {
              if (user.userId !== this.userId) {
                const playerContainer = await this.createPlayerSprite(
                  user.userId,
                  user.username,
                  user.x,
                  user.y
                );
                this.otherPlayers.set(user.userId, playerContainer);
                this.container.addChild(playerContainer);
              }
            }
          }
          break;

        case 'user-joined':
          if (message.payload.userId && message.payload.username && 
              typeof message.payload.x === 'number' && typeof message.payload.y === 'number') {
            const joinedUser: User = {
              userId: message.payload.userId,
              username: message.payload.username,
              x: message.payload.x,
              y: message.payload.y
            };
            
            if (joinedUser.userId !== this.userId) {
              console.log('New user joined:', joinedUser);
              const playerContainer = await this.createPlayerSprite(
                joinedUser.userId,
                joinedUser.username,
                joinedUser.x,
                joinedUser.y
              );
              this.otherPlayers.set(joinedUser.userId, playerContainer);
              this.container.addChild(playerContainer);
            }
          }
          break;

        case 'user-left':
          const leftUserId = message.payload.userId;
          if (leftUserId) {
            const leftPlayer = this.otherPlayers.get(leftUserId);
            if (leftPlayer) {
              console.log('User left:', leftUserId);
              this.container.removeChild(leftPlayer);
              leftPlayer.destroy();
              this.otherPlayers.delete(leftUserId);
            }
          }
          break;

        case 'movement':
          if (message.payload.userId && typeof message.payload.x === 'number' && 
              typeof message.payload.y === 'number') {
            const moveData: Pick<User, 'userId' | 'x' | 'y'> = {
              userId: message.payload.userId,
              x: message.payload.x,
              y: message.payload.y
            };
            
            if (moveData.userId !== this.userId) {
              const playerContainer = this.otherPlayers.get(moveData.userId);
              if (playerContainer) {
                // Smoothly move to new position
                const targetX = (moveData.x + 0.5) * this.playerSize;
                const targetY = (moveData.y + 0.5) * this.playerSize;
                
                // Use ticker to animate movement
                const animate = () => {
                  const dx = targetX - playerContainer.x;
                  const dy = targetY - playerContainer.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance > 1) {
                    playerContainer.x += dx * 0.2;
                    playerContainer.y += dy * 0.2;
                    requestAnimationFrame(animate);
                  } else {
                    playerContainer.x = targetX;
                    playerContainer.y = targetY;
                  }
                };
                animate();
              }
            }
          }
          break;

        case 'chat':
          console.log('TilemapSpaceEngine: Processing chat message. Payload:', message.payload);
          console.log('TilemapSpaceEngine: Chat handler available:', !!this.chatMessageHandler);
          if (message.payload.userId && message.payload.username && message.payload.message) {
            const chatMessage: ChatMessage = {
              userId: message.payload.userId,
              username: message.payload.username,
              message: message.payload.message,
              timestamp: new Date()
            };
            console.log('TilemapSpaceEngine: Created chat message object:', chatMessage);
            if (this.chatMessageHandler) {
              console.log('TilemapSpaceEngine: Calling chat message handler');
              this.chatMessageHandler(chatMessage);
            } else {
              console.error('TilemapSpaceEngine: No chat message handler available!');
            }
          } else {
            console.error('TilemapSpaceEngine: Invalid chat message payload:', message.payload);
          }
          break;
      }
    } catch (error) {
      const wsError = error as Error;
      console.error('Error handling WebSocket message:', wsError.message);
      throw error; // Re-throw to be caught by the caller
    }
  }

  private setupResizeHandling(): void {
    const resize = () => {
      // Get the parent element dimensions
      const parent = this.app.view.parentElement;
      if (!parent) return;
      
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      
      // Update renderer size
      this.app.renderer.resize(parentWidth, parentHeight);
      
      // If we have map data, use it to calculate proper scale
      if (this.tilemapRenderer?.['mapData']) {
        const mapData = this.tilemapRenderer['mapData'];
        const mapWidth = mapData.width * mapData.tilewidth;
        const mapHeight = mapData.height * mapData.tileheight;
        
        // Calculate scale to fit map while maintaining aspect ratio
        const scale = Math.min(
          parentWidth / mapWidth,
          parentHeight / mapHeight
        ) * 0.8; // Use 80% of available space
        
        // Scale and center the container
        this.container.scale.set(scale);
        this.container.position.set(
          (parentWidth - (mapWidth * scale)) / 2,
          (parentHeight - (mapHeight * scale)) / 2
        );

        // Log positions for debugging
        console.log('Resize:', {
          parentWidth,
          parentHeight,
          mapWidth,
          mapHeight,
          scale,
          containerPos: {
            x: this.container.position.x,
            y: this.container.position.y
          },
          containerScale: {
            x: this.container.scale.x,
            y: this.container.scale.y
          },
          containerVisible: this.container.visible,
          containerParent: this.container.parent ? 'exists' : 'none'
        });
      }
    };
    
    window.addEventListener('resize', resize);
    // Initial resize
    resize();
  }

  public async loadTilemap(mapUrl: string): Promise<void> {
    try {
      await this.initPromise;
      
      // Create and initialize TilemapRenderer
      this.tilemapRenderer = new TilemapRenderer(this.app, this.container);
      await this.tilemapRenderer.loadMap(mapUrl);
      
      // Set up resize handling after map is loaded
      this.setupResizeHandling();
      
      // Place player at center of map
      const mapData = this.tilemapRenderer['mapData'];
      if (mapData) {
        const tileWidth = mapData.tilewidth || 32;
        const tileHeight = mapData.tileheight || 32;
        this.playerTilePos = {
          x: Math.floor((mapData.width) / 2),
          y: Math.floor((mapData.height) / 2),
        };
        
        // Load player sprite
        const heroTexture = await PIXI.Assets.load('/sprite/hero.png');
        this.playerSprite = new PIXI.Sprite(heroTexture);
        this.playerSprite.anchor.set(0.5, 0.5);
        this.playerSprite.width = tileWidth;
        this.playerSprite.height = tileHeight;
        this.container.addChild(this.playerSprite);
        this.updatePlayerSpritePosition();
        
        // Log state after loading
        console.log('Map loaded:', {
          mapDimensions: {
            width: mapData.width * tileWidth,
            height: mapData.height * tileHeight
          },
          containerVisible: this.container.visible,
          containerChildren: this.container.children.length,
          containerPosition: {
            x: this.container.position.x,
            y: this.container.position.y
          },
          containerScale: {
            x: this.container.scale.x,
            y: this.container.scale.y
          },
          containerParent: this.container.parent ? 'exists' : 'none',
          stageChildren: this.app.stage.children.length
        });
      }
    } catch (error) {
      console.error('Failed to load tilemap:', error);
      throw error;
    }
  }

  public getUsers(): string[] {
    return Array.from(this.otherPlayers.keys());
  }

  public sendChatMessage(message: string): void {
    console.log('TilemapSpaceEngine: sendChatMessage called with:', message);
    console.log('TilemapSpaceEngine: userId:', this.userId);
    console.log('TilemapSpaceEngine: username:', this.username);
    console.log('TilemapSpaceEngine: WebSocket state:', this.ws?.readyState);
    
    this.sendMessage({
      type: 'chat',
      payload: {
        message: message,
        userId: this.userId,
        username: this.username
      }
    });
  }

  private chatMessageHandler?: (message: ChatMessage) => void;

  public setupChatHandler(handler: (message: ChatMessage) => void): void {
    console.log('TilemapSpaceEngine: Setting up chat handler');
    this.chatMessageHandler = handler;
    console.log('TilemapSpaceEngine: Chat handler set successfully');
  }

  public destroy(): void {
    if (this.ws) {
      this.ws.close();
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.app.destroy();
  }
} 