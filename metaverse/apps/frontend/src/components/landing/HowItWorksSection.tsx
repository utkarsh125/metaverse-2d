import Image from "next/image";
import React from "react";

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
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Illustration and heading */}
        <div className="flex-1 flex flex-col items-center lg:items-start w-full">
          <span className="font-inter text-xs tracking-widest text-gray-500 mb-4">
            HOW IT WORKS
          </span>
          <h2 className="font-pixelify text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left max-w-md">
            Three easy steps to get started
          </h2>
          
          {/* Images - Stack vertically on mobile, side by side on larger screens */}
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-lg">
            <div className="flex-1 w-full">
              <Image
                src="/how-it-works.png"
                alt="How it works"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl object-contain"
                priority
              />
            </div>
            <div className="flex-1 w-full sm:block hidden">
              <Image
                src="/celebrating.png"
                alt="Celebrating"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Right: Steps */}
        <div className="flex-1 w-full">
          <div className="grid gap-4 max-w-lg mx-auto lg:max-w-none">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-start gap-4 border border-gray-100"
              >
                <div className="font-inter font-bold text-xl sm:text-2xl text-gray-400 min-w-0 sm:min-w-[2.5rem] text-center sm:text-left">
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
      </div>
    </section>
  );
};

export default HowItWorksSection;