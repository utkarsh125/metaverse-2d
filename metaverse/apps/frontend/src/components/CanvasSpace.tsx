import React, { useEffect, useRef, useState } from 'react';

// Adjust these constants as needed
type Avatar = { x: number; y: number };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Message = { type: string; payload: any };
interface CanvasSpaceProps { spaceId: string; token: string; wsUrl?: string; }

const TILE_SIZE = 20; // each grid unit maps to 20px

const CanvasSpace: React.FC<CanvasSpaceProps> = ({ spaceId, token, wsUrl = '/ws' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [avatars, setAvatars] = useState<Record<string, Avatar>>({});
  const [mapSize, setMapSize] = useState<{ width: number; height: number } | null>(null);

  // 1. Load space dimensions and then initialize WebSocket
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`/api/v1/space/${spaceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load space info');
        const data = await res.json();
        setMapSize({ width: data.width, height: data.height });

        // once we have dimensions, open WS
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        ws.onopen = () => {
          ws.send(JSON.stringify({ type: 'join', payload: { spaceId, token } }));
        };
        ws.onmessage = ({ data }) => {
          const msg: Message = JSON.parse(data.toString());
          switch (msg.type) {
            case 'space-joined': {
              const initAvatars: Record<string, Avatar> = {};
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              msg.payload.users.forEach((u: any) => {
                initAvatars[u.userId] = { x: u.x, y: u.y };
              });
              initAvatars['self'] = { x: msg.payload.spawn.x, y: msg.payload.spawn.y };
              setAvatars(initAvatars);
              break;
            }
            case 'user-joined': {
              setAvatars(prev => ({
                ...prev,
                [msg.payload.userId]: { x: msg.payload.spawn.x, y: msg.payload.spawn.y }
              }));
              break;
            }
            case 'movement': {
              setAvatars(prev => ({
                ...prev,
                [msg.payload.userId]: { x: msg.payload.x, y: msg.payload.y }
              }));
              break;
            }
            case 'movement-rejected': {
              // optionally reset or flash
              break;
            }
            case 'user-left': {
              setAvatars(prev => {
                const copy = { ...prev };
                delete copy[msg.payload.userId];
                return copy;
              });
              break;
            }
          }
        };
      } catch (err) {
        console.error(err);
      }
    };
    init();
    return () => {
      wsRef.current?.close();
    };
  }, [spaceId, token, wsUrl]);

  // 2. Redraw when avatars or mapSize changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mapSize) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, mapSize.width * TILE_SIZE, mapSize.height * TILE_SIZE);

    // draw grid (optional)
    ctx.strokeStyle = '#e5e7eb';
    for (let x = 0; x <= mapSize.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * TILE_SIZE, 0);
      ctx.lineTo(x * TILE_SIZE, mapSize.height * TILE_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= mapSize.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * TILE_SIZE);
      ctx.lineTo(mapSize.width * TILE_SIZE, y * TILE_SIZE);
      ctx.stroke();
    }

    // draw avatars
    Object.entries(avatars).forEach(([id, pos]) => {
      const px = pos.x * TILE_SIZE;
      const py = pos.y * TILE_SIZE;
      ctx.beginPath();
      ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, TILE_SIZE * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = id === 'self' ? 'blue' : 'green';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fillText(id === 'self' ? 'You' : id, px + TILE_SIZE + 2, py + TILE_SIZE/2);
    });
  }, [avatars, mapSize]);

  // 3. Movement helper
  const move = (dx: number, dy: number) => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN && avatars['self']) {
      const newX = avatars['self'].x + dx;
      const newY = avatars['self'].y + dy;
      ws.send(JSON.stringify({ type: 'move', payload: { spaceId, x: newX, y: newY } }));
    }
  };

  if (!mapSize) return <div>Loading space...</div>;

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={mapSize.width * TILE_SIZE}
        height={mapSize.height * TILE_SIZE}
        className="border"
      />
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button onClick={() => move(0, -1)} className="px-2 py-1 bg-gray-100 rounded">Up</button>
        <button onClick={() => move(0, 1)} className="px-2 py-1 bg-gray-100 rounded">Down</button>
        <button onClick={() => move(-1, 0)} className="px-2 py-1 bg-gray-100 rounded">Left</button>
        <button onClick={() => move(1, 0)} className="px-2 py-1 bg-gray-100 rounded">Right</button>
      </div>
    </div>
  );
};

export default CanvasSpace;
