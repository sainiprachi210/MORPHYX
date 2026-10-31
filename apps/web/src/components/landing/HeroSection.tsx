import React from 'react';
import { HeroScene } from '../canvas/HeroScene';
import { Flame, Users, Zap, Compass, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Mission Briefing Typography */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-urban-panel border border-urban-sand/25 text-urban-sand text-xs font-mono uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-urban-sand animate-ping"></span>
            HACKATHON PROTOCOL INITIALIZED
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight leading-none text-urban-ivory">
            PRODUCTIVITY <br />
            <span className="cyber-gradient-text">REFORGED IN 3D</span>
          </h1>

          <p className="text-base sm:text-lg text-urban-stone leading-relaxed font-sans max-w-xl">
            MORPHYX transforms real-world coding, writing, and deep-focus sprints into an expansive
            multiplayer urban open world. Turn your daily tasks into high-stakes quests, unlock operative
            gear, and conquer objectives with colleagues worldwide.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/city"
              className="px-6 py-3 rounded-lg bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-sm tracking-wider uppercase shadow-urban-button transition-all duration-200 flex items-center gap-2 border border-urban-sand/30"
            >
              <Zap className="w-4 h-4 text-urban-ivory" />
              <span>Enter 3D City</span>
            </a>
            <a
              href="#architecture"
              className="px-6 py-3 rounded-lg bg-urban-olive text-urban-sand border border-urban-sand/30 hover:border-urban-sand hover:bg-urban-panel font-mono text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-urban-sand" />
              <span>Explore Architecture</span>
            </a>
          </div>

          {/* Key Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-urban-sand/15">
            <div className="p-3 rounded-xl bg-urban-panel border border-urban-sand/15">
              <div className="flex items-center gap-1.5 text-urban-sand font-mono text-xs mb-1">
                <Flame className="w-3.5 h-3.5 text-urban-terracotta" />
                <span>EXP ENGINE</span>
              </div>
              <div className="text-lg font-bold font-display text-urban-ivory">4x BOOST</div>
              <div className="text-[11px] text-urban-stone font-mono">Pomodoro Sync</div>
            </div>

            <div className="p-3 rounded-xl bg-urban-panel border border-urban-sand/15">
              <div className="flex items-center gap-1.5 text-urban-sand font-mono text-xs mb-1">
                <Users className="w-3.5 h-3.5 text-urban-sage" />
                <span>SQUADS</span>
              </div>
              <div className="text-lg font-bold font-display text-urban-ivory">UP TO 16</div>
              <div className="text-[11px] text-urban-stone font-mono">Real-time Operatives</div>
            </div>

            <div className="p-3 rounded-xl bg-urban-panel border border-urban-sand/15">
              <div className="flex items-center gap-1.5 text-urban-sand font-mono text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-urban-sage" />
                <span>RLS SECURITY</span>
              </div>
              <div className="text-lg font-bold font-display text-urban-ivory">ZERO TRUST</div>
              <div className="text-[11px] text-urban-stone font-mono">Row-Level Guard</div>
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
