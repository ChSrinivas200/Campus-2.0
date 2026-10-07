import React, { useState, useEffect } from 'react';
import { 
  Bell, Trophy, Megaphone, CheckCircle2, Star, Download, ChevronRight, 
  Pin, Award, Radio, Flame, Gamepad, RefreshCw, Zap, ShieldCheck, Lock
} from 'lucide-react';
import { fetchLiveScores, DEFAULT_SCORES } from '../api';

const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Official Fest Inauguration Ceremony',
    date: 'Feb 26, 2027 • 09:00 AM',
    category: 'General',
    badgeBg: '#CCFF00',
    content: 'Chief Guest Keynote Address at Silver Jubilee Main Auditorium. All registered delegates are requested to report by 08:30 AM.'
  },
  {
    id: '2',
    title: 'Choreoday & Music Band Stage Briefing',
    date: 'Feb 25, 2027 • 04:00 PM',
    category: 'Cultural',
    badgeBg: '#FF5A1F',
    content: 'Participants in Choreoday can submit audio tracks via USB at the OAT sound booth 1 hour before the main event.'
  },
  {
    id: '3',
    title: 'Sports Fixtures & Court Allocations Published',
    date: 'Feb 25, 2027 • 06:00 PM',
    category: 'Sports',
    badgeBg: '#FFE500',
    content: 'Basketball (Boys) and Throwball (Girls) team captain briefing scheduled at 08:00 AM in Sports Pavilion.'
  }
];

const PAST_WINNERS = [
  {
    event: 'Choreoday (Theme Based)',
    category: 'Cultural',
    first: 'Footloose Crew (RVR & JC CE)',
    second: 'Rhythm Warriors (GEC Gudlavalleru)',
    third: 'Pulse Crew (Bapatla Engineering College)'
  },
  {
    event: 'Music & Band (Solo & Group)',
    category: 'Cultural',
    first: 'Sonic Waves (RVR & JC CE)',
    second: 'The Fusion Project (VRSEC)',
    third: 'Rockerz Band (KL University)'
  },
  {
    event: 'Basketball Tournament (Boys)',
    category: 'Sports',
    first: 'RVR & JC Titans (RVR & JC CE)',
    second: 'Vignan Panthers (Vignan University)',
    third: 'VVIT Strikers (VVIT Guntur)'
  },
  {
    event: 'Throwball Championship (Girls)',
    category: 'Sports',
    first: 'RVR & JC Queens (RVR & JC CE)',
    second: 'ANIC Phoenix (Acharya Nagarjuna Univ)',
    third: 'VRSEC Stars (VRSEC Vijayawada)'
  }
];

export default function AnnouncementsResults({ onOpenAdmin }) {
  const [activeTab, setActiveTab] = useState('live-scores'); // 'live-scores' | 'announcements' | 'results'
  const [liveMatches, setLiveMatches] = useState(DEFAULT_SCORES);
  const [lastRefreshed, setLastRefreshed] = useState('Official Admin Feed');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadOfficialScores = async () => {
    try {
      const scores = await fetchLiveScores();
      if (Array.isArray(scores) && scores.length > 0) {
        setLiveMatches(scores);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (e) {
      console.warn('Could not refresh scores:', e);
    }
  };

  // Only Admin can update scores; attendees receive real-time updates from Admin
  useEffect(() => {
    loadOfficialScores();

    // Listen for official admin updates across windows/tabs
    const handleScoreUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setLiveMatches(e.detail);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        loadOfficialScores();
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'colorido_official_scores_v2' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setLiveMatches(parsed);
            setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          }
        } catch (err) {}
      }
    };

    window.addEventListener('colorido_scores_updated', handleScoreUpdate);
    window.addEventListener('storage', handleStorageChange);

    // Periodic sync every 12 seconds to pull any remote admin updates
    const pollInterval = setInterval(loadOfficialScores, 12000);

    return () => {
      window.removeEventListener('colorido_scores_updated', handleScoreUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await loadOfficialScores();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <section id="announcements" className="py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <Megaphone className="w-3.5 h-3.5" />
            ARENA DIRECTORY
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            real-time match scores & notices!
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Notices, Podiums & <span className="underline decoration-[#CCFF00] decoration-4">Live Scores</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Live stage updates, court action, and real-time score feeds during COLORIDO 2K27.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2.5 max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab('live-scores')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-2xl font-display font-black text-xs brutal-border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'live-scores'
              ? 'bg-[#121212] text-[#CCFF00] shadow-[4px_4px_0px_#121212] -translate-y-0.5'
              : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
          <span>Live Scores ⚡</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-2xl font-display font-black text-xs brutal-border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'announcements'
              ? 'bg-[#CCFF00] text-[#121212] shadow-[4px_4px_0px_#121212] -translate-y-0.5'
              : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
          }`}
        >
          <Megaphone className="w-4 h-4 text-[#121212]" />
          <span>Notices</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-2xl font-display font-black text-xs brutal-border flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'results'
              ? 'bg-[#FF5A1F] text-white shadow-[4px_4px_0px_#121212] -translate-y-0.5'
              : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Hall of Fame</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto">
        
        {/* TAB 1: Live Scores & Arena Leaderboards */}
        {activeTab === 'live-scores' && (
          <div className="space-y-4">
            {/* Official Admin Verification Banner */}
            <div className="bg-[#FFF5C0] brutal-border p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2.5px_2.5px_0px_#121212]">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#121212]">
                <div className="w-8 h-8 rounded-xl bg-[#CCFF00] brutal-border flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#121212]">
                  <ShieldCheck className="w-4 h-4 text-[#121212]" />
                </div>
                <div>
                  <div className="font-display font-black text-xs uppercase tracking-wide">
                    Official Referee Scoreboard
                  </div>
                  <div className="text-[11px] font-mono text-stone-700">
                    Live match scores are managed & updated exclusively by authorized Admin Referees.
                  </div>
                </div>
              </div>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 bg-[#121212] text-[#CCFF00] rounded-xl font-display font-black text-xs brutal-border hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#121212] shrink-0"
                >
                  <Lock className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>Update Scores as Admin</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pb-2 border-b-2 border-[#121212]/20">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                </span>
                <span className="font-mono text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Live Arena Telemetry • Updated {lastRefreshed}
                </span>
              </div>
              <button
                onClick={handleManualRefresh}
                className="px-3 py-1 bg-white brutal-border-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#CCFF00] cursor-pointer shadow-[1.5px_1.5px_0px_#121212] transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Official Feed</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveMatches.map((m) => (
                <div
                  key={m.id}
                  className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] brutal-card-hover relative space-y-3"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#121212] text-[#CCFF00]">
                      🔴 LIVE
                    </span>
                    <span className="text-[11px] font-mono font-bold text-stone-500 truncate">
                      {m.arena}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">{m.event}</h4>
                    <p className="text-[11px] font-mono text-[#FF5A1F] font-bold mt-0.5">{m.status}</p>
                  </div>

                  {/* Scoreboard Board */}
                  <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border flex items-center justify-between">
                    <div className="text-left flex-1 truncate pr-2">
                      <div className="font-display font-black text-sm text-[#121212] truncate">{m.team1}</div>
                      <div className="text-[10px] font-mono text-stone-500 font-semibold">Active Side</div>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-white brutal-border-2 font-mono font-black text-xl text-[#121212] shadow-[2.5px_2.5px_0px_#121212] shrink-0 tracking-wider">
                      {m.score1} : {m.score2}
                    </div>

                    <div className="text-right flex-1 truncate pl-2">
                      <div className="font-display font-black text-sm text-[#121212] truncate">{m.team2}</div>
                      <div className="text-[10px] font-mono text-stone-500 font-semibold">Opponent</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-stone-600">
                    <span className="font-bold text-[#FF5A1F]">★ {m.lead}</span>
                    <span className="text-stone-500 font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-stone-400" />
                      <span>{m.lastUpdatedBy || 'Official Admin'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Bulletins & Notices */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {/* Featured Visual Notice with Inaugural Photo */}
            <div className="bg-white brutal-border rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#121212] flex flex-col md:flex-row items-center gap-5">
              <div className="w-full md:w-56 h-36 rounded-xl brutal-border overflow-hidden shrink-0 bg-stone-100">
                <img
                  src="/images/colorido_fest_stage_inauguration.jpg"
                  alt="Inaugural Assembly"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
                    FLAGSHIP NOTICE
                  </span>
                  <span className="font-mono text-xs font-bold text-stone-500">Feb 26, 2027 • 09:00 AM</span>
                </div>
                <h3 className="text-xl font-display font-black text-[#121212]">
                  Grand Inaugural Lamp Lighting & Chief Guest Welcome
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Delegates from all participating engineering institutions report to Silver Jubilee Auditorium. Traditional lamp lighting followed by battle track fixtures draw.
                </p>
              </div>
            </div>

            {ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                className="bg-white brutal-border rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#121212] brutal-card-hover relative overflow-hidden group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    style={{ backgroundColor: item.badgeBg }}
                    className="brutal-pill text-[#121212] text-[10px]"
                  >
                    {item.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-stone-500">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-display font-black text-[#121212] group-hover:text-[#FF5A1F] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Hall of Fame */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Featured Champions Felicitation Showcase */}
            <div className="bg-white brutal-border rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#121212] flex flex-col md:flex-row items-center gap-5">
              <div className="w-full md:w-64 h-44 rounded-xl brutal-border overflow-hidden shrink-0 bg-stone-100">
                <img
                  src="/images/rupajna_hackathon_winners.jpg"
                  alt="Hackathon Champions"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="brutal-pill bg-[#FF5A1F] text-white text-[10px]">
                    CHAMPIONSHIP PODIUM
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600">Official Winners</span>
                </div>
                <h3 className="text-xl font-display font-black text-[#121212]">
                  RūpaJña National Prototype Hackathon Winners
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Congratulations to the winning delegations awarded by the Principal, Directors, and Innovation mentors at R.V.R. & J.C. CE!
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#CCFF00] brutal-border-2 text-xs font-mono font-black text-[#121212]">
                  <Trophy className="w-3.5 h-3.5 text-[#121212]" />
                  <span>Cash Prize & Merit Shields Awarded</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PAST_WINNERS.map((win, idx) => (
                <div
                  key={idx}
                  className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] brutal-card-hover space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="brutal-pill bg-[#FFF5C0] text-[#121212] text-[10px]">
                      {win.category}
                    </span>
                    <Trophy className="w-4 h-4 text-[#FF5A1F]" />
                  </div>

                  <h4 className="font-display font-black text-base text-[#121212]">
                    {win.event}
                  </h4>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-[#CCFF00] brutal-border-2 flex items-center justify-between">
                      <span className="font-black text-[#121212]">🥇 1st Place</span>
                      <span className="font-bold text-[#121212] truncate max-w-[170px]">{win.first}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F8F5EE] brutal-border-2 flex items-center justify-between">
                      <span className="font-bold text-stone-700">🥈 2nd Place</span>
                      <span className="text-stone-700 truncate max-w-[170px]">{win.second}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F8F5EE] brutal-border-2 flex items-center justify-between">
                      <span className="font-bold text-stone-700">🥉 3rd Place</span>
                      <span className="text-stone-700 truncate max-w-[170px]">{win.third}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
