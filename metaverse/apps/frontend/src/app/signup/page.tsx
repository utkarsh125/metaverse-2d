// frontend/src/app/signup/page.tsx
'use client';

import { API } from '@/lib/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await API.post('/api/v1/signup', {
        username,
        password,
        type: 'user',
      });
      if (res.status === 200) {
        router.push('/signin');
      } else {
        setError('Unexpected response status: ' + res.status);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Signup failed: username may already exist or invalid input.');
      } else {
        setError('Network or server error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-black! items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <span className="block text-sm font-medium">Username</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
