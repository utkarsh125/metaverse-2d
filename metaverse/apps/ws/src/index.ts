import { WebSocketServer } from 'ws';
import { User } from './User';
import express, { Request, Response } from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Health check endpoint for Railway
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 4000;
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  const user = new User(ws);

  ws.on('close', () => {
    user.destroy();
  });
});

server.listen(port, () => {
    console.log(`WebSocket server listening on port ${port}`);
});