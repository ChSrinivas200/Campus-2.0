import React, { useEffect, useState } from 'react';
import { 
  X, CheckCircle2, QrCode, Download, Mail, Send, Sparkles, MapPin, 
  Calendar, Award, Loader2, Sun, Smartphone, Zap, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { resendPassEmail } from '../api';

export default function TicketPassModal({ ticketData, onClose }) {
  const [emailStatus, setEmailStatus] = useState({ sending: false, sent: false, message: '' });
  const [spotlightMode, setSpotlightMode] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Trigger celebratory confetti on pass open
  useEffect(() => {
    if (ticketData) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  }, [ticketData]);

  // Screen Wake Lock API to prevent phone sleep during gate check-in
  useEffect(() => {
    let wakeLock = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          setWakeLockActive(true);
          wakeLock.addEventListener('release', () => {
            setWakeLockActive(false);
          });
        } catch (err) {
          console.log('WakeLock not active or supported:', err);
        }
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock !== null) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  if (!ticketData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleResendEmail = async () => {
    if (emailStatus.sending) return;
    setEmailStatus({ sending: true, sent: false, message: '' });
    try {
      const res = await resendPassEmail(ticketData.ticketId || ticketData.regdNo || ticketData.email);
      if (res.success) {
        setEmailStatus({ sending: false, sent: true, message: `Pass dispatched to ${ticketData.email || 'your email'}!` });
      } else {
        setEmailStatus({ sending: false, sent: false, message: res.message || 'Failed to dispatch email.' });
      }
    } catch (e) {
      setEmailStatus({ sending: false, sent: false, message: 'Mail server unreachable.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/85 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 brutal-border shadow-[10px_10px_0px_#121212] transition-colors duration-200 overflow-hidden ${
        spotlightMode ? 'bg-white' : 'bg-white'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F8F5EE] brutal-border text-[#121212] hover:bg-[#FF5A1F] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#121212]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header Badge */}
        <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Official Registration Confirmed</span>
        </div>

        <h3 className="text-center text-2xl sm:text-3xl font-display font-black text-[#121212] mb-1">
          Colorido Fest Pass
        </h3>

        {/* Gate Scanning Brightness Advisory Banner */}
        <div className="mb-4 p-2.5 rounded-xl bg-[#FFF5C0] brutal-border-2 text-[#121212] text-xs font-mono flex items-center justify-between gap-2 shadow-[2px_2px_0px_#121212]">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#FF5A1F] shrink-0 animate-spin" />
            <span className="text-[11px] font-bold">
              Turn up screen brightness for rapid gate scanning at OAT & Jubilee gates!
            </span>
          </div>
          {wakeLockActive && (
            <span className="px-2 py-0.5 rounded bg-[#CCFF00] brutal-border-2 text-[9px] font-black shrink-0">
              ⚡ Screen Awake
            </span>
          )}
        </div>

        {/* Digital Ticket Hologram / Stub Card */}
        <div className={`p-5 sm:p-6 rounded-2xl brutal-border relative shadow-[3px_3px_0px_#121212] mb-4 transition-colors ${
          spotlightMode ? 'bg-white' : 'bg-[#F8F5EE]'
        }`}>
          
          {/* Top Bar */}
          <div className="flex justify-between items-center pb-3 border-b-2 border-dashed border-[#121212]/30">
            <div>
              <p className="text-[10px] font-mono font-bold text-[#FF5A1F] uppercase tracking-wider">
                R.V.R. & J.C. College of Engineering
              </p>
              <p className="text-xs font-display font-black text-[#121212]">
                COLORIDO 2K27 OFFICIAL PASS
              </p>
            </div>
            <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
              {ticketData.participationType || 'Solo'}
            </span>
          </div>

          {/* Ticket ID & Name */}
          <div className="my-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">Participant</p>
              <h4 className="text-xl font-display font-black text-[#121212]">
                {ticketData.fullName}
              </h4>
              <p className="text-xs font-mono font-bold text-stone-700 mt-0.5">
                Regd No: <span className="text-[#FF5A1F]">{ticketData.regdNo}</span> • {ticketData.department}
              </p>
              {ticketData.collegeName && (
                <p className="text-[11px] text-stone-600 mt-0.5 truncate max-w-[240px] font-medium">
                  {ticketData.collegeName}
                </p>
              )}
            </div>

            {/* High-Contrast QR Code Graphic Box */}
            <div className="p-3 rounded-2xl bg-white brutal-border text-[#121212] shrink-0 flex flex-col items-center shadow-[3px_3px_0px_#121212]">
              <QrCode className="w-16 h-16 text-[#121212]" />
              <span className="text-[9px] font-mono font-black mt-1 text-[#121212] bg-[#CCFF00] px-1.5 py-0.5 rounded brutal-border-2">
                GATE SCAN
              </span>
            </div>
          </div>

          {/* Registered Events */}
          <div className="mb-4">
            <p className="text-[10px] font-mono font-bold text-stone-500 uppercase mb-1.5">Registered Events</p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {ticketData.events && ticketData.events.length > 0 ? (
                ticketData.events.map((ev, i) => (
                  <span
                    key={i}
                    className="text-xs font-display font-bold px-2 py-0.5 rounded-md bg-white brutal-border-2 text-[#121212] shadow-[1px_1px_0px_#121212]"
                  >
                    {ev}
                  </span>
                ))
              ) : (
                <span className="text-xs text-stone-500 font-medium">All Fest Main Events Access</span>
              )}
            </div>
          </div>

          {/* Bottom Bar Ticket Code */}
          <div className="pt-3 border-t-2 border-dashed border-[#121212]/30 flex justify-between items-center text-xs font-mono">
            <span className="text-stone-500 font-bold">OFFICIAL PASS ID</span>
            <span className="font-display font-black text-[#FF5A1F] text-sm tracking-wider">
              {ticketData.ticketId || `COLORIDO-27-889102`}
            </span>
          </div>
        </div>

        {/* Resend Status feedback */}
        {emailStatus.message && (
          <div className={`mb-4 text-center text-xs p-2 rounded-xl font-bold brutal-border-2 ${
            emailStatus.sent ? 'bg-[#CCFF00] text-[#121212]' : 'bg-[#FEE7EA] text-[#5C1D24]'
          }`}>
            {emailStatus.message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => setSpotlightMode(!spotlightMode)}
            className={`py-3 px-3 rounded-full text-xs font-display font-black brutal-border shadow-[2.5px_2.5px_0px_#121212] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              spotlightMode ? 'bg-[#CCFF00] text-[#121212]' : 'bg-[#F8F5EE] text-[#121212] hover:bg-stone-200'
            }`}
            title="Max Contrast Scanner Mode"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{spotlightMode ? 'Normal View' : 'Gate Spotlight'}</span>
          </button>

          <button
            onClick={handleResendEmail}
            disabled={emailStatus.sending}
            className="flex-1 py-3 px-3 rounded-full text-xs font-display font-black text-[#121212] bg-[#FFF5C0] brutal-border shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#ffe500] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {emailStatus.sending ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
            ) : (
              <Send className="w-4 h-4 text-[#121212]" />
            )}
            <span>{emailStatus.sending ? 'Sending...' : 'Resend Email'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-3 rounded-full text-xs font-display font-black text-[#121212] bg-white brutal-border shadow-[2.5px_2.5px_0px_#121212] hover:bg-stone-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#121212]" />
            <span>Download</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-3 rounded-full text-xs font-display font-black text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
}
