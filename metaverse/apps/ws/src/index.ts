import { WebSocketServer } from 'ws';
import { User } from './User';

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws) => {
  const user = new User(ws);

  ws.on('close', () => {
    user.destroy();
  });
});