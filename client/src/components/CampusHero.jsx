import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Users, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Radio, 
  Flame, 
  CheckCircle2,
  Building2,
  MessageSquare,
  Bot,
  MapPin,
  Zap,
  Wifi,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEffects';

export default function CampusHero({ 
  activeTab = 'twin', 
  onSelectTab, 
  onOpenColoridoFest 
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const hotspots = [
    {
      id: 'sjb',
      title: 'Silver Jubilee Block',
      subtitle: 'Main Administrative & CS Dept',
      stat: '42 Smart Labs Online',
      tab: 'twin',
      top: '28%',
      left: '52%',
      color: 'bg-[#CCFF00]',
    },
    {
      id: 'ai-lab',
      title: 'CS & AI Innovation Hub',
      subtitle: 'NVIDIA GPU Cluster & BIM Deck',
      stat: '98% Computing Capacity',
      tab: 'copilot',
      top: '45%',
      left: '26%',
      color: 'bg-[#00E5FF]',
    },
    {
      id: 'oat',
      title: 'Open Air Theatre (OAT)',
      subtitle: 'Colorido 2k26 Fest Main Stage',
      stat: 'Live Fest Portal Ready',
      isFest: true,
      top: '72%',
      left: '70%',
      color: 'bg-[#FF1493]',
    },
    {
      id: 'transit',
      title: 'North Portico Transit Waypoint',
      subtitle: 'EV Campus Shuttle Bay',
      stat: 'Next EV in 3 mins',
      tab: 'navigation',
      top: '64%',
      left: '42%',
      color: 'bg-[#FFE500]',
    },
  ];

  const handleTabClick = (tabId) => {
    sound.playPop();
    onSelectTab && onSelectTab(tabId);
  };

  return (
    <section className="relative pt-3 pb-8 md:pt-6 md:pb-10 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* =========================================================================
            LIVE CAMPUS TELEMETRY TICKER BAR
           ========================================================================= */}
        <div className="mb-6 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#121212] overflow-hidden p-2 flex items-center gap-3">
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#CCFF00] text-[#121212] font-black text-xs border border-black shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span className="font-mono tracking-tight">LIVE TELEMETRY</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee-smooth inline-flex items-center gap-8 text-xs font-bold text-stone-700">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono font-bold text-[#121212]">Campus 2.0 Status:</span> 100% Operational
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono font-bold text-[#121212]">Solar Array:</span> 184 kW/h Peak Generation
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-mono font-bold text-[#121212]">Campus WiFi 6E:</span> 99.8% Coverage (4.2 Gbps)
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-mono font-bold text-[#121212]">Digital Library:</span> 68 Smart Seats Open
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span className="font-mono font-bold text-[#121212]">Colorido 2k26:</span> Registrations Open
              </span>
              <span className="inline-flex items-center gap-1.5 text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-mono font-bold text-[#121212]">AI Engine:</span> GPT-4o Synchronized
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TOP HERO GRID: EXACT MATCH WITH USER'S DESIGN
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Top Pill Stamp */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0F2FE] border-2 border-black shadow-[2px_2px_0px_#121212]">
              <span className="text-sm">🏛️</span>
              <span className="font-mono text-xs font-black uppercase text-[#0369A1] tracking-wider">
                R.V.R. & J.C. DIGITAL TWIN
              </span>
            </div>

            {/* Main Headline with Highlighted Pill */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#121212] leading-[1.08]">
              The living digital layer over your{' '}
              <span className="relative inline-block mt-1">
                <span className="bg-[#FFE500] px-3.5 py-0.5 rounded-2xl border-2 border-black inline-block shadow-[4px_4px_0px_#121212]">
                  physical campus.
                </span>
              </span>
            </h1>

            {/* Mission Statement Description */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium max-w-xl">
              Campus 2.0 is a living digital layer over the physical campus that can see what's happening, understand using AI, predict future problems, connect people and resources, and help the campus take action.
            </p>

            {/* Dual Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleTabClick('twin')}
                className="px-5 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-[#CCFF00] border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>🚀</span>
                <span>Explore Living Digital Twin</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => handleTabClick('copilot')}
                className="px-5 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-white border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-stone-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Bot className="w-4 h-4 text-[#121212]" />
                <span>Ask AI Campus Copilot</span>
              </button>
            </div>

            {/* 4 Feature Micro Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              {[
                { icon: '🍃', title: 'CAMPUS 2.0', subtitle: 'LIVING OS' },
                { icon: '🧠', title: 'AI PREDICTIVE', subtitle: 'CAMPUS INTEL' },
                { icon: '👥', title: 'SMARTER', subtitle: 'PEOPLE & EVENTS' },
                { icon: '📊', title: 'CONNECTED', subtitle: 'ECOSYSTEM' },
              ].map((badge, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-black/15 shadow-xs hover:border-black transition-colors"
                >
                  <span className="text-base shrink-0">{badge.icon}</span>
                  <div className="leading-tight text-left truncate">
                    <p className="text-[10px] font-black tracking-tight text-[#121212] truncate">{badge.title}</p>
                    <p className="text-[9px] font-mono font-bold text-stone-500 truncate">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Exact College Image with Holographic Radar Scan & 4 Floating Glass Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl border-2 border-black shadow-[8px_8px_0px_#121212] overflow-hidden bg-white group">
              
              {/* Exact College Building Photo */}
              <img
                src="/images/rvrjc_exact_main_building.jpg"
                alt="R.V.R. & J.C. College of Engineering Main Block"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* Holographic Digital Twin Scanner Beam */}
              <motion.div 
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_12px_#00E5FF] pointer-events-none"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />

              {/* Gradient Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Interactive Radar Hotspots on the building */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => {
                      if (spot.isFest) onOpenColoridoFest && onOpenColoridoFest();
                      else if (spot.tab) handleTabClick(spot.tab);
                    }}
                    onMouseEnter={() => {
                      sound.playClick();
                      setActiveHotspot(spot.id);
                    }}
                    onMouseLeave={() => setActiveHotspot(null)}
                    className="relative p-1 cursor-pointer group/pin"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-75" />
                    <span className={`relative flex items-center justify-center w-5 h-5 rounded-full ${spot.color} border border-black shadow-xs`}>
                      <MapPin className="w-3 h-3 text-[#121212]" />
                    </span>
                  </button>

                  {/* Hotspot Tooltip */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md rounded-xl border-2 border-black p-2.5 shadow-[4px_4px_0px_#121212] z-30 pointer-events-none"
                      >
                        <p className="font-display font-black text-xs text-[#121212] leading-tight">{spot.title}</p>
                        <p className="text-[10px] text-stone-600 font-medium">{spot.subtitle}</p>
                        <div className="mt-1 pt-1 border-t border-stone-200 flex items-center justify-between text-[9px] font-mono font-bold text-emerald-600">
                          <span>{spot.stat}</span>
                          <span>Click to open →</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Floating Status Card 1: Top-Left (Campus Live) with Floating Levitation */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-[#CCFF00] border border-black flex items-center justify-center text-sm shadow-xs">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-display font-black text-xs text-[#121212]">Campus Live</span>
                  </div>
                  <p className="text-[10px] font-mono font-bold text-stone-600">All systems optimal</p>
                </div>
              </motion.div>

              {/* Floating Status Card 2: Top-Right (Students Online) with Floating Levitation */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-[#D4F6FF] border border-black flex items-center justify-center text-sm shadow-xs">
                  👥
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Students Online</p>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-xs text-[#121212]">3,842</span>
                    <span className="text-[10px] font-mono font-black text-emerald-600 flex items-center">
                      <TrendingUp className="w-3 h-3" /> 12%
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Status Card 3: Bottom-Left (Upcoming Events) with Floating Levitation */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 cursor-pointer hover:bg-[#FFE500] transition-colors z-10 active:scale-95"
                onClick={() => {
                  sound.playPop();
                  onOpenColoridoFest && onOpenColoridoFest();
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFDEEB] border border-black flex items-center justify-center text-sm shadow-xs">
                  📅
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Upcoming Events</p>
                  <p className="font-display font-black text-xs text-[#121212]">6 This Week</p>
                </div>
              </motion.div>

              {/* Floating Status Card 4: Bottom-Right (Campus Insights) with Floating Levitation */}
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 cursor-pointer hover:bg-[#CCFF00] transition-colors z-10 active:scale-95"
                onClick={() => handleTabClick('copilot')}
              >
                <div className="w-8 h-8 rounded-xl bg-[#CCFF00] border border-black flex items-center justify-center text-sm shadow-xs">
                  📊
                </div>
                <div>
                  <p className="font-display font-black text-xs text-[#121212]">Campus Insights</p>
                  <p className="text-[10px] font-mono font-bold text-stone-600 flex items-center gap-1">
                    <span>AI Powered</span>
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* =========================================================================
            6 INTERACTIVE FEATURE CARDS (EXACT MATCH FROM USER'S REFERENCE DESIGN)
           ========================================================================= */}
        <div className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              {
                id: 'copilot',
                icon: '🤖',
                iconBg: 'bg-[#DBEAFE] text-blue-600',
                cardBg: 'bg-[#EFF6FF]',
                cardBorder: 'border-blue-200',
                activeRing: 'border-blue-600 shadow-[4px_4px_0px_#1E40AF]',
                title: 'AI Campus Copilot',
                desc: 'Your personal AI assistant for campus life, academics and opportunities.',
                arrowBg: 'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
                badge: 'GPT-4o',
              },
              {
                id: 'twin',
                icon: '🗺️',
                iconBg: 'bg-[#EDE9FE] text-purple-600',
                cardBg: 'bg-[#F5F3FF]',
                cardBorder: 'border-purple-200',
                activeRing: 'border-purple-600 shadow-[4px_4px_0px_#6B21A8]',
                title: 'Living Digital Twin',
                desc: 'Real-time digital representation of your campus.',
                arrowBg: 'bg-purple-100 text-purple-700 group-hover:bg-purple-200',
                badge: '3D BIM',
              },
              {
                id: 'navigation',
                icon: '🧭',
                iconBg: 'bg-[#FEF08A] text-amber-700',
                cardBg: 'bg-[#FEFCE8]',
                cardBorder: 'border-amber-200',
                activeRing: 'border-amber-600 shadow-[4px_4px_0px_#92400E]',
                title: 'Smart & Accessible Navigation',
                desc: 'Find places, people and facilities easily.',
                arrowBg: 'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
                badge: 'GPS ROUTER',
              },
              {
                id: 'collab',
                icon: '👥',
                iconBg: 'bg-[#FCE7F3] text-pink-600',
                cardBg: 'bg-[#FDF2F8]',
                cardBorder: 'border-pink-200',
                activeRing: 'border-pink-600 shadow-[4px_4px_0px_#9D174D]',
                title: 'AI Collaboration Hub',
                desc: 'Find teammates, clubs, mentors and opportunities.',
                arrowBg: 'bg-pink-100 text-pink-700 group-hover:bg-pink-200',
                badge: '18 SQUADS',
              },
              {
                id: 'passport',
                icon: '🎯',
                iconBg: 'bg-[#DCFCE7] text-emerald-600',
                cardBg: 'bg-[#F0FDF4]',
                cardBorder: 'border-emerald-200',
                activeRing: 'border-emerald-600 shadow-[4px_4px_0px_#065F46]',
                title: 'Campus Skill Passport',
                desc: 'Track your skills, growth and achievements.',
                arrowBg: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200',
                badge: 'VERIFIED',
              },
              {
                id: 'quest',
                icon: '🏆',
                iconBg: 'bg-[#E0F2FE] text-sky-600',
                cardBg: 'bg-[#F0F9FF]',
                cardBorder: 'border-sky-200',
                activeRing: 'border-sky-600 shadow-[4px_4px_0px_#075985]',
                title: 'Campus Quest',
                desc: 'Participate, earn rewards and make the most of campus life.',
                arrowBg: 'bg-sky-100 text-sky-700 group-hover:bg-sky-200',
                badge: 'LEVEL 4',
              },
            ].map((card) => {
              const isActive = activeTab === card.id || (card.id === 'collab' && activeTab === 'ecosystem');
              return (
                <button
                  key={card.id}
                  onClick={() => handleTabClick(card.id)}
                  className={`relative p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group ${card.cardBg} ${
                    isActive
                      ? `${card.activeRing} -translate-y-1 scale-[1.02]`
                      : `${card.cardBorder} hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#121212] border-black/15`
                  }`}
                  style={{ minHeight: '190px' }}
                >
                  <div>
                    {/* Top Icon in rounded container */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${card.iconBg} border border-black/10 shadow-xs transition-transform group-hover:scale-110`}>
                        {card.icon}
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-black/5 text-stone-600 uppercase">
                        {card.badge}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display font-black text-sm text-[#121212] leading-snug mb-1.5 group-hover:text-black">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-[11px] font-medium text-stone-600 leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Right Arrow Button */}
                  <div className="flex justify-end pt-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1 ${card.arrowBg} border border-black/10`}>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Active highlight bar on bottom */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeFeatureBar"
                      className="absolute bottom-0 left-3 right-3 h-1 bg-[#121212] rounded-t-full" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
