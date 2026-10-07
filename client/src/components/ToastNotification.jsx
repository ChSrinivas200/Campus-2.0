import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function ToastNotification({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#CCFF00] text-[#121212] brutal-border shadow-[4px_4px_0px_#121212]">
        <Sparkles className="w-4 h-4 text-[#FF5A1F] shrink-0 fill-[#FF5A1F]" />
        <span className="text-xs font-display font-extrabold">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/10 text-[#121212] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
