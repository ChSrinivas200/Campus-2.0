import React, { useState, useEffect } from 'react';
import { Cpu, Layers, Sparkles, ShieldCheck, Terminal, ArrowRight, Zap, Radio } from 'lucide-react';

const BOOT_STEPS = [
  { text: 'Mounting RVR&JC Spatial Mesh & WebGL Engines...', icon: Layers },
  { text: 'Connecting Campus Telemetry & IoT Sensor Grid...', icon: Radio },
  { text: 'Booting Campus Bot Core & Autonomous Reasoning...', icon: Cpu },
  { text: 'Syncing Colorido 2K27 Events & Digital Passes...', icon: Zap },
  { text: 'Campus 2.0 Operating System Online.', icon: ShieldCheck }
];

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const totalDuration = 2200; // 2.2s snappy high-impact boot
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setProgress(rawProgress);

      const stepIndex = Math.min(
        BOOT_STEPS.length - 1,
        Math.floor((rawProgress / 100) * BOOT_STEPS.length)
      );
      setCurrentStepIndex(stepIndex);

      if (rawProgress >= 100) {
        clearInterval(interval);
        handleFinish();
      }
    }, 25);

    // Keyboard shortcut to skip immediately
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  const CurrentStepIcon = BOOT_STEPS[currentStepIndex].icon;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 bg-[#F8F5EE] select-none transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Micro Tech Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#121212 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-xs font-black uppercase text-[#121212] tracking-wider">
            SYS: BOOTING
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white brutal-border text-[11px] font-mono font-bold shadow-[2px_2px_0px_#121212]">
            RVR&JC COE // GUNTUR
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FFE500] brutal-border text-[11px] font-mono font-black shadow-[2px_2px_0px_#121212]">
            NODE: LIVE
          </span>
        </div>

        <button
          onClick={handleFinish}
          className="text-xs font-mono font-black px-3.5 py-1.5 rounded-xl bg-white brutal-border hover:bg-[#CCFF00] shadow-[2px_2px_0px_#121212] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Skip [Space]</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Hero Identity Showcase */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto px-4">
        
        {/* Academic Institution Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white brutal-border shadow-[3px_3px_0px_#121212] mb-6">
          <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
          <span className="text-xs sm:text-sm font-display font-black tracking-wide text-[#121212]">
            R.V.R. & J.C. COLLEGE OF ENGINEERING
          </span>
        </div>

        {/* Brand Display Mark */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#121212]">
            CAMPUS
          </span>
          <span className="bg-[#CCFF00] text-[#121212] font-display font-black text-2xl sm:text-4xl md:text-5xl px-3 sm:px-5 py-1 sm:py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] rotate-[-2deg] animate-pulse">
            2.0
          </span>
        </div>

        {/* Subtitle Definition */}
        <p className="text-stone-700 font-display font-bold text-sm sm:text-base md:text-lg mb-8 max-w-lg leading-relaxed">
          Autonomous Living Campus Operating System & Colorido 2K27 Portal
        </p>

        {/* Interactive Terminal Telemetry Stream */}
        <div className="w-full max-w-md bg-[#121212] rounded-2xl p-4 text-left shadow-[5px_5px_0px_#CCFF00] brutal-border mb-6">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] font-mono text-stone-400">
            <span className="flex items-center gap-1.5 text-[#CCFF00]">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL SEQUENCE</span>
            </span>
            <span>STEP 0{currentStepIndex + 1}/05</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-white min-h-[28px]">
            <CurrentStepIcon className="w-4 h-4 text-[#CCFF00] shrink-0" />
            <span className="truncate text-stone-100">
              {BOOT_STEPS[currentStepIndex].text}
            </span>
          </div>
        </div>

        {/* Brutalist Chunky Progress Bar */}
        <div className="w-full max-w-md h-5 sm:h-6 bg-white brutal-border rounded-full overflow-hidden p-0.5 shadow-[4px_4px_0px_#121212] relative">
          <div
            className="h-full bg-[#CCFF00] rounded-full transition-all duration-75 ease-out brutal-border-2 border-r-0 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Percentage Counter */}
        <div className="w-full max-w-md flex justify-between items-center mt-3 text-xs font-mono font-black text-[#121212]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
            <span>INITIALIZING PLATFORM</span>
          </span>
          <span className="font-display font-black text-sm bg-white px-2.5 py-0.5 rounded-lg brutal-border shadow-[1px_1px_0px_#121212]">
            {progress}%
          </span>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] font-mono text-stone-500 pt-4">
        <span>3D WEBGL BIM // NEXT-GEN CAMPUS STACK</span>
        <span className="font-bold text-[#121212]">COLORIDO 2K27 READY</span>
      </div>

    </div>
  );
}
