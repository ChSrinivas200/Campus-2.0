import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Flame, Trophy, Zap, Star, Radio, Volume2 } from 'lucide-react';

export default function FloatingDecorativeStickers({ containerRef }) {
  // Mouse parallax position
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [keyReset, setKeyReset] = useState(0);
  const [draggedCount, setDraggedCount] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse offset from screen center (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleReset = () => {
    setKeyReset(prev => prev + 1);
    setDraggedCount(0);
  };

  return (
    <div key={keyReset} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* 1. Retro Space Rocket Blast-Off Sticker (Top Right) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.1, rotate: 12, cursor: 'grab' }}
        whileDrag={{ scale: 1.22, rotate: -15, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * -24}px, ${mouseOffset.y * -20}px)`,
        }}
        className="pointer-events-auto absolute top-6 right-3 sm:top-10 sm:right-12 md:right-16 cursor-grab transition-transform duration-300 ease-out"
      >
        <div className="animate-float-fast relative group">
          <div className="bg-[#FFE500] text-[#121212] px-3.5 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] flex items-center gap-2 rotate-6 group-hover:rotate-0 transition-transform">
            <span className="text-2xl filter drop-shadow">🚀</span>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs tracking-tight">LAUNCH 2K27</div>
              <div className="font-mono text-[9px] font-bold text-stone-700 uppercase">Feb 26 Blast-off</div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
          </div>
          <span className="absolute -bottom-2 -left-2 text-[10px] font-mono font-bold bg-[#121212] text-[#CCFF00] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
            drag me!
          </span>
        </div>
      </motion.div>

      {/* 2. Colorido Tour Kombi Van Sticker (Top Left) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.1, rotate: -8, cursor: 'grab' }}
        whileDrag={{ scale: 1.2, rotate: 10, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 18}px)`,
        }}
        className="pointer-events-auto absolute top-8 left-3 sm:top-12 sm:left-8 md:left-14 cursor-grab transition-transform duration-300 ease-out"
      >
        <div className="animate-float-slow relative group">
          <div className="bg-[#CCFF00] text-[#121212] px-3.5 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] flex items-center gap-2 -rotate-6 group-hover:rotate-0 transition-transform">
            <span className="text-2xl">🚐</span>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs tracking-tight uppercase">COLORIDO EXPRESS</div>
              <div className="font-mono text-[9px] font-bold text-stone-700">RVR & JC CAMPUS TRIP</div>
            </div>
          </div>
          <span className="absolute -bottom-2 -right-2 text-[10px] font-mono font-bold bg-[#121212] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
            drag me!
          </span>
        </div>
      </motion.div>

      {/* 3. Loudspeaker / Megaphone Hype Broadcast (Center-Right Floating) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.12, rotate: 10, cursor: 'grab' }}
        whileDrag={{ scale: 1.25, rotate: -8, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * -16}px, ${mouseOffset.y * 22}px)`,
        }}
        className="pointer-events-auto absolute top-1/3 -right-2 sm:right-6 md:right-10 cursor-grab hidden sm:block transition-transform duration-300 ease-out"
      >
        <div className="animate-float-medium relative group">
          <div className="bg-[#FF5A1F] text-white px-3.5 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] flex items-center gap-2 rotate-12 group-hover:rotate-0 transition-transform">
            <span className="text-2xl animate-pulse">📢</span>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs text-[#CCFF00] tracking-wide">38+ CONTESTS</div>
              <div className="font-mono text-[9px] font-extrabold uppercase">LOUD & LIVE AT OAT</div>
            </div>
          </div>
          <span className="absolute -top-3 left-2 text-[10px] font-mono font-bold bg-[#CCFF00] text-[#121212] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
            grab me!
          </span>
        </div>
      </motion.div>

      {/* 4. Neon Lightning Bolt Spark (Mid-Left Floating) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.15, rotate: -15, cursor: 'grab' }}
        whileDrag={{ scale: 1.25, rotate: 15, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * 28}px, ${mouseOffset.y * -16}px)`,
        }}
        className="pointer-events-auto absolute top-2/5 -left-1 sm:left-4 md:left-8 cursor-grab hidden sm:block transition-transform duration-300 ease-out"
      >
        <div className="animate-float-reverse relative group">
          <div className="bg-[#F8F5EE] text-[#121212] px-3 py-1.5 rounded-full brutal-border shadow-[3.5px_3.5px_0px_#121212] flex items-center gap-1.5 -rotate-12 group-hover:rotate-0 transition-transform">
            <span className="text-xl">⚡</span>
            <span className="font-display font-black text-[11px] text-[#FF5A1F] uppercase">100% HYPED</span>
          </div>
        </div>
      </motion.div>

      {/* 5. Golden Cash Pool Star Trophy (Lower-Right Floating) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.12, rotate: -6, cursor: 'grab' }}
        whileDrag={{ scale: 1.25, rotate: 8, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * -20}px, ${mouseOffset.y * -18}px)`,
        }}
        className="pointer-events-auto absolute bottom-28 right-4 sm:bottom-32 sm:right-10 md:right-20 cursor-grab hidden md:block transition-transform duration-300 ease-out"
      >
        <div className="animate-float-slow relative group">
          <div className="bg-[#D4F6FF] text-[#121212] px-3.5 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] flex items-center gap-2 -rotate-3 group-hover:rotate-0 transition-transform">
            <span className="text-2xl">🏆</span>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs text-[#121212]">₹1.5L+ CASH</div>
              <div className="font-mono text-[9px] font-bold text-stone-600">INSTANT MEDALS</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6. Retro Cassette Tape / Music Clash (Lower-Left Floating) */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => setDraggedCount(c => c + 1)}
        whileHover={{ scale: 1.12, rotate: 10, cursor: 'grab' }}
        whileDrag={{ scale: 1.25, rotate: -12, cursor: 'grabbing', zIndex: 40 }}
        style={{
          transform: `translate(${mouseOffset.x * 22}px, ${mouseOffset.y * 24}px)`,
        }}
        className="pointer-events-auto absolute bottom-24 left-3 sm:bottom-28 sm:left-8 md:left-16 cursor-grab hidden md:block transition-transform duration-300 ease-out"
      >
        <div className="animate-float-fast relative group">
          <div className="bg-[#FEE7EA] text-[#5C1D24] px-3.5 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] flex items-center gap-2 rotate-8 group-hover:rotate-0 transition-transform">
            <span className="text-2xl">📻</span>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs text-[#5C1D24]">BAND BATTLE</div>
              <div className="font-mono text-[9px] font-extrabold uppercase">SILVER JUBILEE</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Sticker Counter & Reset Control Badge */}
      {draggedCount > 0 && (
        <div className="pointer-events-auto absolute top-2 right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0 z-30 animate-fadeIn">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#121212] font-display font-black text-[11px] brutal-border shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-colors cursor-pointer"
            title="Snap stickers back to original orbits"
          >
            <RotateCcw className="w-3 h-3 text-[#FF5A1F]" />
            <span>Reset Stickers ({draggedCount} moved)</span>
          </button>
        </div>
      )}

    </div>
  );
}
