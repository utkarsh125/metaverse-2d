
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MetaverseSpace from '../../../components/MetaverseSpace';
import { Space, User } from '../../../lib/types';

export default function SpacePage() {
  console.log("Control Reached SpacePage")
  const params = useParams();
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
        const spaceResponse = await fetch(`/api/v1/space/${spaceId}`);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading space...</p>
        </div>
      </div>
    );
  }

  if (error || !space || !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Space or user data not found'}</p>
          <a 
            href="/dashboard" 
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <MetaverseSpace
      space={space}
      userId={currentUser.id}
      username={currentUser.username}
      mapFile={space.map?.tiledMapFile || null}
    />
  );
}
