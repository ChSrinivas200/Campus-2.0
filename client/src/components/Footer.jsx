import React from 'react';
import { Sparkles, MapPin, Mail, Phone, ShieldCheck, ArrowUp, Flame, Trophy, Ticket } from 'lucide-react';

export default function Footer({ onOpenAdmin, onOpenColoridoFest }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t-[2.5px] border-[#121212] bg-[#F8F5EE] relative overflow-hidden">
      
      {/* Top Banner Ribbon */}
      <div className="bg-[#121212] text-white py-3 px-4 border-b-2 border-[#121212]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping" />
            <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#CCFF00]">
              CAMPUS 2.0 • Living Digital Layer Operating System // R.V.R. & J.C. College of Engineering
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#121212] font-display font-black text-xs brutal-border hover:bg-[#CCFF00] transition-colors cursor-pointer shadow-[2px_2px_0px_#121212]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & System Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-[#121212]">
                CAMPUS
              </span>
              <span className="bg-[#CCFF00] text-[#121212] font-display font-black text-xs px-2 py-0.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#121212]">
                2.0
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              A living digital layer over R.V.R. & J.C. College of Engineering that can see what is happening, understand it using AI, predict problems, connect people, and help the campus take action.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#CCFF00] brutal-border-2 text-[11px] font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212]">
                EST. 1985 • Autonomous Campus
              </span>
            </div>
          </div>

          {/* Col 2: Festival Links */}
          <div>
            <h5 className="text-xs font-black font-display text-[#121212] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#121212] inline-block">
              Fest Navigation
            </h5>
            <ul className="space-y-1.5 text-xs font-bold text-stone-700">
              <li><a href="#events" className="hover:text-[#FF5A1F] transition-colors">Browse 38+ Competitions</a></li>
              <li><a href="#schedule" className="hover:text-[#FF5A1F] transition-colors">Event Timeline & Schedule</a></li>
              <li><a href="#about" className="hover:text-[#FF5A1F] transition-colors">Fest Manifesto & Legacy</a></li>
              <li><a href="#gallery" className="hover:text-[#FF5A1F] transition-colors">Polaroid Moments Gallery</a></li>
              <li><a href="#discussions" className="hover:text-[#FF5A1F] transition-colors">Student Buzz & Feed</a></li>
              <li><a href="#announcements" className="hover:text-[#FF5A1F] transition-colors">Live Match Scores & Results</a></li>
              <li><a href="#faq" className="hover:text-[#FF5A1F] transition-colors">Attendee Helpdesk & FAQs</a></li>
              <li><a href="#sponsors" className="hover:text-[#FF5A1F] transition-colors">Official Fest Sponsors</a></li>
            </ul>
          </div>

          {/* Col 3: Official Venue Address */}
          <div>
            <h5 className="text-xs font-black font-display text-[#121212] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#121212] inline-block">
              Festival Headquarters
            </h5>
            <div className="space-y-2 text-xs text-stone-700 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <span>
                  R.V.R. & J.C. College of Engineering (Autonomous), Chandramoulipuram, Chowdavaram, Guntur, Andhra Pradesh 522019
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#121212] shrink-0" />
                <span className="font-mono">colorido2027@rvrjc.ac.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#121212] shrink-0" />
                <span className="font-mono">+91 863 2288254 / 2288201</span>
              </div>
            </div>
          </div>

          {/* Col 4: Admin Console */}
          <div>
            <h5 className="text-xs font-black font-display text-[#121212] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#121212] inline-block">
              Administration
            </h5>
            <div className="p-4 rounded-2xl bg-white brutal-border shadow-[3px_3px_0px_#121212] space-y-2 text-xs">
              <p className="font-display font-black text-sm text-[#121212]">Festival Helpdesk & Control</p>
              <p className="text-[11px] text-stone-600 font-medium">Verify Entry QR Passes, Rosters & Live Stats</p>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="w-full mt-2 py-2 rounded-xl bg-[#121212] text-[#CCFF00] font-display font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#CCFF00] hover:bg-stone-900 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Console (PIN: rvrjc2027)</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Big Watermark */}
        <div className="pt-4 border-t-2 border-dashed border-[#121212]/30 select-none overflow-hidden">
          <div className="font-display font-black text-4xl sm:text-7xl md:text-9xl text-center tracking-tighter text-[#121212]/10">
            CAMPUS 2.0
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-4 border-t-2 border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-stone-700">
          <p>© 2026–2027 CAMPUS 2.0 • R.V.R. & J.C. College of Engineering. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="bg-[#CCFF00] px-2 py-0.5 rounded brutal-border-2 text-[#121212]">
              Living Autonomous Digital Layer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
