// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { TilemapSpaceEngine } from '../lib/metaverse/TilemapSpaceEngine';
// import { CollisionData } from '../lib/metaverse/TilemapRenderer';

// export default function TilemapTest() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const engineRef = useRef<TilemapSpaceEngine | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [collisionData, setCollisionData] = useState<CollisionData[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const initEngine = async () => {
//       try {
//         // Initialize the TilemapSpaceEngine
//         engineRef.current = new TilemapSpaceEngine(
//           canvas,
//           'test-space',
//           'test-user',
//           'TestUser'
//         );

//         // Load the meadow map
//         await engineRef.current.loadTilemap('/map/meadow/map1.tmj');
        
//         // Get collision data for debugging
//         const collisionInfo = engineRef.current.getCollisionData();
//         setCollisionData(collisionInfo);
//         console.log('Collision data:', collisionInfo);

//         setIsLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to initialize tilemap');
//         setIsLoading(false);
//       }
//     };

//     initEngine();

//     // Cleanup function
//     return () => {
//       if (engineRef.current) {
//         engineRef.current.destroy();
//         engineRef.current = null;
//       }
//     };
//   }, []);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Tilemap</h2>
//           <p className="text-gray-600">{error}</p>
//           <div className="mt-4 p-4 bg-gray-200 rounded text-left text-sm">
//             <h3 className="font-bold mb-2">Debug Info:</h3>
//             <p>Make sure the map files are accessible at:</p>
//             <ul className="list-disc list-inside mt-2">
//               <li>/map/meadow/map1.tmj</li>
//               <li>/map/meadow/TX Tileset Grass.tsx</li>
//               <li>/map/meadow/TX Props.tsx</li>
//               <li>/map/meadow/TX Tileset Wall.tsx</li>
//               <li>/map/meadow/Texture/ (all PNG files)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading tilemap...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-screen">
//       <canvas
//         ref={canvasRef}
//         className="w-full h-full"
//         style={{ display: 'block' }}
//       />
      
//       {/* Controls overlay */}
//       <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
//         <h3 className="font-bold mb-2">Controls</h3>
//         <p className="text-sm">WASD or Arrow Keys to move</p>
//         <p className="text-sm">Collision detection is active</p>
//       </div>

//       {/* Debug info overlay */}
//       <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg max-w-sm">
//         <h3 className="font-bold mb-2">Debug Info</h3>
//         <p className="text-sm">Collision tiles: {collisionData.length}</p>
//         <p className="text-sm">Map loaded successfully!</p>
//         <div className="mt-2 text-xs">
//           <p>This is a test of the tilemap system using your meadow map.</p>
//           <p>The map includes collision detection for walls and props.</p>
//         </div>
//       </div>

//       {/* Map info overlay */}
//       <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
//         <h3 className="font-bold">Meadow Map</h3>
//         <p className="text-sm">32x24 tiles, 32px each</p>
//         <p className="text-sm">Total size: 1024x768 pixels</p>
//       </div>
//     </div>
//   );
// } 