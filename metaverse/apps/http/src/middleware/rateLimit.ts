import { Request, Response, NextFunction } from "express";
import client from "@metaverse/db/client";

// In-memory storage for rate limiting
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface WebSocketConnection {
  userId: string;
  spaceId: string;
  timestamp: number;
}

// In-memory stores
const apiRateLimitStore = new Map<string, RateLimitEntry>();
const loginRateLimitStore = new Map<string, RateLimitEntry>();
const spaceCreationStore = new Map<string, RateLimitEntry>();
const webSocketConnections = new Map<string, WebSocketConnection>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  
  // Clean API rate limit store
  for (const [key, entry] of apiRateLimitStore.entries()) {
    if (now > entry.resetTime) {
      apiRateLimitStore.delete(key);
    }
  }
  
  // Clean login rate limit store
  for (const [key, entry] of loginRateLimitStore.entries()) {
    if (now > entry.resetTime) {
      loginRateLimitStore.delete(key);
    }
  }
  
  // Clean space creation store
  for (const [key, entry] of spaceCreationStore.entries()) {
    if (now > entry.resetTime) {
      spaceCreationStore.delete(key);
    }
  }
  
  // Clean WebSocket connections (5 minute expiry)
  for (const [key, connection] of webSocketConnections.entries()) {
    if (now - connection.timestamp > 5 * 60 * 1000) {
      webSocketConnections.delete(key);
    }
  }
  
  console.log(`[Rate Limit] Cleaned up expired entries. Current stores: API=${apiRateLimitStore.size}, Login=${loginRateLimitStore.size}, Space=${spaceCreationStore.size}, WS=${webSocketConnections.size}`);
}, 5 * 60 * 1000);

// Generic rate limiter function
function createRateLimiter(
  store: Map<string, RateLimitEntry>,
  windowMs: number,
  maxRequests: number,
  keyGenerator: (req: Request) => string,
  name: string
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();
    
    const entry = store.get(key);
    
    if (!entry || now > entry.resetTime) {
      // First request or window expired
      store.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      console.log(`[Rate Limit] ${name}: First request for ${key}`);
      next();
    } else if (entry.count < maxRequests) {
      // Within limit
      entry.count++;
      console.log(`[Rate Limit] ${name}: Request ${entry.count}/${maxRequests} for ${key}`);
      next();
    } else {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      res.set('Retry-After', retryAfter.toString());
      console.log(`[Rate Limit] ${name}: Rate limit exceeded for ${key}. Retry after ${retryAfter}s`);
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: `${name} rate limit exceeded. Please try again in ${retryAfter} seconds.`,
        retryAfter,
        key: key
      });
    }
  };
}

// General API rate limiter (100 requests per 15 minutes per IP)
export const apiRateLimiter = createRateLimiter(
  apiRateLimitStore,
  15 * 60 * 1000, // 15 minutes
  100,
  (req) => req.ip || 'unknown',
  'API'
);

// Login rate limiter (10 attempts per 15 minutes per username)
export const loginRateLimiter = createRateLimiter(
  loginRateLimitStore,
  15 * 60 * 1000, // 15 minutes
  10,
  (req) => req.body?.username || req.ip || 'unknown',
  'Login'
);

// Space creation rate limiter (5 spaces per 24 hours per user)
export const spaceCreationLimiter = createRateLimiter(
  spaceCreationStore,
  24 * 60 * 60 * 1000, // 24 hours
  5,
  (req) => (req as any).userId || req.ip || 'unknown',
  'Space Creation'
);

// Custom middleware to check space count before creation
export const checkSpaceLimit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Count existing spaces for this user
    const spaceCount = await client.space.count({
      where: {
        creatorId: (req as any).userId
      }
    });

    console.log(`[Space Limit] User ${(req as any).userId} has ${spaceCount}/5 spaces`);

    if (spaceCount >= 5) {
      return res.status(429).json({ 
        error: "Maximum space limit reached", 
        message: "You have reached the maximum limit of 5 spaces. Please delete some spaces before creating new ones.",
        currentCount: spaceCount,
        maxLimit: 5
      });
    }

    next();
  } catch (error) {
    console.error("Error checking space limit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// WebSocket connection rate limiter (prevent multiple connections to same space)
export const checkWebSocketConnection = async (userId: string, spaceId: string): Promise<boolean> => {
  try {
    const key = `${userId}:${spaceId}`;
    const existingConnection = webSocketConnections.get(key);
    
    if (existingConnection) {
      console.log(`[WebSocket Rate Limit] User ${userId} already connected to space ${spaceId}`);
      return false; // Already connected to this space
    }
    
    // Set connection
    webSocketConnections.set(key, {
      userId,
      spaceId,
      timestamp: Date.now()
    });
    
    console.log(`[WebSocket Rate Limit] User ${userId} connected to space ${spaceId}`);
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
      console.log(`[WebSocket Rate Limit] User ${userId} disconnected from space ${spaceId}`);
    }
  } catch (error) {
    console.error("Error removing WebSocket connection:", error);
  }
}; 