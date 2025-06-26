// frontend/src/app/dashboard/page.tsx
'use client';

import type { Avatar, MapTheme, Space } from '@/lib/types';
import React, { useEffect, useState } from 'react';

import { API } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  // fetched data
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [maps, setMaps]       = useState<MapTheme[]>([]);
  const [spaces, setSpaces]   = useState<Space[]>([]);

  // onboarding step (1 = avatar, 2 = map + name)
  const [step, setStep] = useState<1 | 2>(1);

  // user selections
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [selectedMap, setSelectedMap]       = useState<string>('');
  const [spaceName, setSpaceName]           = useState<string>('');

  // derived flags
  const [hasAvatar, setHasAvatar] = useState(false);
  const [hasSpaces, setHasSpaces] = useState(false);

  // control
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // fetch spaces helper
  const fetchSpaces = async () => {
    try {
      const res = await API.get<{ spaces: Space[] }>('/api/v1/space/all');
      setSpaces(res.data.spaces);
      setHasSpaces(res.data.spaces.length > 0);
    } catch (err) {
      console.error('Could not load spaces', err);
    }
  };

  // initial data & profile fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    API.get<{ avatarId: string | null }>('/api/v1/user/metadata')
       .then(res => setHasAvatar(!!res.data.avatarId))
       .catch(console.error);

    API.get<{ avatars: Avatar[] }>('/api/v1/avatars')
       .then(res => setAvatars(res.data.avatars))
       .catch(console.error);

    API.get<{ maps: MapTheme[] }>('/api/v1/maps')
       .then(res => setMaps(res.data.maps))
       .catch(console.error);

    fetchSpaces();
  }, [router]);

  // determine onboarding state
  useEffect(() => {
    if (hasAvatar && hasSpaces) {
      setOnboarded(true);
    } else if (hasAvatar) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [hasAvatar, hasSpaces]);

  // save selected avatar
  const saveAvatar = async () => {
    if (!selectedAvatar || loading) return;
    setLoading(true);
    setError(null);
    try {
      await API.post('/api/v1/user/metadata', { avatarId: selectedAvatar });
      setHasAvatar(true);
    } catch (e: any) {
      setError(e.response?.status === 400 ? 'Invalid avatar' : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // create a new space (guard against double-click, reload spaces & close modal)
  const createSpace = async () => {
    if (!selectedMap || !spaceName.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const mapObj = maps.find(m => m.id === selectedMap)!;
      await API.post('/api/v1/space', {
        name:       spaceName.trim(),
        mapId:      selectedMap,
        dimensions: mapObj.dimensions,
      });
      await fetchSpaces();
      setOnboarded(true);
    } catch (e: any) {
      console.error('CreateSpace error:', e.response?.data);
      setError(e.response?.data?.message || 'Failed to create space');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Onboarding Modal */}
      {!onboarded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 rounded p-6 w-full max-w-lg">

            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Select Your Avatar</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {avatars.map(a => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAvatar(a.id)}
                      className={`cursor-pointer p-2 border-2 rounded ${
                        selectedAvatar === a.id
                          ? 'border-green-400'
                          : 'border-transparent hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={a.imageUrl}
                        alt={a.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="mt-2 text-center">{a.name}</p>
                    </div>
                  ))}
                </div>
                {error && <p className="mb-2 text-red-500">{error}</p>}
                <button
                  onClick={saveAvatar}
                  disabled={!selectedAvatar || loading}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                >
                  {loading ? 'Saving…' : 'Save Avatar'}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Create a Space</h2>
                <label className="block mb-4">
                  <span className="block mb-1">Space Name</span>
                  <input
                    type="text"
                    value={spaceName}
                    onChange={e => setSpaceName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                    placeholder="Enter space name"
                  />
                </label>
                <h3 className="text-xl font-semibold mb-2">Choose a Map</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {maps.map(m => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMap(m.id)}
                      className={`cursor-pointer p-2 border-2 rounded ${
                        selectedMap === m.id
                          ? 'border-blue-400'
                          : 'border-transparent hover:border-gray-600'
                      } bg-gray-700`}
                    >
                      {m.thumbnail ? (
                        <img
                          src={m.thumbnail}
                          alt={m.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-600 rounded mb-2 flex items-center justify-center">
                          No Preview
                        </div>
                      )}
                      <p className="text-center">{m.name}</p>
                      <p className="text-sm text-gray-400">{m.dimensions}</p>
                    </div>
                  ))}
                </div>
                {error && <p className="mb-2 text-red-500">{error}</p>}
                <button
                  onClick={createSpace}
                  disabled={!spaceName.trim() || !selectedMap || loading}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                >
                  {loading ? 'Creating…' : 'Create Space'}
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {onboarded && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Spaces</h1>
            <button
              onClick={() => {
                setOnboarded(false);
                setStep(2);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Create New Space
            </button>
          </div>

          {spaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {spaces.map(s => (
                <div
                  key={s.id}
                  onClick={() => router.push(`/space/${s.id}`)}
                  className="cursor-pointer bg-gray-800 p-4 rounded hover:bg-gray-700"
                >
                  {s.thumbnail ? (
                    <img
                      src={s.thumbnail}
                      alt={s.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center text-gray-500">
                      No Thumbnail
                    </div>
                  )}
                  <h2 className="text-xl">{s.name}</h2>
                  <p className="text-sm text-gray-400">{s.dimensions}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No spaces found. Create one to get started.</p>
          )}
        </>
      )}
    </div>
  );
}
