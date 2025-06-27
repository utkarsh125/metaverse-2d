'use client';

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

const TILE_SIZE = 32;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 30;
const CANVAS_WIDTH = TILE_SIZE * MAP_WIDTH;
const CANVAS_HEIGHT = TILE_SIZE * MAP_HEIGHT;
const PLAYER_SIZE = 28;
const OBSTACLE_SIZE = 32;
const WS_URL = 'ws://localhost:4000';

// 8-bit style colors for obstacles
const OBSTACLE_COLORS = [0x228B22, 0x8B4513, 0x4682B4, 0xFFD700];

// Placeholder 8-bit player sprites (colored squares for now)
const PLAYER_SPRITES = [0xFF6B6B, 0x4ECDC4, 0xFFD93D, 0x1A535C, 0xFFB400];

function randomId() {
  return Math.random().toString(36).substring(2, 10);
}
function randomColor() {
  return PLAYER_SPRITES[Math.floor(Math.random() * PLAYER_SPRITES.length)];
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

export default function VirtualSpaceCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const userId = useRef(randomId());
  const userColor = useRef(randomColor());
  const positions = useRef<{ [id: string]: { x: number; y: number; color: number } }>({});
  const playerGraphics = useRef<{ [id: string]: PIXI.Graphics }>({});
  const obstacles = useRef(generateObstacles());
  const myPos = useRef({ x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) });

  // Load 8-bit player sprite (placeholder: colored square)
  function createPlayerSprite(color: number) {
    const g = new PIXI.Graphics();
    g.beginFill(color);
    g.drawRect(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);
    g.endFill();
    // Add a simple face (8-bit style)
    g.beginFill(0x000000);
    g.drawRect(-6, -4, 4, 4); // left eye
    g.drawRect(2, -4, 4, 4); // right eye
    g.drawRect(-2, 4, 4, 2); // mouth
    g.endFill();
    return g;
  }

  // Draw the map (background, grid, obstacles)
  function drawMap(stage: PIXI.Container) {
    // Background
    const bg = new PIXI.Graphics();
    bg.beginFill(0x222222);
    bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bg.endFill();
    stage.addChild(bg);
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
    stage.addChild(grid);
    // Obstacles
    for (const obs of obstacles.current) {
      const o = new PIXI.Graphics();
      o.beginFill(obs.color);
      o.drawRect(obs.x * TILE_SIZE, obs.y * TILE_SIZE, OBSTACLE_SIZE, OBSTACLE_SIZE);
      o.endFill();
      // 8-bit style: add a black border
      o.lineStyle(2, 0x000000);
      o.drawRect(obs.x * TILE_SIZE, obs.y * TILE_SIZE, OBSTACLE_SIZE, OBSTACLE_SIZE);
      stage.addChild(o);
    }
    // Border
    const border = new PIXI.Graphics();
    border.lineStyle(4, 0xFFD700);
    border.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    stage.addChild(border);
  }

  // Collision detection
  function isBlocked(x: number, y: number) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return true;
    return obstacles.current.some((obs) => obs.x === x && obs.y === y);
  }

  // Draw all players
  function drawPlayers() {
    if (!appRef.current) return;
    const stage = appRef.current.stage;
    // Remove all player sprites
    Object.values(playerGraphics.current).forEach((sprite) => stage.removeChild(sprite));
    playerGraphics.current = {};
    // Draw each player
    Object.entries(positions.current).forEach(([id, { x, y, color }]) => {
      const sprite = createPlayerSprite(color);
      sprite.x = x * TILE_SIZE + TILE_SIZE / 2;
      sprite.y = y * TILE_SIZE + TILE_SIZE / 2;
      stage.addChild(sprite);
      playerGraphics.current[id] = sprite;
      // Label
      const label = new PIXI.Text(id === userId.current ? 'You' : id, { fontSize: 12, fill: 0xffffff });
      label.anchor.set(0.5, 0);
      label.y = PLAYER_SIZE / 2 + 2;
      sprite.addChild(label);
    });
  }

  // Animate player movement with GSAP
  function animatePlayerMove(id: string, toX: number, toY: number) {
    const sprite = playerGraphics.current[id];
    if (!sprite) return;
    gsap.to(sprite, {
      x: toX * TILE_SIZE + TILE_SIZE / 2,
      y: toY * TILE_SIZE + TILE_SIZE / 2,
      duration: 0.18,
      ease: 'power2.out',
    });
  }

  // Setup PixiJS
  useEffect(() => {
    const setup = async () => {
      const app = new PIXI.Application({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: 0x222222,
        antialias: false,
        resolution: window.devicePixelRatio || 1,
      });
      await app.init();
      appRef.current = app;
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(app.view);
      }
      // Draw map
      drawMap(app.stage);
      drawPlayers();
    };
    setup();
    return () => {
      appRef.current?.destroy(true);
    };
    // eslint-disable-next-line
  }, []);

  // Setup WebSocket
  useEffect(() => {
    const ws = new window.WebSocket(WS_URL);
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join',
        payload: { userId: userId.current, x: myPos.current.x, y: myPos.current.y, color: userColor.current }
      }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'state') {
        positions.current = msg.payload;
        drawPlayers();
      } else if (msg.type === 'move') {
        const { userId: uid, x, y } = msg.payload;
        if (!positions.current[uid]) return;
        // Animate movement
        animatePlayerMove(uid, x, y);
        positions.current[uid].x = x;
        positions.current[uid].y = y;
      } else if (msg.type === 'join') {
        const { userId: uid, x, y, color } = msg.payload;
        positions.current[uid] = { x, y, color };
        drawPlayers();
      } else if (msg.type === 'leave') {
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
    // eslint-disable-next-line
  }, []);

  // Handle movement
  useEffect(() => {
    function move(dx: number, dy: number) {
      const newX = myPos.current.x + dx;
      const newY = myPos.current.y + dy;
      if (isBlocked(newX, newY)) return;
      myPos.current.x = newX;
      myPos.current.y = newY;
      positions.current[userId.current] = {
        x: myPos.current.x,
        y: myPos.current.y,
        color: userColor.current
      };
      animatePlayerMove(userId.current, myPos.current.x, myPos.current.y);
      // Send move to server
      if (wsRef.current && wsRef.current.readyState === 1) {
        wsRef.current.send(JSON.stringify({
          type: 'move',
          payload: { userId: userId.current, x: myPos.current.x, y: myPos.current.y }
        }));
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': move(0, -1); break;
        case 's': case 'arrowdown': move(0, 1); break;
        case 'a': case 'arrowleft': move(-1, 0); break;
        case 'd': case 'arrowright': move(1, 0); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Responsive wrapper
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#181818', minHeight: '100vh' }}>
      <div
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: CANVAS_WIDTH,
          height: '100%',
          maxHeight: CANVAS_HEIGHT,
          aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          margin: 'auto',
          boxShadow: '0 0 32px #0008',
          borderRadius: 16,
          background: '#111',
        }}
      />
    </div>
  );
}
