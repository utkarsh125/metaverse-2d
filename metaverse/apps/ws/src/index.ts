import { WebSocketServer } from 'ws';
import Redis from 'ioredis';

const redis = new Redis(); //default port 6379


const wss = new WebSocketServer({ port: 4000 });

const users: Record<string, any> = {}; // userId -> ws
const positions: Record<string, { x: number; y: number; color: number }> = {};

wss.on('connection', (ws) => {
  let myId: string | null = null;

  ws.on('message', async (msg) => {
    const data = JSON.parse(msg.toString());
    if (data.type === 'join') {
      myId = data.payload.userId;

      await redis.hmset(`session:${myId}`, {
        x: data.payload.x,
        y: data.payload.y,
        color: data.payload.color,
        online: 1
      })
      if (!myId) return;
      users[myId] = ws;
      positions[myId] = {
        x: data.payload.x,
        y: data.payload.y,
        color: data.payload.color,
      };
      // Send full state to the new user
      // ws.send(JSON.stringify({ type: 'state', payload: positions }));

      const keys = await redis.keys('session:*');
      const sessions: Record<string, { x: number; y: number; color: number }> = {};
      for (const key of keys) {
        const userId = key.split(':')[1];
        const userSession = await redis.hgetall(key);
        sessions[userId] = {
          x: Number(userSession.x),
          y: Number(userSession.y),
          color: Number(userSession.color),
        };
      }
      ws.send(JSON.stringify({ type: 'state', payload: sessions }));
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

      await redis.hmset(`session:${myId}`, {
        x: data.payload.x,
        y: data.payload.y,
      });

      // Broadcast move to others
      broadcastExcept(myId, {
        type: 'move',
        payload: { userId: myId, x: data.payload.x, y: data.payload.y }
      });
    }
  });

  ws.on('close', async() => {
    if (myId) {
      delete users[myId];
      delete positions[myId];

      await redis.del(`session:${myId}`);
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