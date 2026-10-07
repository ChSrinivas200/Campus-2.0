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
            3 PRIMARY INTERACTIVE SELECTION CARDS SIDE BY SIDE
           ========================================================================= */}
        <div className="pt-2">
          <div className="text-center mb-5">
            <span className="font-mono text-xs font-black tracking-widest uppercase text-stone-500">
              CAMPUS 2.0 WORKSPACE NAVIGATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tab 1: Explore Digital Twin */}
            <button
              onClick={() => onSelectTab && onSelectTab('twin')}
              className={`p-5 rounded-2xl border-2 border-black transition-all text-left flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                activeTab === 'twin'
                  ? 'bg-[#CCFF00] shadow-[5px_5px_0px_#121212] -translate-y-1'
                  : 'bg-white shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#121212] hover:bg-stone-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-xs ${
                activeTab === 'twin' ? 'bg-white' : 'bg-[#CCFF00]'
              }`}>
                <Layers className="w-6 h-6 text-[#121212]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-base text-[#121212]">
                    Explore Digital Twin
                  </h3>
                  {activeTab === 'twin' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </div>
                <p className="text-xs font-medium text-stone-700 leading-snug">
                  3D Campus Map, BIM Viewer & Live Sensors
                </p>
              </div>
              {activeTab === 'twin' && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black" />
              )}
            </button>

            {/* Tab 2: Ask Campus Copilot */}
            <button
              onClick={() => onSelectTab && onSelectTab('copilot')}
              className={`p-5 rounded-2xl border-2 border-black transition-all text-left flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                activeTab === 'copilot'
                  ? 'bg-[#CCFF00] shadow-[5px_5px_0px_#121212] -translate-y-1'
                  : 'bg-white shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#121212] hover:bg-stone-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-xs ${
                activeTab === 'copilot' ? 'bg-white' : 'bg-[#D4F6FF]'
              }`}>
                <Bot className="w-6 h-6 text-[#121212]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-base text-[#121212]">
                    Ask Campus Copilot
                  </h3>
                  {activeTab === 'copilot' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </div>
                <p className="text-xs font-medium text-stone-700 leading-snug">
                  AI Assistant & Real-time GPT-4o Campus Bot
                </p>
              </div>
              {activeTab === 'copilot' && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black" />
              )}
            </button>

            {/* Tab 3: Campus Ecosystem */}
            <button
              onClick={() => onSelectTab && onSelectTab('ecosystem')}
              className={`p-5 rounded-2xl border-2 border-black transition-all text-left flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                activeTab === 'ecosystem'
                  ? 'bg-[#CCFF00] shadow-[5px_5px_0px_#121212] -translate-y-1'
                  : 'bg-white shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#121212] hover:bg-stone-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-xs ${
                activeTab === 'ecosystem' ? 'bg-white' : 'bg-[#FFDEEB]'
              }`}>
                <Users className="w-6 h-6 text-[#121212]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-base text-[#121212]">
                    Campus Ecosystem
                  </h3>
                  {activeTab === 'ecosystem' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  )}
                </div>
                <p className="text-xs font-medium text-stone-700 leading-snug">
                  Events, Discussions, Clubs & Collaborations
                </p>
              </div>
              {activeTab === 'ecosystem' && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black" />
              )}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
