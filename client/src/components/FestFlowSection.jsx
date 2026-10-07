import React, { useState } from 'react';
import { Compass, UserCheck, Mail, QrCode, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Send, Award, Activity, Database } from 'lucide-react';

const FLOW_STEPS = [
  {
    step: '01',
    title: 'Event Exploration & Eligibility',
    subtitle: 'Track Discovery',
    badge: 'Phase 01',
    icon: Compass,
    color: '#CCFF00',
    description: 'Students across all 9 engineering branches explore 38+ curated tracks spanning Cultural (Choreoday, Bands, Classical Dance), Boys/Girls Sports, and Digital Club Hackathons with ₹1,50,000+ cash prizes.',
    details: [
      'Filter by Cultural, Boys Sports, Girls Sports, Digital Club',
      'Inspect detailed competition rules, stage requirements & timings',
      'One-click event bookmarking to "My Saved Events" drawer'
    ]
  },
  {
    step: '02',
    title: 'Smart Registration & Team Formation',
    subtitle: 'Zero Duplication',
    badge: 'Phase 02',
    icon: UserCheck,
    color: '#FF5A1F',
    description: 'Unified registration validates college roll numbers (e.g., Y22CS084), prevents duplicate entries, and supports Solo and Team delegations with automatic team member aggregation.',
    details: [
      'Regex format validation on Indian mobile & college email',
      'Roll-number collision prevention across database',
      'Instant generation of cryptographic Pass ID (COLORIDO-27-XXXXXX)'
    ]
  },
  {
    step: '03',
    title: 'Automated Gmail Pass Dispatch',
    subtitle: 'Nodemailer SMTP',
    badge: 'Phase 03',
    icon: Mail,
    color: '#FFE500',
    description: 'The moment registration is saved, the backend automatically triggers a branded, responsive HTML digital pass to the student’s inbox via official Gmail SMTP.',
    details: [
      'Official sender: srinivasalbertrose@gmail.com',
      'Contains Digital QR Pass, venue schedule, reporting instructions',
      'On-demand "Resend Pass to Email" available 24/7'
    ]
  },
  {
    step: '04',
    title: 'Gate Security & Pass Verification',
    subtitle: 'Real-Time Gate Scan',
    badge: 'Phase 04',
    icon: QrCode,
    color: '#D4F6FF',
    description: 'At Silver Jubilee Auditorium and Sports Pavilion entry gates, coordinators verify the QR code / Ticket ID via the dedicated Gate Scanner tool, stamping entry timestamp.',
    details: [
      'Instant pass status lookup (Active, Verified, Gate-Checked)',
      'Prevents unauthorized campus entry or impersonation',
      'Displays registered event clearance for entry guards'
    ]
  },
  {
    step: '05',
    title: 'Admin Intelligence & Analytics',
    subtitle: 'Central Command',
    badge: 'Phase 05',
    icon: ShieldCheck,
    color: '#FEE7EA',
    description: 'Organizers and faculty conveners monitor real-time registration volumes, branch-wise participation ratios, and export clean CSV reports for event judges.',
    details: [
      'Departmental breakdown across CSE, IT, ECE, EEE, MECH & AI&ML',
      'Live attendee deletion, event prize editing & pass email re-trigger',
      'One-click Excel/CSV export for offline scorekeeping'
    ]
  }
];

export default function FestFlowSection({ onOpenRegister, onOpenLookup }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="flow" className="py-12 relative">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
              <Activity className="w-3.5 h-3.5" />
              SYSTEM PIPELINE
            </span>
            <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
              end-to-end architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
            How Colorido 2K27 <span className="underline decoration-[#CCFF00] decoration-4">Operates</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            From event discovery and instant registration to automated Gmail pass delivery and gate barcode verification.
          </p>
        </div>

        {/* Step Navigator Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {FLOW_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#121212] text-white shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                    : 'bg-white text-stone-800 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{item.step}</span>
                <Icon className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>{item.subtitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white brutal-border rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#121212] relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
                  {FLOW_STEPS[activeStep].badge}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">
                  Colorido Workflow Engine
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#121212]">
                {FLOW_STEPS[activeStep].title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                {FLOW_STEPS[activeStep].description}
              </p>

              <div className="space-y-2 pt-2 border-t-2 border-dashed border-[#121212]/20">
                <p className="text-[11px] font-mono font-bold text-[#FF5A1F] uppercase">Key Highlights & Protocols:</p>
                {FLOW_STEPS[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs font-medium text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons based on active step */}
              <div className="pt-3 flex flex-wrap gap-3">
                {activeStep === 0 && (
                  <a
                    href="#events"
                    className="brutal-btn-tactile px-5 py-2.5 rounded-full text-xs font-display font-black text-[#121212] bg-[#CCFF00] brutal-border shadow-[2.5px_2.5px_0px_#121212] flex items-center gap-2"
                  >
                    <span>Browse 38+ Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {activeStep === 1 && (
                  <button
                    onClick={onOpenRegister}
                    className="brutal-btn-tactile px-5 py-2.5 rounded-full text-xs font-display font-black text-white bg-[#FF5A1F] brutal-border shadow-[2.5px_2.5px_0px_#121212] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Open Registration Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {activeStep === 2 && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-[#121212] text-xs font-mono font-bold shadow-[2px_2px_0px_#121212]">
                    <Mail className="w-4 h-4 text-[#FF5A1F]" />
                    <span>Sender: srinivasalbertrose@gmail.com</span>
                  </div>
                )}
                {(activeStep === 3 || activeStep === 4) && (
                  <button
                    onClick={onOpenLookup}
                    className="brutal-btn-tactile px-5 py-2.5 rounded-full text-xs font-display font-black text-[#121212] bg-[#FFF5C0] brutal-border shadow-[2.5px_2.5px_0px_#121212] flex items-center gap-2 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Retrieve & Verify Pass</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Visual Diagram / Step Emblem */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F8F5EE] brutal-border shadow-[3px_3px_0px_#121212]">
              <div
                style={{ backgroundColor: FLOW_STEPS[activeStep].color }}
                className="w-20 h-20 rounded-2xl brutal-border flex items-center justify-center shadow-[4px_4px_0px_#121212] mb-4 rotate-3"
              >
                {React.createElement(FLOW_STEPS[activeStep].icon, { className: "w-10 h-10 text-[#121212]" })}
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-mono text-[#FF5A1F] font-bold uppercase tracking-wider">
                  Phase {activeStep + 1} of 5
                </span>
                <h4 className="text-lg font-display font-black text-[#121212]">
                  {FLOW_STEPS[activeStep].subtitle}
                </h4>
                <p className="text-[11px] text-stone-600 font-medium max-w-xs">
                  Integrated with Node.js Express, MongoDB Atlas, and Nodemailer SMTP engine.
                </p>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center gap-2 mt-5">
                {FLOW_STEPS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveStep(dotIdx)}
                    className={`h-2.5 rounded-full brutal-border-2 transition-all cursor-pointer ${
                      activeStep === dotIdx ? 'w-8 bg-[#CCFF00]' : 'w-2.5 bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
