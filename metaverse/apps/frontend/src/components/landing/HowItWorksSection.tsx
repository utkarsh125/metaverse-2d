import Image from 'next/image';
import React from 'react';

const steps = [
  {
    title: 'Choose Your Avatar',
    description: 'Select from our beautifully crafted avatars.'
  },
  {
    title: 'Create a Space',
    description: 'Easily Create a space and select a map to your liking. Currently we have only one map but we are working on more.'
  },
  {
    title: 'Join the space and invite your friends.',
    description: 'Join the space and invite your friends. You can also invite your friends to your space via link.'
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Illustration and heading */}
        <div className="flex-1 flex flex-col items-start w-full md:w-auto">
          <span className="font-raleway text-xs tracking-widest text-gray-500 mb-4">HOW IT WORKS</span>
          <h2 className="font-merriweather text-3xl md:text-4xl font-bold text-gray-900 mb-8 max-w-xs md:max-w-sm">
            Three easy steps to get started
          </h2>
          <div className="w-48 md:w-64 mx-auto md:mx-0">
            <Image src="/how-it-works.png" alt="How it works" width={256} height={256} className="w-full h-auto rounded-3xl" />
          </div>
        </div>
        {/* Right: Steps */}
        <div className="flex-1 w-full md:w-auto">
          <div className="grid gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border border-gray-100">
                <div className="font-raleway font-bold text-2xl text-gray-400 min-w-[2.5rem] md:text-3xl">{String(idx + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="font-merriweather text-lg md:text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="font-raleway text-gray-600 text-base md:text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 