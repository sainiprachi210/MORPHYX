import React from 'react';
import { Layers, Database, Code2, Cpu, CheckCircle } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-urban-sand/15"
    >
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-urban-panel border border-urban-sand/25 text-urban-sand text-xs font-mono tracking-widest uppercase">
          PROJECT ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-urban-ivory tracking-wide">
          MODULAR FULL-STACK <span className="cyber-gradient-text">MONOREPO</span>
        </h2>
        <p className="text-urban-stone text-base font-sans">
          Clean separation of concerns with npm workspaces, strict TypeScript contracts, and
          multi-tier security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1: Frontend Web */}
        <div className="p-6 rounded-xl bg-urban-panel border border-urban-sand/20 shadow-urban-panel">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-urban-olive border border-urban-sand/25 flex items-center justify-center text-urban-sand">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-urban-ivory text-base">apps/web</h3>
              <p className="text-xs font-mono text-urban-sand">Client Spatial Tier</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-urban-stone">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sand flex-shrink-0" />
              <span>React 18 + TypeScript + Vite</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sand flex-shrink-0" />
              <span>Three.js + React Three Fiber / Drei</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sand flex-shrink-0" />
              <span>Tailwind CSS v3 Design System</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sand flex-shrink-0" />
              <span>React Router v6 SPA Routing</span>
            </li>
          </ul>
        </div>

        {/* Layer 2: Backend API */}
        <div className="p-6 rounded-xl bg-urban-panel border border-urban-sand/20 shadow-urban-panel">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-urban-olive border border-urban-terracotta/30 flex items-center justify-center text-urban-terracotta">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-urban-ivory text-base">apps/server</h3>
              <p className="text-xs font-mono text-urban-terracotta">Express API Service</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-urban-stone">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-terracotta flex-shrink-0" />
              <span>Node.js + Express + TypeScript</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-terracotta flex-shrink-0" />
              <span>Zod Environment & Request Validation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-terracotta flex-shrink-0" />
              <span>Centralized AppError Handling</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-terracotta flex-shrink-0" />
              <span>Structured Logging & Helmet Guard</span>
            </li>
          </ul>
        </div>

        {/* Layer 3: Shared & Database */}
        <div className="p-6 rounded-xl bg-urban-panel border border-urban-sand/20 shadow-urban-panel">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-urban-olive border border-urban-sage/30 flex items-center justify-center text-urban-sage">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-urban-ivory text-base">packages/shared</h3>
              <p className="text-xs font-mono text-urban-sage">Contracts & Database</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-urban-stone">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sage flex-shrink-0" />
              <span>Single Source of Truth Schemas</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sage flex-shrink-0" />
              <span>Profiles, Missions, Tasks, Rooms</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sage flex-shrink-0" />
              <span>Supabase PostgreSQL Migrations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-urban-sage flex-shrink-0" />
              <span>Granular Row-Level Security (RLS)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Terminal Command Bar */}
      <div className="mt-8 p-4 rounded-xl bg-urban-panel border border-urban-sand/20 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-urban-stone">
          <Code2 className="w-4 h-4 text-urban-sand" />
          <span>Root Dev Command:</span>
          <code className="text-urban-sand bg-urban-olive px-2 py-0.5 rounded border border-urban-sand/20">
            npm run dev
          </code>
        </div>
        <div className="flex items-center gap-3 text-urban-stone">
          <span>Target Scripts:</span>
          <span className="text-urban-ivory">npm run build</span>
          <span>•</span>
          <span className="text-urban-ivory">npm run test</span>
          <span>•</span>
          <span className="text-urban-ivory">npm run typecheck</span>
          <span>•</span>
          <span className="text-urban-ivory">npm run lint</span>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
