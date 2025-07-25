// import Image from 'next/image';
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

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
  const linksRef = useRef<HTMLAnchorElement[]>([]);
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
    router.push('/signin');
  };

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleMenuItemClick = (link: string) => {
    setMobileOpen(false);
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-pixelify text-xl font-bold text-gray-900">orbitone.cloud</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItem.map((item, index) => (
              <a
                key={index}
                href={item.link}
                ref={(el) => {
                  if (el) linksRef.current[index] = el;
                }}
                onClick={() => handleMenuItemClick(item.link)}
                className="font-inter text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              ref={signInRef}
              onClick={handleSignIn}
              className="font-inter text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Sign in
            </button>
            <button
              ref={getStartedRef}
              onClick={handleGetStarted}
              className="font-inter bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItem.map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={() => handleMenuItemClick(item.link)}
                className="block font-inter text-gray-600 hover:text-gray-900 py-2 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={handleSignIn}
              className="block w-full text-left font-inter text-gray-600 hover:text-gray-900 py-2 transition-colors duration-200"
            >
              Sign in
            </button>
            <button
              onClick={handleGetStarted}
              className="block w-full font-inter bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 mt-4"
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
