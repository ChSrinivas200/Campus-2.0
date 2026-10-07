import React, { useState } from 'react';
import { 
  Cpu, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Compass, 
  Flame, 
  ArrowRight, 
  Loader2, 
  HelpCircle, 
  ShieldCheck, 
  GraduationCap, 
  MessageSquare,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { askCampusCopilot } from '../api';
import { sound } from '../utils/soundEffects';

const DEFAULT_PROMPTS = [
  "Where is today's Python workshop?",
  "Where can I find an 8-person study space with a projector?",
  "How do I apply for an On-Duty (OD) pass?",
  "What is the live occupancy and noise level in the Central Library?",
  "Tell me about Colorido 2k26 events, rules, and how to get passes"
];

export default function CampusAICopilot({ onNavigateToSection, onOpenColoridoFest }) {
  const [role, setRole] = useState('student'); // 'student' | 'faculty' | 'admin'
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      sender: 'bot',
      category: 'Campus Copilot Core',
      text: "👋 Welcome to **Campus 2.0 AI Copilot**! I'm your autonomous assistant who understands every corner of the R.V.R. & J.C. campus. Ask me about classrooms, lab equipment, faculty hours, transit, room bookings, or Colorido 2k26 fest passes. You can also switch your persona above!",
      quickActions: [
        { label: "Where is today's Python workshop?", action: 'ask' },
        { label: "Check Central Library Occupancy", action: 'twin' }
      ]
    }
  ]);

  const handleRoleChange = (newRole) => {
    sound.playClick();
    setRole(newRole);
  };

  const handleSend = async (queryText = null) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend || !textToSend.trim() || loading) return;

    sound.playPop();

    const userEntry = {
      sender: 'user',
      text: textToSend.trim(),
      role
    };

    setConversation(prev => [...prev, userEntry]);
    if (!queryText) setInputMessage('');
    setLoading(true);

    try {
      const res = await askCampusCopilot(textToSend.trim(), role);
      setLoading(false);
      sound.playClick();
      if (res && res.response) {
        setConversation(prev => [
          ...prev,
          {
            sender: 'bot',
            category: res.category || 'Copilot Intel',
            text: res.response,
            quickActions: res.quickActions || []
          }
        ]);
      }
    } catch (err) {
      setLoading(false);
      setConversation(prev => [
        ...prev,
        {
          sender: 'bot',
          category: 'System Notice',
          text: 'Unable to communicate with Campus Intelligence core. Running in offline knowledge cache.'
        }
      ]);
    }
  };

  const handleActionClick = (action) => {
    sound.playClick();
    if (action.action === 'ask') {
      handleSend(action.label);
    } else if (action.action === 'events' || action.target === 'colorido') {
      if (onOpenColoridoFest) onOpenColoridoFest();
    } else if (action.action === 'navigate') {
      if (onNavigateToSection) onNavigateToSection('digital-twin');
    }
  };

  return (
    <section id="copilot" className="py-8 md:py-12 bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#121212] p-4 sm:p-6 lg:p-8">
      <div>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Cpu className="w-3.5 h-3.5 text-[#004B6E]" />
            AI CAMPUS COPILOT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Campus Bot
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            AI Campus Copilot understands classrooms, labs, events, faculty schedules, transport, and facility rules. It customizes answers based on whether you are a Student, Faculty Member, or Administrator.
          </p>

          {/* Persona Switcher */}
          <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase text-stone-500 mr-1">Select Persona:</span>
            {[
              { id: 'student', label: 'Student 🎒', color: 'bg-[#CCFF00]' },
              { id: 'faculty', label: 'Faculty 🎓', color: 'bg-[#FFE500]' },
              { id: 'admin', label: 'Administrator 🛡️', color: 'bg-[#FFDEEB]' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => handleRoleChange(p.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-black brutal-border transition-all cursor-pointer ${
                  role === p.id 
                    ? `${p.color} shadow-[3px_3px_0px_#121212] -translate-y-0.5` 
                    : 'bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Terminal Window */}
        <div className="bg-white rounded-2xl brutal-border shadow-[6px_6px_0px_#121212] overflow-hidden flex flex-col h-[540px]">
          
          {/* Terminal Titlebar with Waveform Indicator */}
          <div className="px-5 py-3 bg-[#121212] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]"></span>
              <span className="text-xs font-mono font-bold tracking-wider ml-2">
                COPILOT-AI // ROLE: {role.toUpperCase()}
              </span>
            </div>

            {/* Audio Waveform Animation Bars */}
            <div className="flex items-center gap-1">
              {[0.4, 0.8, 0.5, 0.9, 0.6].map((height, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: loading ? [0.3, 1.4, 0.4] : 0.4 }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 h-3.5 bg-[#CCFF00] rounded-full origin-bottom"
                />
              ))}
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 ml-2">
                ONLINE
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F5]">
            <AnimatePresence initial={false}>
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl brutal-border shrink-0 flex items-center justify-center ${
                    msg.sender === 'user' ? 'bg-[#121212] text-white' : 'bg-[#CCFF00] text-[#121212]'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2">
                    <div className={`p-4 rounded-2xl brutal-border text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#121212] text-white shadow-[2px_2px_0px_#CCFF00]'
                        : 'bg-white text-[#121212] shadow-[3px_3px_0px_#121212]'
                    }`}>
                      {msg.category && (
                        <span className="block text-[10px] font-mono font-black text-[#FF5A1F] uppercase mb-1">
                          {msg.category}
                        </span>
                      )}
                      <div className="font-medium whitespace-pre-line">
                        {msg.text}
                      </div>
                    </div>

                    {/* Quick Action Chips attached to response */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.quickActions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#CCFF00] brutal-border-2 text-[11px] font-bold text-[#121212] shadow-[1.5px_1.5px_0px_#121212] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#CCFF00] brutal-border flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white brutal-border text-xs font-mono font-bold text-stone-500 shadow-[2px_2px_0px_#121212] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Synthesizing campus layers & GPT-4o telemetry...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggested Chips Bar */}
          <div className="px-4 py-2 bg-white border-t border-[#121212] overflow-x-auto flex gap-2 scrollbar-none">
            {DEFAULT_PROMPTS.map((p, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-stone-100 hover:bg-[#FFE500] brutal-border text-[10px] font-bold text-stone-800 transition-colors cursor-pointer shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-t-2 border-[#121212] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask Copilot as ${role} (e.g. "Where is today's Python workshop?")...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white shadow-[2px_2px_0px_#121212]"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Copilot</span>
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
