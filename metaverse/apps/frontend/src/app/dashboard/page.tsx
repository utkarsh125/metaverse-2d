'use client'

import { Avatar, Space } from "@/lib/types"
import { useEffect, useState } from 'react';

import { API } from "@/lib/api";
import { useRouter } from 'next/navigation';

export default function Dashboard(){

    const router = useRouter();


    //data
    const [avatars, setAvatars] = useState<Avatar[]>([]);
    const [spaces, setSpaces] = useState<Space[]>([]);


    // onboarding state
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const [selectedSpace, setSelectedSpace] = useState<string>('');
    const [onboarded, setOnboarded] = useState(false);

    // UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //mount and fetch
    useEffect(() => {

        const token = localStorage.getItem('token')
        if(!token){
            //redirect to /signin if no token
            router.push('/signin')
            return;
        }
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`


        //allow user to select avatar on step 1
        API
            .get<{ avatars: Avatar[] }>('/api/v1/avatars')
            .then(r => setAvatars(r.data.avatars))
            .catch(console.error);

        //on step 2, show them the current spaces, then show them the dashboard
        API
            .get<{ spaces: Space[] }>('/api/v1/space/all')
            .then(r => setSpaces(r.data.spaces))
            .catch(console.error);
    }, []);

    //save avatar
    const saveAvatar = async() => {
        if(!selectedAvatar) return;

        setLoading(true);
        setError(null);


        try {
            await API.post('api/v1/user/metadata', {avatarId: selectedAvatar});
            setStep(2);
        } catch (e: any) {
            setError(e.response?.status === 400 ? 'Invalid Avatar' : 'Network Error');
        }finally{
            setLoading(false);
        };
    };

    //finish onboarding
    const finishOnboarding = () => {
        if(!selectedSpace) return;
        setOnboarded(true)
    }

    return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">

      {/* ONBOARDING MODAL */}
      {!onboarded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 rounded p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {step === 1 ? 'Select Your Avatar' : 'Select Your Space'}
            </h2>

            {step === 1 ? (
              <>
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
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button
                  onClick={saveAvatar}
                  disabled={!selectedAvatar || loading}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                >
                  {loading ? 'Saving…' : 'Save Avatar'}
                </button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {spaces.map(s => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSpace(s.id)}
                      className={`cursor-pointer p-4 border-2 rounded bg-gray-700 ${
                        selectedSpace === s.id
                          ? 'border-blue-400'
                          : 'border-transparent hover:border-gray-600'
                      }`}
                    >
                      {s.thumbnail ? (
                        <img
                          src={s.thumbnail}
                          alt={s.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-600 rounded mb-2 flex items-center justify-center">
                          No Thumbnail
                        </div>
                      )}
                      <h3 className="text-lg">{s.name}</h3>
                      <p className="text-sm text-gray-400">{s.dimensions}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={finishOnboarding}
                  disabled={!selectedSpace}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                >
                  Enter Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD CONTENT */}
      {onboarded && (
        <>
          <h1 className="text-3xl font-bold mb-6">Your Spaces</h1>
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
            <p>No spaces found. Create one from the Spaces menu.</p>
          )}
        </>
      )}
    </div>
  );
}