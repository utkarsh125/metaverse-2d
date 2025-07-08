'use client';

import { useEffect, useRef, useState } from 'react';
import { Space, ChatMessage } from '../lib/types';
import type { PixiSpaceEngine } from '../lib/metaverse/PixiSpaceEngine';
import type { TilemapSpaceEngine } from '../lib/metaverse/TilemapSpaceEngine';
import ModernChatSidebar from './ModernChatSidebar';

// Type for engines with zoom capabilities
interface EngineWithZoom {
  getZoomLevel?: () => number;
  zoomIn?: () => void;
  zoomOut?: () => void;
  resetZoomAndPan?: () => void;
  destroy: () => void;
  sendChatMessage?: (msg: string) => void;
  setupChatHandler?: (handler: (message: ChatMessage) => void) => void;
}

interface MetaverseSpaceProps {
  space: Space;
  userId: string;
  username: string;
  mapFile?: string | null;
}

export default function MetaverseSpace({ space, userId, username, mapFile }: MetaverseSpaceProps) {
  console.log("MetaverseSpace props", { space, userId, username, mapFile });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<(PixiSpaceEngine | TilemapSpaceEngine) & EngineWithZoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastInitializedSpaceId, setLastInitializedSpaceId] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Get spaceId from props or fallback to URL
  const spaceId = space.id || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');

  // Chat functionality
  const handleSendMessage = (message: string) => {
    console.log('MetaverseSpace: Attempting to send message:', message);
    
    // Add our own message immediately to the chat
    const ownMessage: ChatMessage = {
      userId: userId,
      username: username,
      message: message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, ownMessage]);
    
    // Send message to server
    if (engineRef.current) {
      if (engineRef.current.sendChatMessage) {
        console.log('MetaverseSpace: Calling engine.sendChatMessage');
        engineRef.current.sendChatMessage(message);
      } else {
        console.error('MetaverseSpace: engine.sendChatMessage not available');
      }
    } else {
      console.error('MetaverseSpace: engineRef.current is null');
    }
  };

  const handleChatMessage = (message: ChatMessage) => {
    console.log('MetaverseSpace: handleChatMessage called with:', message);
    console.log('MetaverseSpace: Current user ID:', userId);
    
    // Only add messages from other users (we already added our own)
    if (message.userId !== userId) {
      console.log('MetaverseSpace: Adding message from other user');
      setChatMessages(prev => {
        const newMessages = [...prev, message];
        console.log('MetaverseSpace: New chat messages after update:', newMessages);
        return newMessages;
      });
    } else {
      console.log('MetaverseSpace: Ignoring own message (already added)');
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (engineRef.current) {
      engineRef.current.zoomIn?.();
      const currentZoom = engineRef.current.getZoomLevel?.() || 1;
      setZoomLevel(currentZoom);
    }
  };

  const handleZoomOut = () => {
    if (engineRef.current) {
      engineRef.current.zoomOut?.();
      const currentZoom = engineRef.current.getZoomLevel?.() || 1;
      setZoomLevel(currentZoom);
    }
  };

  const handleResetZoom = () => {
    if (engineRef.current) {
      engineRef.current.resetZoomAndPan?.();
      setZoomLevel(1);
    }
  };

  // Update zoom level periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (engineRef.current) {
        const currentZoom = engineRef.current.getZoomLevel?.() || 1;
        setZoomLevel(currentZoom);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("MetaverseSpace useEffect running - spaceId:", spaceId, "loading:", isLoading);
    console.log("Dependencies changed:", { space: space.id, userId, username, mapFile, spaceId });
    let mounted = true;  // Add mounted flag for cleanup

    async function init() {
      const initStartTime = Date.now();
      console.log("Starting initialization at:", initStartTime);
      
      // Add timeout for initialization
      const initTimeout = setTimeout(() => {
        console.error("Initialization timeout after 10 seconds");
        if (mounted) {
          setError("Loading timeout - please refresh the page");
          setIsLoading(false);
        }
      }, 10000);
      
      try {
        if (!canvasRef.current || !mounted || !spaceId) {
          console.log("No canvasRef.current, component unmounted, or invalid spaceId");
          clearTimeout(initTimeout);
          return;
        }

        // Check if we've already initialized this space
        if (lastInitializedSpaceId === spaceId && engineRef.current) {
          console.log("Space already initialized, skipping re-initialization");
          clearTimeout(initTimeout);
          setIsLoading(false);
          return;
        }

        // If spaceId changed, clean up previous engine
        if (lastInitializedSpaceId && lastInitializedSpaceId !== spaceId && engineRef.current) {
          console.log("Different space detected, cleaning up previous engine");
          engineRef.current.destroy();
          engineRef.current = null;
        }

        console.log("Step A: Ready for PIXI initialization");

        // Create PIXI Application
        console.log("Step B: Importing PIXI Application");
        const { Application } = await import('pixi.js');
        console.log("Step C: Creating PIXI Application instance");
        const app = new Application();
        
        // Initialize with canvas
        console.log("Step D: Initializing PIXI Application with canvas");
        console.log("Canvas element:", canvasRef.current);
        console.log("Canvas parent:", canvasRef.current?.parentElement);
        
        try {
          // Add a timeout to the app.init() call
          await Promise.race([
            app.init({
              width: 1024,
              height: 768,
              backgroundAlpha: 0,
              resolution: 1, // Use fixed resolution to prevent blur
              autoDensity: false, // Disable auto density to prevent scaling issues
              view: canvasRef.current,
              preference: 'webgl', // Try WebGL first
              failIfMajorPerformanceCaveat: false
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('PIXI init timeout')), 5000)
            )
          ]);
          console.log("Step E: PIXI Application initialized successfully");
        } catch (initError) {
          console.warn("WebGL init failed, trying without preferences:", initError);
          // Try without specific preferences (let PIXI choose)
          await app.init({
            width: 1024,
            height: 768,
            backgroundAlpha: 0,
            resolution: 1, // Use fixed resolution
            autoDensity: false, // Disable auto density
            view: canvasRef.current
          });
          console.log("Step E: PIXI Application initialized with fallback settings");
        }

        console.log("Trying to load mapFile", mapFile);
        if (mapFile) {
          // Use TilemapSpaceEngine for Tiled maps
          const { TilemapSpaceEngine } = await import('../lib/metaverse/TilemapSpaceEngine');
          
          if (!mounted) return;  // Check if still mounted after async import

          const engine = new TilemapSpaceEngine(
            app,
            userId,
            username
          );
          
          engineRef.current = engine;  // Set ref after successful initialization
          
          console.log("Loading tilemap from", `/map/${mapFile}`);
          try {
            console.log("Step F: About to call engine.loadTilemap");
            await engine.loadTilemap(`/map/${mapFile}`);
            console.log("Step G: Tilemap loaded successfully");
          } catch (tilemapError) {
            console.error("Step G FAILED - Failed to load tilemap:", tilemapError);
            throw new Error(`Failed to load tilemap: ${tilemapError instanceof Error ? tilemapError.message : 'Unknown error'}`);
          }
          
          // Initialize WebSocket connection after map loads
          console.log("Initializing WebSocket connection");
          engine.init(spaceId);
          console.log("WebSocket connection initialized");
          
          // Set up chat message handler
          if (engineRef.current.setupChatHandler) {
            engineRef.current.setupChatHandler(handleChatMessage);
          }

          if (!mounted) {
            engine.destroy();
            return;
          }

          console.log("TilemapSpaceEngine initialized and map loaded");
        } else {
          // Use PixiSpaceEngine for legacy/element-based maps
          const { PixiSpaceEngine } = await import('../lib/metaverse/PixiSpaceEngine');
          engineRef.current = new PixiSpaceEngine(
            canvasRef.current,
            space.id,
            userId,
            username
          );
          for (const spaceElement of space.elements) {
            const pixiElement = {
              id: spaceElement.id,
              x: spaceElement.x,
              y: spaceElement.y,
              width: spaceElement.element.width,
              height: spaceElement.element.height,
              imageUrl: spaceElement.element.imageUrl,
              static: spaceElement.element.static,
            };
            await engineRef.current.addElement(pixiElement);
          }
          if (space.map?.thumbnail) {
            engineRef.current.setMapBackground(space.map.thumbnail);
          }
          
          // Set up chat message handler
          if (engineRef.current.setupChatHandler) {
            engineRef.current.setupChatHandler(handleChatMessage);
          }
          
          console.log("PixiSpaceEngine initialized and elements added");
        }
        if (mounted) {
          console.log("Setting isLoading to false - engine initialized successfully");
          console.log("Total initialization time:", Date.now() - initStartTime, "ms");
          clearTimeout(initTimeout);
          setLastInitializedSpaceId(spaceId);
          setIsLoading(false);
        } else {
          console.log("Component unmounted, not setting isLoading to false");
          clearTimeout(initTimeout);
        }
      } catch (err) {
        console.error("Error in MetaverseSpace init:", err);
        if (mounted) {
          console.log("Setting error and isLoading to false due to error");
          console.log("Failed initialization time:", Date.now() - initStartTime, "ms");
          clearTimeout(initTimeout);
          setError(err instanceof Error ? err.message : 'Failed to initialize space');
          setIsLoading(false);
        } else {
          console.log("Component unmounted during error, not setting states");
          clearTimeout(initTimeout);
        }
      }
    }

    init();

    // Cleanup function
    return () => {
      console.log("MetaverseSpace cleanup function called - spaceId:", spaceId);
      mounted = false;  // Set mounted to false
      if (engineRef.current) {
        console.log("Cleaning up engine");
        engineRef.current.destroy();
        engineRef.current = null;
      }
      
      // Note: Canvas cleanup moved to be less aggressive to prevent first-load issues
      
      setLastInitializedSpaceId('');
    };
  }, [userId, username, mapFile, spaceId]);



  if (!spaceId) {
    return (
      <div className="text-center text-white">
        <h2 className="text-xl font-bold mb-2">Invalid Space</h2>
        <p className="text-gray-300">No space ID provided</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white">
        <h2 className="text-xl font-bold mb-2">Error Loading Space</h2>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Game Canvas Area */}
      <div className="flex-1 relative">
        <div 
          className="w-full h-full flex items-center justify-center p-4"
          style={{ 
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-full max-h-full rounded-lg shadow-2xl"
            style={{ 
              display: 'block',
              imageRendering: 'pixelated' // Use pixelated rendering for crisp pixels
            }}
          />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-4 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center bg-gray-800/95 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700/50">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r rounded-full mb-4 shadow-lg shadow-purple-500/25">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <p className="font-inter font-semibold text-white">Loading space...</p>
              </div>
            </div>
          )}
          
          {/* Controls overlay */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-white/20">
            <h3 className="font-inter font-bold mb-2 text-sm">CONTROLS</h3>
            <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">WASD</kbd>
              <span>or</span>
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">↑↓←→</kbd>
              <span>to move</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span>Scroll wheel: zoom</span>
              <span>•</span>
              <span>Click + drag: pan</span>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl border border-white/20">
            <h3 className="font-inter font-bold mb-2 text-sm">ZOOM</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs border border-white/20 transition-colors"
              >
                Zoom In
              </button>
              <button
                onClick={handleZoomOut}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs border border-white/20 transition-colors"
              >
                Zoom Out
              </button>
              <button
                onClick={handleResetZoom}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs border border-white/20 transition-colors"
              >
                Reset
              </button>
              <div className="text-xs text-gray-300 text-center mt-1">
                {Math.round(zoomLevel * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <ModernChatSidebar
        onSendMessage={handleSendMessage}
        messages={chatMessages}
        currentUsername={username}
      />
    </div>
  );
} 