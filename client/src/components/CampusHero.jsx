import React from 'react';
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
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampusHero({ 
  activeTab = 'twin', 
  onSelectTab, 
  onOpenColoridoFest 
}) {
  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-10 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* =========================================================================
            TOP HERO GRID: EXACT MATCH WITH USER'S DESIGN
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Top Pill Stamp */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_#121212]">
              <span className="text-sm">🏛️</span>
              <span className="font-mono text-xs font-black uppercase text-[#121212] tracking-wider">
                R.V.R. & J.C. DIGITAL TWIN
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#121212] leading-[1.08]">
              The living digital layer over your{' '}
              <span className="relative inline-block mt-1">
                <span className="bg-[#CCFF00] px-3.5 py-0.5 rounded-2xl border-2 border-black inline-block shadow-[4px_4px_0px_#121212]">
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
                onClick={() => onSelectTab && onSelectTab('twin')}
                className="px-5 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-[#CCFF00] border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>🚀</span>
                <span>Explore Living Digital Twin</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onSelectTab && onSelectTab('copilot')}
                className="px-5 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-white border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-stone-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all"
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
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-black/15 shadow-xs"
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

          {/* Right Column: Exact College Image with 4 Floating Glass Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl border-2 border-black shadow-[8px_8px_0px_#121212] overflow-hidden bg-white">
              
              {/* Exact College Building Photo */}
              <img
                src="/images/rvrjc_exact_main_building.jpg"
                alt="R.V.R. & J.C. College of Engineering Main Block"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover hover:scale-102 transition-transform duration-700"
              />

              {/* Gradient Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Status Card 1: Top-Left (Campus Live) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5">
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
              </div>

              {/* Floating Status Card 2: Top-Right (Students Online) */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5">
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
              </div>

              {/* Floating Status Card 3: Bottom-Left (Upcoming Events) */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 cursor-pointer hover:bg-[#FFE500] transition-colors"
                   onClick={onOpenColoridoFest}>
                <div className="w-8 h-8 rounded-xl bg-[#FFDEEB] border border-black flex items-center justify-center text-sm shadow-xs">
                  📅
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Upcoming Events</p>
                  <p className="font-display font-black text-xs text-[#121212]">6 This Week</p>
                </div>
              </div>

              {/* Floating Status Card 4: Bottom-Right (Campus Insights) */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl px-3.5 py-2.5 shadow-[3px_3px_0px_#121212] flex items-center gap-2.5 cursor-pointer hover:bg-[#CCFF00] transition-colors"
                   onClick={() => onSelectTab && onSelectTab('copilot')}>
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
              </div>

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
                arrowBg: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
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
                arrowBg: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
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
                arrowBg: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
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
                arrowBg: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
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
                arrowBg: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
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
                arrowBg: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
              },
            ].map((card) => {
              const isActive = activeTab === card.id || (card.id === 'collab' && activeTab === 'ecosystem');
              return (
                <button
                  key={card.id}
                  onClick={() => onSelectTab && onSelectTab(card.id)}
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
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${card.iconBg} border border-black/10 shadow-xs`}>
                        {card.icon}
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${card.arrowBg} border border-black/10`}>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Active highlight bar on bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 h-1 bg-[#121212] rounded-t-full" />
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
