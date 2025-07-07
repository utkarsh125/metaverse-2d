import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-300 py-16 rounded-t-3xl sm:rounded-t-6xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2.5 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_104_157)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM100 143.75C124.162 143.75 143.75 124.162 143.75 100C143.75 75.8375 124.162 56.25 100 56.25C75.8375 56.25 56.25 75.8375 56.25 100C56.25 124.162 75.8375 143.75 100 143.75Z"
                      fill="url(#paint0_linear_104_157)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_104_157"
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="200"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#CFFFE2" />
                      <stop offset="1" stopColor="#F6F6F6" />
                    </linearGradient>
                    <clipPath id="clip0_104_157">
                      <rect width="200" height="200" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="font-raleway font-bold text-lg">orbit.space</span>
              </div>
            </div>
            <p className="font-raleway text-gray-800 mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              Creating the future of virtual collaboration with immersive 2D spaces that bring teams together from anywhere in the world.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer; 