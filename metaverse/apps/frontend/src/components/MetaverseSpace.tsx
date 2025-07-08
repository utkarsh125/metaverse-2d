'use client';

import { useEffect, useRef, useState } from 'react';
import { Space, ChatMessage } from '../lib/types';
import type { PixiSpaceEngine } from '../lib/metaverse/PixiSpaceEngine';
import type { TilemapSpaceEngine } from '../lib/metaverse/TilemapSpaceEngine';
import ModernChatSidebar from './ModernChatSidebar';

interface MetaverseSpaceProps {
  space: Space;
  userId: string;
  username: string;
  mapFile?: string | null;
}

export default function MetaverseSpace({ space, userId, username, mapFile }: MetaverseSpaceProps) {
  console.log("MetaverseSpace props", { space, userId, username, mapFile });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PixiSpaceEngine | TilemapSpaceEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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
      const engine = engineRef.current as { sendChatMessage?: (msg: string) => void };
      if (engine.sendChatMessage) {
        console.log('MetaverseSpace: Calling engine.sendChatMessage');
        engine.sendChatMessage(message);
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

  useEffect(() => {
    console.log("MetaverseSpace useEffect running");
    let mounted = true;  // Add mounted flag for cleanup

    async function init() {
      try {
        if (!canvasRef.current || !mounted || !spaceId) {
          console.log("No canvasRef.current, component unmounted, or invalid spaceId");
          return;
        }

        // Create PIXI Application
        const { Application } = await import('pixi.js');
        const app = new Application();
        
        // Initialize with canvas
        await app.init({
          width: 1024,
          height: 768,
          backgroundAlpha: 0,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          view: canvasRef.current
        });

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
          await engine.loadTilemap(`/map/${mapFile}`);
          
          // Initialize WebSocket connection after map loads
          engine.init(spaceId);
          
          // Set up chat message handler
          const tileEngine = engineRef.current as { setupChatHandler?: (handler: (message: ChatMessage) => void) => void };
          if (tileEngine.setupChatHandler) {
            tileEngine.setupChatHandler(handleChatMessage);
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
          const engine = engineRef.current as { setupChatHandler?: (handler: (message: ChatMessage) => void) => void };
          if (engine.setupChatHandler) {
            engine.setupChatHandler(handleChatMessage);
          }
          
          console.log("PixiSpaceEngine initialized and elements added");
        }
        if (mounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error in MetaverseSpace init:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize space');
          setIsLoading(false);
        }
      }
    }

    init();

    // Cleanup function
    return () => {
      mounted = false;  // Set mounted to false
      if (engineRef.current) {
        console.log("Cleaning up engine");
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [space, userId, username, mapFile, spaceId]);



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
              display: 'block'
            }}
          />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-4 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
                <p className="font-inter font-semibold text-gray-900">Loading space...</p>
              </div>
            </div>
          )}
          
          {/* Controls overlay */}
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-white/20">
            <h3 className="font-inter font-bold mb-2 text-sm">CONTROLS</h3>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">WASD</kbd>
              <span>or</span>
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">↑↓←→</kbd>
              <span>to move</span>
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