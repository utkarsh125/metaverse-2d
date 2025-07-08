
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MetaverseSpace from '../../../components/MetaverseSpace';
import { Space, User } from '../../../lib/types';
import Link from 'next/link';

export default function SpacePage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params.spaceId as string;
  
  const [space, setSpace] = useState<Space | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userResponse = await fetch('/api/v1/user/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setCurrentUser(userData);

        // Fetch space data
        const spaceResponse = await fetch(`/api/v1/space/${spaceId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!spaceResponse.ok) {
          throw new Error('Failed to fetch space data');
        }
        const spaceData = await spaceResponse.json();
        setSpace(spaceData);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    if (spaceId) {
      fetchData();
    }
  }, [spaceId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/bg-2k.png"
          alt="Metaverse background"
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
          draggable={false}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Content */}
        <div className="relative z-20 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-6"></div>
            <h2 className="font-pixelify text-xl font-bold text-gray-900 mb-2">Loading Space</h2>
            <p className="font-inter text-gray-600">Preparing your virtual world...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !space || !currentUser) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/bg-2k.png"
          alt="Metaverse background"
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
          draggable={false}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Content */}
        <div className="relative z-20 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="font-pixelify text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="font-inter text-gray-600 mb-6">{error || 'Space or user data not found'}</p>
            <div className="flex gap-3 justify-center">
              <Link 
                href="/dashboard" 
                className="font-inter font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-inter font-semibold bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function getTiledMapFile(map: Space['map']): string | null {
    if (map && typeof map === 'object' && 'tiledMapFile' in map && typeof (map as { tiledMapFile?: string }).tiledMapFile === 'string') {
      return (map as { tiledMapFile: string }).tiledMapFile;
    }
    return null;
  }

  // Add a debug log for the space and mapFile
  console.log('Rendering MetaverseSpace with:', { space, map: space.map, mapFile: getTiledMapFile(space.map) });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/bg-2k.png"
        alt="Metaverse background"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
        draggable={false}
      />
      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-sm border-b border-white/20">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Space Info */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_104_157)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM100 143.75C124.162 143.75 143.75 124.162 143.75 100C143.75 75.8375 124.162 56.25 100 56.25C75.8375 56.25 56.25 75.8375 56.25 100C56.25 124.162 75.8375 143.75 100 143.75Z"
                    fill="url(#paint0_linear_104_157)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_104_157"
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="200"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CFFFE2" />
                    <stop offset="1" stopColor="#F6F6F6" />
                  </linearGradient>
                  <clipPath id="clip0_104_157">
                    <rect width="200" height="200" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-raleway font-bold text-white text-lg">orbit.space</span>
            </Link>
            <div className="h-6 w-px bg-white/30"></div>
            <div>
              <h1 className="font-pixelify text-lg font-bold text-white">{space.name}</h1>
              <p className="font-inter text-xs text-gray-300">Welcome, {currentUser.username}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="font-inter font-semibold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="font-inter font-semibold bg-gradient-to-r from-gray-100 to-gray-200 hover:cursor-pointer text-black px-4 py-2 rounded-full shadow-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 pt-20">
        <MetaverseSpace
          space={space}
          userId={currentUser.id}
          username={currentUser.username}
          mapFile={getTiledMapFile(space.map) || 'meadow/map1.tmj'}
        />
      </div>
    </div>
  );
}
