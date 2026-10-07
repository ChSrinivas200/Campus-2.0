import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const STATUS_STEPS = [
  'Initializing Digital Twin...',
  'Connecting Campus Copilot & Graph...',
  'Syncing Real-time Student Nodes...',
  'Campus 2.0 Ready.'
];

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // 0 -> 100% smooth counter over ~2.4s
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Cycle through status steps
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STATUS_STEPS.length);
    }, 600);

    // Skip keyboard listener
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        clearInterval(timer);
        clearInterval(stepInterval);
        setProgress(100);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    if (onComplete) onComplete();
  };

  const isLatePhase = progress >= 60;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.03, 
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 bg-[#fafaf9] select-none overflow-hidden"
    >
      {/* Background Micro Dot Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Bar: Subtitle Cross-fade & Skip Button */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
          <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            RVR&JC COE // GUNTUR
          </span>
        </div>

        {/* Phase 2 Subtitle Cross-fade */}
        <AnimatePresence mode="wait">
          {isLatePhase ? (
            <motion.div
              key="phase-2-title"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4 }}
              className="text-center hidden md:block"
            >
              <span className="font-mono text-xs font-black tracking-[0.25em] text-neutral-900 uppercase">
                BUILDING YOUR DIGITAL CAMPUS
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="phase-1-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center hidden md:block"
            >
              <span className="font-mono text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                AUTONOMOUS SYSTEM V2.6
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:text-black hover:border-black hover:bg-[#CCFF00] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Skip [Space]</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Central Cyber-Minimalist HUD Orbital Spinner */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        
        {/* Orbital Ring Cluster */}
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
          
          {/* Ambient Glowing Neon Core */}
          <div className="absolute w-16 h-16 bg-[#CCFF00] rounded-full blur-xl opacity-60 animate-pulse pointer-events-none" />
          <motion.div 
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute w-6 h-6 bg-[#CCFF00] rounded-sm border border-neutral-900 shadow-sm rotate-45"
          />

          {/* Outer Ring 1: Clockwise Smooth Easing */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
            className="absolute inset-2 sm:inset-3 rounded-full border-t-2 border-r border-neutral-900 border-b-transparent border-l-transparent"
          />

          {/* Middle Ring 2: Counter-Clockwise Dashed Arc */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
            className="absolute inset-7 sm:inset-8 rounded-full border-2 border-dashed border-neutral-400 border-t-transparent border-l-transparent opacity-75"
          />

          {/* Inner Ring 3: Counter-Clockwise Thin Accent Arc */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "linear" }}
            className="absolute inset-12 sm:inset-14 rounded-full border-b-2 border-l border-neutral-800 border-t-transparent border-r-transparent opacity-90"
          />

          {/* Brand Text Centered Inside Orbital Rings */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center pointer-events-none"
          >
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-neutral-900 drop-shadow-sm">
              CAMPUS 2.0
            </span>
          </motion.div>
        </div>

        {/* Progress Bar & Status Section */}
        <div className="flex flex-col items-center mt-6 gap-3 w-64 sm:w-72">
          
          {/* Smooth Linear Progress Line with Glowing Gradient Tail */}
          <div className="w-full h-[3px] sm:h-1 bg-neutral-200 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#a3e635] rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_#a3e635]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Stepped Status Ticker & Percentage Counter */}
          <div className="w-full flex items-center justify-between text-xs font-mono">
            <AnimatePresence mode="wait">
              <motion.span
                key={isLatePhase ? `late-${stepIndex}` : `early-${stepIndex}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.25 }}
                className="text-neutral-600 font-medium truncate max-w-[190px]"
              >
                {isLatePhase
                  ? (progress < 85 ? "Loading digital campus layer..." : STATUS_STEPS[stepIndex])
                  : STATUS_STEPS[stepIndex]
                }
              </motion.span>
            </AnimatePresence>

            <span className="font-display font-black text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200 shadow-xs">
              {progress}%
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-4">
        <span>3D WEBGL BIM // AUTONOMOUS ARCHITECTURE</span>
        <span className="font-semibold text-neutral-700">COLORIDO 2K27</span>
      </div>

    </motion.div>
  );
}
