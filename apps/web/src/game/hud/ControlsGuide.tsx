import React, { useState } from 'react';
import { Keyboard, ChevronDown, ChevronUp } from 'lucide-react';

export const ControlsGuide: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 font-mono text-xs select-none">
      <div className="bg-urban-panel rounded-xl border border-urban-sand/25 overflow-hidden shadow-urban-panel backdrop-blur-md">
        {/* Header Bar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full px-3 py-2 bg-urban-olive border-b border-urban-sand/20 flex items-center justify-between text-urban-sand hover:text-urban-ivory transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Keyboard className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider text-[11px]">CONTROLS GUIDE</span>
          </div>
          {collapsed ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Content */}
        {!collapsed && (
          <div className="p-3 space-y-2 text-urban-ivory bg-urban-panel min-w-[210px]">
            <div className="flex items-center justify-between">
              <span className="text-urban-stone">Move:</span>
              <span className="text-urban-ivory bg-urban-olive px-1.5 py-0.5 rounded border border-urban-sand/20">
                W A S D / Arrows
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-urban-stone">Sprint:</span>
              <span className="text-urban-ivory bg-urban-olive px-1.5 py-0.5 rounded border border-urban-sand/20">
                Shift
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-urban-stone">Look / Orbit:</span>
              <span className="text-urban-ivory bg-urban-olive px-1.5 py-0.5 rounded border border-urban-sand/20">
                Mouse Drag
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-urban-sand font-semibold">Interact:</span>
              <span className="text-urban-ivory bg-urban-terracotta px-2 py-0.5 rounded border border-urban-sand/30 font-bold">
                E
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-urban-stone">Close Panel:</span>
              <span className="text-urban-ivory bg-urban-olive px-1.5 py-0.5 rounded border border-urban-sand/20">
                Esc
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsGuide;
