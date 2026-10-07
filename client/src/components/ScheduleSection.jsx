import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Sparkles, ArrowRight, Zap } from 'lucide-react';

const SCHEDULE_DAY_1 = [
  {
    time: '10:00 AM - 01:00 PM',
    title: 'Website Development Competition',
    category: 'Digital Club Track',
    venue: 'Decennial / Silver Jubilee Seminar Hall',
    prize: 'Team ₹3,000 | Solo ₹1,500',
    description: 'On-spot web design & development challenge on theme COLORIDO-2K27.',
    featured: true
  },
  {
    time: '11:00 AM - 01:30 PM',
    title: 'Code Odyssey (Speed Coding)',
    category: 'Flagship Tech',
    venue: 'Central Computer Center - Lab 4',
    prize: 'Team ₹5,000 | Solo ₹2,500',
    description: 'Competitive programming sprint across DSA and algorithm puzzles.',
    featured: true
  },
  {
    time: '02:00 PM - 05:00 PM',
    title: 'Anime Video Making (AMV Editing)',
    category: 'Digital Club Track',
    venue: 'Hi-Tech Multimedia Lab (CS Block)',
    prize: 'Team ₹3,000 | Solo ₹1,500',
    description: 'High-octane AMV, motion graphics, and anime-style video editing.',
    featured: true
  },
  {
    time: '05:00 PM - 09:00 PM',
    title: 'Battle of the Bands',
    category: 'Flagship Cultural',
    venue: 'Silver Jubilee Main Auditorium',
    prize: 'Team ₹10,000 | Solo ₹3,000',
    description: 'Live band clash featuring rock, metal, fusion, and acoustic sets.',
    featured: true
  }
];

const SCHEDULE_DAY_2 = [
  {
    time: '09:30 AM - 01:00 PM',
    title: 'Inter-College Sports Knockouts',
    category: 'Sports Arena',
    venue: 'Main Sports Complex & Open Grounds',
    prize: 'Team ₹8,000 | Solo ₹3,000',
    description: 'Cricket, Volleyball, Kabaddi, and Basketball tournament quarterfinals & semis.',
    featured: true
  },
  {
    time: '11:00 AM - 02:00 PM',
    title: 'Fine Arts, Clay & Rangoli Show',
    category: 'Fine Arts',
    venue: 'Civil Engineering Drawing Halls',
    prize: 'Team ₹4,000 | Solo ₹2,000',
    description: 'Traditional and modern live artistic expressions and clay modeling.',
    featured: false
  },
  {
    time: '02:30 PM - 05:30 PM',
    title: 'Tekraft & Robo Wars Clash',
    category: 'Flagship Tech',
    venue: 'Mechanical Workshop Arena',
    prize: 'Team ₹8,000 | Solo ₹3,000',
    description: '15kg combat bot demolition battle inside the safety hazard enclosure.',
    featured: true
  },
  {
    time: '06:00 PM - 09:30 PM',
    title: 'Choreoday (Grand Theme Dance Battle)',
    category: 'Flagship Cultural',
    venue: 'Open Air Theatre (OAT Auditorium)',
    prize: 'Team ₹12,000 | Solo ₹4,000',
    description: 'The premier theme-based synchronized dance spectacle under laser light arrays.',
    featured: true
  }
];

export default function ScheduleSection({ onRegisterForEvent }) {
  const [activeDay, setActiveDay] = useState('day1');

  const currentSchedule = activeDay === 'day1' ? SCHEDULE_DAY_1 : SCHEDULE_DAY_2;

  return (
    <section id="schedule" className="py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <Calendar className="w-3.5 h-3.5" />
            TIMELINE TRACKER
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            plan your visit!
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Fest Schedule & <span className="underline decoration-[#FF5A1F] decoration-4">Stage Timings</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Two days of non-stop adrenaline across technical labs, indoor auditoriums, and the open-air theater.
        </p>
      </div>

      {/* Day Selector Tabs with Tactile Feedback */}
      <div className="flex justify-center gap-4 max-w-md mx-auto">
        <button
          onClick={() => setActiveDay('day1')}
          className={`flex-1 py-3 px-6 rounded-2xl font-display font-black text-xs sm:text-sm brutal-border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeDay === 'day1'
              ? 'bg-[#CCFF00] text-[#121212] shadow-[4px_4px_0px_#121212] -translate-y-0.5'
              : 'bg-white text-stone-600 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>DAY 1 • FEB 26</span>
        </button>

        <button
          onClick={() => setActiveDay('day2')}
          className={`flex-1 py-3 px-6 rounded-2xl font-display font-black text-xs sm:text-sm brutal-border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeDay === 'day2'
              ? 'bg-[#FF5A1F] text-white shadow-[4px_4px_0px_#121212] -translate-y-0.5'
              : 'bg-white text-stone-600 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>DAY 2 • FEB 27</span>
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {currentSchedule.map((item, idx) => (
          <div
            key={idx}
            className="bg-white brutal-border rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[4px_4px_0px_#121212] hover:shadow-[6px_6px_0px_#121212] transition-all group"
          >
            {/* Left Info */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="brutal-pill bg-[#FFF5C0] text-[#121212] text-[10px]">
                  {item.category}
                </span>
                <span className="font-mono text-xs font-bold text-stone-700 flex items-center gap-1 bg-[#F8F5EE] brutal-border-2 px-2 py-0.5 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  {item.time}
                </span>
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-[#121212] group-hover:text-[#FF5A1F] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium pt-1">
                <span className="flex items-center gap-1.5 text-stone-800 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  {item.venue}
                </span>
                <span className="flex items-center gap-1.5 text-[#121212] bg-[#CCFF00] brutal-border-2 px-2 py-0.5 rounded font-bold">
                  <Trophy className="w-3.5 h-3.5 text-[#121212]" />
                  {item.prize}
                </span>
              </div>
            </div>

            {/* Right Quick Register Button */}
            <button
              onClick={() => onRegisterForEvent && onRegisterForEvent(item.title)}
              className="py-2.5 px-4 rounded-xl font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 shrink-0 self-start md:self-center cursor-pointer"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
