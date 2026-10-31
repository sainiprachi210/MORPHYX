import React from 'react';
import { Shield, Sparkles, Terminal, Cpu } from 'lucide-react';
import { APP_NAME, APP_VERSION } from '@morphyx/shared';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 bg-cyber-dark/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1.5px] shadow-neon-cyan">
            <div className="w-full h-full bg-cyber-dark rounded-[7px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                v{APP_VERSION}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              3D MULTIPLAYER PRODUCTIVITY NEXUS
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#nexus"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nexus World</span>
          </a>
          <a
            href="#missions"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Missions</span>
          </a>
          <a
            href="#architecture"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture</span>
          </a>
          <a
            href="#telemetry"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live Telemetry</span>
          </a>
        </nav>

        {/* CTA Launch Button */}
        <div className="flex items-center gap-3">
          <a
            href="#telemetry"
            className="relative group px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold text-xs tracking-wider uppercase font-mono shadow-neon-cyan hover:shadow-neon-purple transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Enter World</span>
              <span className="text-sm">→</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
