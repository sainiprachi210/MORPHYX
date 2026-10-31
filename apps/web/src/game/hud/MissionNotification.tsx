import React, { useEffect } from 'react';
import { useMissionSystem } from '../missions/MissionContext';
import { Award, Zap, Coins, X, CheckCircle2, Sparkles } from 'lucide-react';

export const MissionNotification: React.FC = () => {
  const { notification, dismissNotification } = useMissionSystem();

  // Auto-dismiss notification after 7 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      dismissNotification();
    }, 7000);
    return () => clearTimeout(timer);
  }, [notification, dismissNotification]);

  if (!notification) return null;

  return (
    <div className="fixed top-16 right-5 z-50 max-w-sm w-full pointer-events-auto animate-bounce-in select-none">
      <div className="p-4 rounded-2xl bg-urban-panel/95 border border-urban-sand/35 shadow-urban-panel backdrop-blur-xl relative overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-urban-sand via-urban-terracotta to-urban-sage" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-urban-olive border border-urban-sand/25 flex items-center justify-center text-urban-sand flex-shrink-0">
              <Award className="w-5 h-5 text-urban-sand" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-urban-sage font-bold tracking-widest uppercase">
                <CheckCircle2 className="w-3 h-3 text-urban-sage" />
                <span>MISSION ACCOMPLISHED</span>
              </div>
              <h4 className="text-sm font-display font-bold text-urban-ivory mt-0.5">
                {notification.title}
              </h4>
            </div>
          </div>

          <button
            onClick={dismissNotification}
            className="p-1 rounded-lg text-urban-stone hover:text-urban-ivory hover:bg-urban-olive transition-colors cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Level Up Banner if applicable */}
        {notification.leveledUp && (
          <div className="mt-3 p-2 rounded-xl bg-urban-terracotta/20 border border-urban-terracotta/40 flex items-center gap-2 text-urban-sand text-xs font-mono font-bold animate-pulse">
            <Sparkles className="w-4 h-4 text-urban-sand flex-shrink-0" />
            <span>LEVEL UP! PROMOTED TO LEVEL {notification.newLevel}</span>
          </div>
        )}

        {/* Rewards Breakdown Badges */}
        <div className="mt-3 pt-3 border-t border-urban-sand/15 flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-md bg-urban-olive border border-urban-sand/20 text-urban-sand flex items-center gap-1 font-bold">
            <Zap className="w-3 h-3 text-urban-sand" />
            <span>+{notification.xpEarned} XP</span>
          </div>

          <div className="px-2.5 py-1 rounded-md bg-urban-olive border border-urban-sand/25 text-urban-sand flex items-center gap-1 font-bold">
            <Coins className="w-3 h-3 text-urban-sand" />
            <span>+{notification.coinsEarned || notification.creditsEarned} Coins</span>
          </div>

          <div className="px-2.5 py-1 rounded-md bg-urban-olive border border-urban-sage/30 text-urban-sage flex items-center gap-1 text-[11px]">
            <Award className="w-3 h-3 text-urban-sage" />
            <span>{notification.badgeName}</span>
          </div>
        </div>

        <div className="mt-2 text-[10px] font-mono text-urban-stone/80 text-right">
          Synced to operative profile • {notification.timestamp}
        </div>
      </div>
    </div>
  );
};

export default MissionNotification;
