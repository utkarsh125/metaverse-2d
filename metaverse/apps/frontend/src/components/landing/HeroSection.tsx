import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Text */}
        <div className="mb-8">
          <h1 className="font-pixelify text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Create, Explore and Connect
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">in a 2D Space</span>
          </h1>
        </div>

        <div className="mb-10">
          <p className="font-inter text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            A virtual world platform where you can build interactive spaces, meet friends, and collaborate—all in your browser.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-16 px-4">
          <button className="font-inter font-medium bg-gradient-to-r from-gray-900 to-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto">
            Get Started — it&apos;s free
          </button>
          <button className="font-inter font-medium rounded-full border border-gray-300 px-6 sm:px-8 py-3 sm:py-4 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto">
            How it works
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative px-4">
          <div className="relative inline-block w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-20 scale-105"></div>
            <Image 
              className="relative rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 w-full h-auto" 
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