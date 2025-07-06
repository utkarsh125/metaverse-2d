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
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
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

  // Update connected users list
  useEffect(() => {
    const interval = setInterval(() => {
      if (engineRef.current) {
        const users = engineRef.current.getUsers();
        setConnectedUsers(users);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!spaceId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Space</h2>
          <p className="text-gray-600">No space ID provided</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Space</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-mono">
      {/* Modern Top Navigation */}
      <nav className="fixed top-0 left-0 right-96 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 text-white px-6 py-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-lg font-bold text-white">{username}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                Space: {spaceId}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                {connectedUsers.length} Online
              </span>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
            </svg>
            Exit Space
          </button>
        </div>
      </nav>

      {/* Main Content Area with Static Chat */}
      <div className="flex h-screen pt-16">
        {/* Game Canvas Area */}
        <div className="flex-1 relative bg-slate-800 border-r border-slate-700">
          <div 
            className="w-full h-full flex items-center justify-center p-4"
            style={{ 
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full max-w-full max-h-full rounded-lg shadow-2xl border border-slate-600"
              style={{ 
                display: 'block', 
                backgroundColor: '#1e293b'
              }}
            />
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-4 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="text-center bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-600">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-white font-semibold">Loading space...</p>
                </div>
              </div>
            )}
            
            {/* Modern Controls overlay */}
            <div className="absolute bottom-6 left-6 bg-slate-800/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-slate-600">
              <h3 className="font-bold mb-2 text-sm text-blue-400">CONTROLS</h3>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">WASD</kbd>
                <span>or</span>
                <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">↑↓←→</kbd>
                <span>to move</span>
              </div>
            </div>
          </div>
        </div>

        {/* Static Chat Sidebar */}
        <ModernChatSidebar
          onSendMessage={handleSendMessage}
          messages={chatMessages}
          currentUsername={username}
        />
      </div>
    </div>
  );
} 