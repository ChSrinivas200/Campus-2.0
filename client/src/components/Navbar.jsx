import React, { useState, useEffect } from 'react';
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
  LogIn,
  Volume2,
  VolumeX,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

export default function Navbar({
  onOpenTicketLookup,
  onOpenColoridoFest,
  onOpenAdmin,
  onGoToHome,
  onOpenLogin,
  onRegisterClick,
  currentPage = 'campus',
  onNavigateToSection,
  onOpenCommandPalette
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isEnabled());

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Home', action: () => onGoToHome && onGoToHome(), active: currentPage === 'campus' },
    { name: 'Features', action: () => onNavigateToSection && onNavigateToSection('twin'), active: false },
    { name: 'Campus Life', action: () => onNavigateToSection && onNavigateToSection('discussions'), active: false },
    { name: 'Events', action: () => onOpenColoridoFest && onOpenColoridoFest(), active: currentPage === 'colorido' },
    { name: 'Resources', action: () => onNavigateToSection && onNavigateToSection('navigation'), active: false },
    { name: 'About', action: () => onNavigateToSection && onNavigateToSection('copilot'), active: false },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FDFDFD] border-b-2 border-black/10 transition-shadow duration-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* 1. Main Logo: CAMPUS 2.0 with subtitle */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onGoToHome}
              className="flex flex-col items-start text-left group cursor-pointer select-none"
            >
              <div className="flex items-center">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#121212]">
                  CAMPUS 2.0
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-stone-500 uppercase -mt-0.5">
                NEXT-GEN AUTONOMOUS CAMPUS INTELLIGENCE
              </span>
            </button>
          </div>

          {/* 2. Center Navigation Pills (Exact match from reference mockup) */}
          <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-stone-700">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  item.active 
                    ? 'bg-[#FFE500] text-[#121212] font-black border border-black/20 shadow-xs' 
                    : 'hover:bg-stone-100 hover:text-black font-semibold'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* 3. Right Action Buttons: Search Pill + Sound FX Toggle + Pink Register Now Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill Button / Input (triggers Command Palette Spotlight) */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette && onOpenCommandPalette();
              }}
              className="hidden md:flex items-center gap-2 bg-stone-100/90 hover:bg-stone-200/80 border border-black/10 rounded-full px-3.5 py-1.5 transition-all cursor-pointer group"
              title="Search campus features (Ctrl+K / Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-black transition-colors" />
              <span className="text-xs text-stone-400 group-hover:text-stone-700 font-medium">Search campus...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-stone-500 rounded border border-stone-200">
                ⌘K
              </kbd>
            </button>

            {/* Tactile Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border border-black/15 transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-[#CCFF00] text-black shadow-xs hover:bg-[#d8ff33]' 
                  : 'bg-stone-100 text-stone-400 hover:text-black'
              }`}
              title={soundEnabled ? 'Tactile Sound Effects ON' : 'Tactile Sound Effects Muted'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenTicketLookup && onOpenTicketLookup();
              }}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-black px-2.5 py-1.5 rounded-full hover:bg-stone-100 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-stone-500" />
              <span>Pass</span>
            </button>

            {/* Register Now Vibrant Pink Pill Button with Confetti Blast */}
            <button
              onClick={() => {
                sound.playChime();
                try {
                  confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { y: 0.15 }
                  });
                } catch {
                  // ignore
                }
                onRegisterClick && onRegisterClick('');
              }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FF1493] via-[#E91E63] to-[#D81B60] text-white font-extrabold text-xs border-2 border-black shadow-[2.5px_2.5px_0px_#121212] hover:shadow-[1px_1px_0px_#121212] hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Register Now</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(prev => !prev);
              }}
              className="lg:hidden p-2 rounded-xl bg-stone-100 border border-stone-300 text-[#121212] hover:bg-stone-200 cursor-pointer"
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
