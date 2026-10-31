import React, { useState } from 'react';
import { useMissionSystem } from '../missions/MissionContext';
import { Target, ChevronDown, ChevronUp, MapPin, CheckCircle2, Award, Zap } from 'lucide-react';

export const MissionTracker: React.FC = () => {
  const { activeMission, missions } = useMissionSystem();
  const [collapsed, setCollapsed] = useState(false);

  const completedCount = Object.values(missions).filter(m => m.status === 'COMPLETED').length;

  return (
    <div className="fixed top-16 left-5 z-40 select-none font-mono text-xs max-w-[280px] pointer-events-auto">
      <div className="bg-urban-panel/95 rounded-xl border border-urban-sand/25 shadow-urban-panel backdrop-blur-md overflow-hidden">
        {/* Header toggle bar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full px-3 py-2 bg-urban-olive border-b border-urban-sand/20 flex items-center justify-between text-urban-sand hover:text-urban-ivory transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-urban-sand animate-pulse" />
            <span className="font-bold tracking-wider text-[11px]">
              {activeMission ? 'ACTIVE DIRECTIVE' : 'CITY MISSIONS'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-urban-stone font-semibold">
              {completedCount}/3 Done
            </span>
            {collapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </div>
        </button>

        {/* Tracker Body */}
        {!collapsed && (
          <div className="p-3 bg-urban-panel space-y-2.5">
            {activeMission ? (
              <>
                {/* Active Mission Details */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-urban-sand font-bold uppercase tracking-wider">
                      {activeMission.category}
                    </span>
                    <span className="text-[10px] text-urban-stone">
                      +{activeMission.xpReward} XP
                    </span>
                  </div>
                  <h4 className="text-xs font-display font-bold text-urban-ivory mt-0.5">
                    {activeMission.title}
                  </h4>
                </div>

                {/* Progress Bar & Counter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-urban-stone">
                    <span>Progress</span>
                    <span className="text-urban-sand font-bold">
                      {activeMission.currentProgress} / {activeMission.totalProgress}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-urban-olive overflow-hidden border border-urban-sand/15">
                    <div
                      className="h-full bg-gradient-to-r from-urban-terracotta to-urban-sand transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (activeMission.currentProgress / activeMission.totalProgress) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Objective Description */}
                <p className="text-[11px] text-urban-stone/90 font-sans leading-tight">
                  {activeMission.objectiveSummary}
                </p>

                {/* Location Waypoint info */}
                <div className="pt-1.5 border-t border-urban-sand/15 flex items-center justify-between text-[10px] text-urban-stone">
                  <span className="flex items-center gap-1 text-urban-sand">
                    <MapPin className="w-3 h-3 text-urban-sand" />
                    <span>{activeMission.buildingName}</span>
                  </span>
                  <span>Press E at site</span>
                </div>
              </>
            ) : (
              /* No Active Mission Available state */
              <div className="space-y-2">
                <p className="text-[11px] text-urban-stone font-sans leading-relaxed">
                  No active directive selected. Approach an interactive landmark and press{' '}
                  <kbd className="px-1 py-0.2 rounded bg-urban-olive text-urban-sand border border-urban-sand/20">
                    E
                  </kbd>{' '}
                  to accept:
                </p>

                <div className="space-y-1 text-[11px]">
                  {Object.values(missions).map(m => (
                    <div
                      key={m.id}
                      className="p-1.5 rounded-lg bg-urban-olive border border-urban-sand/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        {m.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-3 h-3 text-urban-sage" />
                        ) : (
                          <Zap className="w-3 h-3 text-urban-sand" />
                        )}
                        <span
                          className={
                            m.status === 'COMPLETED'
                              ? 'line-through text-urban-stone'
                              : 'text-urban-ivory'
                          }
                        >
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-urban-stone">{m.buildingName}</span>
                    </div>
                  ))}
                </div>

                {completedCount === 3 && (
                  <div className="p-2 rounded-lg bg-urban-olive border border-urban-sage/30 text-center text-urban-sage text-[10px] flex items-center justify-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>ALL SPRINT DIRECTIVES COMPLETED!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionTracker;
