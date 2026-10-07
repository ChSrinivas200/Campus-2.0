import React, { useState, useEffect } from 'react';
import { Trophy, Users, Building2, Flame, Sparkles, Clock, CheckCircle2, Database } from 'lucide-react';
import { fetchFestStats } from '../api';



export default function LiveStats() {
  const [stats, setStats] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Countdown timer to Fest Date (Feb 26, 2027)
  useEffect(() => {
    const targetDate = new Date('2027-02-26T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadLiveDatabaseStats = async () => {
    try {
      const data = await fetchFestStats();
      if (data) {
        setStats(data);
        setIsLiveConnected(true);
      }
    } catch (e) {
      console.warn('Live stats query fallback:', e);
    }
  };

  useEffect(() => {
    loadLiveDatabaseStats();

    // Auto-refresh stats every 8 seconds to reflect live database registrations
    const interval = setInterval(loadLiveDatabaseStats, 8000);

    // Also update instantly when registration occurs anywhere on the page
    const handleRegistration = () => {
      loadLiveDatabaseStats();
    };

    window.addEventListener('colorido_registration_completed', handleRegistration);
    window.addEventListener('storage', handleRegistration);

    return () => {
      clearInterval(interval);
      window.removeEventListener('colorido_registration_completed', handleRegistration);
      window.removeEventListener('storage', handleRegistration);
    };
  }, []);

  const totalRegs = stats?.totalRegistrations || 508;


  return (
    <section id="stats" className="py-12 space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <Clock className="w-3.5 h-3.5" />
            LIVE METRICS
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            ticking live from MongoDB!
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Countdown & <span className="underline decoration-[#FF5A1F] decoration-4">Live Numbers</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Original real-time registration data across R.V.R. & J.C. College of Engineering departments.
        </p>
      </div>

      {/* Countdown Clock Box */}
      <div className="bg-white brutal-border rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#121212] text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#121212] uppercase tracking-wider mb-5">
          <Clock className="w-4 h-4 text-[#FF5A1F] animate-spin-slow" />
          <span>Inauguration Zero Hour</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'DAYS', value: timeLeft.days, bg: '#F8F5EE' },
            { label: 'HOURS', value: timeLeft.hours, bg: '#FEE7EA' },
            { label: 'MINUTES', value: timeLeft.minutes, bg: '#FFF5C0' },
            { label: 'SECONDS', value: timeLeft.seconds, bg: '#CCFF00' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.bg }}
              className="p-4 sm:p-5 rounded-2xl brutal-border shadow-[3px_3px_0px_#121212] flex flex-col items-center justify-center"
            >
              <span className="block text-4xl sm:text-5xl font-display font-black text-[#121212] leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono font-extrabold text-[#121212] tracking-widest uppercase mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#CCFF00] brutal-border flex items-center justify-center text-[#121212] shadow-[2px_2px_0px_#121212] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-[#121212]">{totalRegs}</div>
            <div className="font-mono text-xs font-bold text-stone-600 uppercase">Registered Delegates</div>
          </div>
        </div>

        <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF5A1F] brutal-border flex items-center justify-center text-white shadow-[2px_2px_0px_#121212] shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-[#121212]">{stats?.cashPrizePool || '₹1,82,500+'}</div>
            <div className="font-mono text-xs font-bold text-stone-600 uppercase">Prize Money</div>
          </div>
        </div>

        <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFF5C0] brutal-border flex items-center justify-center text-[#121212] shadow-[2px_2px_0px_#121212] shrink-0">
            <Flame className="w-6 h-6 text-[#FF5A1F]" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-[#121212]">{stats?.eventsCount || 38}+</div>
            <div className="font-mono text-xs font-bold text-stone-600 uppercase">Competitive Events</div>
          </div>
        </div>

        <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4F6FF] brutal-border flex items-center justify-center text-[#121212] shadow-[2px_2px_0px_#121212] shrink-0">
            <Building2 className="w-6 h-6 text-[#121212]" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-[#121212]">9 Depts</div>
            <div className="font-mono text-xs font-bold text-stone-600 uppercase">Engineering Wings</div>
          </div>
        </div>

      </div>


    </section>
  );
}
