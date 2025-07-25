import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-pixelify text-xl font-bold text-purple-900">orbitone.cloud</span>
            </Link>
            <p className="font-inter text-purple-700 text-sm leading-relaxed max-w-md">
              A virtual world platform where you can build interactive spaces, meet friends, and collaborate—all in your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-pixelify text-sm font-bold text-purple-900 uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="font-inter text-purple-600 hover:text-purple-900 text-sm">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#about" className="font-inter text-purple-600 hover:text-purple-900 text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#faq" className="font-inter text-purple-600 hover:text-purple-900 text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-pixelify text-sm font-bold text-purple-900 uppercase mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/signup" className="font-inter text-purple-600 hover:text-purple-900 text-sm">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/signin" className="font-inter text-purple-600 hover:text-purple-900 text-sm">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-purple-200">
          <p className="font-inter text-purple-500 text-sm text-center">
            © {new Date().getFullYear()} orbitone.cloud. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 