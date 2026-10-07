import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Ticket, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Layers, 
  Compass, 
  Building2, 
  Award,
  Activity,
  Zap,
  LogIn
} from 'lucide-react';

export default function Navbar({
  onOpenTicketLookup,
  onOpenColoridoFest,
  onOpenAdmin,
  onGoToHome,
  onOpenLogin,
  onRegisterClick,
  currentPage = 'campus',
  onNavigateToSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', action: () => onGoToHome && onGoToHome(), active: currentPage === 'campus' },
    { name: 'Campus Map', action: () => onNavigateToSection && onNavigateToSection('digital-twin') },
    { name: 'Discussions', action: () => onNavigateToSection && onNavigateToSection('discussions') },
    { name: 'AI Copilot', action: () => onNavigateToSection && onNavigateToSection('copilot') },
    { name: 'Collab Hub', action: () => onNavigateToSection && onNavigateToSection('collab') },
    { name: 'Skill Passport', action: () => onNavigateToSection && onNavigateToSection('passport') },
    { name: 'Campus Quest', action: () => onNavigateToSection && onNavigateToSection('quests') },
    { name: 'Pulse & Action', action: () => onNavigateToSection && onNavigateToSection('pulse') },
    { name: 'Fest Hub', action: () => onOpenColoridoFest && onOpenColoridoFest(), active: currentPage === 'colorido' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FDFDFD] border-b-2 border-black/10 transition-shadow duration-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* 1. Main Logo: CAMPUS 2.0 */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onGoToHome}
              className="flex items-center text-left group cursor-pointer select-none"
            >
              <div className="flex items-center">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#121212]">
                  CAMPUS
                </span>
                <span className="bg-[#CCFF00] text-[#121212] font-display font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl border-2 border-black ml-2 shadow-[2px_2px_0px_#121212] group-hover:bg-[#d8ff33] transition-colors">
                  2.0
                </span>
              </div>
            </button>
          </div>

          {/* 2. Center Navigation Pills (Exact match from screenshot) */}
          <nav className="hidden xl:flex items-center gap-1.5 font-bold text-xs text-stone-700">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  item.active 
                    ? 'bg-[#121212] text-white font-extrabold shadow-sm' 
                    : 'hover:bg-stone-100 hover:text-black font-semibold'
                }`}
              >
                {item.name}
              </button>
            ))}

            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 rounded-full hover:bg-stone-100 hover:text-black font-semibold transition-all cursor-pointer"
              >
                Log In
              </button>
            )}
          </nav>

          {/* 3. Right Action Buttons (Pink Register Now Pill with Star from screenshot) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenTicketLookup}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-black px-3 py-1.5 rounded-full hover:bg-stone-100 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-stone-500" />
              <span>Find Pass</span>
            </button>

            {/* Register Now Vibrant Pink Pill Button */}
            <button
              onClick={() => onRegisterClick && onRegisterClick('')}
              className="px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FF1493] via-[#E91E63] to-[#D81B60] text-white font-extrabold text-xs border-2 border-black shadow-[2.5px_2.5px_0px_#121212] hover:shadow-[1px_1px_0px_#121212] hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Register Now</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-xl bg-stone-100 border border-stone-300 text-[#121212] hover:bg-stone-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 p-5 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { setMobileMenuOpen(false); item.action(); }}
                className={`p-2.5 rounded-xl text-left font-bold text-xs ${
                  item.active ? 'bg-black text-white' : 'bg-[#F8F5EE] text-[#121212]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onRegisterClick && onRegisterClick(''); }}
              className="w-full py-2.5 rounded-full bg-[#E91E63] text-white font-extrabold text-xs flex items-center justify-center gap-2 border-2 border-black"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register for Pass</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="w-full py-2 rounded-xl bg-[#121212] text-[#CCFF00] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console (PIN: rvrjc2027)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
