import React from 'react';
import { MapPin, Clock, Trophy, Users, User, ArrowRight, ShieldCheck, Sparkles, Globe, Video, Code, Music, Cpu, Mic, Gamepad, Heart } from 'lucide-react';

const iconMap = {
  Globe: Globe,
  Video: Video,
  Code: Code,
  Music: Music,
  Cpu: Cpu,
  Mic: Mic,
  Gamepad: Gamepad,
};

// Distinctive pastel background accents for Neo-Brutalist cards
const categoryColorMap = {
  'Digital Club Track': { bg: '#E8DEFF', border: '#121212', badge: '#CCFF00', tag: 'DIGITAL CLUB' },
  'Cultural': { bg: '#FEE7EA', border: '#121212', badge: '#FF5A1F', tag: 'CULTURAL' },
  'Sports': { bg: '#D4F6FF', border: '#121212', badge: '#FFE500', tag: 'SPORTS' },
  'Boys Sports': { bg: '#D4F6FF', border: '#121212', badge: '#00B2FE', tag: 'BOYS ARENA' },
  'Girls Sports': { bg: '#FFF5C0', border: '#121212', badge: '#FF4D8D', tag: 'GIRLS ARENA' },
};

export default function EventCard({
  event,
  onSelectRule,
  onViewDetails,
  onRegisterForEvent,
  onRegister,
  isBookmarked = false,
  onToggleBookmark,
}) {
  const handleViewRules = onSelectRule || onViewDetails || (() => {});
  const handleRegister = onRegisterForEvent || onRegister || (() => {});

  const IconComponent = iconMap[event.iconName] || Code;
  const isDigitalClub = event.category === 'Digital Club Track' || event.section === 'Digital Club';

  const theme = categoryColorMap[event.category] || categoryColorMap[event.section] || {
    bg: '#FFFFFF',
    border: '#121212',
    badge: '#CCFF00',
    tag: event.category || 'COMPETITION',
  };

  return (
    <div className="bg-white brutal-border rounded-2xl p-5 flex flex-col justify-between relative shadow-[4px_4px_0px_#121212] brutal-card-hover group">
      
      <div>
        {/* Top Header / Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            style={{ backgroundColor: theme.badge }}
            className="brutal-border-2 px-2.5 py-0.5 rounded-full text-[10px] font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] uppercase tracking-wider flex items-center gap-1"
          >
            {isDigitalClub && <Sparkles className="w-3 h-3 text-[#121212]" />}
            <span>{event.category}</span>
          </span>

          <div className="flex items-center gap-2">
            {event.featured && (
              <span className="bg-[#FFE500] text-[#121212] brutal-border-2 px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase shadow-[1.5px_1.5px_0px_#121212]">
                ★ FEATURED
              </span>
            )}
            {onToggleBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(event.title);
                }}
                title={isBookmarked ? "Remove from Saved" : "Save Event"}
                className={`p-1.5 rounded-lg brutal-border-2 transition-all ${
                  isBookmarked
                    ? 'bg-[#FF4D8D] text-white shadow-[2px_2px_0px_#121212]'
                    : 'bg-white text-stone-400 hover:text-[#FF4D8D] hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title & Icon Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-extrabold text-lg text-[#121212] leading-snug group-hover:text-[#FF5A1F] transition-colors">
            {event.title}
          </h3>
          <div className="p-2 rounded-xl bg-[#F8F5EE] brutal-border text-[#121212] shadow-[2px_2px_0px_#121212] shrink-0 group-hover:bg-[#CCFF00] group-hover:rotate-6 transition-all">
            <IconComponent className="w-4 h-4" />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Location & Schedule Pills */}
        <div className="space-y-1.5 mb-4 text-xs font-medium text-stone-700">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
            <span className="truncate font-semibold">{event.venue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-800 shrink-0" />
            <span className="text-stone-600 font-mono text-[11px]">{event.date} • {event.timing}</span>
          </div>
        </div>

        {/* Prize Pool Brutalist Banner Box */}
        <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border mb-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-[#121212]">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
              Official Prize Pool
            </span>
            <span className="font-script text-sm text-[#FF5A1F] font-bold">cash prizes!</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            {/* Team Category */}
            <div className="p-2 rounded-lg bg-white brutal-border-2">
              <div className="flex items-center gap-1 text-stone-500 mb-0.5">
                <Users className="w-3 h-3 text-[#121212]" />
                <span className="text-[10px] font-bold uppercase">TEAM</span>
              </div>
              <p className="font-black text-[#121212]">1st: <span className="text-[#FF5A1F]">{event.prizes?.team?.first || '₹3,000'}</span></p>
              <p className="text-[9px] text-stone-500 font-medium">2nd: {event.prizes?.team?.second || '₹2,000'} | 3rd: {event.prizes?.team?.third || '₹1,000'}</p>
            </div>

            {/* Solo Category */}
            <div className="p-2 rounded-lg bg-white brutal-border-2">
              <div className="flex items-center gap-1 text-stone-500 mb-0.5">
                <User className="w-3 h-3 text-[#121212]" />
                <span className="text-[10px] font-bold uppercase">SOLO</span>
              </div>
              <p className="font-black text-[#121212]">1st: <span className="text-[#FF5A1F]">{event.prizes?.solo?.first || '₹1,500'}</span></p>
              <p className="text-[9px] text-stone-500 font-medium">2nd: {event.prizes?.solo?.second || '₹1,000'} | 3rd: {event.prizes?.solo?.third || '₹500'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t-2 border-dashed border-[#121212]/20">
        <button
          onClick={() => handleViewRules(event)}
          className="flex-1 py-2 px-3 rounded-xl font-display font-bold text-xs bg-white brutal-border-2 text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-stone-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5 transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
          <span>Rules</span>
        </button>

        <button
          onClick={() => handleRegister(event.title)}
          className="py-2 px-4 rounded-xl font-display font-black text-xs bg-[#CCFF00] brutal-border-2 text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center justify-center gap-1 transition-all"
        >
          <span>Select</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
