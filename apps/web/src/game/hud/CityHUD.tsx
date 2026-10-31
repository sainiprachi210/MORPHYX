import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Shield, Zap, Coins } from 'lucide-react';
import { APP_NAME } from '@morphyx/shared';
import { useMissionSystem } from '../missions/MissionContext';

interface CityHUDProps {
  playerPos: [number, number, number];
}

export const CityHUD: React.FC<CityHUDProps> = ({ playerPos }) => {
  const navigate = useNavigate();
  const { playerStats, levelInfo } = useMissionSystem();

  // Zone determination based on player coords
  const getZoneName = (x: number, z: number): string => {
    if (z > 35) return 'ZENITH ECO-SANCTUARY';
    if (x < -15 && z < 0) return 'APEX FINANCIAL WARD';
    if (x > 15 && z < 0) return 'CYBERCORE TECH DISTRICT';
    if (x < -15 && z > 0) return 'METRO POSTAL COMMONS';
    if (x > 15 && z > 0) return 'HORIZON HOSPITALITY SUITES';
    return 'CENTRAL NEXUS SQUARE';
  };

  const zone = getZoneName(playerPos[0], playerPos[2]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3.5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand & Return CTA */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 rounded-lg bg-urban-olive border border-urban-sand/20 hover:border-urban-sand text-urban-stone hover:text-urban-ivory text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-urban-sm"
            title="Return to Main Landing Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hub</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg tracking-wider text-urban-ivory">
              {APP_NAME}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-urban-panel text-urban-sand border border-urban-sand/20 font-medium">
              3D OPEN WORLD
            </span>
          </div>
        </div>

        {/* Center: District Location Banner */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-urban-panel border border-urban-sand/25 shadow-urban-sm backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-urban-sand" />
          <span className="text-xs font-mono font-bold text-urban-ivory tracking-widest uppercase">
            {zone}
          </span>
          <span className="text-[10px] font-mono text-urban-stone">
            [{Math.round(playerPos[0])}, {Math.round(playerPos[2])}]
          </span>
        </div>

        {/* Right: Operative Energy, Stats, Coins & XP Progress */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Level & XP Progress Card */}
          <div className="flex flex-col justify-center px-3 py-1.5 rounded-xl bg-urban-panel/95 border border-urban-sand/25 backdrop-blur-md shadow-urban-sm text-xs font-mono">
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-urban-olive text-urban-sand font-bold text-[10px] border border-urban-sand/30">
                  LVL {levelInfo.level}
                </span>
                <span className="font-bold text-urban-ivory flex items-center gap-1">
                  <Zap className="w-3 h-3 text-urban-sand" />
                  <span>{playerStats.xp} XP</span>
                </span>
              </div>
              <span className="text-[10px] text-urban-stone font-semibold">
                {levelInfo.currentLevelXp}/{levelInfo.nextLevelXp} XP
              </span>
            </div>

            {/* XP Progress Bar */}
            <div
              className="w-28 sm:w-36 h-1.5 mt-1.5 bg-urban-olive rounded-full overflow-hidden border border-urban-sand/20"
              title={`Progress to Level ${levelInfo.level + 1}: ${levelInfo.progressPercent}% (${levelInfo.xpToNextLevel} XP needed)`}
            >
              <div
                className="h-full bg-gradient-to-r from-urban-sand via-urban-sand to-urban-terracotta rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Coins Balance */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-urban-panel/95 border border-urban-sand/25 backdrop-blur-md shadow-urban-sm text-xs font-mono font-bold text-urban-sand">
            <Coins className="w-4 h-4 text-urban-sand" />
            <span className="text-urban-ivory tracking-wide">{playerStats.coins}</span>
            <span className="hidden sm:inline text-urban-stone text-[10px] font-normal">COINS</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-urban-sand text-xs font-mono px-3 py-2 rounded-xl bg-urban-olive/90 border border-urban-terracotta/40">
            <Shield className="w-3.5 h-3.5 text-urban-terracotta" />
            <span>OPERATIVE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHUD;
