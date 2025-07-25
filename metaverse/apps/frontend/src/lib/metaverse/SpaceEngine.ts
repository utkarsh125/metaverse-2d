import { MetaversePlayer, MetaverseMap } from '@/lib/types';

interface UserPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  userId: string;
  name: string;
  peerId?: string;
}

interface ChatMessage {
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
}

interface WebSocketData {
  type: string;
  payload: {
    userId?: string;
    name?: string;
    position?: { x: number; y: number };
    x?: number;
    y?: number;
    message?: string;
    username?: string;
    peerId?: string;
    spaceId?: string;
    token?: string;
  };
}

export class SpaceEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private ws: WebSocket | null = null;
  private spaceId: string;
  private currentUser: MetaversePlayer;
  private mapData: MetaverseMap;
  private users: Map<string, UserPosition> = new Map();
  private chatMessages: ChatMessage[] = [];
  private animationId: number | null = null;
  private handleMovement?: () => void;
  
  // Callbacks
  private onUserMove?: (x: number, y: number) => void;
  private onUserJoin?: (user: MetaversePlayer) => void;
  private onUserLeave?: (userId: string) => void;
  private onChatMessage?: (message: ChatMessage) => void;

  constructor(
    containerId: string,
    spaceId: string,
    currentUser: MetaversePlayer,
    mapData: MetaverseMap
  ) {
    this.spaceId = spaceId;
    this.currentUser = currentUser;
    this.mapData = mapData;
    this.initializeSpace(containerId);
  }

  private initializeSpace(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id '${containerId}' not found`);
      return;
    }

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.mapData.width;
    this.canvas.height = this.mapData.height;
    this.canvas.style.border = '1px solid #333';
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      console.error('Could not get 2D context');
      return;
    }

    // Add canvas to container
    container.appendChild(this.canvas);

    // Set up input handling
    this.setupInput();

    // Start game loop
    this.gameLoop();
  }

  private setupInput() {
    if (!this.canvas) return;

    const keys: { [key: string]: boolean } = {};

    this.canvas.addEventListener('keydown', (e) => {
      keys[e.key.toLowerCase()] = true;
    });

    this.canvas.addEventListener('keyup', (e) => {
      keys[e.key.toLowerCase()] = false;
    });

    // Make canvas focusable
    this.canvas.tabIndex = 0;
    this.canvas.focus();

    // Handle movement in game loop
    const handleMovement = () => {
      let dx = 0;
      let dy = 0;

      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      if (dx !== 0 || dy !== 0) {
        this.moveUser(dx, dy);
      }
    };

    // Store movement handler for use in game loop
    this.handleMovement = handleMovement;
  }

  private moveUser(dx: number, dy: number) {
    const newX = this.currentUser.x + dx;
    const newY = this.currentUser.y + dy;

    // Check bounds
    if (newX < 0 || newX >= this.mapData.width || newY < 0 || newY >= this.mapData.height) {
      return;
    }

    // Check collision with static elements
    const elementAtPosition = this.mapData.elements.find(
      el => el.x === newX && el.y === newY && el.static
    );

    if (elementAtPosition) {
      return; // Blocked by static element
    }

    // Check collision with other users
    const userAtPosition = Array.from(this.users.values()).find(
      user => user.x === newX && user.y === newY
    );

    if (userAtPosition) {
      return; // Blocked by another user
    }

    // Update position
    this.currentUser.x = newX;
    this.currentUser.y = newY;

    // Notify server
    if (this.onUserMove) {
      this.onUserMove(newX, newY);
    }

    // Send movement to WebSocket
    this.sendWebSocketMessage({
      type: 'movement',
      payload: {
        x: newX,
        y: newY,
        userId: this.currentUser.id
      }
    });
  }

  private gameLoop() {
    if (!this.ctx) return;

    // Handle movement
    if (this.handleMovement) {
      this.handleMovement();
    }

    // Clear canvas
    this.ctx.fillStyle = '#2c3e50';
    this.ctx.fillRect(0, 0, this.canvas!.width, this.canvas!.height);

    // Draw grid
    this.drawGrid();

    // Draw elements
    this.drawElements();

    // Draw users
    this.drawUsers();

    // Continue game loop
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private drawGrid() {
    if (!this.ctx) return;

    this.ctx.strokeStyle = '#34495e';
    this.ctx.lineWidth = 1;

    const tileSize = 32;

    // Draw vertical lines
    for (let x = 0; x <= this.mapData.width; x += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.mapData.height);
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= this.mapData.height; y += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.mapData.width, y);
      this.ctx.stroke();
    }
  }

  private drawElements() {
    if (!this.ctx) return;

    this.mapData.elements.forEach(element => {
      // Draw element background
      this.ctx!.fillStyle = element.static ? '#8B4513' : '#FFD700';
      this.ctx!.fillRect(element.x * 32, element.y * 32, 32, 32);

      // Draw element border
      this.ctx!.strokeStyle = '#000';
      this.ctx!.lineWidth = 2;
      this.ctx!.strokeRect(element.x * 32, element.y * 32, 32, 32);

      // Draw element image if available
      if (element.imageUrl) {
        const img = new Image();
        img.onload = () => {
          this.ctx!.drawImage(img, element.x * 32, element.y * 32, 32, 32);
        };
        img.src = element.imageUrl;
      }
    });
  }

  private drawUsers() {
    if (!this.ctx) return;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    // Draw current user
    const currentUserColor = colors[parseInt(this.currentUser.id) % colors.length];
    this.ctx.fillStyle = currentUserColor;
    this.ctx.fillRect(this.currentUser.x * 32 + 8, this.currentUser.y * 32 + 8, 16, 16);

    // Draw user name
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('You', this.currentUser.x * 32 + 16, this.currentUser.y * 32 - 5);

    // Draw other users
    this.users.forEach((user, userId) => {
      const colorIndex = parseInt(userId) % colors.length;
      
      this.ctx!.fillStyle = colors[colorIndex];
      this.ctx!.fillRect(user.x * 32 + 8, user.y * 32 + 8, 16, 16);

      // Draw user name
      this.ctx!.fillStyle = '#ffffff';
      this.ctx!.font = '12px Arial';
      this.ctx!.textAlign = 'center';
      this.ctx!.fillText(user.name, user.x * 32 + 16, user.y * 32 - 5);
    });
  }

  public connectWebSocket(wsUrl: string) {
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('Connected to space server');
      this.sendWebSocketMessage({
        type: 'join',
        payload: {
          spaceId: this.spaceId,
          token: sessionStorage.getItem('token') || undefined,
          username: this.currentUser.username,
          x: this.currentUser.x,
          y: this.currentUser.y
        }
      });
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as WebSocketData;
      this.handleWebSocketMessage(data);
    };

    this.ws.onclose = () => {
      console.log('Disconnected from space server');
    };
  }

  private handleWebSocketMessage(data: WebSocketData) {
    switch (data.type) {
      case 'user-joined':
        if (data.payload.userId && data.payload.userId !== this.currentUser.id) {
          this.users.set(data.payload.userId, {
            x: data.payload.position?.x || 0,
            y: data.payload.position?.y || 0,
            direction: 'down',
            userId: data.payload.userId,
            name: data.payload.name || 'Unknown',
            peerId: data.payload.peerId
          });
        }
        break;

      case 'user-left':
        if (data.payload.userId) {
          this.users.delete(data.payload.userId);
        }
        break;

      case 'movement':
        if (data.payload.userId && data.payload.userId !== this.currentUser.id) {
          const user = this.users.get(data.payload.userId);
          if (user && data.payload.x !== undefined && data.payload.y !== undefined) {
            user.x = data.payload.x;
            user.y = data.payload.y;
          }
        }
        break;

      case 'chat':
        if (data.payload.userId && data.payload.message && data.payload.username) {
          const message: ChatMessage = {
            userId: data.payload.userId,
            username: data.payload.username,
            message: data.payload.message,
            timestamp: new Date()
          };
          this.chatMessages.push(message);
          if (this.onChatMessage) {
            this.onChatMessage(message);
          }
        }
        break;
    }
  }

  private sendWebSocketMessage(message: WebSocketData) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  public sendChatMessage(message: string) {
    this.sendWebSocketMessage({
      type: 'chat',
      payload: {
        message,
        userId: this.currentUser.id,
        username: this.currentUser.username
      }
    });
  }

  public setCallbacks(
    onUserMove?: (x: number, y: number) => void,
    onUserJoin?: (user: MetaversePlayer) => void,
    onUserLeave?: (userId: string) => void,
    onChatMessage?: (message: ChatMessage) => void
  ) {
    this.onUserMove = onUserMove;
    this.onUserJoin = onUserJoin;
    this.onUserLeave = onUserLeave;
    this.onChatMessage = onChatMessage;
  }

  public getChatMessages(): ChatMessage[] {
    return this.chatMessages;
  }

  public getUsers(): UserPosition[] {
    return Array.from(this.users.values());
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.ws) {
      this.ws.close();
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
} 