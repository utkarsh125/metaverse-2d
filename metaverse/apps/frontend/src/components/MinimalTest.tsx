'use client';

import { useEffect, useState } from 'react';

export default function MinimalTest() {
  const [status, setStatus] = useState<string>('Testing imports...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testImports = async () => {
      try {
        setStatus('Testing PIXI import...');
        
        // Test PIXI import
        const PIXI = await import('pixi.js');
        console.log('PIXI imported successfully:', PIXI);
        
        setStatus('Testing Tilemap import...');
        
        // Test Tilemap import
        const { Tilemap } = await import('@pixi/tilemap');
        console.log('Tilemap imported successfully:', Tilemap);
        
        setStatus('Testing Tilemap instantiation...');
        
        // Test creating a Tilemap instance
        const tilemap = new Tilemap([]);
        console.log('Tilemap instance created:', tilemap);
        
        setStatus('All imports working!');
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Import test failed:', err);
      }
    };

    testImports();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Import Test Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-200 p-4 rounded text-left text-sm">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <p>This test checks if the required imports are working:</p>
            <ul className="list-disc list-inside mt-2">
              <li>pixi.js</li>
              <li>@pixi/tilemap</li>
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