import React from 'react';
import { Sparkles, Flame, Zap, Trophy, Star, Music, Award } from 'lucide-react';

export default function TickerBanner({ variant = 'neon' }) {
  const items = [
    { text: 'COLORIDO 2K27', icon: '★', highlight: true },
    { text: '₹1,50,000+ CASH PRIZES', icon: '💰', highlight: false },
    { text: 'CHOREODAY SPECTACLE', icon: '⚡', highlight: true },
    { text: '38+ COMPETITIONS', icon: '🔥', highlight: false },
    { text: 'R.V.R. & J.C. COLLEGE OF ENGINEERING', icon: '🏛️', highlight: false },
    { text: 'BATTLE OF BANDS', icon: '🎸', highlight: true },
    { text: 'VERIFIED DIGITAL QR PASSES', icon: '🎟️', highlight: false },
    { text: 'FEB 26-27, 2027', icon: '📅', highlight: true },
  ];

  return (
    <div className="relative overflow-hidden py-3 brutal-border-2 border-x-0 bg-[#CCFF00] text-[#121212] select-none shadow-[0_4px_0px_#121212] z-20">
      <div className="flex animate-marquee-smooth whitespace-nowrap">
        {/* Repeating 3 times for seamless infinite loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 mx-4 sm:mx-6">
            <span className="text-base sm:text-lg">{item.icon}</span>
            <span
              className={`font-display text-xs sm:text-sm tracking-wider uppercase ${
                item.highlight ? 'font-black bg-[#121212] text-[#CCFF00] px-2 py-0.5 rounded brutal-border-2' : 'font-extrabold'
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
