import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Flame, 
  Building, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function CampusHero({ 
  onOpenCopilot, 
  onOpenDigitalTwin, 
  onOpenColoridoFest, 
  onNavigateToSection 
}) {
  return (
    <section className="relative pt-10 pb-14 md:pt-14 md:pb-18 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#CCFF00] text-[#121212] font-black text-xs border-2 border-black shadow-[2px_2px_0px_#121212] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            CAMPUS 2.0 LIVING OPERATING SYSTEM
          </span>

          <span className="px-3.5 py-1 rounded-full bg-[#FFE500] text-[#121212] font-black text-xs border-2 border-black shadow-[2px_2px_0px_#121212] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#121212]" />
            AI PREDICTIVE ENGINE ACTIVE
          </span>

          <span className="px-3.5 py-1 rounded-full bg-[#D4F6FF] text-[#004B6E] font-black text-xs border-2 border-black shadow-[2px_2px_0px_#121212] flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#004B6E]" />
            R.V.R. & J.C. DIGITAL TWIN
          </span>
        </div>

        {/* Clean, bold headline in Plus Jakarta Sans */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[#E11D48] text-xs font-black uppercase tracking-widest block">
            NEXT-GEN AUTONOMOUS CAMPUS INTELLIGENCE
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#121212] leading-[1.08]">
            The living digital layer over your{' '}
            <span className="relative inline-block">
              <span className="bg-[#CCFF00] px-4 py-0.5 rounded-2xl border-2 border-black inline-block shadow-[4px_4px_0px_#121212]">
                physical campus.
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed font-medium pt-2">
            “Campus 2.0 is a living digital layer over the physical campus that can <strong className="text-[#121212] font-bold">see what is happening</strong>, <strong className="text-[#121212] font-bold">understand it using AI</strong>, <strong className="text-[#121212] font-bold">predict future problems</strong>, connect people and resources, and <strong className="text-[#121212] font-bold">help the campus take action</strong>.”
          </p>

          {/* Quick Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenDigitalTwin}
              className="px-6 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-[#CCFF00] border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Layers className="w-4 h-4 text-[#121212]" />
              <span>Explore Living Digital Twin</span>
            </button>

            <button
              onClick={onOpenCopilot}
              className="px-6 py-3 rounded-full font-black text-xs sm:text-sm text-[#121212] bg-white border-2 border-black shadow-[3px_3px_0px_#121212] hover:bg-stone-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#121212] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Cpu className="w-4 h-4 text-[#FF5A1F]" />
              <span>Ask AI Campus Copilot</span>
            </button>

            <button
              onClick={onOpenColoridoFest}
              className="px-6 py-3 rounded-full font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF1493] to-[#E91E63] border-2 border-black shadow-[3px_3px_0px_#121212] hover:opacity-95 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Campus Events & Fest 🎪</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            FEATURED CAMPUS 2.0 3D DIGITAL TWIN GATEWAY
           ========================================================================= */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div 
            onClick={onOpenDigitalTwin}
            className="group relative cursor-pointer rounded-3xl bg-gradient-to-r from-[#FFE500] via-[#FFDEEB] to-[#CCFF00] p-1 border-2 border-black shadow-[6px_6px_0px_#121212] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#121212] transition-all duration-300"
          >
            <div className="bg-[#121212] rounded-[22px] p-6 sm:p-7 text-white relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#CCFF00] text-[#121212] text-[11px] font-black border border-black flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#121212]" />
                      CAMPUS 2.0 CORE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFE500] text-[#121212] text-[11px] font-black border border-black">
                      3D BIM WEBGL TWIN
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#D4F6FF] text-[#121212] text-[11px] font-bold">
                      11 AUTONOMOUS SYSTEMS
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#CCFF00] transition-colors leading-tight">
                    CAMPUS 2.0 • 3D Campus Map & Autonomous Intelligence
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
                    A real-time spatial digital layer over R.V.R. & J.C. College of Engineering. Rotate in 360°, inspect physical academic blocks, monitor live telemetry, and leverage autonomous AI reasoning.
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto">
                  <div className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#CCFF00] text-[#121212] font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#FFFFFF] group-hover:bg-[#d8ff33] flex items-center justify-center gap-2 text-center">
                    <span>Explore 3D Campus Map</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Flow System Architecture Visualizer */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[#E11D48] text-xs font-black uppercase tracking-widest block mb-1">
              THE AUTONOMOUS CAMPUS LOOP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#121212]">
              How Campus 2.0 Works in One Unified Flow
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              {
                step: '01',
                title: 'Campus Map',
                action: 'Sees',
                desc: 'Live 3D telemetry of all 8 campus blocks',
                color: 'bg-[#CCFF00]',
                sectionId: 'digital-twin'
              },
              {
                step: '02',
                title: 'AI Copilot',
                action: 'Understands',
                desc: 'Context-aware assistant for students & faculty',
                color: 'bg-[#D4F6FF]',
                sectionId: 'copilot'
              },
              {
                step: '03',
                title: 'Intelligence',
                action: 'Predicts',
                desc: 'Forecasts library crunch & HVAC anomalies',
                color: 'bg-[#FFE500]',
                sectionId: 'intelligence'
              },
              {
                step: '04',
                title: 'Smart Spaces',
                action: 'Allocates',
                desc: 'Instant booking for 8-person study pods',
                color: 'bg-[#FFDEEB]',
                sectionId: 'spaces'
              },
              {
                step: '05',
                title: 'Campus Pulse',
                action: 'Listens',
                desc: 'AI clusters 187 reports into single root cause',
                color: 'bg-[#E3DCFF]',
                sectionId: 'pulse'
              },
              {
                step: '06',
                title: 'Action Engine',
                action: 'Resolves',
                desc: 'Automates technician dispatch & SLA tracking',
                color: 'bg-[#E8FAD5]',
                sectionId: 'pulse'
              },
              {
                step: '07',
                title: 'Collab & Quest',
                action: 'Empowers',
                desc: 'Skill passports, team matching & XP levels',
                color: 'bg-[#FFD1B3]',
                sectionId: 'collab'
              }
            ].map((node, i) => (
              <div
                key={i}
                onClick={() => onNavigateToSection && onNavigateToSection(node.sectionId)}
                className={`p-3.5 rounded-2xl border-2 border-black ${node.color} shadow-[3px_3px_0px_#121212] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#121212] transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600 mb-1">
                    <span>STEP {node.step}</span>
                    <span className="font-black text-[#121212] uppercase tracking-wider">{node.action}</span>
                  </div>
                  <h4 className="font-black text-xs text-[#121212] mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[10px] text-stone-700 font-medium leading-tight">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
