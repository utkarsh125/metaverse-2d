'use client';

import { useEffect, useRef, useState } from 'react';
import { Space } from '../lib/types';
import type { PixiSpaceEngine } from '../lib/metaverse/PixiSpaceEngine';
import type { TilemapSpaceEngine } from '../lib/metaverse/TilemapSpaceEngine';

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

  // Get spaceId from props or fallback to URL
  const spaceId = space.id || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');

  useEffect(() => {
    console.log("MetaverseSpace useEffect running");
    let mounted = true;  // Add mounted flag for cleanup

    async function init() {
      try {
        if (!canvasRef.current || !mounted) {
          console.log("No canvasRef.current or component unmounted");
          return;
        }

        // Set initial canvas size
        canvasRef.current.width = 1024;
        canvasRef.current.height = 768;

        console.log("Trying to load mapFile", mapFile);
        if (mapFile) {
          // Use TilemapSpaceEngine for Tiled maps
          const { TilemapSpaceEngine } = await import('../lib/metaverse/TilemapSpaceEngine');
          
          if (!mounted) return;  // Check if still mounted after async import

          const engine = new TilemapSpaceEngine(
            canvasRef.current,
            space.id,
            userId,
            username
          );
          
          engineRef.current = engine;  // Set ref after successful initialization
          
          console.log("Loading tilemap from", `/map/${mapFile}`);
          await engine.loadTilemap(`/map/${mapFile}`);
          
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
  }, [space, userId, username, mapFile]);

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
    <div className="relative w-full h-screen font-poppins bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white flex items-center justify-between px-6 py-3 z-50 shadow-lg rounded-b-xl" style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">User: {username}</span>
          <span className="font-mono text-sm">Space ID: {spaceId}</span>
        </div>
        <a href="/dashboard" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition shadow">Exit Space</a>
      </nav>
      {/* Add top padding so canvas is not covered by navbar */}
      <div 
        className="pt-20 w-full h-full flex items-center justify-center"
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          minHeight: '768px',
          zIndex: 1  // Ensure container is above background
        }}
      >
        <canvas
          ref={canvasRef}
          width={1024}
          height={768}
          className="w-full h-full max-w-full max-h-full rounded-xl shadow-xl border border-gray-200"
          style={{ 
            display: 'block', 
            fontFamily: 'Poppins, sans-serif',
            position: 'relative',
            zIndex: 2,  // Ensure canvas is above container
            backgroundColor: '#f0f0f0'
          }}
        />
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl" style={{ zIndex: 3 }}>
            <div className="text-center bg-white bg-opacity-80 p-8 rounded-xl shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-black font-semibold">Loading space...</p>
            </div>
          </div>
        )}
        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 text-black p-4 rounded-xl shadow-lg border border-gray-200" style={{ zIndex: 3 }}>
          <h3 className="font-bold mb-2 text-base">Controls</h3>
          <p className="text-sm">WASD or Arrow Keys to move</p>
        </div>
      </div>
    </div>
  );
} 