import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Sparkles, 
  Building2, 
  Eye, 
  Compass, 
  Info, 
  CheckCircle2,
  MapPin,
  Zap,
  Activity,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeCampusViewer from './ThreeCampusViewer';
import { CAMPUS_BLOCKS } from './CampusMapSection';
import { sound } from '../utils/soundEffects';

export default function CampusDigitalTwin() {
  const [selectedBlockId, setSelectedBlockId] = useState('main-block');
  const [filterType, setFilterType] = useState('all');

  const selectedBlock = CAMPUS_BLOCKS.find(b => b.id === selectedBlockId) || CAMPUS_BLOCKS[1];

  const quickBlocks = [
    { id: 'main-block', label: 'Main Admin Block', icon: '🏛️', type: 'admin' },
    { id: 'sjb-block', label: 'Silver Jubilee (CS/IT)', icon: '💻', type: 'academic' },
    { id: 'library-block', label: 'Central Library Deck', icon: '📚', type: 'facility' },
    { id: 'mech-block', label: 'Hi-Tech & Mechanical', icon: '⚙️', type: 'academic' },
    { id: 'canteen-block', label: 'Food Court & Dining', icon: '🍽️', type: 'facility' },
    { id: 'oat-stage', label: 'OAT Amphitheatre', icon: '🎭', type: 'fest' },
  ];

  const handleSelectBlock = (id) => {
    sound.playPop();
    setSelectedBlockId(id);
  };

  return (
    <section id="digital-twin" className="py-8 md:py-12 bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#121212] p-4 sm:p-6 lg:p-8">
      <div>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
                <Layers className="w-3.5 h-3.5 text-[#121212]" />
                CAMPUS MAP
              </span>
              <span className="brutal-pill bg-[#FFE500] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
                R.V.R. & J.C. 3D BIM LEVEL
              </span>
              <span className="brutal-pill bg-[#EFF6FF] text-[#1D4ED8] text-xs font-black shadow-[2px_2px_0px_#121212]">
                60 FPS WEBGL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
              Campus Map
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 max-w-2xl">
              An interactive 3D WebGL spatial digital twin of R.V.R. & J.C. College of Engineering. Rotate 360°, zoom, switch camera angles, inspect building architecture, and view live campus telemetry.
            </p>
          </div>

          {/* Live Telemetry Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3.5 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold shadow-[2px_2px_0px_#121212] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sensors Online (14 Nodes)</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#CCFF00] border-2 border-black text-xs font-black shadow-[2px_2px_0px_#121212]">
              Campus Load: 68%
            </div>
          </div>
        </div>

        {/* Quick Building Selector Ribbon */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono font-bold text-stone-500 uppercase shrink-0 mr-1">
            Focus Block:
          </span>
          {quickBlocks.map((b) => {
            const isSelected = selectedBlockId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBlock(b.id)}
                className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#121212] text-white border-black shadow-[2px_2px_0px_#CCFF00] -translate-y-0.5'
                    : 'bg-stone-50 text-stone-700 border-black/15 hover:border-black hover:bg-white'
                }`}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D WebGL Campus Digital Twin Viewer */}
        <div className="relative rounded-2xl border-2 border-black shadow-[6px_6px_0px_#121212] overflow-hidden bg-[#F8F5EE]">
          <ThreeCampusViewer 
            selectedBlockId={selectedBlockId}
            onSelectBlock={(id) => handleSelectBlock(id)}
          />
        </div>

        {/* Selected Building Details Card with Smooth Spring Transitions */}
        <AnimatePresence mode="wait">
          {selectedBlock && (
            <motion.div 
              key={selectedBlock.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 p-5 rounded-2xl bg-[#F8F5EE] border-2 border-black shadow-[4px_4px_0px_#121212] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00] border-2 border-black flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#121212] shrink-0">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold bg-[#FFE500] px-2 py-0.5 rounded border border-black">
                      {selectedBlock.zoneLabel || 'Campus Core'}
                    </span>
                    <span className="text-[10px] font-mono text-stone-600 font-bold">
                      {selectedBlock.coordText || 'Zone A'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Telemetry: 98% Optimal
                    </span>
                  </div>
                  <h4 className="font-display font-black text-lg text-[#121212] mt-0.5">
                    {selectedBlock.name}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium max-w-2xl line-clamp-2">
                    {selectedBlock.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-[#121212] text-[#CCFF00] font-mono text-xs font-bold border border-black shadow-xs">
                  {selectedBlock.type}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
