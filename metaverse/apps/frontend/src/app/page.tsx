import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AboutSection from '../components/landing/AboutSection';
import FAQSection from '../components/landing/FAQSection';
import Footer from '../components/landing/Footer';
import DeviceNotice from '../components/landing/DeviceNotice';

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