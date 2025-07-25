"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Choose Your Avatar",
    description: "Select from our beautifully crafted avatars.",
  },
  {
    title: "Create a Space",
    description:
      "Easily Create a space and select a map to your liking. Currently we have only one map but we are working on more.",
  },
  {
    title: "Join the space and invite your friends.",
    description:
      "Join the space and invite your friends. You can also invite your friends to your space via link.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Steps animation
      gsap.fromTo(stepsRef.current?.children || [], 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Media animation
      gsap.fromTo(mediaRef.current, 
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-inter text-xs tracking-widest text-purple-600 mb-4 block font-semibold">
            HOW IT WORKS
          </span>
          <h2 className="font-pixelify text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Three easy steps to get started
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Steps */}
          <div className="order-2 lg:order-1">
            <div ref={stepsRef} className="grid gap-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-4 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="font-inter font-bold text-xl sm:text-2xl text-purple-600 min-w-0 sm:min-w-[2.5rem] text-center sm:text-left">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-pixelify text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Video and Images */}
          <div ref={mediaRef} className="order-1 lg:order-2">
            {/* YouTube Video */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 border border-gray-200">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src="/how-it-works.png"
                  alt="How it works"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src="/celebrating.png"
                  alt="Celebrating"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;