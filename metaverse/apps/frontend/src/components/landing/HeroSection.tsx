"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const HeroSection = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleHowItWorks = () => {
    const element = document.querySelector('#how-it-works');
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 100 },
        ease: "power2.inOut"
      });
    }
  };

  // GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, imageRef.current], {
        opacity: 0,
        y: 50
      });

      // Create timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3")
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-white" aria-labelledby="hero-title">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Text */}
        <div className="mb-8">
          <h1 id="hero-title" ref={titleRef} className="font-pixelify text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-purple-900 leading-tight mb-6">
            Create, Explore and Connect
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">in a 2D Space</span>
          </h1>
        </div>

        <div className="mb-10">
          <p ref={subtitleRef} className="font-inter text-lg sm:text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed px-4">
            A virtual world platform where you can build interactive spaces, meet friends, and collaborate—all in your browser.
          </p>
          <p className="font-inter text-base sm:text-lg text-purple-500 mt-4">
            Currently optimized for desktop and tablet devices
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-16 px-4">
          <button 
            onClick={handleGetStarted}
            className="font-inter font-medium bg-gradient-to-r from-purple-400 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
          >
            Get Started — it&apos;s free
          </button>
          <button 
            onClick={handleHowItWorks}
            className="font-inter font-medium rounded-full border border-purple-300 px-6 sm:px-8 py-3 sm:py-4 text-purple-600 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
          >
            How it works
          </button>
        </div>

        {/* Hero Image */}
        <div ref={imageRef} className="relative px-4">
          <div className="relative inline-block w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-20 scale-105"></div>
            <Image 
              className="relative rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-200 w-full h-auto" 
              src="/hero-image.png" 
              alt="hero-image" 
              width={1200} 
              height={800}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 