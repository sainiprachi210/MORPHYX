import React from 'react';
import { Globe, Users2, Swords, ShieldCheck, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Globe,
    title: '3D Spatial Open World',
    subtitle: 'IMMERSIVE SPATIAL HUB',
    description:
      'Navigate vibrant cyberpunk districts including Nexus Plaza, Cyber Archive, and Quantum Foundry. Spatial audio and atmospheric 3D shaders bring focus to life.',
    tag: 'THREE.JS / R3F',
    glowColor: 'cyan',
  },
  {
    icon: Users2,
    title: 'Multiplayer Squad Sync',
    subtitle: 'COOPERATIVE PRODUCTIVITY',
    description:
      'Form syndicates with fellow builders. Share sprint timers, tackle raid-tier milestones together, and celebrate task achievements in real-time.',
    tag: 'REAL-TIME ROOMS',
    glowColor: 'purple',
  },
  {
    icon: Swords,
    title: 'RPG Mission Mechanics',
    subtitle: 'LEVELS & REWARDS',
    description:
      'Convert backlog chores into high-tier operational quests. Earn credits, boost stamina streaks, and equip rare digital avatars and titles.',
    tag: 'ZOD TYPED CONTRACTS',
    glowColor: 'pink',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Data Fortress',
    subtitle: 'SUPABASE POSTGRESQL + RLS',
    description:
      'Security-first architecture. Strict Row Level Security policies safeguard user profiles, personal quests, and room states without exposing sensitive secrets.',
    tag: 'POSTGRES RLS',
    glowColor: 'cyan',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="nexus" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono tracking-widest uppercase">
          SYSTEM ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
          FOUR PILLARS OF <span className="text-cyan-400">MORPHYX</span>
        </h2>
        <p className="text-slate-400 text-base font-sans">
          Engineered as a high-performance monorepo uniting an Express API backend, strict shared
          schemas, and a responsive Three.js frontend.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl cyber-glass cyber-glass-hover relative group overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:text-purple-300 group-hover:border-purple-500/40 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-slate-950/90 text-cyan-400 border border-cyan-900/60">
                  {feature.tag}
                </span>
              </div>

              <div className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-1">
                {feature.subtitle}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>{feature.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
