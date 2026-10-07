import React, { useState } from 'react';
import { Layers, RotateCw, Sparkles, Building2, Eye, Compass, Info, CheckCircle2 } from 'lucide-react';
import ThreeCampusViewer from './ThreeCampusViewer';
import { CAMPUS_BLOCKS } from './CampusMapSection';

export default function CampusDigitalTwin() {
  const [selectedBlockId, setSelectedBlockId] = useState('main-block');
  const selectedBlock = CAMPUS_BLOCKS.find(b => b.id === selectedBlockId) || CAMPUS_BLOCKS[1];

  return (
    <section id="digital-twin" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
                <Layers className="w-3.5 h-3.5 text-[#121212]" />
                CAMPUS MAP
              </span>
              <span className="brutal-pill bg-[#FFE500] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
                R.V.R. & J.C. 3D BIM LEVEL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
              Campus Map
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 max-w-2xl">
              An interactive 3D WebGL spatial digital twin of R.V.R. & J.C. College of Engineering. Rotate 360°, zoom, switch camera angles, inspect building architecture, and view live campus telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white brutal-border text-xs font-bold shadow-[2px_2px_0px_#121212] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Sensors Active</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#D4F6FF] brutal-border text-xs font-black shadow-[2px_2px_0px_#121212]">
              Campus Load: 68%
            </div>
          </div>
        </div>

        {/* 3D WebGL Campus Digital Twin Viewer (Direct match from user screenshot) */}
        <div className="relative rounded-3xl brutal-border shadow-[8px_8px_0px_#121212] overflow-hidden bg-[#F8F5EE]">
          <ThreeCampusViewer 
            selectedBlockId={selectedBlockId}
            onSelectBlock={(id) => setSelectedBlockId(id)}
          />
        </div>

        {/* Selected Building Details Card */}
        {selectedBlock && (
          <div className="mt-6 p-5 rounded-2xl bg-white brutal-border shadow-[4px_4px_0px_#121212] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#CCFF00] brutal-border flex items-center justify-center font-display font-black text-lg shadow-[2px_2px_0px_#121212]">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-[#FFE500] px-2 py-0.5 rounded border border-black">
                    {selectedBlock.zoneLabel}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-bold">
                    {selectedBlock.coordText}
                  </span>
                </div>
                <h4 className="font-display font-black text-base sm:text-lg text-[#121212]">
                  {selectedBlock.name}
                </h4>
                <p className="text-xs text-stone-600 font-medium max-w-2xl line-clamp-1 sm:line-clamp-none">
                  {selectedBlock.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-[#121212] text-[#CCFF00] font-mono text-xs font-bold">
                {selectedBlock.type}
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
