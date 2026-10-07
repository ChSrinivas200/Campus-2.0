import React, { useState } from 'react';
import { 
  Lightbulb, 
  Music, 
  Trophy, 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  Flame, 
  Check, 
  ExternalLink 
} from 'lucide-react';

const ARENA_DATA = [
  {
    id: 'technical',
    title: 'Technical',
    badge: '6 EVENTS',
    icon: Lightbulb,
    description: 'Hackathons, Web Blitz sprints, Obstacle Robo racing, AI Innovation showcase, and CTF cyber battles.',
    bgClass: 'bg-[#F5F3FF]',
    borderClass: 'border-[#8B5CF6]',
    shadowClass: 'shadow-[5px_5px_0px_#8B5CF6]',
    titleColor: 'text-[#6D28D9]',
    iconColor: 'text-[#8B5CF6]',
    pillBg: 'bg-[#8B5CF6]',
    events: [
      { name: 'Hack-a-Fest (12-Hour Web & AI Hackathon)', prize: '₹20,000' },
      { name: 'UI/UX Design Sprint (Figma Championship)', prize: '₹10,000' },
      { name: 'Cyber Hunt (Crypto & CTF Challenge)', prize: '₹9,500' },
      { name: 'E-Sports Arena (BGMI & FreeFire Clashes)', prize: '₹12,000' },
      { name: 'Tekraft (E-Waste Sculpting & Tech Art)', prize: '₹7,500' },
      { name: 'Algorithmic Speed Coding Clash', prize: '₹8,000' }
    ]
  },
  {
    id: 'cultural',
    title: 'Cultural',
    badge: '5 EVENTS',
    icon: Music,
    description: 'Street dance battles, Battle of the Bands rock night, Fashion runways, One-act stage dramas, and solo acoustics.',
    bgClass: 'bg-[#FFF1F2]',
    borderClass: 'border-[#F43F5E]',
    shadowClass: 'shadow-[5px_5px_0px_#F43F5E]',
    titleColor: 'text-[#BE123C]',
    iconColor: 'text-[#F43F5E]',
    pillBg: 'bg-[#F43F5E]',
    events: [
      { name: 'Choreoday (Theme Based Mega Dance)', prize: '₹31,000' },
      { name: 'Music & Band (Solo & Battle of Bands)', prize: '₹19,000' },
      { name: 'Dance Clash (Classical, Western & Folk)', prize: '₹15,500' },
      { name: 'Fashion Show (Theme & Couture)', prize: '₹23,500' },
      { name: 'Fine Arts (Painting, Sketching & Rangoli)', prize: '₹8,500' }
    ]
  },
  {
    id: 'sports',
    title: 'Sports',
    badge: '5 EVENTS',
    icon: Trophy,
    description: 'Box cricket league, 5v5 Futsal Thunder, 3v3 FIBA basketball, Badminton open, and sand volleyball clash.',
    bgClass: 'bg-[#F0FDF4]',
    borderClass: 'border-[#22C55E]',
    shadowClass: 'shadow-[5px_5px_0px_#22C55E]',
    titleColor: 'text-[#15803D]',
    iconColor: 'text-[#22C55E]',
    pillBg: 'bg-[#22C55E]',
    events: [
      { name: 'Basketball Championship (Boys)', prize: '₹12,000' },
      { name: 'Volleyball Championship (Boys)', prize: '₹12,000' },
      { name: 'Kabaddi Tournament (Boys)', prize: '₹12,000' },
      { name: 'Throwball Championship (Girls)', prize: '₹12,000' },
      { name: 'Badminton & Table Tennis Masters', prize: '₹8,000' }
    ]
  }
];

export default function ThreeArenasFlipSection({ onSelectArena, onRegisterEvent }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (arenaId) => {
    setFlippedCards(prev => ({
      ...prev,
      [arenaId]: !prev[arenaId]
    }));
  };

  return (
    <section className="py-14 md:py-18 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Exact matching style from user image */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-1.5">
          <span className="text-[#E11D48] text-xs font-black uppercase tracking-widest block">
            THREE VIBRANT ARENAS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#121212]">
            EXPLORE THE EXPERIENCES
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium max-w-2xl mx-auto mt-2 leading-relaxed">
            Immerse yourself in competitive coding duels, electrifying musical nights, or high-octane sports championships.
          </p>
        </div>

        {/* 3 Arenas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ARENA_DATA.map((arena) => {
            const isFlipped = Boolean(flippedCards[arena.id]);
            const Icon = arena.icon;

            return (
              <div
                key={arena.id}
                className="relative h-[390px] w-full"
                style={{ perspective: '1000px' }}
              >
                {/* Flipping Card Container */}
                <div
                  className="w-full h-full relative transition-transform duration-500 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  
                  {/* FRONT FACE (Simpler, Clean rounded card from image) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-[28px] border-2 ${arena.borderClass} ${arena.bgClass} ${arena.shadowClass} p-6 sm:p-7 flex flex-col justify-between select-none`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Top right FLIP button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => toggleFlip(arena.id)}
                        className="px-2.5 py-1 rounded-full bg-white/90 border border-stone-300 text-stone-600 text-[10px] font-bold hover:bg-white flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                      >
                        <span>FLIP</span>
                        <RotateCw className="w-3 h-3 text-stone-500" />
                      </button>
                    </div>

                    {/* Middle Icon & Title */}
                    <div className="text-center space-y-3 -mt-3">
                      {/* Circular icon in white circle with black border */}
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm mx-auto">
                        <Icon className={`w-8 h-8 ${arena.iconColor}`} />
                      </div>

                      <h3 className={`text-2xl sm:text-3xl font-black ${arena.titleColor}`}>
                        {arena.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed max-w-xs mx-auto">
                        {arena.description}
                      </p>
                    </div>

                    {/* Bottom Action Pill and Arrow Button */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => onSelectArena && onSelectArena(arena.title)}
                        className={`px-5 py-2 rounded-full ${arena.pillBg} text-white font-extrabold text-xs shadow-sm hover:opacity-95 transition-opacity cursor-pointer`}
                      >
                        {arena.badge}
                      </button>

                      <button
                        onClick={() => toggleFlip(arena.id)}
                        className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm"
                        title="Flip to see events"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Event list on flip) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-[28px] border-2 ${arena.borderClass} bg-white ${arena.shadowClass} p-6 flex flex-col justify-between`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${arena.iconColor}`} />
                          <h4 className={`text-base font-black ${arena.titleColor}`}>
                            {arena.title} Competitions
                          </h4>
                        </div>
                        <button
                          onClick={() => toggleFlip(arena.id)}
                          className="px-2 py-0.5 rounded-full bg-stone-100 text-[10px] font-bold text-stone-600 hover:bg-stone-200 cursor-pointer"
                        >
                          ✕ Back
                        </button>
                      </div>

                      {/* Events List */}
                      <div className="space-y-1.5 overflow-y-auto max-h-[220px] pr-1">
                        {arena.events.map((ev, idx) => (
                          <div
                            key={idx}
                            onClick={() => onRegisterEvent && onRegisterEvent(ev.name)}
                            className="p-2 rounded-xl bg-[#F8F5EE] hover:bg-[#FFE500]/40 border border-stone-200 flex items-center justify-between text-xs cursor-pointer transition-colors"
                          >
                            <span className="font-bold text-stone-800 line-clamp-1">{ev.name}</span>
                            <span className="font-mono font-black text-[#121212] shrink-0 ml-1 bg-white px-1.5 py-0.5 rounded border border-stone-300">
                              {ev.prize}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectArena && onSelectArena(arena.title)}
                      className={`w-full py-2.5 rounded-full ${arena.pillBg} text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer mt-2`}
                    >
                      <span>Explore All in {arena.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
