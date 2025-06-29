'use client';

import { useEffect, useState } from 'react';

export default function SimpleTilemapTest() {
  const [status, setStatus] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testMapLoading = async () => {
      try {
        setStatus('Testing map file access...');
        
        // Test 1: Check if map file is accessible
        const mapResponse = await fetch('/map/meadow/map1.tmj');
        if (!mapResponse.ok) {
          throw new Error(`Map file not accessible: ${mapResponse.status} ${mapResponse.statusText}`);
        }
        
        setStatus('Loading map data...');
        const mapData = await mapResponse.json();
        console.log('Map data loaded:', mapData);
        
        setStatus('Testing tileset files...');
        
        // Test 2: Check tileset files
        const tilesetFiles = [
          'TX Tileset Grass.tsx',
          'TX Props.tsx',
          'TX Tileset Wall.tsx',
          'TX Struct.tsx',
          'TX Tileset Stone Ground.tsx',
          'TX Plant with Shadow.tsx'
        ];
        
        for (const tilesetFile of tilesetFiles) {
          const encodedFile = encodeURIComponent(tilesetFile);
          const tilesetResponse = await fetch(`/map/meadow/${encodedFile}`);
          if (!tilesetResponse.ok) {
            throw new Error(`Tileset file not accessible: ${tilesetFile} - ${tilesetResponse.status} ${tilesetResponse.statusText}`);
          }
          console.log(`Tileset ${tilesetFile} is accessible`);
        }
        
        setStatus('Testing texture files...');
        
        // Test 3: Check texture files
        const textureFiles = [
          'TX Tileset Grass.png',
          'TX Props.png',
          'TX Tileset Wall.png',
          'TX Struct.png',
          'TX Tileset Stone Ground.png',
          'TX Plant with Shadow.png'
        ];
        
        for (const textureFile of textureFiles) {
          const encodedFile = encodeURIComponent(textureFile);
          const textureResponse = await fetch(`/map/meadow/Texture/${encodedFile}`);
          if (!textureResponse.ok) {
            throw new Error(`Texture file not accessible: ${textureFile} - ${textureResponse.status} ${textureResponse.statusText}`);
          }
          console.log(`Texture ${textureFile} is accessible`);
        }
        
        setStatus('All files accessible! Map should load properly.');
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Test failed:', err);
      }
    };

    testMapLoading();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Tilemap Test Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-200 p-4 rounded text-left text-sm">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <p>This test checks if all required files are accessible:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Map file: /map/meadow/map1.tmj</li>
              <li>Tileset files: TX Tileset Grass.tsx, TX Props.tsx, etc.</li>
              <li>Texture files: TX Tileset Grass.png, TX Props.png, etc.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{status}</p>
        <p className="text-sm text-gray-500 mt-2">Check browser console for detailed logs</p>
      </div>
    </div>
  );
} 