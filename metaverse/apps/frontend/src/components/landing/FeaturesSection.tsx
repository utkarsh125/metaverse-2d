import React from "react";

const features = [
  {
    title: "Customizable Spaces",
    description:
      "Design and personalize your own virtual rooms and worlds with ease. Create unique environments that reflect your style and needs.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <g clipPath="url(#clip0_231_648)">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 33.6449C92.7738 33.6449 86.9159 39.5028 86.9159 46.729H53.271C53.271 20.9213 74.1923 0 100 0C125.808 0 146.729 20.9213 146.729 46.729C146.729 72.5367 125.808 93.4579 100 93.4579V59.8131C107.226 59.8131 113.084 53.9551 113.084 46.729C113.084 39.5028 107.226 33.6449 100 33.6449ZM166.355 100C166.355 92.7738 160.497 86.9159 153.271 86.9159L153.271 53.271C179.079 53.271 200 74.1923 200 100C200 125.808 179.079 146.729 153.271 146.729C127.463 146.729 106.542 125.808 106.542 100H140.187C140.187 107.226 146.045 113.084 153.271 113.084C160.497 113.084 166.355 107.226 166.355 100ZM46.729 113.084C39.5028 113.084 33.6449 107.226 33.6449 100C33.6449 92.7738 39.5028 86.9159 46.729 86.9159C53.9551 86.9159 59.8131 92.7738 59.8131 100H93.4579C93.4579 74.1923 72.5367 53.271 46.729 53.271C20.9213 53.271 0 74.1923 0 100C0 125.808 20.9213 146.729 46.729 146.729V113.084ZM100 166.355C107.226 166.355 113.084 160.497 113.084 153.271H146.729C146.729 179.079 125.808 200 100 200C74.1923 200 53.271 179.079 53.271 153.271C53.271 127.463 74.1923 106.542 100 106.542L100 140.187C92.7738 140.187 86.9159 146.045 86.9159 153.271C86.9159 160.497 92.7738 166.355 100 166.355Z"
            fill="url(#paint0_linear_231_648)"
          />{" "}
        </g>{" "}
        <defs>
          {" "}
          <linearGradient
            id="paint0_linear_231_648"
            x1="100"
            y1="0"
            x2="100"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop stopColor="#C4B5FD" />{" "}
            <stop offset="1" stopColor="#F3F4F6" />{" "}
          </linearGradient>{" "}
          <clipPath id="clip0_231_648">
            {" "}
            <rect width="200" height="200" fill="white" />{" "}
          </clipPath>{" "}
        </defs>{" "}
      </svg>
    ),
    gradient: "from-purple-400 to-purple-500",
    bgGradient: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-300",
  },
  {
    title: "Avatar System",
    description:
      "Express yourself with unique avatars and animations. Choose from a variety of characters.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M169.909 139.373C161.736 129.94 160.408 115.21 165.832 103.97C170.425 94.452 173 83.7766 173 72.5C173 32.4594 140.541 0 100.5 0C60.4594 0 28 32.4594 28 72.5C28 83.522 30.4596 93.9695 34.8598 103.324C40.1723 114.617 38.6997 129.334 30.4352 138.686C20.1832 150.288 12.7935 164.478 9.37176 180.151C7.01575 190.942 16.1944 200 27.2401 200H172.503C183.549 200 192.728 190.943 190.372 180.151C187.017 164.786 179.849 150.845 169.909 139.373Z"
          fill="url(#paint0_linear_133_29)"
        />{" "}
        <defs>
          {" "}
          <linearGradient
            id="paint0_linear_133_29"
            x1="99.8717"
            y1="0"
            x2="99.8717"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop stopColor="#C4B5FD" />{" "}
            <stop offset="1" stopColor="#F3F4F6" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
      </svg>
    ),
    gradient: "from-purple-400 to-purple-500",
    bgGradient: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-300",
  },
  {
    title: "Interactive Maps",
    description:
      "Explore beautifully designed 2D environments with interactive elements. Navigate through immersive spaces with smooth controls.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <g clipPath="url(#clip0_105_699)">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 22.7143C100 10.564 90.1503 0.71428 78 0.71428H22C9.84974 0.71428 0 10.564 0 22.7143V78.7143C0 90.8645 9.84974 100.714 22 100.714H78C90.1503 100.714 100 110.564 100 122.714V177.286C100 189.436 109.85 199.286 122 199.286H178C190.15 199.286 200 189.436 200 177.286V121.286C200 109.135 190.15 99.2856 178 99.2856H122C109.85 99.2856 100 89.4359 100 77.2856V22.7143ZM177.286 100C189.436 100 199.286 90.1503 199.286 78V22C199.286 9.84974 189.436 2.97894e-06 177.286 2.44784e-06L121.286 0C109.135 -5.31105e-07 99.2857 9.84974 99.2857 22V78C99.2857 90.1503 89.436 100 77.2857 100L22.7143 100C10.564 100 0.714259 109.85 0.714259 122L0.714256 178C0.714256 190.15 10.564 200 22.7143 200L78.7143 200C90.8645 200 100.714 190.15 100.714 178V122C100.714 109.85 110.564 100 122.714 100L177.286 100Z"
            fill="url(#paint0_linear_105_699)"
          />{" "}
        </g>{" "}
        <defs>
          {" "}
          <linearGradient
            id="paint0_linear_105_699"
            x1="100"
            y1="0"
            x2="100"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop stopColor="#C4B5FD" />{" "}
            <stop offset="1" stopColor="#F3F4F6" />{" "}
          </linearGradient>{" "}
          <clipPath id="clip0_105_699">
            {" "}
            <rect width="200" height="200" fill="white" />{" "}
          </clipPath>{" "}
        </defs>{" "}
      </svg>
    ),
    gradient: "from-purple-400 to-purple-500",
    bgGradient: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-300",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-purple-50"
      aria-labelledby="features-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <header className="text-center mb-20">
          <span className="font-inter text-xs tracking-widest text-purple-500 mb-4 block">
            FEATURES
          </span>
          <h2 id="features-title" className="font-pixelify text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-6 leading-tight">
            Everything you need to build
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              amazing virtual experiences
            </span>
          </h2>
          <p className="font-inter text-lg sm:text-xl text-purple-700 max-w-3xl mx-auto px-4">
            Powerful tools and features designed to make virtual collaboration
            seamless and engaging.
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border ${feature.borderColor} ${feature.hoverBorder} hover:-translate-y-2 overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-400 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-400 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Icon Container */}
              <div
                className={`relative mb-6 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                {/* Icon Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-pixelify text-xl sm:text-2xl font-bold mb-4 text-purple-900 group-hover:text-purple-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-inter text-purple-700 leading-relaxed text-sm sm:text-base group-hover:text-purple-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Corner Accent */}
              <div
                className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150`}
              ></div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
