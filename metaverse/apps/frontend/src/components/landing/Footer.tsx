import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
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
            <p className="font-raleway text-gray-600 mb-6 max-w-md leading-relaxed">
              Creating the future of virtual collaboration with immersive 2D spaces that bring teams together from anywhere in the world.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Discord', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-raleway text-gray-500 hover:text-gray-700 transition-colors duration-200 hover:scale-105"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-raleway font-bold text-gray-900 mb-4 text-lg">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-raleway text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-raleway font-bold text-gray-900 mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-raleway text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-raleway text-gray-500 text-sm">
            © {new Date().getFullYear()} orbit.space. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-raleway text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 