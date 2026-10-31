import React from 'react';
import { Layers, Database, Code2, Cpu, CheckCircle } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800"
    >
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          PROJECT ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
          MODULAR FULL-STACK <span className="cyber-gradient-text">MONOREPO</span>
        </h2>
        <p className="text-slate-400 text-base font-sans">
          Clean separation of concerns with npm workspaces, strict TypeScript contracts, and
          multi-tier security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1: Frontend Web */}
        <div className="p-6 rounded-xl cyber-glass border border-cyan-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">apps/web</h3>
              <p className="text-xs font-mono text-cyan-400">Client Spatial Tier</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>React 18 + TypeScript + Vite</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Three.js + React Three Fiber / Drei</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Tailwind CSS v3 Design System</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>React Router v6 SPA Routing</span>
            </li>
          </ul>
        </div>

        {/* Layer 2: Backend API */}
        <div className="p-6 rounded-xl cyber-glass border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">apps/server</h3>
              <p className="text-xs font-mono text-purple-400">Express API Service</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>Node.js + Express + TypeScript</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>Zod Environment & Request Validation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>Centralized AppError Handling</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>Structured Logging & Helmet Guard</span>
            </li>
          </ul>
        </div>

        {/* Layer 3: Shared & Database */}
        <div className="p-6 rounded-xl cyber-glass border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">packages/shared</h3>
              <p className="text-xs font-mono text-emerald-400">Contracts & Database</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Single Source of Truth Schemas</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Profiles, Missions, Tasks, Rooms</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Supabase PostgreSQL Migrations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Granular Row-Level Security (RLS)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Terminal Command Bar */}
      <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Root Dev Command:</span>
          <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            npm run dev
          </code>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>Target Scripts:</span>
          <span className="text-slate-300">npm run build</span>
          <span>•</span>
          <span className="text-slate-300">npm run test</span>
          <span>•</span>
          <span className="text-slate-300">npm run typecheck</span>
          <span>•</span>
          <span className="text-slate-300">npm run lint</span>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
