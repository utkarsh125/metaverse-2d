// import Image from 'next/image';
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { createPortal } from "react-dom";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const signInRef = useRef<HTMLButtonElement>(null);
  const getStartedRef = useRef<HTMLButtonElement>(null);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (mobileOpen && menuRef.current && overlayRef.current) {
      gsap.set(menuRef.current, { scaleY: 0.7, scaleX: 0.95, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(menuRef.current, { scaleY: 1, scaleX: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.25, ease: 'expo.out' }
      );
      gsap.fromTo(
        [signInRef.current, getStartedRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.35, ease: 'expo.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      if (menuRef.current && overlayRef.current) {
        gsap.to(menuRef.current, { scaleY: 0.7, scaleX: 0.95, opacity: 0, duration: 0.4, ease: 'expo.in' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
      document.body.style.overflow = '';
    }
    // Clean up overflow on unmount
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleGetStarted = () => {
    router.push("/signup");
  };

  // Portal for mobile menu
  const mobileMenuPortal = mobileOpen ? createPortal(
    <div ref={overlayRef} className="md:hidden fixed inset-0 z-[9999] bg-black pointer-events-auto" style={{ opacity: 1 }}>
      <div
        ref={menuRef}
        className="absolute inset-0 flex flex-col justify-center items-center px-8 py-10 text-white"
        style={{ opacity: 1, transform: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="absolute top-6 right-6 text-white text-3xl p-2">
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col gap-8 items-center w-full">
          {menuItem.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              ref={el => { linksRef.current[index] = el; }}
              className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl text-white hover:text-gray-200 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button 
            ref={signInRef}
            onClick={() => { setMobileOpen(false); handleSignIn(); }}
            className="font-raleway font-semibold rounded-full border border-gray-200 px-8 py-3 text-white hover:bg-gray-900 hover:border-white transition-all duration-300 mt-4 text-lg"
          >
            Sign In
          </button>
          <button 
            ref={getStartedRef}
            onClick={() => { setMobileOpen(false); handleGetStarted(); }}
            className="font-raleway font-semibold bg-black text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
          >
            Get Started
          </button>
        </nav>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as unknown as Element)
  ) : null;

  return (
    <>
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
      </nav>
      {mobileMenuPortal}
    </>
  );
};

export default Navbar;
