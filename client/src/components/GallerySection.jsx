import React, { useState } from 'react';
import { Camera, Sparkles, Eye, Maximize2, X, MapPin } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Colorido Inaugural Lamp Lighting by Dignitaries & Chief Guest',
    category: 'Stage',
    image: '/images/colorido_fest_stage_inauguration.jpg',
    tag: 'Silver Jubilee Hall',
    scriptText: 'grand fest kickoff',
    tilt: 'rotate-[-2deg]'
  },
  {
    id: 2,
    title: 'RūpaJña National Prototype Hackathon Winners & Cash Awards',
    category: 'Technical',
    image: '/images/rupajna_hackathon_winners.jpg',
    tag: 'DST NIDHI / RVRJC',
    scriptText: 'prototype champions!',
    tilt: 'rotate-[2.5deg]'
  },
  {
    id: 3,
    title: '40th Annual Day Celebrations & Ceremonial Stage',
    category: 'Cultural',
    image: '/images/annual_day_celebration.png',
    tag: 'Main Auditorium',
    scriptText: '40 years of glory',
    tilt: 'rotate-[-1.5deg]'
  },
  {
    id: 4,
    title: 'AICTE IDE Innovation Design Bootcamp Inaugural Assembly',
    category: 'Technical',
    image: '/images/aicte_bootcamp_inauguration.jpg',
    tag: 'Innovation Cell',
    scriptText: 'future tech leaders',
    tilt: 'rotate-[2deg]'
  },
  {
    id: 5,
    title: 'R.V.R. & J.C. Historic Campus Quadrangle & Administrative Plaza',
    category: 'Campus',
    image: '/images/rvrjc_campus_main_building.jpg',
    tag: 'Administrative Block',
    scriptText: 'passport to freedom',
    tilt: 'rotate-[-2.5deg]'
  },
  {
    id: 6,
    title: 'Iconic College Main Entrance Archway & Fest Avenue',
    category: 'Campus',
    image: '/main_gate.jpg',
    tag: 'Main Entrance Gate',
    scriptText: 'welcome gates open!',
    tilt: 'rotate-[1.5deg]'
  }
];

export default function GallerySection() {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Cultural', 'Technical', 'Stage', 'Campus'];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <Camera className="w-3.5 h-3.5" />
            VISUAL SNAPSHOTS
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            memories from the floor
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Colorido <span className="underline decoration-[#FF5A1F] decoration-4">Polaroid Wall</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Capturing real-world energy, stage inaugurations, hackathon winners, and campus landmarks at R.V.R. & J.C. College of Engineering.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer ${
              filter === cat
                ? 'bg-[#121212] text-white shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Polaroid Cards with strict aspect ratio fitting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className={`${item.tilt} hover:rotate-0 hover:scale-105 transition-all duration-300 bg-white brutal-border rounded-2xl p-3.5 shadow-[4px_4px_0px_#121212] hover:shadow-[7px_7px_0px_#121212] cursor-pointer group relative flex flex-col justify-between`}
          >
            {/* Washi tape topper */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FFE500]/95 border border-dashed border-[#121212]/50 shadow-sm z-10 pointer-events-none rounded-sm rotate-[-2deg]" />

            <div>
              <div className="w-full h-48 sm:h-52 rounded-xl brutal-border overflow-hidden relative mb-3 bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 brutal-border-2 bg-[#CCFF00] px-2 py-0.5 rounded text-[10px] font-display font-black text-[#121212]">
                  {item.category}
                </span>
                <span className="absolute bottom-2 right-2 brutal-border-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono font-bold text-[#121212] flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-[#FF5A1F]" />
                  <span>Enlarge</span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-stone-500 uppercase">{item.tag}</span>
                  <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
                    {item.scriptText}
                  </span>
                </div>
                <h4 className="font-display font-black text-sm text-[#121212] line-clamp-2 group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t-2 border-dashed border-[#121212]/15 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF5A1F]" />
                RVR & JC Campus
              </span>
              <span className="font-bold text-[#121212] group-hover:underline">View Photo →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with adaptive fit */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white brutal-border rounded-3xl p-4 sm:p-6 shadow-[10px_10px_0px_#121212] space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#121212]">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase">{activeImage.category} • {activeImage.tag}</span>
                <h3 className="font-display font-black text-base sm:text-lg text-[#121212]">{activeImage.title}</h3>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="p-2 rounded-xl bg-stone-100 brutal-border-2 hover:bg-[#CCFF00] text-[#121212] cursor-pointer shadow-[2px_2px_0px_#121212] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full max-h-[70vh] rounded-2xl brutal-border overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-600 pt-1">
              <span>R.V.R. & J.C. College of Engineering • COLORIDO Archive</span>
              <span className="text-[#FF5A1F]">Verified Campus Visual</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
