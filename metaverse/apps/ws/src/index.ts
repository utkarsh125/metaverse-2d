import { User } from './User';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws) {

  console.log("User connected")
  let user = new User(ws);

  ws.on('error', console.error);

  ws.on("close", () => {
    user?.destroy();
  })

});