import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  HelpCircle,
  Settings,
  X,
  Volume2,
  VolumeX,
  Sliders,
  RotateCcw,
  Sparkles,
  Compass,
  CheckCircle2,
  Keyboard,
  Shield,
  Monitor,
} from 'lucide-react';
import { APP_VERSION } from '@morphyx/shared';

const SETTINGS_KEY = 'morphyx_settings_v1';
const MISSION_STORAGE_KEY = 'morphyx_mission_state_v2';

interface GameSettingsState {
  soundEnabled: boolean;
  cameraSensitivity: 'Slow' | 'Normal' | 'Fast';
  graphicsQuality: 'Balanced' | 'High';
}

const DEFAULT_SETTINGS: GameSettingsState = {
  soundEnabled: true,
  cameraSensitivity: 'Normal',
  graphicsQuality: 'High',
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [resetConfirmed, setResetConfirmed] = useState<boolean>(false);

  const [settings, setSettings] = useState<GameSettingsState>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      // Fallback to default
    }
    return DEFAULT_SETTINGS;
  });

  // Persist settings to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, [settings]);

  // Escape key closes open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowHowToPlay(false);
        setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResetData = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(MISSION_STORAGE_KEY);
      setResetConfirmed(true);
      setTimeout(() => setResetConfirmed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-urban-olive text-urban-ivory relative overflow-hidden select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,199,161,0.08)_0%,rgba(37,41,35,0.95)_75%)] pointer-events-none" />

      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(214,199,161,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(214,199,161,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-urban-panel border border-urban-sand/30 flex items-center justify-center text-urban-sand">
            <Compass className="w-4 h-4 text-urban-sand" />
          </div>
          <span className="font-display font-bold text-sm tracking-wider text-urban-ivory">
            MORPHYX
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-urban-panel text-urban-sand border border-urban-sand/20">
            v{APP_VERSION}
          </span>
        </div>
      </header>

      {/* Center Hero Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-6 py-8 flex flex-col items-center text-center">
        {/* Brand Title and Tagline */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-urban-panel border border-urban-sand/25 text-urban-sand text-xs font-mono tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-urban-sand" />
            <span>3D OPEN WORLD</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight text-urban-ivory">
            MORPHYX
          </h1>

          <p className="text-lg sm:text-xl text-urban-sand font-medium italic tracking-wide font-sans mt-2">
            Your city. Your missions. Your progress.
          </p>

          <p className="text-xs sm:text-sm text-urban-stone max-w-md mx-auto pt-2 font-sans leading-relaxed">
            Explore a living 3D open-world city. Complete real productivity missions, organize
            transmissions, balance ledgers, and build your focus streak.
          </p>
        </div>

        {/* 3 Main Options */}
        <div className="w-full space-y-3.5">
          {/* Option 1: PLAY GAME (Main Prominent Button) */}
          <button
            onClick={() => navigate('/city')}
            className="w-full py-4 sm:py-4.5 px-8 rounded-2xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-display font-extrabold text-lg sm:text-xl tracking-wider uppercase shadow-urban-button transition-all duration-200 transform hover:-translate-y-0.5 border border-urban-sand/35 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-urban-ivory text-urban-ivory transition-transform group-hover:scale-110" />
            <span>PLAY GAME</span>
            <span className="text-base text-urban-sand transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* Option 2: HOW TO PLAY */}
          <button
            onClick={() => setShowHowToPlay(true)}
            className="w-full py-3.5 px-6 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/25 text-urban-ivory hover:text-urban-sand font-mono font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-urban-sm"
          >
            <HelpCircle className="w-4 h-4 text-urban-sand" />
            <span>HOW TO PLAY</span>
          </button>

          {/* Option 3: SETTINGS */}
          <button
            onClick={() => setShowSettings(true)}
            className="w-full py-3.5 px-6 rounded-xl bg-urban-panel hover:bg-urban-olive border border-urban-sand/25 text-urban-stone hover:text-urban-ivory font-mono font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-urban-sm"
          >
            <Settings className="w-4 h-4 text-urban-sand" />
            <span>SETTINGS</span>
          </button>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 text-center text-xs font-mono text-urban-stone/80">
        <span>MORPHYX • Explore Mode & Productivity Missions • Zero external accounts required</span>
      </footer>

      {/* ======================================================== */}
      {/* MODAL 1: HOW TO PLAY                                     */}
      {/* ======================================================== */}
      {showHowToPlay && (
        <div
          onClick={e => {
            if (e.target === e.currentTarget) setShowHowToPlay(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none"
        >
          <div className="relative w-full max-w-xl bg-urban-panel rounded-2xl border border-urban-sand/30 shadow-urban-panel p-6 overflow-y-auto max-h-[85vh] space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-urban-sand/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-urban-olive border border-urban-sand/25 flex items-center justify-center text-urban-sand">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-urban-ivory">
                    HOW TO PLAY MORPHYX
                  </h3>
                  <p className="text-[11px] font-mono text-urban-stone">
                    Movement, camera, and productivity mission overview
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHowToPlay(false)}
                className="p-1.5 rounded-lg bg-urban-olive hover:bg-urban-panel text-urban-stone hover:text-urban-ivory border border-urban-sand/20 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Section 1: Movement Controls */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-urban-sand font-bold uppercase tracking-wider">
                <Keyboard className="w-3.5 h-3.5" />
                <span>1. Controls & Navigation</span>
              </div>

              <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-urban-stone">Move Player:</span>
                  <span className="px-1.5 py-0.5 rounded bg-urban-panel text-urban-ivory border border-urban-sand/20 font-bold">
                    W A S D / Arrows
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-urban-stone">Sprint:</span>
                  <span className="px-1.5 py-0.5 rounded bg-urban-panel text-urban-ivory border border-urban-sand/20 font-bold">
                    Shift
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-urban-stone">Orbit Camera:</span>
                  <span className="px-1.5 py-0.5 rounded bg-urban-panel text-urban-ivory border border-urban-sand/20 font-bold">
                    Mouse Drag
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-urban-sand font-bold">Interact:</span>
                  <span className="px-2 py-0.5 rounded bg-urban-terracotta text-urban-ivory font-bold">
                    E
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section 2: Productivity Missions */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-urban-sand font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. The 3 Playable Missions</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-urban-olive border border-urban-sand/15">
                  <div className="flex items-center justify-between text-urban-ivory font-bold mb-0.5">
                    <span>Post Office → Inbox Zero</span>
                    <span className="text-urban-sand text-[11px]">+150 XP</span>
                  </div>
                  <p className="text-[11px] text-urban-stone font-sans">
                    Categorize 5 incoming communications into Work, Personal, or Important.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-urban-olive border border-urban-sand/15">
                  <div className="flex items-center justify-between text-urban-ivory font-bold mb-0.5">
                    <span>Bank → Budget Master</span>
                    <span className="text-urban-sand text-[11px]">+200 XP</span>
                  </div>
                  <p className="text-[11px] text-urban-stone font-sans">
                    Categorize 5 expenditures into operations, software, or equipment and inspect
                    your spending summary.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-urban-olive border border-urban-sand/15">
                  <div className="flex items-center justify-between text-urban-ivory font-bold mb-0.5">
                    <span>Tech Office → File Organizer</span>
                    <span className="text-urban-sand text-[11px]">+175 XP</span>
                  </div>
                  <p className="text-[11px] text-urban-stone font-sans">
                    Sort 5 unorganized repository files into `/src`, `/docs`, `/assets`, `/tests`, or
                    `/config`.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section 3: Modes */}
            <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 text-xs font-sans text-urban-stone leading-relaxed space-y-1">
              <div className="font-mono font-bold text-urban-ivory flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-urban-sage" />
                <span>Explore Mode & Persistence</span>
              </div>
              <p>
                You can explore the city at any time without accepting missions. All mission progress
                and rewards are saved locally in your browser so you can resume anytime.
              </p>
            </div>

            {/* Action Bottom */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="px-4 py-2 rounded-xl bg-urban-olive hover:bg-urban-panel border border-urban-sand/20 text-xs font-mono text-urban-stone hover:text-urban-ivory transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowHowToPlay(false);
                  navigate('/city');
                }}
                className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-xs font-mono font-bold text-urban-ivory shadow-urban-button transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Play Game Now</span>
                <Play className="w-3.5 h-3.5 fill-urban-ivory" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: SETTINGS                                        */}
      {/* ======================================================== */}
      {showSettings && (
        <div
          onClick={e => {
            if (e.target === e.currentTarget) setShowSettings(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none"
        >
          <div className="relative w-full max-w-md bg-urban-panel rounded-2xl border border-urban-sand/30 shadow-urban-panel p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-urban-sand/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-urban-olive border border-urban-sand/25 flex items-center justify-center text-urban-sand">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-urban-ivory">GAME SETTINGS</h3>
                  <p className="text-[11px] font-mono text-urban-stone">
                    Configure sound, controls, and session data
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-lg bg-urban-olive hover:bg-urban-panel text-urban-stone hover:text-urban-ivory border border-urban-sand/20 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option 1: Ambient Audio Toggle */}
            <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-urban-ivory font-bold">
                {settings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-urban-sand" />
                ) : (
                  <VolumeX className="w-4 h-4 text-urban-stone" />
                )}
                <span>Ambient City Sounds</span>
              </div>
              <button
                onClick={() =>
                  setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  settings.soundEnabled
                    ? 'bg-urban-terracotta text-urban-ivory'
                    : 'bg-urban-panel text-urban-stone border border-urban-sand/20'
                }`}
              >
                {settings.soundEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>

            {/* Option 2: Camera Sensitivity */}
            <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 space-y-2 text-xs font-mono">
              <div className="text-urban-ivory font-bold flex items-center justify-between">
                <span>Camera Orbit Sensitivity</span>
                <span className="text-urban-sand">{settings.cameraSensitivity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Slow', 'Normal', 'Fast'] as const).map(sens => (
                  <button
                    key={sens}
                    onClick={() => setSettings(prev => ({ ...prev, cameraSensitivity: sens }))}
                    className={`py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                      settings.cameraSensitivity === sens
                        ? 'bg-urban-terracotta text-urban-ivory font-bold border border-urban-sand/30'
                        : 'bg-urban-panel hover:bg-urban-olive text-urban-stone border border-urban-sand/15'
                    }`}
                  >
                    {sens}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 3: Graphics Preset */}
            <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 space-y-2 text-xs font-mono">
              <div className="text-urban-ivory font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-urban-sand" />
                  <span>Visual Quality</span>
                </span>
                <span className="text-urban-sand">{settings.graphicsQuality}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Balanced', 'High'] as const).map(preset => (
                  <button
                    key={preset}
                    onClick={() => setSettings(prev => ({ ...prev, graphicsQuality: preset }))}
                    className={`py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                      settings.graphicsQuality === preset
                        ? 'bg-urban-terracotta text-urban-ivory font-bold border border-urban-sand/30'
                        : 'bg-urban-panel hover:bg-urban-olive text-urban-stone border border-urban-sand/15'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 4: Reset Demo Data */}
            <div className="p-3.5 rounded-xl bg-urban-olive border border-urban-sand/15 space-y-2 text-xs font-mono">
              <div className="text-urban-ivory font-bold flex items-center justify-between">
                <span>Mission Progress Data</span>
                {resetConfirmed && (
                  <span className="text-urban-sage font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reset!</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-urban-stone font-sans">
                Clears locally stored mission progress so you can replay all 3 demo missions from scratch.
              </p>
              <button
                onClick={handleResetData}
                className="w-full py-2 rounded-lg bg-urban-panel hover:bg-urban-olive border border-urban-sand/20 text-urban-stone hover:text-urban-ivory text-xs font-mono font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-urban-sand" />
                <span>Reset Demo Mission Progress</span>
              </button>
            </div>

            {/* Action Bottom */}
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-xs font-mono font-bold text-urban-ivory shadow-urban-button transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
