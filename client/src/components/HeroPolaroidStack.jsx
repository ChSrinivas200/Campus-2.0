import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Music, Flame, Award, Heart, ArrowUpRight } from 'lucide-react';

const POLAROID_CARDS = [
  {
    id: 1,
    title: 'Colorido Inaugural & Choreoday',
    subtitle: 'Grand Stage & Synchronized Dance Clash',
    tag: 'FLAGSHIP STAGE',
    tagBg: '#CCFF00',
    prize: '₹20,000 Pool',
    tiltClass: 'polaroid-tilt-1',
    scriptText: 'pure stage energy!',
    scriptColor: '#FF5A1F',
    tapeColor: 'rgba(255, 230, 100, 0.95)',
    cardBg: '#FFFFFF',
    category: 'Cultural',
    venue: 'Silver Jubilee & OAT Stage',
    image: '/images/colorido_fest_stage_inauguration.jpg',
  },
  {
    id: 2,
    title: '40th Annual Day & Music Fest',
    subtitle: 'Rock, Classical & Fusion Battle of Bands',
    tag: 'LIVE SPECTACLE',
    tagBg: '#FF5A1F',
    prize: '₹18,000 Pool',
    tiltClass: 'polaroid-tilt-2',
    scriptText: 'earphones won\'t do!',
    scriptColor: '#121212',
    tapeColor: 'rgba(204, 255, 0, 0.95)',
    cardBg: '#FFFDF7',
    category: 'Music',
    venue: 'Main Auditorium Quad',
    image: '/images/annual_day_celebration.png',
  },
  {
    id: 3,
    title: 'RūpaJña Hackathon & TechKraft',
    subtitle: 'National Prototype & Digital Innovation',
    tag: 'DIGITAL CLUB',
    tagBg: '#D4F6FF',
    prize: '₹25,000 Pool',
    tiltClass: 'polaroid-tilt-3',
    scriptText: 'debug or die trying',
    scriptColor: '#5C1D24',
    tapeColor: 'rgba(254, 231, 234, 0.95)',
    cardBg: '#FFFFFF',
    category: 'Digital Club',
    venue: 'DST NIDHI / Hi-Tech Labs',
    image: '/images/rupajna_hackathon_winners.jpg',
  },
  {
    id: 4,
    title: 'RVR & JC College Quad',
    subtitle: 'Historic 40-Year Campus & Sports Arena',
    tag: 'CAMPUS ARENA',
    tagBg: '#FFE500',
    prize: '₹35,000 Pool',
    tiltClass: 'polaroid-tilt-4',
    scriptText: 'sweat for glory!',
    scriptColor: '#FF5A1F',
    tapeColor: 'rgba(212, 246, 255, 0.95)',
    cardBg: '#FFFDF7',
    category: 'Sports',
    venue: 'Central Campus Quadrangle',
    image: '/images/rvrjc_campus_main_building.jpg',
  },
];

export default function HeroPolaroidStack({ onSelectCard }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Mobile Horizontal Snap Scroll (< 768px) */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-6 pt-3 snap-x snap-mandatory px-4 -mx-4 no-scrollbar">
        {POLAROID_CARDS.map((card, idx) => {
          const staggerClass = isVisible ? `stagger-reveal stagger-delay-${idx + 1}` : 'opacity-0';
          return (
            <div
              key={card.id}
              onClick={() => onSelectCard && onSelectCard(card.title)}
              className={`${staggerClass} snap-center shrink-0 w-[275px] bg-white brutal-border rounded-2xl p-3 shadow-[4px_4px_0px_#121212] relative cursor-pointer active:translate-x-[2px] active:translate-y-[2px]`}
            >
              {/* Image Box with guaranteed aspect ratio & fit */}
              <div className="w-full h-40 rounded-xl brutal-border overflow-hidden relative mb-2.5 bg-stone-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
                <span
                  style={{ backgroundColor: card.tagBg }}
                  className="absolute top-2 left-2 brutal-border-2 px-2 py-0.5 rounded-full text-[10px] font-display font-black text-[#121212] shadow-[1.5px_1.5px_0px_#121212]"
                >
                  {card.tag}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-display font-black text-sm text-[#121212] truncate">
                    {card.title}
                  </h4>
                  <span className="font-mono text-[10px] font-bold text-[#FF5A1F] bg-[#FEE7EA] px-1.5 py-0.5 rounded border border-[#121212] shrink-0">
                    {card.prize}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-1">{card.subtitle}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
                    {card.scriptText}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">{card.venue.split('(')[0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Dynamic Rotational Array (>= 768px) with Staggered Scroll Reveal */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
        {POLAROID_CARDS.map((card, idx) => {
          const staggerClass = isVisible ? `stagger-reveal stagger-delay-${idx + 1}` : 'opacity-0';
          return (
            <div
              key={card.id}
              onClick={() => onSelectCard && onSelectCard(card.title)}
              className={`${staggerClass} ${card.tiltClass} bg-white brutal-border rounded-2xl p-3.5 shadow-[5px_5px_0px_#121212] relative cursor-pointer group flex flex-col justify-between`}
            >
              {/* Washi tape topper */}
              <div
                style={{ backgroundColor: card.tapeColor }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 border border-dashed border-[#121212]/50 shadow-sm z-20 pointer-events-none rounded-sm rotate-[-2deg]"
              />

              <div>
                {/* Image Polaroid Frame */}
                <div className="w-full h-44 rounded-xl brutal-border overflow-hidden relative mb-3 bg-stone-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/hero_bg.jpg';
                    }}
                  />
                  <span
                    style={{ backgroundColor: card.tagBg }}
                    className="absolute top-2 left-2 brutal-border-2 px-2.5 py-0.5 rounded-full text-[10px] font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212]"
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Polaroid Label */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-display font-black text-sm text-[#121212] leading-tight group-hover:text-[#FF5A1F] transition-colors">
                      {card.title}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#121212] transition-colors shrink-0" />
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-1 leading-snug">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 mt-2 border-t-2 border-dashed border-[#121212]/20 flex items-center justify-between">
                <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
                  {card.scriptText}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#121212] bg-[#CCFF00] px-2 py-0.5 rounded brutal-border-2">
                  {card.prize}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
