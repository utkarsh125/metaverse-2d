import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4000 });

const users: Record<string, any> = {}; // userId -> ws
const positions: Record<string, { x: number; y: number; color: number }> = {};

wss.on('connection', (ws) => {
  let myId: string | null = null;

  ws.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    if (data.type === 'join') {
      myId = data.payload.userId;
      if (!myId) return;
      users[myId] = ws;
      positions[myId] = {
        x: data.payload.x,
        y: data.payload.y,
        color: data.payload.color,
      };
      // Send full state to the new user
      ws.send(JSON.stringify({ type: 'state', payload: positions }));
      // Broadcast join to others
      broadcastExcept(myId, {
        type: 'join',
        payload: { userId: myId, x: data.payload.x, y: data.payload.y, color: data.payload.color }
      });
    }
    if (data.type === 'move') {
      if (!myId) return;
      positions[myId].x = data.payload.x;
      positions[myId].y = data.payload.y;
      // Broadcast move to others
      broadcastExcept(myId, {
        type: 'move',
        payload: { userId: myId, x: data.payload.x, y: data.payload.y }
      });
    }
  });

  ws.on('close', () => {
    if (myId) {
      delete users[myId];
      delete positions[myId];
      broadcastExcept(myId, { type: 'leave', payload: { userId: myId } });
    }
  });

  function broadcastExcept(exceptId: string, msg: any) {
    if (!exceptId) return;
    Object.entries(users).forEach(([uid, client]) => {
      if (uid !== exceptId && client.readyState === 1) {
        client.send(JSON.stringify(msg));
      }
    });
  }
});