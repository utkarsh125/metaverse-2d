'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SpaceTestPage() {
  const [spaceId, setSpaceId] = useState('');
  const router = useRouter();

  const handleJoinSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (spaceId.trim()) {
      router.push(`/space/${spaceId.trim()}`);
    }
  };

  const handleCreateSpace = () => {
    // Generate a random space ID for testing
    const randomSpaceId = Math.random().toString(36).substring(2, 10);
    router.push(`/space/${randomSpaceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Join a Space
        </h1>
        
        <form onSubmit={handleJoinSpace} className="space-y-6">
          <div>
            <label htmlFor="spaceId" className="block text-sm font-medium text-gray-700 mb-2">
              Space ID
            </label>
            <input
              type="text"
              id="spaceId"
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              placeholder="Enter space ID (e.g., abc123)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Join Space
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">Or</p>
          <button
            onClick={handleCreateSpace}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Create New Space
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter a space ID to join an existing space</li>
            <li>• Click &quot;Create New Space&quot; to generate a random space</li>
            <li>• Share the URL with others to join the same space</li>
            <li>• Each space is isolated from others</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 