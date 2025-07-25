
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MetaverseSpace from '../../../components/MetaverseSpace';
import { Space, User } from '../../../lib/types';
import Link from 'next/link';
import { useToast } from '../../../components/ToastContainer';

export default function SpacePage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccess } = useToast();
  const spaceId = params.spaceId as string;
  
  const [space, setSpace] = useState<Space | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is authenticated
      const token = sessionStorage.getItem('token');
      if (!token) {
        // No token found, redirect to signin
        router.push('/signin');
        return;
      }

      try {
        // Fetch current user
        const userResponse = await fetch('/api/v1/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) {
          // Authentication failed, remove invalid token and redirect
          if (userResponse.status === 401 || userResponse.status === 403) {
            sessionStorage.removeItem('token');
            router.push('/signin');
            return;
          }
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setCurrentUser(userData);

        // Fetch space data
        const spaceResponse = await fetch(`/api/v1/space/${spaceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!spaceResponse.ok) {
          // Authentication failed for space access
          if (spaceResponse.status === 401 || spaceResponse.status === 403) {
            sessionStorage.removeItem('token');
            router.push('/signin');
            return;
          }
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
  }, [spaceId, router]);

  // Handle mobile menu closing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/signin');
  };

  const handleCopySpaceId = async () => {
    try {
      await navigator.clipboard.writeText(spaceId);
      showSuccess('Space ID Copied', `Space ID "${spaceId}" has been copied to your clipboard. Share this with friends to invite them!`);
    } catch (err) {
      console.error('Failed to copy space ID:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = spaceId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showSuccess('Space ID Copied', `Space ID "${spaceId}" has been copied to your clipboard. Share this with friends to invite them!`);
    }
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
        {/* Loading Content */}
        <div className="relative z-20 text-center">
          <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Loading Space
            </h2>
            <p className="text-gray-400 text-lg">Preparing your virtual world...</p>
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
        {/* Error Content */}
        <div className="relative z-20 text-center">
          <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-red-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Error
            </h2>
            <p className="text-gray-400 text-lg mb-8">{error || 'Space or user data not found'}</p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Space Info */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
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
                <span className="font-pixelify font-bold text-white text-sm sm:text-base lg:text-lg">
                  orbitone.cloud
                </span>
              </Link>
              
              <div className="h-4 sm:h-6 w-px bg-white/30 hidden sm:block"></div>
              
              <div className="min-w-0 flex-1">
                <h1 className="font-pixelify text-sm sm:text-base lg:text-lg font-bold text-white truncate">
                  {space.name}
                </h1>
                <p className="font-inter text-xs text-gray-300 truncate hidden sm:block">
                  Welcome, {currentUser.username}
                </p>
              </div>
            </div>
            
            {/* Action Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleCopySpaceId}
                className="font-inter font-semibold bg-purple-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-purple-600/80 transition-all duration-200 border border-purple-400/30 text-sm flex items-center gap-2"
                title="Copy Space ID to invite friends"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy ID
              </button>
              <Link
                href="/dashboard"
                className="font-inter font-semibold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30 text-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-inter font-semibold bg-gradient-to-r from-gray-100 to-gray-200 hover:cursor-pointer text-black px-4 py-2 rounded-full shadow-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 text-sm"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <div className="relative mobile-menu-container">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40 rounded-md"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {mobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="font-inter text-xs text-gray-300">
                          {currentUser.username}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleCopySpaceId();
                        }}
                        className="block w-full text-left font-inter font-medium text-white hover:bg-white/10 px-4 py-3 transition-colors duration-200 text-sm flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Space ID
                      </button>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-inter font-medium text-white hover:bg-white/10 px-4 py-3 transition-colors duration-200 text-sm"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left font-inter font-medium text-white hover:bg-white/10 px-4 py-3 transition-colors duration-200 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
