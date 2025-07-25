"use client";

import type { Avatar, MapTheme, Space, SpaceInvite } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { API } from "@/lib/api";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import TeamInviteModal from "../../components/TeamInviteModal";

export default function DashboardPage() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spacesGridRef = useRef<HTMLDivElement>(null);

  // fetched data
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [maps, setMaps] = useState<MapTheme[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  // Removed unused variables: invites, currentUser, setSelectedSpaceId, handleInviteResponse

  // onboarding step (1 = avatar, 2 = map + name)
  const [step, setStep] = useState<1 | 2>(1);

  // user selections
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");

  // derived flags
  const [hasAvatar, setHasAvatar] = useState(false);

  // control
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // GSAP animations
  useEffect(() => {
    if (modalRef.current && !onboarded) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [step, onboarded]);

  useEffect(() => {
    if (onboarded && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [onboarded]);

  useEffect(() => {
    if (spacesGridRef.current && spaces.length > 0) {
      const cards = spacesGridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, [spaces]);

  // initial data & profile fetch
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch all required data using API instance only
    API.get<{ avatarId: string | null }>("/api/v1/user/metadata")
      .then((res) => setHasAvatar(!!res.data.avatarId))
      .catch(console.error);

    API.get<{ avatars: Avatar[] }>("/api/v1/avatars")
      .then((res) => setAvatars(res.data.avatars))
      .catch(console.error);

    API.get<{ maps: MapTheme[] }>("/api/v1/maps")
      .then((res) => setMaps(res.data.maps))
      .catch(console.error);

    API.get<{ spaces: Space[] }>("/api/v1/space/all")
      .then((res) => {
        setSpaces(res.data.spaces);
      })
      .catch(console.error);

    // Removed unused API calls for currentUser and invites

    setLoading(false);
  }, [router]);

  // determine onboarding state
  useEffect(() => {
    if (hasAvatar) {
      setOnboarded(true);
    } else {
      setStep(1);
    }
  }, [hasAvatar]);

  // save selected avatar
  const saveAvatar = async (): Promise<void> => {
    if (!selectedAvatar || loading) return;
    setLoading(true);
    setError(null);
    try {
      await API.post("/api/v1/user/metadata", { avatarId: selectedAvatar });
      setHasAvatar(true);
      setOnboarded(true); // Complete onboarding after avatar selection
    } catch (e: unknown) {
      const errorMessage =
        e &&
        typeof e === "object" &&
        "response" in e &&
        e.response &&
        typeof e.response === "object" &&
        "status" in e.response &&
        e.response.status === 400
          ? "Invalid avatar"
          : "Network error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // create a new space
  const createSpace = async (): Promise<void> => {
    if (!selectedMap || !spaceName.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const mapObj = maps.find((m) => m.id === selectedMap);
      if (!mapObj) {
        throw new Error("Selected map not found");
      }
      await API.post("/api/v1/space", {
        name: spaceName.trim(),
        mapId: selectedMap,
        dimensions: mapObj.dimensions,
      });

      console.log(`created space with mapId: ${selectedMap}`);
      await API.get<{ spaces: Space[] }>("/api/v1/space/all").then((res) => {
        setSpaces(res.data.spaces);
      });
      setOnboarded(true);
      setSpaceName("");
      setSelectedMap("");
    } catch (e: unknown) {
      console.error("CreateSpace error:", e);
      const errorMessage =
        e &&
        typeof e === "object" &&
        "response" in e &&
        e.response &&
        typeof e.response === "object" &&
        "data" in e.response &&
        e.response.data &&
        typeof e.response.data === "object" &&
        "message" in e.response.data
          ? String(e.response.data.message)
          : "Failed to create space";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceClick = (spaceId: string): void => {
    router.push(`/space/${spaceId}`);
  };

  const handleCreateNewSpace = (): void => {
    setOnboarded(false);
    setStep(2);
    setError(null);
  };

  const handleInviteSent = (invite: SpaceInvite) => {
    // You could show a success message here
    console.log("Invite sent:", invite);
  };

  // Logout button handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/bg-2k.png"
          alt="Metaverse background"
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: "none" }}
          draggable={false}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Loading Content */}
        <div className="relative z-20 text-center">
          <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-purple-500/25">
              <svg
                className="w-10 h-10 text-white animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Loading Dashboard
            </h2>
            <p className="text-gray-400 text-lg">
              Preparing your virtual spaces...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Add this debug log before the return statement
  console.log("[DEBUG] Spaces to render:", spaces);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/bg-2k.png"
        alt="Metaverse background"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
        draggable={false}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 z-30 bg-gradient-to-r from-gray-100 to-gray-200 hover:cursor-pointer text-black px-5 py-2 rounded-full shadow-lg font-inter font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Logout
      </button>
      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto">
        {/* Onboarding Modal */}
        {!onboarded && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg shadow-purple-500/25 animate-pulse">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Choose Your Avatar
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Select an avatar to represent you in virtual spaces
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
                        <span>Get Started</span>
                        <span className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
                      {avatars.map((avatar) => (
                        <div
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={`group cursor-pointer p-4 sm:p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 transform ${
                            selectedAvatar === avatar.id
                              ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 ring-2 ring-purple-400/60 shadow-xl shadow-purple-500/40 border border-purple-400/30"
                              : "bg-gray-800/40 hover:bg-gray-700/60 border border-gray-600/30 hover:border-gray-500/50 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          <div className="relative overflow-hidden rounded-lg mb-3">
                            <Image
                              src={
                                avatar.imageUrl ||
                                "/placeholder.svg?height=96&width=96"
                              }
                              alt={avatar.name as string}
                              width={96}
                              height={96}
                              className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            {selectedAvatar === avatar.id && (
                              <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-purple-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-center text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                            {avatar.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={saveAvatar}
                      disabled={!selectedAvatar || loading}
                      className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving Avatar...</span>
                        </>
                      ) : (
                        <span>Get Started</span>
                      )}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4">
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 200 200"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M0 45.7358L50 33L100 45.7358L150 33L200 45.7358V168L150 155.264L100 168L50 155.264L0 168V45.7358Z"
                            fill="url(#paint0_linear_105_437)"
                          />{" "}
                          <defs>
                            {" "}
                            <linearGradient
                              id="paint0_linear_105_437"
                              x1="100"
                              y1="33"
                              x2="100"
                              y2="168"
                              gradientUnits="userSpaceOnUse"
                            >
                              {" "}
                              <stop stopColor="#B8DBFC" />{" "}
                              <stop offset="1" stopColor="#F8FBFE" />{" "}
                            </linearGradient>{" "}
                          </defs>{" "}
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Create Your Space
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Design your virtual environment
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
                        <span>Step 2 of 2</span>
                        <span className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="spaceName"
                          className="block text-white font-semibold mb-3 text-lg"
                        >
                          Space Name
                        </label>
                        <input
                          id="spaceName"
                          type="text"
                          value={spaceName}
                          onChange={(e) => setSpaceName(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 focus:bg-gray-700/60 transition-all duration-200 shadow-lg"
                          placeholder="Enter your space name"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-4 text-lg">
                          Choose a Map Theme
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                          {maps.map((map) => (
                            <div
                              key={map.id}
                              onClick={() => setSelectedMap(map.id)}
                              className={`group cursor-pointer p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] transform ${
                                selectedMap === map.id
                                  ? "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 ring-2 ring-blue-400/60 shadow-xl shadow-blue-500/40 border border-blue-400/30"
                                  : "bg-gray-800/40 hover:bg-gray-700/60 border border-gray-600/30 hover:border-gray-500/50 shadow-lg hover:shadow-xl"
                              }`}
                            >
                              <div className="relative overflow-hidden rounded-lg mb-3">
                                {map.thumbnail ? (
                                  <Image
                                    src={
                                      map.thumbnail ||
                                      "/placeholder.svg?height=128&width=256"
                                    }
                                    alt={map.name}
                                    width={256}
                                    height={128}
                                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                ) : (
                                  <div className="w-full h-32 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                                    <svg
                                      className="w-12 h-12 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                      />
                                    </svg>
                                  </div>
                                )}
                                {selectedMap === map.id && (
                                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                    <svg
                                      className="w-8 h-8 text-blue-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <h3 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                {map.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {map.dimensions}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={createSpace}
                      disabled={!spaceName.trim() || !selectedMap || loading}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating Space...</span>
                        </>
                      ) : (
                        <span>Create Space</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {onboarded && (
          <div ref={contentRef} className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                  Your Virtual Spaces
                </h1>
                <p className="text-gray-400 text-xl">
                  Manage and explore your virtual environments
                </p>
              </div>
              <button
                onClick={handleCreateNewSpace}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center space-x-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Create New Space</span>
              </button>
            </div>

            {spaces.length > 0 ? (
              <div
                ref={spacesGridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {spaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => handleSpaceClick(space.id)}
                    className="group cursor-pointer bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/80 hover:border-gray-600 hover:shadow-xl hover:shadow-purple-500/10"
                  >
                    <div className="relative overflow-hidden">
                      {space.thumbnail ? (
                        <Image
                          src={
                            space.thumbnail ||
                            "/placeholder.svg?height=192&width=384"
                          }
                          alt={space.name}
                          width={384}
                          height={192}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {space.name}
                      </h3>
                      <p className="text-gray-400">{space.dimensions}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-16 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-700/50 rounded-full mb-8">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  No Spaces Yet
                </h3>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  Create your first virtual space to get started on your journey
                </p>
                <button
                  onClick={handleCreateNewSpace}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 inline-flex items-center space-x-3"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create Your First Space</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <TeamInviteModal
        spaceId=""
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInviteSent={handleInviteSent}
      />
    </div>
  );
}
