// import Image from 'next/image';
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const menuItem = [
    {
        name: "FAQ",
        link: "#faq",
    },
    {
        name: "About",
        link: "#about",
    },
    {
        name: "How it works",
        link: "#how-it-works",
    }
]

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleGetStarted = () => {
    router.push("/signup");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <g clipPath="url(#clip0_104_157)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM100 143.75C124.162 143.75 143.75 124.162 143.75 100C143.75 75.8375 124.162 56.25 100 56.25C75.8375 56.25 56.25 75.8375 56.25 100C56.25 124.162 75.8375 143.75 100 143.75Z"
                fill="url(#paint0_linear_104_157)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_104_157"
                x1="100"
                y1="0"
                x2="100"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CFFFE2" />
                <stop offset="1" stopColor="#F6F6F6" />
              </linearGradient>
              <clipPath id="clip0_104_157">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1 className="font-raleway font-bold text-lg">orbit.space</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItem.map((item, index) => (
            <Link 
              href={item.link} 
              key={index}
              className="font-raleway font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={handleSignIn}
            className="font-raleway font-medium rounded-full border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
          >
            Sign In
          </button>
          <button 
            onClick={handleGetStarted}
            className="font-raleway font-medium bg-gradient-to-r from-gray-900 to-black text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-raleway font-bold text-lg">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {menuItem.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="font-raleway font-medium text-gray-700 hover:text-gray-900 text-lg py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => { setMobileOpen(false); handleSignIn(); }}
              className="font-raleway font-medium rounded-full border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 mt-4"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setMobileOpen(false); handleGetStarted(); }}
              className="font-raleway font-medium bg-gradient-to-r from-gray-900 to-black text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
