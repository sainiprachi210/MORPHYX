import React from 'react';
import { InteractiveBuildingData } from '../types';
import { DoorOpen, Sparkles, Target, CheckCircle2 } from 'lucide-react';
import { useMissionSystem } from '../missions/MissionContext';

interface InteractionPromptProps {
  building: InteractiveBuildingData | null;
  onInteract: () => void;
}

export const InteractionPrompt: React.FC<InteractionPromptProps> = ({ building, onInteract }) => {
  const { getMissionForBuilding } = useMissionSystem();

  if (!building) return null;

  const mission = getMissionForBuilding(building.id);

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto animate-fade-in select-none">
      <div className="px-6 py-4 rounded-2xl bg-urban-panel/95 border border-urban-sand/25 shadow-urban-panel backdrop-blur-xl text-center max-w-lg min-w-[320px]">
        {/* Role & Mission Badge */}
        <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-urban-olive border border-urban-sand/20 text-[10px] font-mono text-urban-sand uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-urban-sand" />
            <span>{building.role}</span>
          </div>

          {mission && (
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold ${
                mission.status === 'COMPLETED'
                  ? 'bg-urban-olive text-urban-sage border border-urban-sage/30'
                  : mission.status === 'ACTIVE'
                  ? 'bg-urban-terracotta text-urban-ivory animate-pulse'
                  : 'bg-urban-olive text-urban-sand border border-urban-sand/30'
              }`}
            >
              {mission.status === 'COMPLETED' ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-urban-sage" />
                  <span>Mission Completed</span>
                </>
              ) : mission.status === 'ACTIVE' ? (
                <>
                  <Target className="w-3 h-3 text-urban-ivory" />
                  <span>
                    Mission In Progress ({mission.currentProgress}/{mission.totalProgress})
                  </span>
                </>
              ) : (
                <>
                  <Target className="w-3 h-3 text-urban-sand" />
                  <span>Mission: {mission.title}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Building Title */}
        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-urban-ivory tracking-wide">
          {building.name}
        </h3>

        {/* Description */}
        <p className="text-xs font-sans text-urban-stone mt-1 max-w-md line-clamp-2">
          {mission ? mission.description : building.description}
        </p>

        {/* Action Button: Clear "Press E to interact" message */}
        <button
          onClick={onInteract}
          className="mt-3.5 inline-flex items-center gap-2.5 px-6 py-2 rounded-xl bg-urban-terracotta hover:bg-[#b76c4e] text-urban-ivory font-mono font-bold text-xs uppercase tracking-wider shadow-urban-button active:scale-95 transition-all cursor-pointer border border-urban-sand/30"
          title="Press E to interact"
        >
          <span className="w-5 h-5 rounded-md bg-urban-olive text-urban-sand flex items-center justify-center font-bold text-xs border border-urban-sand/30">
            E
          </span>
          <DoorOpen className="w-4 h-4 text-urban-ivory" />
          <span>Press E to interact</span>
        </button>
      </div>
    </div>
  );
};

export default InteractionPrompt;
