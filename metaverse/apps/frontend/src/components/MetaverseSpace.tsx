'use client';

import { useEffect, useRef, useState } from 'react';
import { PixiSpaceEngine } from '../lib/metaverse/PixiSpaceEngine';
import { Space, PixiElement } from '../lib/types';

interface MetaverseSpaceProps {
  space: Space;
  userId: string;
  username: string;
}

export default function MetaverseSpace({ space, userId, username }: MetaverseSpaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PixiSpaceEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // Initialize the PixiJS engine
      engineRef.current = new PixiSpaceEngine(
        canvasRef.current,
        space.id,
        userId,
        username
      );

      // Add space elements to the engine
      space.elements.forEach((spaceElement) => {
        const pixiElement: PixiElement = {
          id: spaceElement.id,
          x: spaceElement.x,
          y: spaceElement.y,
          width: spaceElement.element.width,
          height: spaceElement.element.height,
          imageUrl: spaceElement.element.imageUrl,
          static: spaceElement.element.static,
        };
        engineRef.current?.addElement(pixiElement);
      });

      // Set map background if available
      if (space.map?.thumbnail) {
        engineRef.current.setMapBackground(space.map.thumbnail);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize space');
      setIsLoading(false);
    }

    // Cleanup function
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [space, userId, username]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <h3 className="font-bold mb-2">Controls</h3>
        <p className="text-sm">WASD or Arrow Keys to move</p>
      </div>

      {/* Space info overlay */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <h3 className="font-bold">{space.name}</h3>
        <p className="text-sm">Created by {space.creator.username}</p>
      </div>
    </div>
  );
} 