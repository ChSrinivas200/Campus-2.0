import React, { useState } from 'react';
import { 
  X, Heart, Trash2, ArrowRight, Sparkles, Trophy, Calendar, 
  Clock, MapPin, AlertTriangle, CheckCircle2, Download, Printer, List, Compass
} from 'lucide-react';

// Helper to convert time string (e.g. "10:00 AM") to minutes from midnight
function parseTimeToMinutes(str) {
  if (!str) return null;
  const match = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Check if two timing strings overlap
function checkTimingOverlap(timingA, timingB) {
  if (!timingA || !timingB) return false;
  const [startAStr, endAStr] = timingA.split('-').map(s => s.trim());
  const [startBStr, endBStr] = timingB.split('-').map(s => s.trim());
  const startA = parseTimeToMinutes(startAStr);
  const endA = parseTimeToMinutes(endAStr);
  const startB = parseTimeToMinutes(startBStr);
  const endB = parseTimeToMinutes(endBStr);

  if (startA === null || endA === null || startB === null || endB === null) return false;
  return Math.max(startA, startB) < Math.min(endA, endB);
}

export default function SavedEventsDrawer({ isOpen, onClose, savedTitles, events, onRemoveBookmark, onRegister }) {
  const [viewTab, setViewTab] = useState('itinerary'); // 'itinerary' | 'list'

  if (!isOpen) return null;

  const savedEventsList = events.filter(e => savedTitles.includes(e.title));

  // Detect Conflicts
  const conflicts = [];
  for (let i = 0; i < savedEventsList.length; i++) {
    for (let j = i + 1; j < savedEventsList.length; j++) {
      const a = savedEventsList[i];
      const b = savedEventsList[j];
      const sameDate = a.date && b.date && a.date.toLowerCase() === b.date.toLowerCase();
      if (sameDate && checkTimingOverlap(a.timing, b.timing)) {
        conflicts.push({
          event1: a.title,
          event2: b.title,
          date: a.date,
          timing1: a.timing,
          timing2: b.timing
        });
      }
    }
  }

  // Sort chronologically for Itinerary
  const sortedItinerary = [...savedEventsList].sort((a, b) => {
    // Day comparison first
    const dateComp = (a.date || '').localeCompare(b.date || '');
    if (dateComp !== 0) return dateComp;
    const timeA = parseTimeToMinutes((a.timing || '').split('-')[0]) || 0;
    const timeB = parseTimeToMinutes((b.timing || '').split('-')[0]) || 0;
    return timeA - timeB;
  });

  const handleExportTextItinerary = () => {
    if (sortedItinerary.length === 0) return;
    let content = `=====================================\n`;
    content += `COLORIDO 2K27 - MY PERSONAL FEST ITINERARY\n`;
    content += `R.V.R. & J.C. College of Engineering\n`;
    content += `=====================================\n\n`;

    sortedItinerary.forEach((ev, idx) => {
      content += `${idx + 1}. ${ev.title}\n`;
      content += `   📅 ${ev.date} | ⏱️ ${ev.timing}\n`;
      content += `   📍 ${ev.venue}\n`;
      content += `   🏆 Prize Pool: Team: ${ev.prizes?.team?.first || 'N/A'} | Solo: ${ev.prizes?.solo?.first || 'N/A'}\n\n`;
    });

    if (conflicts.length > 0) {
      content += `⚠️ WARNING - SCHEDULE OVERLAPS DETECTED:\n`;
      conflicts.forEach(c => {
        content += `- ${c.event1} (${c.timing1}) overlaps with ${c.event2} (${c.timing2}) on ${c.date}\n`;
      });
      content += `\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Colorido2k27_My_Itinerary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#121212]/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#F8F5EE] border-l-[2.5px] border-[#121212] h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-slideLeft">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#121212] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FEE7EA] brutal-border-2 text-[#5C1D24] shadow-[2px_2px_0px_#121212]">
                <Heart className="w-5 h-5 fill-[#FF4D8D]" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-[#121212]">My Fest Watchlist</h3>
                <p className="text-[11px] font-mono font-bold text-[#FF5A1F]">{savedEventsList.length} Tracks Selected</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white brutal-border text-[#121212] hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#121212]"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 mb-4 bg-white p-1 rounded-xl brutal-border shadow-[2px_2px_0px_#121212]">
            <button
              onClick={() => setViewTab('itinerary')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-display font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewTab === 'itinerary'
                  ? 'bg-[#CCFF00] text-[#121212] brutal-border-2 font-black shadow-[1.5px_1.5px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Itinerary Timeline</span>
            </button>
            <button
              onClick={() => setViewTab('list')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-display font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewTab === 'list'
                  ? 'bg-[#CCFF00] text-[#121212] brutal-border-2 font-black shadow-[1.5px_1.5px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Cards ({savedEventsList.length})</span>
            </button>
          </div>

          {/* Conflict Notification Alert */}
          {conflicts.length > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-[#FEE7EA] brutal-border-2 text-[#5C1D24] text-xs font-medium space-y-1 shadow-[2px_2px_0px_#121212]">
              <div className="flex items-center gap-1.5 font-bold text-[#FF5A1F]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Schedule Overlap Warning!</span>
              </div>
              {conflicts.map((c, i) => (
                <p key={i} className="text-[11px] leading-tight">
                  • <strong>{c.event1}</strong> overlaps with <strong>{c.event2}</strong> ({c.date}).
                </p>
              ))}
            </div>
          )}

          {/* TAB 1: Chronological Itinerary Timeline */}
          {viewTab === 'itinerary' && (
            <div>
              {sortedItinerary.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-dashed border-[#121212] space-y-4 ml-2">
                    {sortedItinerary.map((ev, idx) => (
                      <div key={idx} className="relative group">
                        {/* Timeline Circle Bullet */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#CCFF00] brutal-border-2 shadow-[1px_1px_0px_#121212] group-hover:scale-125 transition-transform" />

                        <div className="p-3.5 rounded-xl bg-white brutal-border space-y-1.5 shadow-[2.5px_2.5px_0px_#121212]">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[10px] font-bold text-[#FF5A1F] bg-[#FEE7EA] px-2 py-0.5 rounded border border-[#121212]">
                              {ev.date} • {ev.timing}
                            </span>
                            <button
                              onClick={() => onRemoveBookmark(ev.title)}
                              className="text-stone-400 hover:text-red-500 cursor-pointer p-0.5"
                              title="Remove from Itinerary"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="font-display font-black text-sm text-[#121212]">{ev.title}</h4>
                          <p className="text-[11px] font-medium text-stone-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF5A1F]" />
                            {ev.venue}
                          </p>

                          <div className="pt-1.5 flex items-center justify-between text-xs font-mono">
                            <span className="text-[10px] font-bold text-stone-700">
                              🏆 1st: {ev.prizes?.team?.first || '₹3,000'}
                            </span>
                            <button
                              onClick={() => {
                                onClose();
                                onRegister(ev.title);
                              }}
                              className="text-[10px] font-display font-black text-[#121212] bg-[#CCFF00] px-2 py-0.5 rounded brutal-border-2 hover:bg-[#d8ff33] cursor-pointer"
                            >
                              Register Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleExportTextItinerary}
                    className="w-full py-2.5 rounded-xl bg-white brutal-border font-display font-bold text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#CCFF00] flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>Download Personal Itinerary (.TXT)</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white brutal-border flex items-center justify-center text-stone-400 shadow-[2px_2px_0px_#121212]">
                    <Clock className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-display font-black text-[#121212]">Itinerary is Empty</p>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto font-medium">
                    Bookmark multiple competitions to auto-generate a conflict-free chronological fest itinerary!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: List Cards View */}
          {viewTab === 'list' && (
            <div>
              {savedEventsList.length > 0 ? (
                <div className="space-y-3">
                  {savedEventsList.map((ev) => (
                    <div
                      key={ev._id || ev.title}
                      className="p-4 rounded-2xl bg-white brutal-border space-y-2 shadow-[3px_3px_0px_#121212] relative group hover:shadow-[5px_5px_0px_#121212] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[9px] mb-1 inline-block">{ev.category}</span>
                          <h4 className="font-display font-black text-sm text-[#121212]">{ev.title}</h4>
                        </div>
                        <button
                          onClick={() => onRemoveBookmark(ev.title)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-[#FF5A1F] hover:bg-stone-50 border border-transparent hover:border-[#121212] transition-colors cursor-pointer"
                          title="Remove Bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-600 font-medium">{ev.venue}</p>

                      <div className="pt-2 border-t-2 border-dashed border-[#121212]/20 flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#FF5A1F] flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" /> 1st: {ev.prizes?.team?.first || '₹3,000'}
                        </span>

                        <button
                          onClick={() => {
                            onClose();
                            onRegister(ev.title);
                          }}
                          className="px-3.5 py-1.5 rounded-xl font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border-2 shadow-[2px_2px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <span>Register</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white brutal-border flex items-center justify-center text-stone-400 shadow-[2px_2px_0px_#121212]">
                    <Heart className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-display font-black text-[#121212]">No Saved Events Yet</p>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto font-medium">
                    Click the heart icon on any event card to save competitions to your personal fest watchlist.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-[#121212]">
          <p className="text-[11px] font-mono text-center text-stone-600 font-bold">
            COLORIDO 2K27 • Saved locally in browser
          </p>
        </div>
      </div>
    </div>
  );
}
