import React, { useState } from 'react';
import { X, Search, Loader2, AlertCircle, Ticket } from 'lucide-react';
import { lookupTicket } from '../api';

export default function TicketLookupModal({ onClose, onFoundTicket }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await lookupTicket(query.trim());
      setLoading(false);

      if (res.success) {
        onFoundTicket(res.data);
      } else {
        setErrorMsg(res.message || 'No registered ticket pass found with this ID or Regd No.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Search error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white brutal-border rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#121212]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F8F5EE] brutal-border text-[#121212] hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#121212]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
            <Ticket className="w-3.5 h-3.5" />
            PASS RETRIEVAL
          </span>
        </div>

        <h3 className="text-2xl font-display font-black text-[#121212] mb-1">
          Find Your Fest Pass
        </h3>
        <p className="text-xs text-stone-600 font-medium mb-5">
          Enter your College Registration Number (e.g. Y22CS001) or Ticket ID to view and download your official entry pass.
        </p>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#FEE7EA] brutal-border-2 text-[#5C1D24] text-xs font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Regd No: Y22CS001 or Ticket ID"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] uppercase font-mono font-bold placeholder-stone-400 text-xs sm:text-sm brutal-border focus:bg-white focus:outline-none shadow-[2px_2px_0px_#121212]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full py-3 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                <span>Searching Database...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Lookup Fest Pass</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
