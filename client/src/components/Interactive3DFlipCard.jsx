import React, { useState } from 'react';
import { 
  Trophy, MapPin, Clock, Users, User, ArrowRight, ShieldCheck, 
  RotateCw, Sparkles, Heart, Flame, Play, Eye
} from 'lucide-react';

const DEFAULT_EVENT = {
  id: 'cricket-championship',
  title: 'Inter-College Cricket Championship',
  category: 'BOYS SPORTS',
  section: 'Sports',
  venue: 'Main Campus Cricket Stadium • Floodlight Arena',
  date: 'Feb 26, 2027',
  timing: '09:00 AM - 05:30 PM',
  mediaType: 'image',
  mediaSrc: null, // Only show image when explicitly and appropriately provided
  description: 'T20 Knockout tournament on standard turf wicket with live boundary commentary, digital scoreboards, and crowd stadium atmosphere.',
  prizes: {
    team: { first: '₹15,000', second: '₹10,000', third: '₹5,000' },
    solo: { first: '₹3,000 (Player of Series)', second: '₹1,500 (Best Bowler)', third: '₹1,500 (Best Batter)' },
  },
  featured: true,
  badgeBg: '#00B2FE',
  badgeText: 'BOYS SPORTS'
};

const getEventThemeIcon = (title = '', category = '') => {
  const t = title.toLowerCase();
  const c = category.toLowerCase();
  if (t.includes('cricket')) return Trophy;
  if (t.includes('basket') || t.includes('throw') || t.includes('volley') || t.includes('sport') || c.includes('sport')) return Flame;
  if (t.includes('music') || t.includes('band') || t.includes('sing') || c.includes('music')) return Sparkles;
  if (t.includes('dance') || t.includes('choreo') || c.includes('cultural')) return Flame;
  if (t.includes('code') || t.includes('hack') || t.includes('digital') || c.includes('digital')) return Sparkles;
  return Trophy;
};

export default function Interactive3DFlipCard({
  event = DEFAULT_EVENT,
  onSelect,
  onViewRules,
  isBookmarked = false,
  onToggleBookmark,
  triggerMode = 'click', // 'click' | 'hover' | 'both'
  cardHeight = 'h-[500px]'
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e) => {
    // If user clicks a button inside the card, don't trigger flip unless it was the flip trigger
    if (e.target.closest('button[data-no-flip]')) {
      return;
    }
    if (triggerMode === 'click' || triggerMode === 'both') {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (triggerMode === 'hover' || triggerMode === 'both') {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === 'hover' || triggerMode === 'both') {
      setIsFlipped(false);
    }
  };

  const currentEvent = { ...DEFAULT_EVENT, ...event };
  // If event has its own category, don't use default badgeText unless specified on event
  const categoryTag = event?.badgeText || event?.category || currentEvent.category || 'BOYS SPORTS';
  const categoryBg = event?.badgeBg || (
    categoryTag.toUpperCase().includes('BOYS') ? '#00B2FE' :
    categoryTag.toUpperCase().includes('GIRLS') ? '#FF4D8D' :
    categoryTag.toUpperCase().includes('CULTURAL') || categoryTag.toUpperCase().includes('DANCE') || categoryTag.toUpperCase().includes('CHOREO') ? '#FF5A1F' :
    categoryTag.toUpperCase().includes('DIGITAL') || categoryTag.toUpperCase().includes('TECH') ? '#CCFF00' :
    categoryTag.toUpperCase().includes('MUSIC') ? '#FFE500' : '#00B2FE'
  );

  const hasImage = Boolean(currentEvent.mediaSrc || currentEvent.videoSrc);
  const IconComponent = getEventThemeIcon(currentEvent.title, categoryTag);

  return (
    <div
      className={`relative w-full ${cardHeight} cursor-pointer group select-none`}
      style={{ perspective: '1000px' }}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Flipping Inner Container */}
      <div
        className="w-full h-full relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* ========================================================
            1. FRONT FACE (Action Media or Clean Neobrutalism Graphic)
           ======================================================== */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-[3px] border-[#121212] shadow-[6px_6px_0px_#121212] flex flex-col justify-between p-5 ${
            hasImage ? 'bg-[#121212]' : 'bg-[#18181B]'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Background: Only show image if appropriate image is provided, else clean Neobrutalism pattern */}
          {hasImage ? (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {currentEvent.videoSrc ? (
                <video
                  src={currentEvent.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentEvent.mediaSrc}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Cinematic Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
            </div>
          ) : (
            /* Clean Neobrutalism Graphic Background (No mismatched image) */
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Subtle architectural dot grid */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${categoryBg} 1.5px, transparent 1.5px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              {/* Vibrant subtle glow accent in corner */}
              <div 
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-25 blur-3xl pointer-events-none"
                style={{ backgroundColor: categoryBg }}
              />
            </div>
          )}

          {/* Front Header */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span
              style={{ backgroundColor: categoryBg }}
              className="border-2 border-[#121212] px-3 py-1 rounded-full text-[11px] font-display font-black text-[#121212] shadow-[2px_2px_0px_#FFFFFF] uppercase tracking-wider"
            >
              {categoryTag}
            </span>

            <div className="flex items-center gap-1.5">
              {currentEvent.featured && (
                <span className="bg-[#FFE500] text-[#121212] border-2 border-[#121212] px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase shadow-[1.5px_1.5px_0px_#FFFFFF]">
                  ★ FEATURED
                </span>
              )}
              {onToggleBookmark && (
                <button
                  type="button"
                  data-no-flip="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(currentEvent.title);
                  }}
                  className={`p-1.5 rounded-lg border-2 border-[#121212] transition-all ${
                    isBookmarked
                      ? 'bg-[#FF4D8D] text-white shadow-[2px_2px_0px_#FFFFFF]'
                      : 'bg-white/90 text-stone-700 hover:text-[#FF4D8D]'
                  }`}
                  title={isBookmarked ? 'Saved' : 'Save Event'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                </button>
              )}
              {/* Flip Button Icon */}
              <button
                type="button"
                className="p-1.5 rounded-lg bg-white/90 border-2 border-[#121212] text-[#121212] shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#CCFF00] transition-colors"
                title="Click to flip card"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Graphic Icon (when no image is displayed) */}
          {!hasImage && (
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
              <div 
                style={{ backgroundColor: categoryBg }}
                className="w-20 h-20 rounded-2xl border-[3px] border-[#121212] shadow-[4px_4px_0px_#FFFFFF] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
              >
                <IconComponent className="w-10 h-10 text-[#121212]" />
              </div>
              <span className="mt-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-stone-300 uppercase tracking-widest">
                OFFICIAL COMPETITION
              </span>
            </div>
          )}

          {/* Front Bottom Info & Flip Prompt Badge */}
          <div className="relative z-10 space-y-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight drop-shadow-md group-hover:text-[#CCFF00] transition-colors">
                {currentEvent.title}
              </h3>
              <div className="flex items-center gap-1.5 text-stone-300 text-xs font-mono font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span className="truncate">{currentEvent.venue}</span>
              </div>
            </div>

            {/* Click to View Details Prompt Badge */}
            <div className="pt-2">
              <div className="w-full py-2.5 px-4 bg-[#CCFF00] border-2 border-[#121212] rounded-2xl shadow-[3px_3px_0px_#FFFFFF] flex items-center justify-between group-hover:bg-[#d8ff33] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
                  <span className="font-display font-black text-xs text-[#121212] uppercase tracking-wider">
                    Click to view details
                  </span>
                </div>
                <RotateCw className="w-4 h-4 text-[#121212] group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. BACK FACE (White Neobrutalist Data + Prize Pool + Select)
           ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-[3px] border-[#121212] bg-white shadow-[6px_6px_0px_#121212] flex flex-col justify-between p-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Back Face Header */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                style={{ backgroundColor: categoryBg }}
                className="border-2 border-[#121212] px-2.5 py-0.5 rounded-full text-[10px] font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] uppercase tracking-wider"
              >
                {categoryTag}
              </span>

              {/* Flip Back to Video Button */}
              <button
                type="button"
                className="px-2.5 py-1 rounded-xl bg-[#F8F5EE] border-2 border-[#121212] text-xs font-mono font-bold text-stone-700 flex items-center gap-1 shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] hover:text-[#121212] transition-colors"
                title="Flip to Video Cover"
              >
                <RotateCw className="w-3 h-3" />
                <span className="text-[10px]">Flip Cover</span>
              </button>
            </div>

            {/* Event Title */}
            <h3 className="font-display font-black text-xl text-[#121212] leading-tight mb-2">
              {currentEvent.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-stone-600 font-medium line-clamp-2 leading-relaxed mb-3">
              {currentEvent.description}
            </p>

            {/* Date & Location Schedule Text */}
            <div className="space-y-1.5 text-xs text-stone-700 mb-3 bg-[#F8F5EE] p-2.5 rounded-xl border-2 border-[#121212]">
              <div className="flex items-center gap-1.5 font-semibold text-[#121212]">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                <span className="truncate">{currentEvent.venue}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-600">
                <Clock className="w-3.5 h-3.5 text-[#121212] shrink-0" />
                <span>{currentEvent.date} • {currentEvent.timing}</span>
              </div>
            </div>

            {/* Prize Pool Box */}
            <div className="p-3 rounded-xl bg-[#FFF5C0] border-2 border-[#121212] shadow-[2.5px_2.5px_0px_#121212] space-y-2 mb-3">
              <div className="flex items-center justify-between text-xs font-display font-black text-[#121212]">
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-[#FF5A1F]" />
                  Prize Pool
                </span>
                <span className="font-script text-sm text-[#FF5A1F] font-bold">cash prizes!</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Team Category */}
                <div className="p-2 rounded-lg bg-white border border-[#121212]">
                  <div className="flex items-center gap-1 text-stone-500 mb-0.5">
                    <Users className="w-3 h-3 text-[#121212]" />
                    <span className="text-[10px] font-bold uppercase">TEAM</span>
                  </div>
                  <p className="font-black text-[#121212]">
                    1st: <span className="text-[#FF5A1F]">{currentEvent.prizes?.team?.first || '₹10,000'}</span>
                  </p>
                  <p className="text-[9px] text-stone-500 font-medium truncate">
                    2nd: {currentEvent.prizes?.team?.second || '₹5,000'} | 3rd: {currentEvent.prizes?.team?.third || '₹2,500'}
                  </p>
                </div>

                {/* Solo Category */}
                <div className="p-2 rounded-lg bg-white border border-[#121212]">
                  <div className="flex items-center gap-1 text-stone-500 mb-0.5">
                    <User className="w-3 h-3 text-[#121212]" />
                    <span className="text-[10px] font-bold uppercase">SOLO</span>
                  </div>
                  <p className="font-black text-[#121212]">
                    1st: <span className="text-[#FF5A1F]">{currentEvent.prizes?.solo?.first || '₹3,000'}</span>
                  </p>
                  <p className="text-[9px] text-stone-500 font-medium truncate">
                    2nd: {currentEvent.prizes?.solo?.second || '₹1,500'} | 3rd: {currentEvent.prizes?.solo?.third || '₹1,000'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t-2 border-dashed border-[#121212]/20">
            {onViewRules && (
              <button
                type="button"
                data-no-flip="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewRules(currentEvent);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl font-display font-bold text-xs bg-white border-2 border-[#121212] text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-stone-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Rules</span>
              </button>
            )}

            {/* Neon Green Select -> Button at bottom */}
            <button
              type="button"
              data-no-flip="true"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect(currentEvent.title);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl font-display font-black text-xs bg-[#CCFF00] border-2 border-[#121212] text-[#121212] shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Select</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
