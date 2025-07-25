"use client";

import { API } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/api/v1/signin", { username, password });
      const data = response.data;
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "Signin failed.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message =
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Signin failed.";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
      {/* Content */}
      <div className="relative z-20 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g clipPath="url(#clip0_235_973)">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 -4.37114e-06C155.228 -6.78525e-06 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 5.67237e-06 155.228 3.25826e-06 100C8.44143e-07 44.7715 44.7715 -1.95703e-06 100 -4.37114e-06ZM100 -4.37114e-06C138.108 -6.03688e-06 169 30.8923 169 69C169 107.108 138.108 138 100 138C61.8924 138 31 107.108 31 69C31 30.8923 61.8924 -2.7054e-06 100 -4.37114e-06ZM132 69C132 51.3269 117.673 37 100 37C82.3269 37 68 51.3269 68 69C68 86.6731 82.3269 101 100 101C117.673 101 132 86.6731 132 69Z"
                  fill="url(#paint0_linear_235_973)"
                />{" "}
              </g>{" "}
              <defs>
                {" "}
                <linearGradient
                  id="paint0_linear_235_973"
                  x1="-9.344e-06"
                  y1="23"
                  x2="152.5"
                  y2="160.5"
                  gradientUnits="userSpaceOnUse"
                >
                  {" "}
                  <stop stopColor="#B0B9FF" />{" "}
                  <stop offset="1" stop-color="#E7E9FF" />{" "}
                </linearGradient>{" "}
                <clipPath id="clip0_235_973">
                  {" "}
                  <rect
                    width="200"
                    height="200"
                    fill="white"
                    transform="translate(7.62939e-06 200) rotate(-90)"
                  />{" "}
                </clipPath>{" "}
              </defs>{" "}
            </svg>
            <span className="font-raleway font-bold text-lg">orbit.space</span>
          </Link>
          <h2 className="font-pixelify text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
            Welcome back
          </h2>
          <p className="font-inter text-gray-200 text-base sm:text-lg">
            Sign in to your account to continue
          </p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
          <form className="space-y-6" onSubmit={handleSignin}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-inter text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="username"
                className="font-inter block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-inter w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-inter block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-inter w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-lg text-base font-inter font-semibold text-white bg-gradient-to-r from-gray-900 to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="font-inter text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
