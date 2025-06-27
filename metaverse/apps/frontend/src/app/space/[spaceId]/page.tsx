'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VirtualSpaceCanvas from '../../../../components/virtual-space-canvas';
import { Space } from '../../../lib/types';

export default function SpacePage() {
  const params = useParams();
  const spaceId = params.spaceId as string;
  const [token, setToken] = useState<string | null>(null);
  const [space, setSpace] = useState<Space | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSpace = async () => {
      try {
        // Get token from localStorage
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          console.log('Token found:', storedToken.substring(0, 20) + '...');
          setToken(storedToken);
        } else {
          console.log('No token found, proceeding in test mode');
          setToken('test-token');
        }

        // Fetch space details
        const headers: Record<string, string> = {};
        if (storedToken) {
          headers['Authorization'] = `Bearer ${storedToken}`;
        }
        
        const response = await fetch(`/api/v1/space/${spaceId}`, { headers });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to load space');
        }

        const spaceData = await response.json();
        setSpace(spaceData);
      } catch (err) {
        console.error('Space initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load space');
      } finally {
        setIsLoading(false);
      }
    };

    if (spaceId) {
      initializeSpace();
    }
  }, [spaceId]);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading space...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!token || !space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Invalid space or authentication</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{space.name}</h1>
            <p className="text-gray-400 text-sm">Space ID: {spaceId}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Exit Space
          </button>
        </div>
      </div>

      {/* Virtual Space Canvas */}
      <div className="flex-1 h-[calc(100vh-80px)]">
        <VirtualSpaceCanvas
          spaceId={spaceId}
          token={token}
          onError={handleError}
        />
      </div>
    </div>
  );
}
