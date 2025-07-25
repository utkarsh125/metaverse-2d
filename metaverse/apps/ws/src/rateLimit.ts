// In-memory storage for WebSocket rate limiting
interface WebSocketConnection {
  userId: string;
  spaceId: string;
  timestamp: number;
}

// In-memory store for WebSocket connections
const webSocketConnections = new Map<string, WebSocketConnection>();

// Clean up expired connections every 5 minutes
setInterval(() => {
  const now = Date.now();
  
  // Clean WebSocket connections (5 minute expiry)
  for (const [key, connection] of webSocketConnections.entries()) {
    if (now - connection.timestamp > 5 * 60 * 1000) {
      webSocketConnections.delete(key);
    }
  }
  
  console.log(`[WebSocket Rate Limit] Cleaned up expired connections. Current connections: ${webSocketConnections.size}`);
}, 5 * 60 * 1000);

// WebSocket connection rate limiter (prevent multiple connections to same space)
export const checkWebSocketConnection = async (userId: string, spaceId: string): Promise<boolean> => {
  try {
    const key = `${userId}:${spaceId}`;
    const existingConnection = webSocketConnections.get(key);
    
    if (existingConnection) {
      console.log(`[WebSocket Rate Limit] User ${userId} already connected to space ${spaceId} (existing since ${new Date(existingConnection.timestamp).toISOString()})`);
      return false; // Already connected to this space
    }
    
    // Set connection
    webSocketConnections.set(key, {
      userId,
      spaceId,
      timestamp: Date.now()
    });
    
    console.log(`[WebSocket Rate Limit] User ${userId} connected to space ${spaceId} (total connections: ${webSocketConnections.size})`);
    return true;
  } catch (error) {
    console.error("Error checking WebSocket connection:", error);
    return true; // Allow connection if check fails
  }
};

// Remove WebSocket connection when user disconnects
export const removeWebSocketConnection = async (userId: string, spaceId: string): Promise<void> => {
  try {
    const key = `${userId}:${spaceId}`;
    const removed = webSocketConnections.delete(key);
    if (removed) {
      console.log(`[WebSocket Rate Limit] User ${userId} disconnected from space ${spaceId} (remaining connections: ${webSocketConnections.size})`);
    } else {
      console.log(`[WebSocket Rate Limit] User ${userId} not found in connections for space ${spaceId}`);
    }
  } catch (error) {
    console.error("Error removing WebSocket connection:", error);
  }
};

// Debug function to list all current connections
export const listCurrentConnections = (): void => {
  console.log(`[WebSocket Rate Limit] Current connections (${webSocketConnections.size}):`);
  for (const [key, connection] of webSocketConnections.entries()) {
    console.log(`  - ${key}: ${connection.userId} in ${connection.spaceId} since ${new Date(connection.timestamp).toISOString()}`);
  }
}; 