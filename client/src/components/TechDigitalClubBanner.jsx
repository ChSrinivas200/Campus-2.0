import React from 'react';
import { Music, Flame, Trophy, Sparkles, MapPin, Clock, ArrowRight, Shield, Zap, Star, Code } from 'lucide-react';

export default function TechDigitalClubBanner({ onRegisterForEvent }) {
  return (
    <section id="cultural-spotlight" className="py-10">
      <div className="bg-[#FFF5C0] brutal-border rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#121212] relative overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] text-[#CCFF00] font-mono text-xs font-bold shadow-[2px_2px_0px_#121212]">
            <Zap className="w-4 h-4 text-[#CCFF00]" />
            <span>FLAGSHIP STAGE & TECH SHOWDOWNS</span>
          </div>

          <span className="font-mono text-xs font-bold text-stone-700 bg-white brutal-border-2 px-2.5 py-0.5 rounded-md shadow-[1.5px_1.5px_0px_#121212]">
            Open Air Theatre (OAT) & Silver Jubilee Hall
          </span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight leading-tight">
            Colorido 2K27 <span className="bg-[#FF5A1F] text-white px-2 py-0.5 rounded brutal-border-2 inline-block -rotate-1">Grand Clashes</span>
          </h2>
          <p className="text-sm font-medium text-stone-700 mt-2 max-w-2xl">
            Witness Andhra Pradesh's most fierce college crews compete on the electrified OAT Stage with multi-stop laser light setups and top sound systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Choreoday Card with Stage Inaugural Image */}
          <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex flex-col justify-between hover:shadow-[6px_6px_0px_#121212] transition-all">
            <div>
              {/* Event Image Banner */}
              <div className="w-full h-40 rounded-xl brutal-border overflow-hidden relative mb-4 bg-stone-100">
                <img
                  src="/images/colorido_fest_stage_inauguration.jpg"
                  alt="Choreoday Flagship Dance Stage"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 brutal-border-2 bg-[#CCFF00] px-2 py-0.5 rounded text-[10px] font-display font-black text-[#121212]">
                  FLAGSHIP DANCE
                </span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-display font-black text-[#121212]">
                  Choreoday (Theme Based)
                </h3>
                <span className="p-2 rounded-lg bg-[#FEE7EA] text-[#5C1D24] brutal-border-2">
                  <Flame className="w-4 h-4 text-[#FF5A1F]" />
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3 font-medium">
                The premier theme-based synchronized dance spectacle under multi-stop laser light arrays at the Open Air Theatre.
              </p>

              <div className="space-y-1 text-xs font-mono font-medium text-stone-700 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                  <span className="truncate">Open Air Theatre (OAT Auditorium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                  <span className="truncate">Day 2 • Feb 27 (06:00 PM)</span>
                </div>
              </div>

              {/* Prize Table */}
              <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-display font-black text-[#121212]">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Prizes: ₹20,000 Pool
                  </span>
                  <span className="font-script text-sm text-[#FF5A1F] font-bold">1st ₹12K</span>
                </div>
                <p className="text-[11px] font-mono text-stone-600">Team: 1st ₹12K | 2nd ₹8K | 3rd ₹5K</p>
              </div>
            </div>

            <button
              onClick={() => onRegisterForEvent && onRegisterForEvent('Choreoday')}
              className="w-full py-2.5 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Register for Choreoday</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Battle of Bands Card with Annual Day Image */}
          <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex flex-col justify-between hover:shadow-[6px_6px_0px_#121212] transition-all">
            <div>
              {/* Event Image Banner */}
              <div className="w-full h-40 rounded-xl brutal-border overflow-hidden relative mb-4 bg-stone-100">
                <img
                  src="/images/annual_day_celebration.png"
                  alt="Battle of the Bands Live Stage"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 brutal-border-2 bg-[#FF5A1F] px-2 py-0.5 rounded text-[10px] font-display font-black text-white">
                  LIVE MUSIC
                </span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-display font-black text-[#121212]">
                  Battle of the Bands
                </h3>
                <span className="p-2 rounded-lg bg-[#D4F6FF] text-[#121212] brutal-border-2">
                  <Music className="w-4 h-4 text-[#121212]" />
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3 font-medium">
                Electric guitars, classical fusion, acoustic percussion, and rock anthems live on stage before professional judges.
              </p>

              <div className="space-y-1 text-xs font-mono font-medium text-stone-700 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                  <span className="truncate">Silver Jubilee Main Auditorium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                  <span className="truncate">Day 1 • Feb 26 (05:00 PM)</span>
                </div>
              </div>

              {/* Prize Table */}
              <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-display font-black text-[#121212]">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Prizes: ₹18,000 Pool
                  </span>
                  <span className="font-script text-sm text-[#FF5A1F] font-bold">1st ₹10K</span>
                </div>
                <p className="text-[11px] font-mono text-stone-600">Band: 1st ₹10K | 2nd ₹6K | 3rd ₹4K</p>
              </div>
            </div>

            <button
              onClick={() => onRegisterForEvent && onRegisterForEvent('Battle of the Bands')}
              className="w-full py-2.5 rounded-xl bg-[#121212] brutal-border font-display font-black text-xs text-white shadow-[3px_3px_0px_#121212] hover:bg-[#222] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Register for Bands</span>
              <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
            </button>
          </div>

          {/* RūpaJña Hackathon & Digital Club Card with Real Winners Image */}
          <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex flex-col justify-between hover:shadow-[6px_6px_0px_#121212] transition-all">
            <div>
              {/* Event Image Banner */}
              <div className="w-full h-40 rounded-xl brutal-border overflow-hidden relative mb-4 bg-stone-100">
                <img
                  src="/images/rupajna_hackathon_winners.jpg"
                  alt="RūpaJña Hackathon Champions"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
                <span className="absolute top-2 left-2 brutal-border-2 bg-[#D4F6FF] px-2 py-0.5 rounded text-[10px] font-display font-black text-[#121212]">
                  DIGITAL CLUB HACKATHON
                </span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-display font-black text-[#121212]">
                  RūpaJña Prototype Sprint
                </h3>
                <span className="p-2 rounded-lg bg-[#CCFF00] text-[#121212] brutal-border-2">
                  <Code className="w-4 h-4 text-[#121212]" />
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3 font-medium">
                Speed code prototyping, AI engineering, and product building judged by industry architects and faculty mentors.
              </p>

              <div className="space-y-1 text-xs font-mono font-medium text-stone-700 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                  <span className="truncate">DST NIDHI / Hi-Tech CS Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                  <span className="truncate">Day 1 • Feb 26 (10:00 AM)</span>
                </div>
              </div>

              {/* Prize Table */}
              <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-display font-black text-[#121212]">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Prizes: ₹25,000 Pool
                  </span>
                  <span className="font-script text-sm text-[#FF5A1F] font-bold">1st ₹15K</span>
                </div>
                <p className="text-[11px] font-mono text-stone-600">Squad: 1st ₹15K | 2nd ₹7K | 3rd ₹3K</p>
              </div>
            </div>

            <button
              onClick={() => onRegisterForEvent && onRegisterForEvent('Website Development')}
              className="w-full py-2.5 rounded-xl bg-[#FF5A1F] brutal-border font-display font-black text-xs text-white shadow-[3px_3px_0px_#121212] hover:bg-[#ff6e38] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Register for Tech Tracks</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
