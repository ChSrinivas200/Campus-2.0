import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, Send, X, MessageSquare, RefreshCw, ChevronRight, Trophy, MapPin, Ticket, Zap, ShieldCheck, Flame, Compass } from 'lucide-react';

// RAG Knowledge Base Document Index
const KNOWLEDGE_BASE = [
  {
    topic: 'prizes',
    keywords: ['prize', 'cash', 'reward', 'money', 'pool', 'win', 'amount', 'first'],
    answer: '🏆 **COLORIDO 2K27 Cash Prize Pool:** Over **₹1,50,000+** in cash awards across Cultural, Digital Club, and Sports competitions!\n• **Choreoday & Bands:** ₹25,000+ First Prize\n• **Digital Club Tracks:** ₹20,000+ Tech Cash Rewards\n• **Sports Championships:** ₹30,000+ Cash Pool + Champion Trophies & Medals.',
    action: { label: 'Register for Events', target: '#events' }
  },
  {
    topic: 'events',
    keywords: ['event', 'competition', 'dance', 'music', 'band', 'sports', 'drama', 'fashion', 'fine arts', 'tekraft', 'code'],
    answer: '🔥 **Official COLORIDO 2K27 Competition Tracks:**\n1. **Cultural:** Choreoday, Battle of the Bands, Solo/Group Dance, Fine Arts, Dramatics, Fashion Show, Literary Quiz.\n2. **Digital Club Spotlight:** Web Dev Challenge, Code Odyssey, AMV Editing, Esports Valorant LAN.\n3. **Sports Championships:** Basketball (Boys), Volleyball (Boys), Throwball (Girls), TenniKoit (Girls), Table Tennis.',
    action: { label: 'View All Competitions', target: '#events' }
  },
  {
    topic: 'venue',
    keywords: ['venue', 'location', 'where', 'oat', 'map', 'reach', 'address', 'guntur', 'college', 'silver jubilee', 'sac'],
    answer: '📍 **R.V.R. & J.C. College of Engineering, Guntur** (Chowdavaram, AP 522019).\n• **Open Air Theatre (OAT):** Mega Stage & Choreoday (3,500+ capacity)\n• **Silver Jubilee Hall:** Battle of the Bands & Dramatics\n• **SAC Sports Complex:** Basketball & Throwball floodlight courts\n• **Computer Center (CS Block):** Digital Club Hackathons',
    action: { label: 'Explore 3D Campus Map', target: '#campus-map' }
  },
  {
    topic: 'registration',
    keywords: ['register', 'apply', 'pass', 'ticket', 'entry', 'fee', 'how to register', 'account', 'sign up', 'cost'],
    answer: '🎟️ **Registration & Verified Digital QR Passes:**\nRegistration is **FREE & Instant**! Fill out your Student Festival Account form to generate your official verified QR pass. You can participate in Solo or Team events.',
    action: { label: 'Browse Events & Register', target: '#events' }
  },
  {
    topic: 'schedule',
    keywords: ['schedule', 'time', 'date', 'timing', 'day 1', 'day 2', 'feb', 'when'],
    answer: '🗓️ **COLORIDO 2K27 Dates:** **Feb 26 & Feb 27, 2027**.\n• **Day 1 (Feb 26):** Inauguration, Battle of the Bands, Fine Arts, Web Dev Challenge & Sports Prelims.\n• **Day 2 (Feb 27):** Choreoday Grand Finale, Fashion Show, Sports Finals & Celebrity EDM Night!',
    action: { label: 'View Schedule Timeline', target: '#schedule' }
  },
  {
    topic: 'digital_club',
    keywords: ['digital club', 'tech', 'coding', 'web', 'hackathon', 'amv', 'valorant', 'esports'],
    answer: '⚡ **Digital Club Flagship Tracks:**\nOrganized by the RVR & JC Digital Club! Includes Website Design Showdown, Speed Coding, Anime Music Video (AMV) Editing, and Valorant LAN Esports.',
    action: { label: 'Digital Club Banner', target: '#cultural-spotlight' }
  },
  {
    topic: 'admin',
    keywords: ['admin', 'pin', 'portal', 'dashboard', 'console', 'coordinator', 'organizer', 'staff', 'verifier', 'passcode'],
    answer: '🛡️ **COLORIDO Admin Command Center:**\nAccess live registered student rosters, gate QR pass scanner, attendance tracker, and diagnostics!\n• **Security PIN:** `rvrjc2027`',
    action: { label: 'Open Admin Console', target: '#admin' }
  }
];

const SUGGESTED_QUERIES = [
  '🏆 Cash Prize Pool?',
  '🗓️ Fest Dates & Schedule?',
  '📍 Campus Venues?',
  '🛡️ Admin Console'
];

export default function AIChatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '👋 Hey! I am your **COLORIDO AI Copilot**. Ask me about events, cash prizes, venues, or rules!',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // RAG Search Algorithm
  const processQuery = (userQuery) => {
    const queryLower = userQuery.toLowerCase();
    
    let bestMatch = null;
    let maxScore = 0;

    KNOWLEDGE_BASE.forEach((doc) => {
      let score = 0;
      doc.keywords.forEach((kw) => {
        if (queryLower.includes(kw)) {
          score += 2;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = doc;
      }
    });

    if (bestMatch && maxScore > 0) {
      return {
        text: bestMatch.answer,
        action: bestMatch.action,
        confidence: 'RAG Knowledge Match'
      };
    }

    return {
      text: `✨ **COLORIDO 2K27 Annual Extravaganza!**\nOrganized by R.V.R. & J.C. College of Engineering. Featuring **38+ Events**, **₹1,50,000+ Prizes**, and instant **Verified Digital Passes**. What would you like to know?`,
      action: { label: 'Explore Events', target: '#events' },
      confidence: 'General Fest Knowledge'
    };
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const ragResult = processQuery(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: ragResult.text,
        action: ragResult.action,
        source: ragResult.confidence,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleActionClick = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating AI Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="brutal-btn-tactile p-3.5 sm:p-4 rounded-full bg-[#CCFF00] brutal-border text-[#121212] shadow-[4px_4px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-2 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#121212]" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-[#121212]" />
              <span className="hidden sm:inline-block font-display font-black text-xs uppercase tracking-wide">
                Ask Fest AI
              </span>
              <Sparkles className="w-4 h-4 text-[#FF5A1F] fill-[#FF5A1F]" />
            </>
          )}
        </button>
      </div>

      {/* RAG Chatbot Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[410px] h-[540px] max-h-[82vh] z-50 bg-white brutal-border rounded-3xl shadow-[8px_8px_0px_#121212] flex flex-col overflow-hidden animate-scaleUp">
          
          {/* Header */}
          <div className="p-4 bg-[#CCFF00] border-b-2 border-[#121212] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white brutal-border-2 flex items-center justify-center text-[#121212] shadow-[2px_2px_0px_#121212]">
                <Bot className="w-5 h-5 text-[#121212]" />
              </div>
              <div>
                <h4 className="font-display font-black text-sm text-[#121212] flex items-center gap-1.5">
                  <span>Colorido AI Copilot</span>
                  <span className="text-[9px] font-mono font-bold bg-[#121212] text-[#CCFF00] px-1.5 py-0.2 rounded">v2.7</span>
                </h4>
                <p className="text-[10px] font-mono font-bold text-stone-700">
                  RAG Assistant • RVR & JC
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white brutal-border-2 text-[#121212] hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#F8F5EE]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl space-y-2 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#121212] text-white brutal-border rounded-tr-none shadow-[2px_2px_0px_#121212]'
                      : 'bg-white text-[#121212] brutal-border rounded-tl-none shadow-[2px_2px_0px_#121212]'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>

                  {/* Action Link inside Bot Response */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action.target)}
                      className="mt-2 w-full py-1.5 px-3 rounded-xl bg-[#CCFF00] brutal-border-2 text-[#121212] font-display font-black text-[11px] flex items-center justify-between shadow-[1.5px_1.5px_0px_#121212] hover:bg-[#d8ff33] transition-all cursor-pointer group"
                    >
                      <span>{msg.action.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  {msg.source && (
                    <div className="pt-1 border-t-2 border-dashed border-[#121212]/20 text-[9px] font-mono font-bold text-stone-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#FF5A1F]" />
                      <span>{msg.source}</span>
                    </div>
                  )}
                </div>

                <span className="text-[9px] font-mono font-bold text-stone-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-white brutal-border text-stone-500 w-20 shadow-[2px_2px_0px_#121212]">
                <div className="w-2 h-2 rounded-full bg-[#121212] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestion Chips */}
          <div className="p-2 bg-white border-t-2 border-[#121212] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-xl bg-[#F8F5EE] hover:bg-[#CCFF00] brutal-border-2 text-[10px] font-display font-black text-[#121212] whitespace-nowrap shadow-[1.5px_1.5px_0px_#121212] transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t-2 border-[#121212]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about events, cash prizes, map..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#F8F5EE] text-[#121212] placeholder-stone-400 text-xs brutal-border-2 focus:bg-white focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-[#CCFF00] brutal-border-2 text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
