import React from 'react';
import { APP_NAME, APP_VERSION } from '@morphyx/shared';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-cyber-dark/90 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-bold tracking-wider">{APP_NAME}</span>
          <span>v{APP_VERSION}</span>
          <span className="text-slate-600">|</span>
          <span>Hackathon Foundation</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Shield className="w-3.5 h-3.5" />
            <span>RLS Enabled</span>
          </span>
          <span>TypeScript Strict</span>
          <span>Three.js / React Three Fiber</span>
        </div>

        <div className="text-slate-500">
          Built for high-performance multiplayer spatial productivity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
