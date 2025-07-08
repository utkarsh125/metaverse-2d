import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-inter text-xs tracking-widest text-gray-500 mb-4 block">
            ABOUT
          </span>
          <h2 className="font-pixelify text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Building the future of
            <br />
            <span className="text-purple-600">virtual collaboration</span>
          </h2>
          <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            I created this project to learn more about the metaverse and how it
            works, and during the process I realized that it is a great way to
            connect with people and build a community.
          </p>

          <br/>
          
          <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            There are lot of things that I still have to improve in this project.
            More maps would be added soon along with more features like WebRTC, Avatar Customization, etc.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
