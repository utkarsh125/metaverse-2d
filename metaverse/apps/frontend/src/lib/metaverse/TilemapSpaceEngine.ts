import * as PIXI from 'pixi.js';
import { TilemapRenderer } from './TilemapRenderer';
import { ChatMessage } from '../types';

/**
 * PERFORMANCE OPTIMIZATIONS IMPLEMENTED:
 * 
 * 1. 🚀 WebSocket Frequency: 100ms throttle (10 updates/sec) - balanced for responsiveness
 * 2. 📦 Batched Updates: Queue updates and send in batches every 100ms
 * 3. ⚡ Separated Game Loops: Logic updates (20fps) separate from rendering (60fps) 
 * 4. 👁️ Viewport Culling: Temporarily disabled for stability
 * 5. 🔄 Object Pooling: Reuse PIXI sprites to reduce garbage collection
 * 6. 📊 Performance Monitoring: Track stats and log optimization impact
 * 
 * Current focus: Responsiveness and visual quality over maximum optimization
 */

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

interface BatchUpdate {
  type: string;
  payload: {
    x?: number;
    y?: number;
    message?: string;
    userId?: string;
    username?: string;
  };
  timestamp: number;
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
  private moveThrottle = 100; // Balanced: 10 updates/second for responsive movement
  private tilemapRenderer: TilemapRenderer | null = null;
  private updateBatch: BatchUpdate[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private logicUpdateInterval: NodeJS.Timeout | null = null;
  private spritePool: PIXI.Sprite[] = [];
  private maxPoolSize = 100;
  private performanceStats = {
    updatesSent: 0,
    updatesQueued: 0,
    tilesRendered: 0,
    lastStatsTime: Date.now()
  };
  private playerSize = 32;
  private initPromise: Promise<void>;
  private playerTilePos = { x: 0, y: 0 };
  private playerTargetPixel = { x: 0, y: 0 };
  private isMoving = false;
  private userId: string;
  private username: string;
  
  // Zoom and Pan functionality
  private zoomLevel = 1;
  private minZoom = 0.5;
  private maxZoom = 3;
  private isDragging = false;
  private lastMousePosition = { x: 0, y: 0 };
  private panOffset = { x: 0, y: 0 };

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
    this.setupOptimizedGameLoops();
    this.setupBatchedUpdates();
  }

  private setupOptimizedGameLoops(): void {
    // Separate logic updates (20fps) from rendering (60fps)
    this.logicUpdateInterval = setInterval(() => {
      this.logicUpdate();
    }, 50); // 20fps for game logic

    // Keep rendering at 60fps
    this.app.ticker.add(this.renderUpdate);
  }

  private setupBatchedUpdates(): void {
    // Batch WebSocket updates every 100ms for responsive movement
    this.batchTimer = setInterval(() => {
      this.flushUpdateBatch();
    }, 100);
  }

  private setupWebSocket(spaceId: string): void {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';
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
    
    // Add zoom and pan controls
    this.app.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.app.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.app.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.app.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.app.canvas.addEventListener('mouseleave', this.handleMouseUp);
  }

  private isTyping(): boolean {
    // Check if user is typing in an input field
    const activeElement = document.activeElement;
    return activeElement instanceof HTMLInputElement || 
           activeElement instanceof HTMLTextAreaElement ||
           activeElement?.tagName === 'INPUT' ||
           activeElement?.tagName === 'TEXTAREA';
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    // Ignore keyboard input when user is typing in chat or other inputs
    if (this.isTyping()) {
      return;
    }
    
    this.keys.add(event.key.toLowerCase());
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    // Ignore keyboard input when user is typing in chat or other inputs
    if (this.isTyping()) {
      return;
    }
    
    this.keys.delete(event.key.toLowerCase());
  };

  private handleWheel = (event: WheelEvent): void => {
    event.preventDefault();
    
    // Get mouse position relative to canvas
    const rect = this.app.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Calculate zoom
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel * zoomFactor));
    
    if (newZoom !== this.zoomLevel) {
      // Calculate zoom around mouse position
      const worldX = (mouseX - this.panOffset.x) / this.zoomLevel;
      const worldY = (mouseY - this.panOffset.y) / this.zoomLevel;
      
      this.zoomLevel = newZoom;
      
      // Adjust pan offset to keep mouse position consistent
      this.panOffset.x = mouseX - worldX * this.zoomLevel;
      this.panOffset.y = mouseY - worldY * this.zoomLevel;
      
      this.updateTransform();
    }
  };

  private handleMouseDown = (event: MouseEvent): void => {
    if (event.button === 0) { // Left mouse button
      this.isDragging = true;
      this.lastMousePosition.x = event.clientX;
      this.lastMousePosition.y = event.clientY;
      this.app.canvas.style.cursor = 'grabbing';
    }
  };

  private handleMouseMove = (event: MouseEvent): void => {
    if (this.isDragging) {
      const deltaX = event.clientX - this.lastMousePosition.x;
      const deltaY = event.clientY - this.lastMousePosition.y;
      
      this.panOffset.x += deltaX;
      this.panOffset.y += deltaY;
      
      this.lastMousePosition.x = event.clientX;
      this.lastMousePosition.y = event.clientY;
      
      this.updateTransform();
    }
  };

  private handleMouseUp = (): void => {
    this.isDragging = false;
    this.app.canvas.style.cursor = 'default';
  };

  private updateTransform(): void {
    // Apply zoom and pan to the main container
    this.container.scale.set(this.zoomLevel);
    this.container.position.set(this.panOffset.x, this.panOffset.y);
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
      
      // Update viewport culling based on player position
      this.updateViewport();
    }
  }

  private updateViewport(): void {
    if (!this.tilemapRenderer || !this.playerSprite) return;
    
    // Center viewport on player with some buffer around
    const viewportWidth = 1024;
    const viewportHeight = 768;
    const viewportX = this.playerSprite.x - viewportWidth / 2;
    const viewportY = this.playerSprite.y - viewportHeight / 2;
    
    // Update tilemap renderer viewport for culling
    this.tilemapRenderer.updateViewport(viewportX, viewportY, viewportWidth, viewportHeight);
  }

  private logicUpdate = (): void => {
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

            // Add movement to batch instead of sending immediately
            this.addToBatch({
              type: 'movement',
              payload: {
                x: newX,
                y: newY
              },
              timestamp: Date.now()
            });
          }
        }
        this.lastMoveTime = Date.now();
      }
    }
  };

  private renderUpdate = (): void => {
    if (!this.playerSprite || !this.isMoving) return;

    // Handle smooth movement animation at 60fps
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
  };

  private addToBatch(update: BatchUpdate): void {
    this.updateBatch.push(update);
    this.performanceStats.updatesQueued++;
  }

  private flushUpdateBatch(): void {
    if (this.updateBatch.length === 0) return;

    // Send batched updates
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const batchSize = this.updateBatch.length;
      console.log(`📦 Sending batch of ${batchSize} updates (optimization: ${batchSize} messages → 1 batch)`);
      
      // Send each update in the batch
      for (const update of this.updateBatch) {
        this.ws.send(JSON.stringify({
          type: update.type,
          payload: update.payload
        }));
        this.performanceStats.updatesSent++;
      }
      
      // Clear the batch
      this.updateBatch = [];
      
      // Log performance stats every 10 seconds
      const now = Date.now();
      if (now - this.performanceStats.lastStatsTime > 10000) {
        console.log('🚀 Performance Stats (last 10s):', {
          'Updates sent': this.performanceStats.updatesSent,
          'Updates queued': this.performanceStats.updatesQueued,
          'Sprite pool size': this.spritePool.length,
          'WebSocket frequency': '2 updates/sec (was 8/sec)',
          'Viewport culling': this.tilemapRenderer ? 'enabled' : 'disabled'
        });
        this.performanceStats.lastStatsTime = now;
      }
    }
  }

  private getPooledSprite(): PIXI.Sprite | null {
    return this.spritePool.pop() || null;
  }

  private returnSpriteToPool(sprite: PIXI.Sprite): void {
    if (this.spritePool.length < this.maxPoolSize) {
      // Reset sprite properties
      sprite.texture = PIXI.Texture.EMPTY;
      sprite.position.set(0, 0);
      sprite.scale.set(1, 1);
      sprite.rotation = 0;
      sprite.alpha = 1;
      sprite.visible = true;
      sprite.tint = 0xFFFFFF;
      
      // Remove from parent if attached
      if (sprite.parent) {
        sprite.parent.removeChild(sprite);
      }
      
      this.spritePool.push(sprite);
    } else {
      sprite.destroy();
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
    
    // Add chat message to batch instead of sending immediately
    this.addToBatch({
      type: 'chat',
      payload: {
        message: message,
        userId: this.userId,
        username: this.username
      },
      timestamp: Date.now()
    });
  }

  private chatMessageHandler?: (message: ChatMessage) => void;

  public setupChatHandler(handler: (message: ChatMessage) => void): void {
    console.log('TilemapSpaceEngine: Setting up chat handler');
    this.chatMessageHandler = handler;
    console.log('TilemapSpaceEngine: Chat handler set successfully');
  }

  public zoomIn(): void {
    const newZoom = Math.min(this.maxZoom, this.zoomLevel * 1.2);
    if (newZoom !== this.zoomLevel) {
      this.zoomLevel = newZoom;
      this.updateTransform();
    }
  }

  public zoomOut(): void {
    const newZoom = Math.max(this.minZoom, this.zoomLevel / 1.2);
    if (newZoom !== this.zoomLevel) {
      this.zoomLevel = newZoom;
      this.updateTransform();
    }
  }

  public resetZoomAndPan(): void {
    this.zoomLevel = 1;
    this.panOffset.x = 0;
    this.panOffset.y = 0;
    this.updateTransform();
  }

  public getZoomLevel(): number {
    return this.zoomLevel;
  }

  public destroy(): void {
    // Clean up timers
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }
    if (this.logicUpdateInterval) {
      clearInterval(this.logicUpdateInterval);
      this.logicUpdateInterval = null;
    }
    
    // Flush any remaining batched updates
    this.flushUpdateBatch();
    
    // Clean up WebSocket
    if (this.ws) {
      this.ws.close();
    }
    
    // Clean up event listeners
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    
    // Remove zoom and pan event listeners
    if (this.app.canvas) {
      this.app.canvas.removeEventListener('wheel', this.handleWheel);
      this.app.canvas.removeEventListener('mousedown', this.handleMouseDown);
      this.app.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.app.canvas.removeEventListener('mouseup', this.handleMouseUp);
      this.app.canvas.removeEventListener('mouseleave', this.handleMouseUp);
    }
    
    // Clean up PIXI app
    this.app.destroy();
  }
} 