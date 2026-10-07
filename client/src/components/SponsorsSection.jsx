import React from 'react';
import { ShieldCheck, Award, Zap, Building, Sparkles } from 'lucide-react';

const SPONSORS = [
  {
    tier: 'TITLE SPONSOR',
    name: 'CyberTech Innovations',
    category: 'Enterprise Tech',
    badge: 'GOLD PARTNER',
    badgeBg: '#FFE500',
    cardBg: '#FFFFFF',
  },
  {
    tier: 'POWERED BY',
    name: 'Nexus Digital Systems',
    category: 'Cloud Infrastructure',
    badge: 'POWER PARTNER',
    badgeBg: '#CCFF00',
    cardBg: '#FFFFFF',
  },
  {
    tier: 'DIGITAL CLUB SPONSOR',
    name: 'CodeMatrix Labs',
    category: 'Web & AI Technologies',
    badge: 'TECH SPONSOR',
    badgeBg: '#D4F6FF',
    cardBg: '#FFFFFF',
  },
  {
    tier: 'SPORTS & ARENA SPONSOR',
    name: 'AeroStride Athletics',
    category: 'Sports Gear & Apparel',
    badge: 'SPORTS PARTNER',
    badgeBg: '#FEE7EA',
    cardBg: '#FFFFFF',
  }
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <Award className="w-3.5 h-3.5" />
            PARTNERS & SUPPORTERS
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            fueling the festival
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Official Fest <span className="underline decoration-[#CCFF00] decoration-4">Benefactors</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Empowering innovation and youth talent at R.V.R. & J.C. College of Engineering.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {SPONSORS.map((sp, idx) => (
          <div
            key={idx}
            className="bg-white brutal-border rounded-2xl p-6 text-center flex flex-col justify-between shadow-[4px_4px_0px_#121212] hover:shadow-[7px_7px_0px_#121212] hover:-translate-y-1 transition-all group"
          >
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF5A1F] uppercase block mb-3">
                {sp.tier}
              </span>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F8F5EE] brutal-border flex items-center justify-center text-[#121212] mb-4 shadow-[2px_2px_0px_#121212] group-hover:bg-[#CCFF00] group-hover:rotate-6 transition-all">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="font-display font-black text-base text-[#121212] mb-1">
                {sp.name}
              </h3>
              <p className="text-xs text-stone-500 font-mono font-medium">
                {sp.category}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t-2 border-dashed border-[#121212]/20">
              <span
                style={{ backgroundColor: sp.badgeBg }}
                className="brutal-pill text-[10px] font-display font-black text-[#121212] shadow-[1.5px_1.5px_0px_#121212]"
              >
                {sp.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
