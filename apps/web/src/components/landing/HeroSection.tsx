import React from 'react';
import { HeroScene } from '../canvas/HeroScene';
import { Flame, Users, Zap, Compass, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Mission Briefing Typography */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            HACKATHON PROTOCOL INITIALIZED
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight leading-none text-white">
            PRODUCTIVITY <br />
            <span className="cyber-gradient-text">REFORGED IN 3D</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
            MORPHYX transforms real-world coding, writing, and deep-focus sprints into an expansive
            multiplayer cyber world. Turn your daily tasks into high-stakes quests, unlock cyber
            gear, and conquer objectives with operatives worldwide.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#missions"
              className="px-6 py-3 rounded-lg bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider uppercase shadow-neon-cyan hover:bg-cyan-300 transition-all duration-200 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Initiate Mission</span>
            </a>
            <a
              href="#architecture"
              className="px-6 py-3 rounded-lg bg-slate-900/90 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-mono text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 hover:bg-slate-800/80"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Architecture</span>
            </a>
          </div>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>EXP ENGINE</span>
              </div>
              <div className="text-lg font-bold font-display text-white">4x BOOST</div>
              <div className="text-[11px] text-slate-400 font-mono">Pomodoro Sync</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs mb-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>SQUADS</span>
              </div>
              <div className="text-lg font-bold font-display text-white">UP TO 16</div>
              <div className="text-[11px] text-slate-400 font-mono">Real-time Operatives</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>RLS SECURITY</span>
              </div>
              <div className="text-lg font-bold font-display text-white">ZERO TRUST</div>
              <div className="text-[11px] text-slate-400 font-mono">Row-Level Guard</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Viewport */}
        <div className="lg:col-span-6">
          <HeroScene />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
