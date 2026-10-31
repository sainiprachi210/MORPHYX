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
    <section id="nexus" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-urban-sand/15">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-urban-panel border border-urban-sand/25 text-urban-sand text-xs font-mono tracking-widest uppercase">
          SYSTEM ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-urban-ivory tracking-wide">
          FOUR PILLARS OF <span className="text-urban-sand">MORPHYX</span>
        </h2>
        <p className="text-urban-stone text-base font-sans">
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
              className="p-8 rounded-2xl bg-urban-panel border border-urban-sand/20 hover:border-urban-sand/40 shadow-urban-panel transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-urban-olive border border-urban-sand/25 flex items-center justify-center text-urban-sand group-hover:text-urban-terracotta group-hover:border-urban-terracotta/40 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-urban-olive text-urban-sand border border-urban-sand/20">
                  {feature.tag}
                </span>
              </div>

              <div className="text-xs font-mono text-urban-sage tracking-wider uppercase mb-1">
                {feature.subtitle}
              </div>
              <h3 className="text-xl font-display font-bold text-urban-ivory mb-3 group-hover:text-urban-sand transition-colors flex items-center gap-2">
                <span>{feature.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-urban-sand" />
              </h3>
              <p className="text-urban-stone text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
