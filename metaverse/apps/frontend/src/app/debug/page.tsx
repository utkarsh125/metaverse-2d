'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export default function DebugPage() {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    
    if (storedToken) {
      try {
        // Decode the token without verification to see its structure
        const base64Url = storedToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        setDecodedToken(JSON.parse(jsonPayload));
      } catch {
        setError('Failed to decode token');
      }
    }
  }, []);

  const testTokenVerification = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/v1/space/test', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Token verification result:', data);
      alert(`Token verification: ${response.ok ? 'SUCCESS' : 'FAILED'}\n${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error('Token verification error:', err);
      alert('Token verification failed');
    }
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setDecodedToken(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Token</h2>
            {token ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Token:</label>
                  <textarea 
                    value={token} 
                    readOnly 
                    className="w-full h-32 bg-gray-700 p-3 rounded text-sm font-mono"
                  />
                </div>
                
                {decodedToken && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Decoded Token:</label>
                    <pre className="bg-gray-700 p-3 rounded text-sm overflow-auto">
                      {JSON.stringify(decodedToken, null, 2)}
                    </pre>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={testTokenVerification}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Test Token Verification
                  </button>
                  <button
                    onClick={clearToken}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                  >
                    Clear Token
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">
                No token found. Please <Link href="/signin" className="text-blue-400 hover:underline">sign in</Link> first.
              </div>
            )}
          </div>
          
          {error && (
            <div className="bg-red-800 p-4 rounded-lg">
              <h3 className="font-semibold">Error:</h3>
              <p>{error}</p>
            </div>
          )}
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <Link 
                href="/signin" 
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Go to Sign In
              </Link>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/space/test" 
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
              >
                Test Space
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 