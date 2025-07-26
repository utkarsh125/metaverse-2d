'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDeviceType } from '../lib/useDeviceType';
import VirtualControls from './VirtualControls';
import ModernChatSidebar from './ModernChatSidebar';
import type { ChatMessage, Space } from '../lib/types';
import type { PixiSpaceEngine } from '../lib/metaverse/PixiSpaceEngine';
import type { TilemapSpaceEngine } from '../lib/metaverse/TilemapSpaceEngine';

interface MetaverseSpaceProps {
  space: Space;
  userId: string;
  username: string;
  mapFile: string;
  onConnectionError?: (error: string) => void;
  onWebSocketConnected?: () => void;
}

// Extend the engine types to include movePlayer and zoom
interface EngineWithMovement {
  movePlayer: (dx: number, dy: number) => void;
  getZoomLevel?: () => number;
  zoomIn?: () => void;
  zoomOut?: () => void;
  resetZoomAndPan?: () => void;
  setZoomLevel?: (zoom: number) => void;
  destroy: () => void;
  sendChatMessage?: (msg: string) => void;
  setupChatHandler?: (handler: (message: ChatMessage) => void) => void;
}

export default function MetaverseSpace({ space, userId, username, mapFile, onConnectionError, onWebSocketConnected }: MetaverseSpaceProps) {
  const deviceType = useDeviceType();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<((PixiSpaceEngine | TilemapSpaceEngine) & EngineWithMovement) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastInitializedSpaceId, setLastInitializedSpaceId] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState(1.5); // Default zoom to 150%
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);

  // Get spaceId from props or fallback to URL
  const spaceId = space.id || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');

  // Listen for WebSocket events
  useEffect(() => {
    const handleWebSocketError = (event: CustomEvent) => {
      if (onConnectionError && event.detail?.message) {
        onConnectionError(event.detail.message);
      }
    };

    const handleWebSocketConnected = () => {
      if (onWebSocketConnected) {
        onWebSocketConnected();
      }
    };

    window.addEventListener('websocket-error', handleWebSocketError as EventListener);
    window.addEventListener('websocket-connected', handleWebSocketConnected);
    
    return () => {
      window.removeEventListener('websocket-error', handleWebSocketError as EventListener);
      window.removeEventListener('websocket-connected', handleWebSocketConnected);
    };
  }, [onConnectionError, onWebSocketConnected]);

  // Chat functionality
  const handleSendMessage = (message: string) => {
    // console.log('MetaverseSpace: Attempting to send message:', message);
    
    // Add our own message immediately to the chat
    const ownMessage: ChatMessage = {
      userId: userId,
      username: username,
      message: message,
      timestamp: new Date()
    };
    
    // console.log('MetaverseSpace: Adding own message to chat:', ownMessage);
    setChatMessages(prev => {
      const newMessages = [...prev, ownMessage];
      // console.log('MetaverseSpace: New chat messages after adding own:', newMessages);
      return newMessages;
    });
    
    // Send to engine which will broadcast to server
    if (engineRef.current?.sendChatMessage) {
      // console.log('MetaverseSpace: Sending to engine');
      engineRef.current.sendChatMessage(message);
    } else {
      // console.log('MetaverseSpace: Engine not available for sending chat');
    }
  };

  const handleChatMessage = (message: ChatMessage) => {
    // console.log('MetaverseSpace: handleChatMessage called with:', message);
    // console.log('MetaverseSpace: Current user ID:', userId);
    
    // Don't add our own messages twice (they're already added in handleSendMessage)
    if (message.userId === userId) {
      // console.log('MetaverseSpace: Ignoring own message (already added)');
      return;
    }
    
    // console.log('MetaverseSpace: Adding message from other user');
    setChatMessages(prev => {
      const newMessages = [...prev, message];
      // console.log('MetaverseSpace: New chat messages after update:', newMessages);
      return newMessages;
    });
  };

  // Zoom controls
  const handleZoomChange = useCallback((newZoom: number) => {
    if (engineRef.current?.setZoomLevel) {
      engineRef.current.setZoomLevel(newZoom);
    } else if (engineRef.current) {
      // Fallback for engines without setZoomLevel
      const currentZoom = engineRef.current.getZoomLevel?.() || 1;
      const zoomDiff = newZoom / currentZoom;
      
      if (zoomDiff > 1) {
        // Zoom in
        for (let i = 0; i < Math.ceil(Math.log(zoomDiff) / Math.log(1.2)); i++) {
          engineRef.current.zoomIn?.();
        }
      } else if (zoomDiff < 1) {
        // Zoom out
        for (let i = 0; i < Math.ceil(Math.log(1/zoomDiff) / Math.log(1.2)); i++) {
          engineRef.current.zoomOut?.();
        }
      }
    }
    setZoomLevel(newZoom);
  }, []);



  const handleResetZoom = () => {
    if (engineRef.current?.resetZoomAndPan) {
      engineRef.current.resetZoomAndPan();
      setZoomLevel(1.5); // Reset to default 150%
    }
  };

  // Movement controls for virtual buttons
  const handleDirectionPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    const directionMap = {
      up: { dx: 0, dy: -1 },
      down: { dx: 0, dy: 1 },
      left: { dx: -1, dy: 0 },
      right: { dx: 1, dy: 0 }
    };
    
    const { dx, dy } = directionMap[direction];
    if (engineRef.current?.movePlayer) {
      engineRef.current.movePlayer(dx, dy);
    }
  };

  const handleDirectionRelease = () => {
    // For now, we don't need to handle release since we're doing discrete movements
    // In the future, this could be used for continuous movement
  };

  // Update zoom level periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (engineRef.current?.getZoomLevel) {
        const currentZoom = engineRef.current.getZoomLevel() || 1;
        setZoomLevel(currentZoom);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Add pinch-to-zoom support for tablets
  useEffect(() => {
    if (deviceType !== 'tablet' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let initialDistance = 0;
    let initialZoom = 1;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.sqrt(
          Math.pow(touch1.clientX - touch2.clientX, 2) + 
          Math.pow(touch1.clientY - touch2.clientY, 2)
        );
        initialZoom = zoomLevel;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch1.clientX - touch2.clientX, 2) + 
          Math.pow(touch1.clientY - touch2.clientY, 2)
        );
        
        if (initialDistance > 0) {
          const scale = currentDistance / initialDistance;
          const newZoom = Math.max(0.5, Math.min(3, initialZoom * scale));
          handleZoomChange(newZoom);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDistance = 0;
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [deviceType, zoomLevel, handleZoomChange]);

  useEffect(() => {
    // console.log("MetaverseSpace useEffect running - spaceId:", spaceId, "loading:", isLoading);
    // console.log("Dependencies changed:", { space: space.id, userId, username, mapFile, spaceId });
    let mounted = true;  // Add mounted flag for cleanup

    async function init() {
      // const initStartTime = Date.now();
      // console.log("Starting initialization at:", initStartTime);
      
      // Add timeout for initialization
      const initTimeout = setTimeout(() => {
        // console.error("Initialization timeout after 10 seconds");
        if (mounted) {
          setError("Loading timeout - please refresh the page");
          setIsLoading(false);
        }
      }, 10000);
      
      try {
        if (!canvasRef.current || !mounted || !spaceId) {
          // console.log("No canvasRef.current, component unmounted, or invalid spaceId");
          clearTimeout(initTimeout);
          return;
        }

        // Check if we've already initialized this space
        if (lastInitializedSpaceId === spaceId && engineRef.current) {
          // console.log("Space already initialized, skipping re-initialization");
          clearTimeout(initTimeout);
          setIsLoading(false);
          return;
        }

        // If spaceId changed, clean up previous engine
        if (lastInitializedSpaceId && lastInitializedSpaceId !== spaceId && engineRef.current) {
          // console.log("Different space detected, cleaning up previous engine");
          engineRef.current.destroy();
          engineRef.current = null;
        }

        // console.log("Step A: Ready for PIXI initialization");

        // Create PIXI Application
        // console.log("Step B: Importing PIXI Application");
        const { Application } = await import('pixi.js');
        // console.log("Step C: Creating PIXI Application instance");
        const app = new Application();
        
        // Initialize with canvas
        // console.log("Step D: Initializing PIXI Application with canvas");
        // console.log("Canvas element:", canvasRef.current);
        // console.log("Canvas parent:", canvasRef.current?.parentElement);
        
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
          // console.log("Step E: PIXI Application initialized successfully");
        } catch {
          // console.warn("WebGL init failed, trying without preferences:", initError);
          // Try without specific preferences (let PIXI choose)
          await app.init({
            width: 1024,
            height: 768,
            backgroundAlpha: 0,
            resolution: 1, // Use fixed resolution
            autoDensity: false, // Disable auto density
            view: canvasRef.current
          });
          // console.log("Step E: PIXI Application initialized with fallback settings");
        }

        // console.log("Trying to load mapFile", mapFile);
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
          
          // console.log("Loading tilemap from", `/map/${mapFile}`);
          try {
            // console.log("Step F: About to call engine.loadTilemap");
            await engine.loadTilemap(`/map/${mapFile}`);
            // console.log("Step G: Tilemap loaded successfully");
          } catch (tilemapError) {
            // console.error("Step G FAILED - Failed to load tilemap:", tilemapError);
            throw new Error(`Failed to load tilemap: ${tilemapError instanceof Error ? tilemapError.message : 'Unknown error'}`);
          }
          
          // Initialize WebSocket connection after map loads
          // console.log("Initializing WebSocket connection");
          engine.init(spaceId);
          // console.log("WebSocket connection initialized");
          
          // Set up chat message handler
          if (engineRef.current.setupChatHandler) {
            engineRef.current.setupChatHandler(handleChatMessage);
          }

          if (!mounted) {
            engine.destroy();
            return;
          }

          // console.log("TilemapSpaceEngine initialized and map loaded");
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
          
          // console.log("PixiSpaceEngine initialized and elements added");
        }
        if (mounted) {
          // console.log("Setting isLoading to false - engine initialized successfully");
          // console.log("Total initialization time:", Date.now() - initStartTime, "ms");
          clearTimeout(initTimeout);
          setLastInitializedSpaceId(spaceId);
          setIsLoading(false);
        } else {
          // console.log("Component unmounted, not setting isLoading to false");
          clearTimeout(initTimeout);
        }
      } catch (err) {
        // console.error("Error in MetaverseSpace init:", err);
        if (mounted) {
          // console.log("Setting error and isLoading to false due to error");
          // console.log("Failed initialization time:", Date.now() - initStartTime, "ms");
          clearTimeout(initTimeout);
          setError(err instanceof Error ? err.message : 'Failed to initialize space');
          setIsLoading(false);
        } else {
          // console.log("Component unmounted during error, not setting states");
          clearTimeout(initTimeout);
        }
      }
    }

    init();

    // Cleanup function
    return () => {
      // console.log("MetaverseSpace cleanup function called - spaceId:", spaceId);
      mounted = false;  // Set mounted to false
      if (engineRef.current) {
        // console.log("Cleaning up engine");
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
        {deviceType === 'mobile' ? (
          <div className="w-full h-full flex flex-col">
            {/* Mobile Notice Banner */}
            <div className="bg-purple-600/90 backdrop-blur-sm text-white p-4 shadow-lg">
              <div className="max-w-lg mx-auto text-center">
                <p className="font-inter text-sm">
                  <span className="font-semibold">Mobile View Limited:</span>
                  {" "}Virtual space is optimized for desktop/tablet, but you can still chat!
                </p>
              </div>
            </div>
            
            {/* Chat Container - Takes up full height */}
            <div className="flex-1 bg-black/60 backdrop-blur-sm">
              <ModernChatSidebar
                onSendMessage={handleSendMessage}
                messages={chatMessages}
                currentUsername={username}
                isMobile={true}
              />
            </div>
          </div>
        ) : (
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
                imageRendering: 'pixelated'
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

            {/* Horizontal Zoom Control - Bottom Right */}
            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-white/20 min-w-[200px]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-300 min-w-[35px]">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs border border-white/20 transition-colors"
                  title="Reset zoom to 150%"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Virtual Controls for Tablet */}
            {deviceType === 'tablet' && (
              <VirtualControls
                onDirectionPress={handleDirectionPress}
                onDirectionRelease={handleDirectionRelease}
              />
            )}
          </div>
        )}
      </div>

      {/* Chat Sidebar - Only show on non-mobile */}
      {deviceType !== 'mobile' && (
        <div className={`relative transition-all duration-300 ${deviceType === 'tablet' && isChatCollapsed ? 'w-12' : 'w-96'}`}>
          {deviceType === 'tablet' && (
            <button
              onClick={() => setIsChatCollapsed(!isChatCollapsed)}
              className="absolute top-4 -left-3 z-10 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full border border-white/20 hover:bg-black/80 transition-colors"
              title={isChatCollapsed ? 'Expand Chat' : 'Collapse Chat'}
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isChatCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {!isChatCollapsed && (
            <ModernChatSidebar
              onSendMessage={handleSendMessage}
              messages={chatMessages}
              currentUsername={username}
              isMobile={false}
            />
          )}
        </div>
      )}
    </div>
  );
} 