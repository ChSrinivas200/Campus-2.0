import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Flame } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F5EE] transition-opacity duration-400 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
        
        {/* Top Pill Stamp */}
        <div className="brutal-pill bg-[#CCFF00] text-[#121212] mb-5 animate-bounce-subtle">
          <Flame className="w-4 h-4 text-[#FF5A1F]" />
          <span>R.V.R. & J.C. COLLEGE OF ENGINEERING</span>
        </div>

        {/* Syne Display Headline */}
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black text-[#121212] tracking-tighter leading-none">
            COLORIDO
          </h1>
          <span className="absolute -top-3 -right-6 sm:-right-8 bg-[#FF5A1F] text-white font-display font-black text-xs sm:text-sm px-2.5 py-0.5 rounded brutal-border-2 rotate-6 shadow-[2px_2px_0px_#121212]">
            2K27
          </span>
        </div>

        <p className="font-script text-xl sm:text-2xl text-[#FF5A1F] font-bold rotate-[-2deg] mb-6">
          unfiltered college fest energy!
        </p>

        <div className="font-mono text-xs font-bold text-stone-600 mb-8 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#121212]" />
          <span>Cultural & Sports Extravaganza • Digital Club</span>
        </div>

        {/* Brutalist Chunky Progress Bar */}
        <div className="w-full max-w-md h-5 bg-white brutal-border rounded-full overflow-hidden p-0.5 shadow-[3px_3px_0px_#121212] relative">
          <div
            className="h-full bg-[#CCFF00] rounded-full transition-all duration-75 ease-out brutal-border-2 border-r-0"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full max-w-md flex justify-between items-center mt-3 text-xs font-mono font-bold text-[#121212]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
            Loading Festival Canvas...
          </span>
          <span className="font-display font-black text-sm">{progress}%</span>
        </div>

      </div>
    </div>
  );
}
