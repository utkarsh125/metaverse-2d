'use client';

import * as PIXI from 'pixi.js';

import React, { useCallback, useEffect, useRef } from 'react';

import { gsap } from 'gsap';

const TILE_SIZE = 64;
const MAP_WIDTH = 200;
const MAP_HEIGHT = 150;
const CANVAS_WIDTH = TILE_SIZE * MAP_WIDTH;
const CANVAS_HEIGHT = TILE_SIZE * MAP_HEIGHT;
const PLAYER_SIZE = 64;
const OBSTACLE_SIZE = 64;
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';

// 8-bit style colors for obstacles
const OBSTACLE_COLORS = [0x228B22, 0x8B4513, 0x4682B4, 0xFFD700];

function randomId() {
  return Math.random().toString(36).substring(2, 10);
}

// Generate a random map with obstacles
function generateObstacles() {
  const obstacles: { x: number; y: number; color: number }[] = [];
  for (let i = 0; i < 80; i++) {
    const x = Math.floor(Math.random() * MAP_WIDTH);
    const y = Math.floor(Math.random() * MAP_HEIGHT);
    // Don't block the center spawn
    if ((x === Math.floor(MAP_WIDTH / 2) && y === Math.floor(MAP_HEIGHT / 2))) continue;
    obstacles.push({ x, y, color: OBSTACLE_COLORS[Math.floor(Math.random() * OBSTACLE_COLORS.length)] });
  }
  return obstacles;
}

const TIMMY_PATH = '/sprite/timmy.png';
const TIMMY_FRAME_WIDTH = 512;
const TIMMY_FRAME_HEIGHT = 384;
type Dir = 'up' | 'down' | 'left' | 'right';

export default function VirtualSpaceCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const userId = useRef(randomId());
  const positions = useRef<{ [id: string]: { x: number; y: number; dir: Dir; moving: boolean } }>({});
  const playerSprites = useRef<{ [id: string]: PIXI.Sprite }>({});
  const obstacles = useRef(generateObstacles());
  const myPos = useRef({ x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) });
  const myDir = useRef<Dir>('down');
  const myMoving = useRef(false);
  const lastKeyDir = useRef<Dir | null>(null);
  const timmyTextures = useRef<{ [D in Dir]: [PIXI.Texture, PIXI.Texture] } | null>(null);
  const walkTicker = useRef<PIXI.Ticker | null>(null);
  const walkFrame = useRef(0);
  const worldContainer = useRef<PIXI.Container | null>(null);

  // Helper to get viewport size
  const getViewportSize = useCallback(() => {
    return { vw: window.innerWidth, vh: window.innerHeight };
  }, []);

  // Camera logic: center player, clamp to map
  const updateCamera = useCallback((animated = false) => {
    if (!appRef.current || !worldContainer.current) return;
    const { vw, vh } = getViewportSize();
    const centerX = Math.floor(vw / 2);
    const centerY = Math.floor(vh / 2);
    const player = positions.current[userId.current];
    if (!player) return;
    const targetX = player.x * TILE_SIZE + TILE_SIZE / 2;
    const targetY = player.y * TILE_SIZE + TILE_SIZE / 2;
    let offsetX = centerX - targetX;
    let offsetY = centerY - targetY;
    // Clamp so we don't show outside the map
    offsetX = Math.min(0, Math.max(offsetX, vw - CANVAS_WIDTH));
    offsetY = Math.min(0, Math.max(offsetY, vh - CANVAS_HEIGHT));
    if (animated) {
      gsap.to(worldContainer.current.position, { x: offsetX, y: offsetY, duration: 0.3, ease: 'expo.out', overwrite: 'auto' });
    } else {
      worldContainer.current.position.set(offsetX, offsetY);
    }
  }, [getViewportSize]);

  // Draw all players
  const drawPlayers = useCallback((animatedMoveId: string | null = null) => {
    if (!appRef.current || !worldContainer.current) return;
    const container = worldContainer.current;
    // Track which sprites are still in use
    const usedSprites: { [id: string]: boolean } = {};
    // Draw each player
    Object.entries(positions.current).forEach(([id, { x, y, dir, moving }]) => {
      let sprite = playerSprites.current[id];
      const targetX = x * TILE_SIZE + TILE_SIZE / 2;
      const targetY = y * TILE_SIZE + TILE_SIZE / 2;
      // Create sprite if it doesn't exist
      if (!sprite) {
        if (timmyTextures.current) {
          sprite = new PIXI.Sprite(timmyTextures.current[dir][moving ? 1 : 0]);
          sprite.width = PLAYER_SIZE;
          sprite.height = PLAYER_SIZE;
        } else {
          sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
          sprite.tint = 0x00ff00;
          sprite.width = PLAYER_SIZE;
          sprite.height = PLAYER_SIZE;
        }
        sprite.anchor.set(0.5);
        // Add label
        const label = new PIXI.Text(id === userId.current ? 'You' : id, { fontSize: 12, fill: 0xffffff });
        label.anchor.set(0.5, 0);
        label.y = PLAYER_SIZE / 2 + 2;
        sprite.addChild(label);
        container.addChild(sprite);
        playerSprites.current[id] = sprite;
        // Set initial position
        sprite.x = targetX;
        sprite.y = targetY;
        console.log('Created sprite for', id, 'at', targetX, targetY);
      } else {
        // Remove duplicate labels if any
        while (sprite.children.length > 0) sprite.removeChild(sprite.children[0]);
        // Add label again
        const label = new PIXI.Text(id === userId.current ? 'You' : id, { fontSize: 12, fill: 0xffffff });
        label.anchor.set(0.5, 0);
        label.y = PLAYER_SIZE / 2 + 2;
        sprite.addChild(label);
        // Update texture if needed
        if (timmyTextures.current) {
          const newTexture = timmyTextures.current[dir][moving ? 1 : 0];
          if (sprite.texture !== newTexture) {
            sprite.texture = newTexture;
          }
        }
        // Animate movement if local player and moving
        if (id === userId.current && animatedMoveId === id) {
          gsap.to(sprite, {
            x: targetX,
            y: targetY,
            duration: 0.3,
            ease: 'expo.out',
            overwrite: 'auto',
          });
        } else {
          sprite.x = targetX;
          sprite.y = targetY;
        }
        // Ensure sprite is in container
        if (!container.children.includes(sprite)) {
          container.addChild(sprite);
        }
        playerSprites.current[id] = sprite;
      }
      usedSprites[id] = true;
    });
    // Remove sprites for players no longer present
    Object.keys(playerSprites.current).forEach((id) => {
      if (!usedSprites[id]) {
        container.removeChild(playerSprites.current[id]);
        delete playerSprites.current[id];
      }
    });
    // After drawing, update camera
    updateCamera(animatedMoveId === userId.current);
  }, [updateCamera]);

  // Draw the map (background, grid, obstacles)
  const drawMap = useCallback((container: PIXI.Container) => {
    // Background
    const bg = new PIXI.Graphics();
    bg.beginFill(0x222222);
    bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bg.endFill();
    container.addChild(bg);
    // Grid
    const grid = new PIXI.Graphics();
    grid.lineStyle(1, 0x333333, 0.5);
    for (let x = 0; x <= MAP_WIDTH; x++) {
      grid.moveTo(x * TILE_SIZE, 0);
      grid.lineTo(x * TILE_SIZE, CANVAS_HEIGHT);
    }
    for (let y = 0; y <= MAP_HEIGHT; y++) {
      grid.moveTo(0, y * TILE_SIZE);
      grid.lineTo(CANVAS_WIDTH, y * TILE_SIZE);
    }
    container.addChild(grid);
    // Obstacles
    for (const obs of obstacles.current) {
      const o = new PIXI.Graphics();
      o.beginFill(obs.color);
      o.drawRect(obs.x * TILE_SIZE, obs.y * TILE_SIZE, OBSTACLE_SIZE, OBSTACLE_SIZE);
      o.endFill();
      // 8-bit style: add a black border
      o.lineStyle(2, 0x000000);
      o.drawRect(obs.x * TILE_SIZE, obs.y * TILE_SIZE, OBSTACLE_SIZE, OBSTACLE_SIZE);
      container.addChild(o);
    }
    // Border
    const border = new PIXI.Graphics();
    border.lineStyle(4, 0xFFD700);
    border.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    container.addChild(border);
  }, []);

  // Collision detection
  const isBlocked = useCallback((x: number, y: number) => {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return true;
    return obstacles.current.some((obs) => obs.x === x && obs.y === y);
  }, []);

  // Animate local player walk
  const animateLocalPlayerWalk = useCallback(() => {
    if (!timmyTextures.current) return;
    if (!playerSprites.current[userId.current]) return;
    if (!walkTicker.current) {
      walkTicker.current = new PIXI.Ticker();
      walkTicker.current.add(() => {
        walkFrame.current = (walkFrame.current + 0.15) % 2;
        const sprite = playerSprites.current[userId.current];
        if (sprite && timmyTextures.current) sprite.texture = timmyTextures.current[myDir.current][Math.floor(walkFrame.current)];
      });
      walkTicker.current.start();
    }
  }, []);

  const stopLocalPlayerWalk = useCallback(() => {
    if (walkTicker.current) {
      walkTicker.current.stop();
      walkTicker.current.destroy();
      walkTicker.current = null;
      walkFrame.current = 0;
    }
    if (timmyTextures.current && playerSprites.current[userId.current]) {
      playerSprites.current[userId.current].texture = timmyTextures.current[myDir.current][0];
    }
  }, []);

  // Load Timmy sprite sheet and slice textures
  useEffect(() => {
    const loadTextures = async () => {
      try {
        console.log('Loading Timmy sprite from:', TIMMY_PATH);
        const base = await PIXI.Assets.load(TIMMY_PATH);
        console.log('Timmy sprite loaded successfully:', base);
        
        // For 4 rows (directions), 2 columns (frames)
        const getFrame = (row: number, col: number) => {
          return new PIXI.Texture({
            source: base.source,
            frame: new PIXI.Rectangle(
              col * TIMMY_FRAME_WIDTH,
              row * TIMMY_FRAME_HEIGHT,
              TIMMY_FRAME_WIDTH,
              TIMMY_FRAME_HEIGHT
            )
          });
        };
        
        timmyTextures.current = {
          up:    [getFrame(0, 0), getFrame(0, 1)],
          down:  [getFrame(1, 0), getFrame(1, 1)],
          left:  [getFrame(2, 0), getFrame(2, 1)],
          right: [getFrame(3, 0), getFrame(3, 1)],
        };
        
        console.log('Timmy textures created:', timmyTextures.current);
        
        // Redraw players after textures load
        if (appRef.current) {
          // Update all existing player sprites to use Timmy texture
          Object.entries(playerSprites.current).forEach(([id, sprite]) => {
            const pos = positions.current[id];
            if (pos && timmyTextures.current) {
              const newTexture = timmyTextures.current[pos.dir][pos.moving ? 1 : 0];
              if (sprite.texture !== newTexture) {
                console.log('Updating sprite texture for', id, 'to Timmy texture');
                sprite.texture = newTexture;
              }
            } else {
              console.log('Timmy textures not set or no pos for', id);
            }
          });
          drawPlayers();
        }
      } catch (error) {
        console.error('Failed to load Timmy sprite:', error);
        // Fallback to colored square
        timmyTextures.current = null;
      }
    };
    loadTextures();
  }, [drawPlayers]);

  // Setup PixiJS
  useEffect(() => {
    let handleResize: (() => void) | null = null;
    const setup = async () => {
      const { vw, vh } = getViewportSize();
      const app = new PIXI.Application({
        width: vw,
        height: vh,
        backgroundColor: 0x222222,
        antialias: false,
        resolution: window.devicePixelRatio || 1,
      });
      await app.init();
      appRef.current = app;
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(app.view);
        // Make canvas responsive
        app.view.style.width = '100vw';
        app.view.style.height = '100vh';
        app.view.style.display = 'block';
        app.view.style.margin = 'auto';
      }
      // Create world container and add to stage
      worldContainer.current = new PIXI.Container();
      app.stage.addChild(worldContainer.current);
      // Initialize local player position
      positions.current[userId.current] = {
        x: myPos.current.x,
        y: myPos.current.y,
        dir: myDir.current,
        moving: false
      };
      // Draw map and players in worldContainer
      drawMap(worldContainer.current);
      drawPlayers();
      // Listen for resize to update app size and camera
      handleResize = () => {
        if (appRef.current) {
          const { vw, vh } = getViewportSize();
          appRef.current.renderer.resize(vw, vh);
          updateCamera();
        }
      };
      window.addEventListener('resize', handleResize);
    };
    setup();
    return () => {
      appRef.current?.destroy(true);
      stopLocalPlayerWalk();
      if (handleResize) window.removeEventListener('resize', handleResize);
    };
  }, [drawMap, drawPlayers, getViewportSize, updateCamera, stopLocalPlayerWalk]);

  // Setup WebSocket
  useEffect(() => {
    const ws = new window.WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => {
      // Extract spaceId from URL or use a default
      const pathParts = window.location.pathname.split('/');
      const spaceId = pathParts[pathParts.length - 1] || 'default-space';
      
      ws.send(JSON.stringify({
        type: 'join',
        payload: {
          spaceId: spaceId,
          token: sessionStorage.getItem('token') || null
        }
      }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('WebSocket message:', msg);
      
      if (msg.type === 'space-joined') {
        // Handle initial space state
        console.log('Joined space:', msg.payload);
        // You might want to set initial positions here
      } else if (msg.type === 'user-joined') {
        const { userId: uid, x, y } = msg.payload;
        positions.current[uid] = {
          x,
          y,
          dir: 'down',
          moving: false
        };
        drawPlayers();
      } else if (msg.type === 'movement') {
        const { userId: uid, x, y } = msg.payload;
        if (!positions.current[uid]) return;
        positions.current[uid].x = x;
        positions.current[uid].y = y;
        drawPlayers();
      } else if (msg.type === 'user-left') {
        const { userId: uid } = msg.payload;
        delete positions.current[uid];
        drawPlayers();
      }
    };
    ws.onclose = () => {};
    ws.onerror = () => {};
    return () => {
      ws.close();
    };
  }, [drawPlayers]);

  // Handle movement and facing
  useEffect(() => {
    function moveOrFace(dir: Dir) {
      if (myDir.current !== dir) {
        myDir.current = dir;
        myMoving.current = false;
        lastKeyDir.current = dir;
        // Only change facing, don't move
        positions.current[userId.current] = {
          x: myPos.current.x,
          y: myPos.current.y,
          dir: myDir.current,
          moving: false
        };
        stopLocalPlayerWalk();
        drawPlayers();
        updateCamera();
        // Send facing update
        if (wsRef.current && wsRef.current.readyState === 1) {
          wsRef.current.send(JSON.stringify({
            type: 'move',
            payload: { x: myPos.current.x, y: myPos.current.y }
          }));
        }
        return;
      }
      // If already facing, move
      const newX = myPos.current.x + (dir === 'right' ? 1 : dir === 'left' ? -1 : 0);
      const newY = myPos.current.y + (dir === 'down' ? 1 : dir === 'up' ? -1 : 0);
      if (isBlocked(newX, newY)) return;
      myPos.current.x = newX;
      myPos.current.y = newY;
      myDir.current = dir;
      myMoving.current = true;
      positions.current[userId.current] = {
        x: myPos.current.x,
        y: myPos.current.y,
        dir: myDir.current,
        moving: true
      };
      animateLocalPlayerWalk();
      drawPlayers(userId.current);
      // Send move to server
      if (wsRef.current && wsRef.current.readyState === 1) {
        wsRef.current.send(JSON.stringify({
          type: 'move',
          payload: { x: myPos.current.x, y: myPos.current.y }
        }));
      }
      setTimeout(() => {
        myMoving.current = false;
        positions.current[userId.current].moving = false;
        stopLocalPlayerWalk();
        drawPlayers();
        updateCamera();
        if (wsRef.current && wsRef.current.readyState === 1) {
          wsRef.current.send(JSON.stringify({
            type: 'move',
            payload: { x: myPos.current.x, y: myPos.current.y }
          }));
        }
      }, 180);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      let dir: Dir | null = null;
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': dir = 'up'; break;
        case 's': case 'arrowdown': dir = 'down'; break;
        case 'a': case 'arrowleft': dir = 'left'; break;
        case 'd': case 'arrowright': dir = 'right'; break;
        default: break;
      }
      if (dir) moveOrFace(dir);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawPlayers, updateCamera, stopLocalPlayerWalk, animateLocalPlayerWalk, isBlocked]);

  // Responsive wrapper
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#181818', minHeight: '100vh' }}>
      <div
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          margin: 'auto',
          boxShadow: '0 0 32px #0008',
          borderRadius: 16,
          background: '#111',
          imageRendering: 'pixelated',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}