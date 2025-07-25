"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

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
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleMenuItemClick = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: element, offsetY: 100 },
          ease: "power2.inOut"
        });
      }
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    if (!mobileOpen) {
      setMobileOpen(true);
      
      // Animate in
      gsap.set(mobileMenuRef.current, { 
        opacity: 0, 
        y: -20,
        scale: 0.95
      });
      gsap.set([...menuItemsRef.current, ...buttonsRef.current], {
        opacity: 0,
        y: -10
      });
      
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to([...menuItemsRef.current, ...buttonsRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.1,
        ease: "power2.out"
      });
    } else {
      // Animate out
      gsap.to([...menuItemsRef.current, ...buttonsRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in"
      });
      
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.25,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => setMobileOpen(false)
      });
    }
  };

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        const navElement = navRef.current;
        if (navElement && !navElement.contains(event.target as Node)) {
          setMobileOpen(false);
        }
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Navbar entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { y: -100, opacity: 0 });
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-12 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-20 xl:right-20 2xl:left-32 2xl:right-32 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl shadow-xl' 
          : 'bg-black/80 backdrop-blur-lg shadow-lg'
      } rounded-full border border-white/10`}
    >
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">O</span>
            </div>
            <span className="font-pixelify text-white font-bold text-sm lg:text-base hidden sm:block">
              orbitone.cloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItem.map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(item.link);
                }}
                className="font-pixelify text-white/80 hover:text-white transition-all duration-200 text-sm font-medium relative group"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/10 rounded-full p-1">
              <button
                onClick={handleSignIn}
                className="font-pixelify text-white/80 hover:text-white transition-all duration-200 text-sm font-medium px-4 py-2"
              >
                Sign in
              </button>
              <button
                onClick={handleGetStarted}
                className="font-pixelify bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Tablet CTA (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center">
            <button
              onClick={handleGetStarted}
              className="font-pixelify bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button with Animated Icon */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden relative z-10 p-2 text-white hover:text-gray-300 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {mobileOpen ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <motion.div 
          ref={mobileMenuRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="p-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-1">
              {menuItem.map((item, index) => (
                <motion.a
                  key={index}
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el;
                  }}
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(item.link);
                  }}
                  className="block font-pixelify text-white/80 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            {/* Divider */}
            <motion.div 
              className="border-t border-white/10 my-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                ref={(el) => {
                  if (el) buttonsRef.current[0] = el;
                }}
                onClick={() => {
                  setMobileOpen(false);
                  handleSignIn();
                }}
                className="block w-full text-left font-pixelify text-white/80 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in
              </motion.button>
              <motion.button
                ref={(el) => {
                  if (el) buttonsRef.current[1] = el;
                }}
                onClick={() => {
                  setMobileOpen(false);
                  handleGetStarted();
                }}
                className="block w-full font-pixelify bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-200 text-base font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
