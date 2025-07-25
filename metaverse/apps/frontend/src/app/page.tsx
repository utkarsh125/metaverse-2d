import React from 'react';
import type { Metadata } from 'next';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AboutSection from '../components/landing/AboutSection';
import FAQSection from '../components/landing/FAQSection';
import Footer from '../components/landing/Footer';
import DeviceNotice from '../components/landing/DeviceNotice';

export const metadata: Metadata = {
  title: 'OrbitOne - Immersive 2D Metaverse Platform',
  description: 'Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction with our real-time metaverse platform featuring customizable avatars, interactive environments, and seamless social experiences.',
  keywords: [
    'metaverse platform',
    '2D virtual spaces',
    'digital collaboration',
    'virtual avatars',
    'real-time interaction',
    'virtual environments',
    'online social platform',
    'virtual world creation',
    'digital workspace',
    'virtual community'
  ],
  openGraph: {
    title: 'OrbitOne - Immersive 2D Metaverse Platform',
    description: 'Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction.',
    url: 'https://orbitone.cloud',
    siteName: 'OrbitOne',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'OrbitOne Metaverse Platform - Create and explore virtual spaces',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrbitOne - Immersive 2D Metaverse Platform',
    description: 'Create, explore, and collaborate in immersive 2D virtual spaces. Join the next generation of digital interaction.',
    images: ['/hero-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <DeviceNotice />
      <div className="pt-12"> {/* Adjust padding for dismissible banner */}
        <Navbar />
      </div>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AboutSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Page;