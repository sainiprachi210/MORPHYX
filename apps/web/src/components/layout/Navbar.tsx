import React from 'react';
import { Shield, Sparkles, Terminal, Cpu } from 'lucide-react';
import { APP_NAME, APP_VERSION } from '@morphyx/shared';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 bg-urban-olive/90 backdrop-blur-md border-b border-urban-sand/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-urban-panel border border-urban-sand/30 p-[1.5px] shadow-urban-sm">
            <div className="w-full h-full bg-urban-olive rounded-[7px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-urban-sand" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-urban-ivory">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-urban-panel text-urban-sand border border-urban-sand/25">
                v{APP_VERSION}
              </span>
            </div>
            <p className="text-[11px] font-mono text-urban-stone hidden sm:block">
              3D MULTIPLAYER PRODUCTIVITY NEXUS
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-urban-stone">
          <a
            href="#nexus"
            className="hover:text-urban-ivory transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-urban-sand" />
            <span>Nexus World</span>
          </a>
          <a
            href="#missions"
            className="hover:text-urban-ivory transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-urban-sage" />
            <span>Missions</span>
          </a>
          <a
            href="#architecture"
            className="hover:text-urban-ivory transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-urban-sand" />
            <span>Architecture</span>
          </a>
          <a
            href="#telemetry"
            className="hover:text-urban-ivory transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-urban-sage"></span>
            <span>Live Telemetry</span>
          </a>
        </nav>

        {/* CTA Launch Button */}
        <div className="flex items-center gap-3">
          <a
            href="/city"
            className="relative group px-4 py-2 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-semibold text-xs tracking-wider uppercase font-mono shadow-urban-button transition-all duration-200 transform hover:-translate-y-0.5 border border-urban-sand/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Enter 3D City</span>
              <span className="text-sm">→</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
