import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    author: 'Kiran Kumar',
    department: 'Mechanical',
    role: 'student',
    time: '17:42',
    content: 'Futsal and Box Cricket registrations are filling up quick. The competition looks intense this year! 🔥',
    likes: 4
  },
  {
    id: 2,
    author: 'Priya Patel',
    department: 'Electronics',
    role: 'student',
    time: '18:10',
    content: 'Does anyone know if the Code Clash Round 1 MCQs require custom laptops or will CSE block desktops be provided?',
    likes: 2
  },
  {
    id: 3,
    author: 'Festival Director (Admin)',
    department: 'Campus Administration',
    role: 'admin',
    time: '19:10',
    content: '👋 Welcome everyone to COLORIDO \'26! High-speed desktops are provided in the Turing Lab for Code Clash, but you can also bring personal laptops if preferred. Also, Food & Game stalls are filling quickly!',
    likes: 18
  },
  {
    id: 4,
    author: 'Sandeep Sharma',
    department: 'Computer Science',
    role: 'student',
    time: '19:46',
    content: 'Super excited for the Battle of the Bands on night 2! Who else is attending?',
    likes: 7
  },
  {
    id: 5,
    author: 'Aditya Verma',
    department: 'Information Technology',
    role: 'student',
    time: '20:05',
    content: 'Looking for 1 frontend teammate for the Web Dev challenge tomorrow morning. DM or reply if interested!',
    likes: 3
  }
];

export default function DiscussionFeed({ onRegisterClick, onGoToLogin }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('colorido_discussion_messages_v2');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [newMessage, setNewMessage] = useState('');
  const [guestName, setGuestName] = useState(() => {
    try {
      return localStorage.getItem('colorido_user_name') || '';
    } catch {
      return '';
    }
  });
  const [guestDept, setGuestDept] = useState('Computer Science');
  const [showInputForm, setShowInputForm] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  const messagesEndRef = useRef(null);

  const saveMessages = (msgs) => {
    setMessages(msgs);
    try {
      localStorage.setItem('colorido_discussion_messages_v2', JSON.stringify(msgs));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgObj = {
      id: Date.now(),
      author: guestName.trim() || 'Student Delegate',
      department: guestDept,
      role: 'student',
      time: currentTime,
      content: newMessage.trim(),
      likes: 0
    };

    const updated = [...messages, newMsgObj];
    saveMessages(updated);
    setNewMessage('');

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLike = (id) => {
    setLikedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const isLiked = !likedMap[id];
        return {
          ...m,
          likes: Math.max(0, m.likes + (isLiked ? 1 : -1))
        };
      }
      return m;
    }));
  };

  return (
    <section id="discussions" className="py-14 sm:py-18 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Matching screenshot */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex">
            <span className="px-4 py-1 rounded-full bg-[#F3E8FF] text-[#7C3AED] font-extrabold text-xs tracking-wider uppercase border border-[#8B5CF6]/20">
              STUDENT COMMUNITY
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#121212] font-display uppercase">
            CAMPUS DISCUSSION
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect with contingents, ask campus questions, arrange study meetups, and share campus updates!
          </p>
        </div>

        {/* Neo-brutalist Chat Box - Exact match from user screenshot */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl border-2 border-[#121212] shadow-[6px_6px_0px_#121212] overflow-hidden">
          
          {/* Box Top Header Bar */}
          <div className="border-b-2 border-[#121212] px-6 py-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="font-extrabold text-sm sm:text-base text-[#121212]">
                #general-campus-hall
              </span>
            </div>

            <span className="text-xs font-mono font-medium text-stone-500">
              {messages.length} messages
            </span>
          </div>

          {/* Messages Scrollable List */}
          <div className="p-6 space-y-5 max-h-[500px] overflow-y-auto bg-white">
            {messages.map((msg) => {
              const isAdmin = msg.role === 'admin';
              const isLiked = Boolean(likedMap[msg.id]);

              return (
                <div key={msg.id} className="space-y-1.5">
                  {/* Sender metadata row */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-bold text-[#121212]">
                      {msg.author}
                    </span>

                    {msg.department && (
                      <span className="text-stone-500 font-normal">
                        ({msg.department})
                      </span>
                    )}

                    {isAdmin && (
                      <span className="bg-[#8B5CF6] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">
                        ADMIN
                      </span>
                    )}

                    <span className="text-stone-400">·</span>

                    <span className="text-stone-400 font-mono text-[11px]">
                      {msg.time}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 sm:p-5 text-sm leading-relaxed transition-all relative group ${
                      isAdmin
                        ? 'bg-[#FAF5FF] border-2 border-[#8B5CF6] text-[#2E1065] font-medium shadow-sm'
                        : 'bg-white border border-stone-200 text-[#121212] font-normal shadow-sm hover:border-stone-300'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>

                    {/* Subtle Like Action */}
                    <div className="mt-2.5 flex items-center justify-end">
                      <button
                        onClick={() => handleLike(msg.id)}
                        className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                          isLiked 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{msg.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Action Footer Bar - Exact matching style from screenshot */}
          <div className="border-t-2 border-[#121212] p-5 bg-white text-center">
            {!showInputForm ? (
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-medium text-stone-700">
                  Please{' '}
                  <button
                    onClick={onGoToLogin}
                    className="text-[#FF2E93] font-bold underline cursor-pointer hover:text-[#E91E63]"
                  >
                    Log In
                  </button>{' '}
                  to participate in the campus discussion.
                </p>

                <button
                  onClick={() => setShowInputForm(true)}
                  className="text-[11px] font-mono font-bold text-stone-400 hover:text-stone-700 underline cursor-pointer"
                >
                  Or post message as student guest →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 text-left">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your Name (e.g. Rahul)"
                    className="w-full sm:w-44 px-3 py-2 rounded-xl bg-[#F8F5EE] border border-stone-300 text-xs font-semibold focus:outline-none focus:border-black"
                    maxLength={30}
                  />
                  <select
                    value={guestDept}
                    onChange={(e) => setGuestDept(e.target.value)}
                    className="w-full sm:w-48 px-3 py-2 rounded-xl bg-[#F8F5EE] border border-stone-300 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Information Tech">Information Tech</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical & EEE">Electrical & EEE</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message in #general-festival-hall..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F5EE] border border-stone-300 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#CCFF00] text-[#121212] font-display font-black text-xs border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-[#d8ff33] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 pt-1">
                  <span>Press Send to dispatch to channel</span>
                  <button
                    type="button"
                    onClick={() => setShowInputForm(false)}
                    className="underline text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    Close form
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
