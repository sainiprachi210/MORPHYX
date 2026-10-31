import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ArchitectureSection from '../components/landing/ArchitectureSection';
import SystemStatus from '../components/landing/SystemStatus';
import Footer from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark text-slate-100">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SystemStatus />
        <FeaturesSection />
        <ArchitectureSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
