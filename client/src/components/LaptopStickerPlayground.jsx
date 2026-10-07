import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RotateCcw, Shuffle, Laptop, Move, Plus, Check } from 'lucide-react';

const STORAGE_KEY = 'colorido_laptop_stickers_v1';

const INITIAL_STICKERS = [
  {
    id: 's1',
    text: 'COLORIDO 2K27',
    sub: 'OFFICIAL FEST',
    bgColor: '#CCFF00', // Neon Lime
    textColor: '#121212',
    x: 48,
    y: 35,
    rotate: -6,
    shape: 'pill',
    icon: '⚡',
  },
  {
    id: 's2',
    text: 'CHOREODAY',
    sub: 'THEME DANCE',
    bgColor: '#FF5A1F', // Punch Orange
    textColor: '#FFFFFF',
    x: 270,
    y: 60,
    rotate: 5,
    shape: 'badge',
    icon: '🔥',
  },
  {
    id: 's3',
    text: 'RVR & JC CE',
    sub: 'GUNTUR • AP',
    bgColor: '#121212', // Dark Ink
    textColor: '#CCFF00',
    x: 180,
    y: 160,
    rotate: -3,
    shape: 'stamp',
    icon: '🏛️',
  },
  {
    id: 's4',
    text: 'CASH ₹1,50,000+',
    sub: 'PRIZE POOL',
    bgColor: '#FFE500', // Yellow punch
    textColor: '#121212',
    x: 460,
    y: 50,
    rotate: 8,
    shape: 'star',
    icon: '🏆',
  },
  {
    id: 's5',
    text: 'DIGITAL CLUB',
    sub: 'INNOVATION',
    bgColor: '#D4F6FF', // Sky blue
    textColor: '#121212',
    x: 70,
    y: 190,
    rotate: 4,
    shape: 'badge',
    icon: '🚀',
  },
  {
    id: 's6',
    text: 'BUG HUNTER',
    sub: 'CODE BATTLE',
    bgColor: '#FEE7EA', // Pastel pink
    textColor: '#5C1D24',
    x: 390,
    y: 180,
    rotate: -7,
    shape: 'pill',
    icon: '🐛',
  },
  {
    id: 's7',
    text: 'DON\'T MISS OUT',
    sub: 'FEB 26-27',
    bgColor: '#FFFFFF',
    textColor: '#121212',
    x: 230,
    y: 260,
    rotate: 2,
    shape: 'cursive',
    icon: '✨',
  }
];

export default function LaptopStickerPlayground() {
  const [stickers, setStickers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage sticker load error:', e);
    }
    return INITIAL_STICKERS;
  });

  const [activeStickerId, setActiveStickerId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [savedNotification, setSavedNotification] = useState(false);
  const [zIndices, setZIndices] = useState(() => {
    const init = {};
    INITIAL_STICKERS.forEach((s, idx) => {
      init[s.id] = 10 + idx;
    });
    return init;
  });
  const [maxZ, setMaxZ] = useState(30);
  const containerRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
      setSavedNotification(true);
      const timer = setTimeout(() => setSavedNotification(false), 1200);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('LocalStorage sticker save error:', e);
    }
  }, [stickers]);

  // Handle Drag Start
  const handleMouseDown = (e, stickerId) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const sticker = stickers.find((s) => s.id === stickerId);
    if (!sticker) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragOffset({
      x: mouseX - sticker.x,
      y: mouseY - sticker.y,
    });

    // Bring to front
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setZIndices((prev) => ({ ...prev, [stickerId]: newZ }));
    setActiveStickerId(stickerId);
  };

  // Touch Support for mobile/tablets
  const handleTouchStart = (e, stickerId) => {
    const container = containerRef.current;
    if (!container || !e.touches[0]) return;

    const rect = container.getBoundingClientRect();
    const sticker = stickers.find((s) => s.id === stickerId);
    if (!sticker) return;

    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    setDragOffset({
      x: touchX - sticker.x,
      y: touchY - sticker.y,
    });

    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setZIndices((prev) => ({ ...prev, [stickerId]: newZ }));
    setActiveStickerId(stickerId);
  };

  // Handle Mouse Move within bounds
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!activeStickerId || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const rawX = e.clientX - rect.left - dragOffset.x;
      const rawY = e.clientY - rect.top - dragOffset.y;

      // Bound constraints
      const boundedX = Math.max(10, Math.min(rect.width - 150, rawX));
      const boundedY = Math.max(10, Math.min(rect.height - 70, rawY));

      setStickers((prev) =>
        prev.map((s) => (s.id === activeStickerId ? { ...s, x: boundedX, y: boundedY } : s))
      );
    };

    const handleTouchMove = (e) => {
      if (!activeStickerId || !containerRef.current || !e.touches[0]) return;

      const touch = e.touches[0];
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const rawX = touch.clientX - rect.left - dragOffset.x;
      const rawY = touch.clientY - rect.top - dragOffset.y;

      const boundedX = Math.max(10, Math.min(rect.width - 150, rawX));
      const boundedY = Math.max(10, Math.min(rect.height - 70, rawY));

      setStickers((prev) =>
        prev.map((s) => (s.id === activeStickerId ? { ...s, x: boundedX, y: boundedY } : s))
      );
    };

    const handleEnd = () => {
      setActiveStickerId(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [activeStickerId, dragOffset]);

  // Reset to default
  const handleReset = () => {
    setStickers(INITIAL_STICKERS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  // Randomize positions
  const handleShuffle = () => {
    const container = containerRef.current;
    const width = container ? container.clientWidth - 160 : 450;
    const height = container ? container.clientHeight - 80 : 250;

    setStickers((prev) =>
      prev.map((s) => ({
        ...s,
        x: Math.floor(Math.random() * Math.max(width, 100)),
        y: Math.floor(Math.random() * Math.max(height, 80)),
        rotate: Math.floor(Math.random() * 26) - 13,
      }))
    );
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
                <Laptop className="w-3.5 h-3.5" />
                INTERACTIVE CANVAS
              </span>
              <span className="font-script text-lg text-[#FF5A1F] font-bold rotate-[-3deg]">
                drag & stick anywhere!
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#121212] tracking-tight">
              Colorido <span className="underline decoration-[#CCFF00] decoration-wavy decoration-4">Sticker Lid</span>
            </h2>
            <p className="text-sm font-medium text-stone-600 mt-1 max-w-lg">
              Grab, rearrange, and plaster custom festival stickers across the official fest developer laptop. Everything stays bounded to the chassis and saved to your browser!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {savedNotification && (
              <span className="text-[10px] font-mono font-bold bg-[#CCFF00] brutal-border-2 px-2.5 py-1 rounded-full text-[#121212] flex items-center gap-1 animate-fadeIn">
                <Check className="w-3 h-3 text-[#121212]" />
                <span>Lid Saved</span>
              </span>
            )}

            <button
              onClick={handleShuffle}
              className="brutal-btn-tactile bg-white px-4 py-2 brutal-border-2 rounded-full font-display font-bold text-xs flex items-center gap-1.5 shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#FFE500]"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={handleReset}
              className="brutal-btn-tactile bg-white px-4 py-2 brutal-border-2 rounded-full font-display font-bold text-xs flex items-center gap-1.5 shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#CCFF00]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Laptop Chassis Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Laptop Lid Bezel */}
          <div className="rounded-3xl brutal-border bg-[#1E1E24] p-3 sm:p-5 shadow-[8px_8px_0px_#121212] relative">
            
            {/* Top Webcam Notch */}
            <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              <div className="w-2 h-2 rounded-full bg-[#121212] border border-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]/80 animate-pulse" />
            </div>

            {/* Laptop Screen / Lid Surface (Canvas Area) */}
            <div
              ref={containerRef}
              className="relative w-full h-[360px] sm:h-[420px] bg-[#EAE6DD] rounded-2xl brutal-border overflow-hidden select-none bg-dot-pattern"
              style={{ touchAction: 'none' }}
            >
              {/* College Watermark Emblem in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
                <div className="text-center font-display font-black text-6xl sm:text-8xl tracking-tighter text-[#121212]">
                  COLORIDO
                </div>
              </div>

              {/* Instruction Hint Pill */}
              <div className="absolute bottom-3 right-3 pointer-events-none bg-white/90 backdrop-blur-sm brutal-border-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#121212] flex items-center gap-1.5 shadow-[2px_2px_0px_#121212]">
                <Move className="w-3 h-3 text-[#FF5A1F]" />
                <span>Drag stickers inside parent bounds • Auto-saved</span>
              </div>

              {/* Render Draggable Stickers */}
              {stickers.map((sticker) => {
                const isDragging = activeStickerId === sticker.id;
                const zIndex = zIndices[sticker.id] || 10;

                return (
                  <div
                    key={sticker.id}
                    onMouseDown={(e) => handleMouseDown(e, sticker.id)}
                    onTouchStart={(e) => handleTouchStart(e, sticker.id)}
                    style={{
                      transform: `translate3d(${sticker.x}px, ${sticker.y}px, 0px) rotate(${sticker.rotate}deg) scale(${isDragging ? 1.08 : 1})`,
                      zIndex: zIndex,
                      backgroundColor: sticker.bgColor,
                      color: sticker.textColor,
                    }}
                    className={`absolute cursor-grab active:cursor-grabbing select-none px-4 py-2.5 brutal-border rounded-xl shadow-[3.5px_3.5px_0px_#121212] transition-shadow duration-100 ${
                      isDragging ? 'shadow-[6px_6px_0px_#121212] ring-2 ring-black' : 'hover:shadow-[5px_5px_0px_#121212]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">{sticker.icon}</span>
                      <div>
                        <div className="font-display font-extrabold text-xs sm:text-sm tracking-tight leading-none">
                          {sticker.text}
                        </div>
                        <div className="font-mono text-[9px] font-bold opacity-80 uppercase tracking-wider mt-0.5">
                          {sticker.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Laptop Base/Hinge */}
          <div className="mx-auto w-3/4 h-3.5 bg-[#D6D2C9] rounded-b-2xl brutal-border border-t-0 shadow-[4px_4px_0px_#121212] flex items-center justify-center">
            <div className="w-16 h-1 bg-[#121212] rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
