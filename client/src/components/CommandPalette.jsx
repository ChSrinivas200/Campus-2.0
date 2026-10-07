import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ArrowRight, 
  Layers, 
  Bot, 
  Compass, 
  Users, 
  Award, 
  Trophy, 
  Sparkles, 
  Calendar,
  Building2,
  Cpu,
  Flame,
  Radio
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

const QUICK_COMMANDS = [
  { id: 'twin', title: 'Explore 3D Digital Twin', category: 'Features', icon: Layers, tab: 'twin', hint: 'WebGL 3D Campus BIM' },
  { id: 'copilot', title: 'Ask AI Campus Copilot', category: 'AI Tools', icon: Bot, tab: 'copilot', hint: 'GPT-4o Campus Bot' },
  { id: 'nav-library', title: 'Navigate to Central Library Deck', category: 'Waypoints', icon: Compass, tab: 'navigation', hint: 'Floor 2 Study Hub' },
  { id: 'nav-sjb', title: 'Navigate to Silver Jubilee Block (SJB)', category: 'Waypoints', icon: Compass, tab: 'navigation', hint: 'Room 312 CS Labs' },
  { id: 'collab', title: 'AI Squad & Team Matcher', category: 'Opportunities', icon: Users, tab: 'collab', hint: 'Find Hackathon Teammates' },
  { id: 'passport', title: 'Campus Skill Passport', category: 'Profile', icon: Award, tab: 'passport', hint: 'Skills & Verified Badges' },
  { id: 'quest', title: 'Campus Quest & Rewards', category: 'Gamification', icon: Trophy, tab: 'quest', hint: 'XP, Streaks & Badges' },
  { id: 'colorido', title: 'Colorido 2k26 Fest Hub', category: 'Events', icon: Calendar, action: 'events', hint: '20+ Inter-College Contests' },
  { id: 'spaces', title: 'Smart Spaces & Energy Telemetry', category: 'Telemetry', icon: Radio, tab: 'twin', hint: 'Solar & Lab Occupancy' },
];

export default function CommandPalette({ isOpen, onClose, onSelectTab, onOpenEvents }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCommands = QUICK_COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase()) ||
    cmd.hint.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      sound.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      sound.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const executeCommand = (cmd) => {
    sound.playPop();
    onClose();
    if (cmd.action === 'events') {
      onOpenEvents && onOpenEvents();
    } else if (cmd.tab) {
      onSelectTab && onSelectTab(cmd.tab);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#121212] overflow-hidden z-10"
          >
            {/* Header Search Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-stone-100 bg-[#FAF9F6]">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search campus features, routes, events, or labs..."
                className="w-full bg-transparent text-sm sm:text-base font-bold text-[#121212] placeholder-stone-400 outline-none"
              />
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-stone-200 text-stone-600 rounded-md border border-stone-300">
                ESC
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-stone-200 text-stone-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-stone-100">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-stone-500">
                  <p className="text-sm font-bold">No campus results found for "{query}"</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching for "3D", "copilot", "events", or "route"</p>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#121212] translate-x-1' 
                          : 'hover:bg-stone-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border border-black/10 shrink-0 ${
                          isSelected ? 'bg-white text-black' : 'bg-stone-100 text-stone-700'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-sm text-[#121212]">
                              {cmd.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 text-stone-600 font-bold">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 font-medium">
                            {cmd.hint}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-black translate-x-1' : 'text-stone-300'}`} />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with keyboard hints */}
            <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Campus 2.0 Command Spotlight</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
