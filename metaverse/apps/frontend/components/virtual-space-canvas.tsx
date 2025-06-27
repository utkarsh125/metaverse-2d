'use client';

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TILE_SIZE = 32;
const PLAYER_RADIUS = 16;
const WS_URL = 'ws://localhost:4000';

// Generate a random user ID and color for this session
function randomId() {
  return Math.random().toString(36).substring(2, 10);
}
function randomColor() {
  const colors = [0xFF6B6B, 0x4ECDC4, 0xFFD93D, 0x1A535C, 0xFFB400];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function VirtualSpaceCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const userId = useRef(randomId());
  const userColor = useRef(randomColor());
  const positions = useRef<{ [id: string]: { x: number; y: number; color: number } }>({});
  const playerGraphics = useRef<{ [id: string]: PIXI.Graphics }>({});

  // Movement state
  const myPos = useRef({ x: 5, y: 5 });

  // Setup PixiJS
  useEffect(() => {
    const setup = async () => {
      const app = new PIXI.Application({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: 0x87CEEB,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });
      await app.init(); // Wait for initialization!
      appRef.current = app;
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(app.view);
      }
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
      // Send join message
      ws.send(JSON.stringify({
        type: 'join',
        payload: { userId: userId.current, x: myPos.current.x, y: myPos.current.y, color: userColor.current }
      }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'state') {
        // Full state sync
        positions.current = msg.payload;
        drawPlayers();
      } else if (msg.type === 'move') {
        const { userId: uid, x, y } = msg.payload;
        if (!positions.current[uid]) return;
        positions.current[uid].x = x;
        positions.current[uid].y = y;
        drawPlayers();
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

  // Draw all players
  function drawPlayers() {
    if (!appRef.current) return;
    const stage = appRef.current.stage;
    stage.removeChildren();
    playerGraphics.current = {};
    Object.entries(positions.current).forEach(([id, { x, y, color }]) => {
      const g = new PIXI.Graphics();
      g.beginFill(color);
      g.drawCircle(0, 0, PLAYER_RADIUS);
      g.endFill();
      g.x = x * TILE_SIZE + TILE_SIZE / 2;
      g.y = y * TILE_SIZE + TILE_SIZE / 2;
      stage.addChild(g);
      playerGraphics.current[id] = g;
      // Draw userId label
      const label = new PIXI.Text(id === userId.current ? 'You' : id, { fontSize: 12, fill: 0x000000 });
      label.anchor.set(0.5, 0);
      label.y = PLAYER_RADIUS + 2;
      g.addChild(label);
    });
  }

  // Handle movement
  useEffect(() => {
    function move(dx: number, dy: number) {
      myPos.current.x = Math.max(0, Math.min(CANVAS_WIDTH / TILE_SIZE - 1, myPos.current.x + dx));
      myPos.current.y = Math.max(0, Math.min(CANVAS_HEIGHT / TILE_SIZE - 1, myPos.current.y + dy));
      positions.current[userId.current] = {
        x: myPos.current.x,
        y: myPos.current.y,
        color: userColor.current
      };
      drawPlayers();
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

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#222', minHeight: '100vh' }}>
      <div ref={canvasRef} style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, margin: 'auto' }} />
    </div>
  );
}
