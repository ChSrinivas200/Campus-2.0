import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function FloatingAIButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-[#121212] text-white px-5 py-2.5 rounded-full border-2 border-white shadow-[4px_4px_0px_#121212] hover:shadow-[2px_2px_0px_#121212] hover:translate-x-[1px] hover:translate-y-[1px] flex items-center gap-2 transition-all cursor-pointer select-none group"
      title="Ask Campus Copilot / AI Assistant"
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E93] opacity-80" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF2E93]" />
      </span>

      <Bot className="w-4 h-4 text-[#CCFF00] group-hover:rotate-12 transition-transform" />

      <span className="font-extrabold text-xs tracking-wider uppercase">
        ASK FEST AI
      </span>

      <Sparkles className="w-3.5 h-3.5 text-[#00E676]" />
    </button>
  );
}
