import React from 'react';
import { X, MapPin, Clock, Trophy, ShieldCheck, CheckCircle2, User, Users, ArrowRight } from 'lucide-react';

export default function EventModal({ event, onClose, onRegister }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white brutal-border rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#121212]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F8F5EE] brutal-border text-[#121212] hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#121212]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs">
            {event.category}
          </span>
          {event.organizer && (
            <span className="font-mono text-xs font-bold text-stone-700 bg-[#F8F5EE] brutal-border-2 px-2.5 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_#121212]">
              {event.organizer}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212] mb-2">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium mb-5">
          {event.description}
        </p>

        {/* Venue & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="p-3.5 rounded-xl bg-[#F8F5EE] brutal-border flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Venue Location</p>
              <p className="text-xs sm:text-sm font-display font-black text-[#121212]">{event.venue}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F5EE] brutal-border flex items-start gap-3">
            <Clock className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Schedule & Timing</p>
              <p className="text-xs sm:text-sm font-display font-black text-[#121212]">{event.date} • {event.timing}</p>
            </div>
          </div>
        </div>

        {/* Prize Money Breakdown */}
        <div className="p-4 rounded-2xl bg-[#FFF5C0] brutal-border mb-5 space-y-2">
          <div className="flex items-center justify-between text-[#121212] font-display font-black text-sm">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FF5A1F]" />
              Official Cash Prize Pool
            </span>
            <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">verified cash</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white brutal-border-2 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#FF5A1F] mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Team Track Prizes</span>
              </div>
              <p className="font-bold text-[#121212]">🥇 1st: <span className="font-black text-emerald-600">{event.prizes?.team?.first || '₹3,000'}</span></p>
              <p className="text-stone-600">🥈 2nd: {event.prizes?.team?.second || '₹2,000'}</p>
              <p className="text-stone-600">🥉 3rd: {event.prizes?.team?.third || '₹1,000'}</p>
            </div>

            <div className="p-3 rounded-xl bg-white brutal-border-2 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#121212] mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Solo Track Prizes</span>
              </div>
              <p className="font-bold text-[#121212]">🥇 1st: <span className="font-black text-emerald-600">{event.prizes?.solo?.first || '₹1,500'}</span></p>
              <p className="text-stone-600">🥈 2nd: {event.prizes?.solo?.second || '₹1,000'}</p>
              <p className="text-stone-600">🥉 3rd: {event.prizes?.solo?.third || '₹500'}</p>
            </div>
          </div>
        </div>

        {/* Rules List */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-display font-black text-[#121212] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FF5A1F]" />
            <span>Rules & Competition Protocol</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
            {event.rules && event.rules.length > 0 ? (
              event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-[#F8F5EE] brutal-border-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))
            ) : (
              <li className="text-stone-500">Standard fest guidelines and evaluation criteria apply.</li>
            )}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-dashed border-[#121212]/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-display font-bold text-stone-700 hover:text-[#121212] bg-white brutal-border shadow-[2px_2px_0px_#121212] cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRegister(event.title);
            }}
            className="px-6 py-2.5 rounded-full text-xs font-display font-black text-[#121212] bg-[#CCFF00] brutal-border shadow-[3.5px_3.5px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Proceed to Register</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
