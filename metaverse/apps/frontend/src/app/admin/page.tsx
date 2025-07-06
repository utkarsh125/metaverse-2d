'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { CollisionZone } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Element {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  static: boolean;
  collisionZone?: CollisionZone;
}

interface Map {
  id: string;
  name: string;
  thumbnail: string | null;
  dimensions: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Element creation form
  const [elementForm, setElementForm] = useState({
    imageUrl: '',
    width: 64,
    height: 64,
    static: true,
    collisionZone: 'full' as CollisionZone
  });

  // Map creation form
  const [mapForm, setMapForm] = useState({
    name: '',
    thumbnail: '',
    dimensions: '1024x768',
    defaultElements: [] as Array<{ elementId: string; x: number; y: number }>
  });

  // Map element placement
  const [selectedElement, setSelectedElement] = useState<string>('');
  const [elementX, setElementX] = useState(0);
  const [elementY, setElementY] = useState(0);

  const collisionZoneOptions: { value: CollisionZone; label: string; description: string }[] = [
    { value: 'none', label: 'None', description: 'Fully walkable' },
    { value: 'full', label: 'Full', description: 'Fully blocked' },
    { value: 'top', label: 'Top Half', description: 'Blocked on top half' },
    { value: 'bottom', label: 'Bottom Half', description: 'Blocked on bottom half' },
    { value: 'left', label: 'Left Half', description: 'Blocked on left half' },
    { value: 'right', label: 'Right Half', description: 'Blocked on right half' },
    { value: 'center', label: 'Center', description: 'Blocked in center' },
    { value: 'corners', label: 'Corners', description: 'Blocked in corners' },
    { value: 'custom', label: 'Custom', description: 'Custom collision pattern' }
  ];

  const fetchElements = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/elements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setElements(data.elements);
      }
    } catch {
      console.error('Failed to fetch elements');
    }
  }, [token]);

  const fetchMaps = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/maps', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMaps(data.maps);
      }
    } catch {
      console.error('Failed to fetch maps');
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      fetchElements();
      fetchMaps();
    }
  }, [token, fetchElements, fetchMaps]);

  const createElement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/element', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(elementForm)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Element created:', data);
        setElementForm({ imageUrl: '', width: 64, height: 64, static: true, collisionZone: 'full' });
        fetchElements();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create element');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const createMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/v1/admin/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mapForm)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Map created:', data);
        setMapForm({
          name: '',
          thumbnail: '',
          dimensions: '1024x768',
          defaultElements: []
        });
        fetchMaps();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create map');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const addElementToMap = () => {
    if (!selectedElement) return;
    
    setMapForm(prev => ({
      ...prev,
      defaultElements: [
        ...prev.defaultElements,
        { elementId: selectedElement, x: elementX, y: elementY }
      ]
    }));
    
    setSelectedElement('');
    setElementX(0);
    setElementY(0);
  };

  const removeElementFromMap = (index: number) => {
    setMapForm(prev => ({
      ...prev,
      defaultElements: prev.defaultElements.filter((_, i) => i !== index)
    }));
  };

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Element Creation */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Element</h2>
            <form onSubmit={createElement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={elementForm.imageUrl}
                  onChange={(e) => setElementForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <input
                    type="number"
                    value={elementForm.width}
                    onChange={(e) => setElementForm(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <input
                    type="number"
                    value={elementForm.height}
                    onChange={(e) => setElementForm(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={elementForm.static}
                  onChange={(e) => setElementForm(prev => ({ ...prev, static: e.target.checked }))}
                  className="mr-2"
                />
                <label className="text-sm">Static (immovable)</label>
              </div>
              
              <div className="flex items-center">
                <label className="block text-sm font-medium mb-2 mr-2">Collision Zone</label>
                <select
                  value={elementForm.collisionZone}
                  onChange={(e) => setElementForm(prev => ({ ...prev, collisionZone: e.target.value as CollisionZone }))}
                  className="p-2 bg-gray-700 rounded border border-gray-600"
                >
                  {collisionZoneOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 p-2 rounded font-medium"
              >
                {loading ? 'Creating...' : 'Create Element'}
              </button>
            </form>
          </div>

          {/* Map Creation */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Map</h2>
            <form onSubmit={createMap} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Map Name</label>
                <input
                  type="text"
                  value={mapForm.name}
                  onChange={(e) => setMapForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={mapForm.thumbnail}
                  onChange={(e) => setMapForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Dimensions (e.g., 1024x768)</label>
                <input
                  type="text"
                  value={mapForm.dimensions}
                  onChange={(e) => setMapForm(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  pattern="^[0-9]{1,4}x[0-9]{1,4}$"
                  required
                />
              </div>

              {/* Add Elements to Map */}
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-lg font-medium mb-3">Add Default Elements</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <select
                    value={selectedElement}
                    onChange={(e) => setSelectedElement(e.target.value)}
                    className="p-2 bg-gray-700 rounded border border-gray-600"
                  >
                    <option value="">Select Element</option>
                    {elements.map(element => (
                      <option key={element.id} value={element.id}>
                        {element.imageUrl.split('/').pop() || element.id}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="number"
                    placeholder="X"
                    value={elementX}
                    onChange={(e) => setElementX(parseInt(e.target.value) || 0)}
                    className="p-2 bg-gray-700 rounded border border-gray-600"
                  />
                  
                  <input
                    type="number"
                    placeholder="Y"
                    value={elementY}
                    onChange={(e) => setElementY(parseInt(e.target.value) || 0)}
                    className="p-2 bg-gray-700 rounded border border-gray-600"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={addElementToMap}
                  disabled={!selectedElement}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-2 rounded font-medium mb-3"
                >
                  Add Element to Map
                </button>

                {/* Show added elements */}
                {mapForm.defaultElements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Added Elements:</h4>
                    {mapForm.defaultElements.map((elem, index) => {
                      const element = elements.find(e => e.id === elem.elementId);
                      return (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                          <span>{element?.imageUrl.split('/').pop() || elem.elementId} at ({elem.x}, {elem.y})</span>
                          <button
                            type="button"
                            onClick={() => removeElementFromMap(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || mapForm.defaultElements.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 p-2 rounded font-medium"
              >
                {loading ? 'Creating...' : 'Create Map'}
              </button>
            </form>
          </div>
        </div>

        {/* Display Existing Elements and Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Existing Elements ({elements.length})</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {elements.map(element => (
                <div key={element.id} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                  <div>
                    <div className="font-medium">{element.imageUrl.split('/').pop() || element.id}</div>
                    <div className="text-sm text-gray-400">
                      {element.width}x{element.height} • {element.static ? 'Static' : 'Dynamic'}
                    </div>
                  </div>
                  <div className="relative w-8 h-8">
                    <Image 
                      src={element.imageUrl} 
                      alt="Element" 
                      fill
                      className="object-cover rounded"
                      sizes="32px"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Existing Maps ({maps.length})</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {maps.map(map => (
                <div key={map.id} className="bg-gray-700 p-3 rounded">
                  <div className="font-medium">{map.name}</div>
                  <div className="text-sm text-gray-400">
                    {map.dimensions} • {map.thumbnail ? 'Has thumbnail' : 'No thumbnail'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}