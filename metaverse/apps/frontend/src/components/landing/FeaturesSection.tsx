import React from 'react';

const features = [
  {
    title: 'Customizable Spaces',
    description: 'Design and personalize your own virtual rooms and worlds with ease.',
    icon: '🌐',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Interact, chat, and collaborate with others in real time.',
    icon: '🤝',
  },
  {
    title: 'Avatar System',
    description: 'Express yourself with unique avatars and animations.',
    icon: '🧑‍🚀',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-merriweather text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to build
            <br />
            <span className="text-gray-600">amazing virtual experiences</span>
          </h2>
          <p className="font-raleway text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools and features designed to make virtual collaboration seamless and engaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-merriweather text-2xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="font-raleway text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <button className="font-raleway font-medium bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 