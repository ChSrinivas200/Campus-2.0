import React from 'react';
import { Shield, Sparkles, Trophy, Users, Award, BookOpen, ExternalLink, Star, Flame, CheckCircle2, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-10">
      <div className="bg-white brutal-border rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#121212] relative overflow-hidden">
        
        {/* Floating Quirky Mascot Badge with Parallax */}
        <div 
          data-parallax-speed="-0.12" 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rotate-6 z-10 hidden sm:block pointer-events-none"
        >
          <div className="bg-[#FFE500] brutal-border-2 px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#121212] text-center">
            <span className="font-display font-black text-xs text-[#121212]">EST. 1985</span>
            <div className="font-script text-sm text-[#FF5A1F] font-bold">40+ yrs legacy</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Manifesto */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
                <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
                THE FEST MANIFESTO
              </span>
              <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
                unfiltered college energy
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight leading-[1.1]">
              Engineered for the <span className="underline decoration-[#FF5A1F] decoration-4">bold, creative</span> & competitive.
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              COLORIDO 2K27 is the annual flagship Cultural, Technical, and Athletic festival organized jointly by the <strong className="text-[#121212] font-bold">Digital Club</strong> and the <strong className="text-[#121212] font-bold">Extra-Curricular / Co-Curricular Activities Committee</strong> of R.V.R. & J.C. College of Engineering (Autonomous), Guntur.
            </p>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              Bringing together over 3,000+ delegates across 38+ engineering colleges in Andhra Pradesh, COLORIDO 2K27 provides an electrified stage for high-octane Choreoday battles, Battle of the Bands, Fine Arts, Dramatics, and Inter-College Sports Championships.
            </p>

            {/* Real Campus Photo Strip */}
            <div className="pt-2">
              <div className="bg-[#F8F5EE] brutal-border rounded-2xl p-3 shadow-[3px_3px_0px_#121212] relative group">
                <div className="absolute -top-2.5 right-6 w-20 h-4 bg-[#FFE500] border border-dashed border-[#121212]/60 rounded-sm rotate-2 pointer-events-none z-10" />
                <div className="w-full h-44 sm:h-52 rounded-xl brutal-border overflow-hidden relative bg-stone-200">
                  <img
                    src="/images/rvrjc_campus_main_building.jpg"
                    alt="RVR & JC College of Engineering Main Campus Building"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/hero_bg.jpg';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#121212]/85 text-white backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                      R.V.R. & J.C. College of Engineering (Autonomous)
                    </span>
                    <span className="text-[#CCFF00] font-black hidden sm:inline">NAAC A+ Grade</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Brutalist Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border shadow-[2px_2px_0px_#121212]">
                <div className="font-display font-black text-lg text-[#FF5A1F]">₹1.5L+</div>
                <div className="font-mono text-[10px] font-bold text-stone-600 uppercase">Cash Prizes</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FEE7EA] brutal-border shadow-[2px_2px_0px_#121212]">
                <div className="font-display font-black text-lg text-[#5C1D24]">38+</div>
                <div className="font-mono text-[10px] font-bold text-stone-600 uppercase">Event Tracks</div>
              </div>
              <div className="p-3 rounded-xl bg-[#D4F6FF] brutal-border shadow-[2px_2px_0px_#121212] col-span-2 sm:col-span-1">
                <div className="font-display font-black text-lg text-[#121212]">3,000+</div>
                <div className="font-mono text-[10px] font-bold text-stone-600 uppercase">Participants</div>
              </div>
            </div>
          </div>

          {/* Sticky Pinned Patronage & Governance Box with Dignitaries Photo */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28 self-start">
            
            {/* Real Dignitaries Photo Card */}
            <div className="bg-[#F8F5EE] brutal-border rounded-2xl p-3 shadow-[4px_4px_0px_#121212] relative group">
              <div className="w-full h-40 rounded-xl brutal-border overflow-hidden relative bg-stone-200">
                <img
                  src="/images/aicte_bootcamp_inauguration.jpg"
                  alt="RVR & JC AICTE Bootcamp and Leadership Inauguration"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/annual_day_celebration.png';
                  }}
                />
                <span className="absolute top-2 left-2 brutal-border-2 bg-[#CCFF00] px-2 py-0.5 rounded text-[10px] font-display font-black text-[#121212]">
                  LEADERSHIP & GOVERNANCE
                </span>
              </div>
              <p className="text-[11px] font-mono font-bold text-stone-600 pt-2 px-1 text-center">
                Institutional Steering Committee & AICTE Innovation Cell
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F5EE] brutal-border shadow-[4px_4px_0px_#121212] space-y-4">
              
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#121212]">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00] brutal-border flex items-center justify-center font-display font-black text-base text-[#121212] shadow-[2px_2px_0px_#121212]">
                  RVR
                </div>
                <div>
                  <h4 className="font-display font-black text-base text-[#121212]">Patronage & Governance</h4>
                  <p className="text-[11px] font-mono font-bold text-stone-600">R.V.R. & J.C. CE Administration</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-800 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div><strong className="text-[#121212]">Chief Patron:</strong> President & Secretary, RVR & JC CE</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div><strong className="text-[#121212]">Convener:</strong> Principal & Academic HODs Committee</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div><strong className="text-[#121212]">Organizing Body:</strong> ECA Committee & Student Digital Club</div>
                </div>
              </div>

              <a
                href="https://rvrjcce.ac.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white brutal-border hover:bg-[#CCFF00] text-xs font-display font-black text-[#121212] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                <span>Visit Official College Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
