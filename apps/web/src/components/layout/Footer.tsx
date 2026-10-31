import React from 'react';
import { APP_NAME, APP_VERSION } from '@morphyx/shared';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-urban-sand/20 bg-urban-olive py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-urban-stone font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-urban-sand" />
          <span className="text-urban-ivory font-bold tracking-wider">{APP_NAME}</span>
          <span>v{APP_VERSION}</span>
          <span className="text-urban-stone/40">|</span>
          <span>Hackathon Foundation</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-urban-sand">
            <Shield className="w-3.5 h-3.5 text-urban-terracotta" />
            <span>RLS Enabled</span>
          </span>
          <span>TypeScript Strict</span>
          <span>Three.js / React Three Fiber</span>
        </div>

        <div className="text-urban-stone/70">
          Built for high-performance multiplayer spatial productivity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
