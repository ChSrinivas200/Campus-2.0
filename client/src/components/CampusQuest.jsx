import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle, 
  Flame, 
  Award, 
  Star, 
  Check, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { fetchCampusQuests, completeCampusQuest } from '../api';
import { sound } from '../utils/soundEffects';

export default function CampusQuest() {
  const [quests, setQuests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userXp, setUserXp] = useState(2840);
  const [claimedNotice, setClaimedNotice] = useState('');

  useEffect(() => {
    fetchCampusQuests().then(res => {
      if (res) {
        if (res.activeQuests) setQuests(res.activeQuests);
        if (res.leaderboard) setLeaderboard(res.leaderboard);
      }
    });
  }, []);

  const handleComplete = async (questId, xp) => {
    sound.playChime();
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const res = await completeCampusQuest(questId);
    if (res && res.success) {
      setUserXp(prev => prev + (xp || 50));
      setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true, progress: '1/1 Complete' } : q));
      setClaimedNotice(`🎉 Quest Completed! Added +${xp || 50} XP to your passport!`);
      setTimeout(() => setClaimedNotice(''), 5000);
    }
  };

  return (
    <section id="quests" className="py-8 md:py-12 bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#121212] p-4 sm:p-6 lg:p-8">
      <div>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="brutal-pill bg-[#FFE500] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Trophy className="w-3.5 h-3.5 text-[#121212]" />
            CAMPUS QUEST
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Meaningful Campus Involvement Challenges
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Gamifies real campus contribution: earn verified XP and badges for attending AI workshops, hackathons, volunteering, and reporting facilities glitches.
          </p>
        </div>

        <AnimatePresence>
          {claimedNotice && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="max-w-xl mx-auto p-3.5 rounded-xl bg-[#E8FAD5] brutal-border-2 text-[#1E520A] text-xs font-bold text-center mb-6 shadow-[3px_3px_0px_#121212]"
            >
              {claimedNotice}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Quests (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-[#121212] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF5A1F]" />
                <span>Active Quests & Milestones</span>
              </h3>
              <motion.span 
                key={userXp}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="px-3.5 py-1 rounded-full bg-[#CCFF00] brutal-border text-xs font-mono font-black text-[#121212] shadow-xs"
              >
                Your XP: {userXp}
              </motion.span>
            </div>

            <div className="space-y-3">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl brutal-border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    q.completed 
                      ? 'bg-stone-50 border-stone-300 opacity-80' 
                      : 'bg-white shadow-[4px_4px_0px_#121212] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-[10px] font-black">
                        {q.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FFE500] text-[#121212] text-[10px] font-mono font-black">
                        +{q.xpReward} XP
                      </span>
                    </div>

                    <h4 className="font-display font-black text-sm text-[#121212]">
                      {q.title}
                    </h4>

                    <p className="text-[11px] text-stone-500 font-medium">
                      Location: {q.location} • Badge Unlock: <strong className="text-[#121212]">{q.badgeUnlock}</strong>
                    </p>
                  </div>

                  <div>
                    {q.completed ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
                        <Check className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleComplete(q.id, q.xpReward)}
                        className="px-4 py-2 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 transition-all"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Claim Quest (+{q.xpReward} XP)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF9F5] rounded-2xl brutal-border p-5 sm:p-6 shadow-[4px_4px_0px_#121212] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#121212] pb-3">
              <h3 className="font-display font-black text-base text-[#121212] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFE500]" />
                <span>Campus Leaderboard</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-stone-500">
                LIVE SEASON 1
              </span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((student) => (
                <div
                  key={student.rank}
                  className={`p-3 rounded-2xl brutal-border-2 flex items-center justify-between gap-3 transition-transform hover:scale-101 ${
                    student.rank === 1 ? 'bg-[#FFE500]/30 border-[#121212]' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl font-mono font-black text-xs flex items-center justify-center brutal-border ${
                      student.rank === 1 ? 'bg-[#FFE500] text-[#121212]' :
                      student.rank === 2 ? 'bg-[#D4F6FF] text-[#121212]' :
                      student.rank === 3 ? 'bg-[#FFDEEB] text-[#121212]' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      #{student.rank}
                    </span>
                    <div>
                      <h5 className="font-display font-black text-xs text-[#121212]">
                        {student.name}
                      </h5>
                      <span className="text-[10px] text-stone-500 font-semibold">
                        {student.dept} • {student.badge}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-black text-xs text-[#121212] bg-[#F8F5EE] px-2.5 py-1 rounded-lg border border-stone-300">
                    {student.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
