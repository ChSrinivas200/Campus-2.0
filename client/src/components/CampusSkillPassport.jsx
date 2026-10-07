import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Trophy, 
  Code, 
  Users, 
  ArrowRight,
  Flame,
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { fetchStudentPassport } from '../api';
import { sound } from '../utils/soundEffects';

export default function CampusSkillPassport() {
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    fetchStudentPassport('Y22CS084').then(res => {
      if (res && res.data) setPassport(res.data);
      setLoading(false);
    });
  }, []);

  const handleBadgeClick = (badge) => {
    sound.playChime();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    setSelectedBadge(badge);
  };

  if (!passport) return null;

  return (
    <section id="passport" className="py-8 md:py-12 bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#121212] p-4 sm:p-6 lg:p-8">
      <div>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Award className="w-3.5 h-3.5 text-[#121212]" />
            CAMPUS SKILL & GROWTH PASSPORT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Digital Career & Achievement Passport
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Maintains your comprehensive campus achievements, hackathon victories, and skill profile. AI identifies where your skill gaps lie and suggests exact workshops, clubs, and projects to advance your career.
          </p>
        </div>

        {/* Passport Credential Container */}
        <div className="bg-[#FAF9F5] rounded-2xl brutal-border p-5 sm:p-7 shadow-[4px_4px_0px_#121212] space-y-7">
          
          {/* Student Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b-2 border-[#121212] pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#CCFF00] brutal-border flex items-center justify-center font-display font-black text-2xl text-[#121212] shadow-[3px_3px_0px_#121212]">
                MS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-display font-black text-[#121212]">
                    {passport.fullName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4F6FF] text-[#004B6E] text-[10px] font-mono font-bold border border-[#004B6E]">
                    {passport.regdNo}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-semibold mt-0.5">
                  Dept: {passport.department} • {passport.yearOfStudy} • Target: <span className="text-[#FF5A1F] font-bold">{passport.careerGoal}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-[#FFE500] brutal-border text-center shadow-[3px_3px_0px_#121212]">
                <span className="text-[10px] font-mono font-bold text-stone-700 uppercase block">XP Score</span>
                <span className="text-lg font-mono font-black text-[#121212]">{passport.overallXp} XP</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-[#121212] text-white brutal-border text-center shadow-[3px_3px_0px_#CCFF00]">
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">Rank Tier</span>
                <span className="text-sm font-display font-black text-[#CCFF00]">{passport.level}</span>
              </div>
            </div>
          </div>

          {/* Skill Radar & Gap Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            
            {/* Left: Skill Proficiency Matrix */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-base font-display font-black text-[#121212] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF5A1F]" />
                <span>Verified Competency Radar</span>
              </h4>

              <div className="space-y-3">
                {Object.entries(passport.skillRadar || {}).map(([skill, val], idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#121212]">
                      <span>{skill}</span>
                      <span className="font-mono">{val}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white border border-[#121212] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                        className={`h-full ${
                          val >= 85 ? 'bg-[#CCFF00]' : val >= 75 ? 'bg-[#FFE500]' : 'bg-[#D4F6FF]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Skill Gap Analysis */}
            <div className="lg:col-span-6 bg-white rounded-2xl brutal-border p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
                <h4 className="text-sm font-display font-black text-[#121212] uppercase tracking-wider">
                  AI Skill Gap Analysis & Roadmap
                </h4>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">
                  Ready & Verified Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {passport.skillGapAnalysis?.readySkills?.map((sk, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#CCFF00] text-[#121212] text-xs font-mono font-bold border border-[#121212]">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-[#FF5A1F] uppercase block mb-1">
                  Recommended Growth Milestones:
                </span>
                <ul className="space-y-2 text-xs font-medium text-stone-800">
                  {passport.skillGapAnalysis?.recommendedGrowthSteps?.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-[#F8F5EE] border border-black/15">
                      <span className="text-[#FF5A1F] font-black shrink-0">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Verified Badges & Credentials Shelf */}
          <div>
            <h4 className="text-base font-display font-black text-[#121212] mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#007A3D]" />
                <span>Verified Campus Milestone Badges</span>
              </span>
              <span className="text-[11px] font-mono text-stone-500 font-bold">
                (Click to Inspect Proof)
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {passport.verifiedCredentials?.map((cred) => (
                <button
                  key={cred.id}
                  onClick={() => handleBadgeClick(cred)}
                  className="p-3.5 rounded-2xl bg-white brutal-border shadow-[3px_3px_0px_#121212] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#121212] transition-all text-center space-y-1.5 cursor-pointer group"
                >
                  <div className="w-10 h-10 mx-auto rounded-xl bg-[#FFE500] brutal-border flex items-center justify-center transition-transform group-hover:scale-110">
                    <Trophy className="w-5 h-5 text-[#121212]" />
                  </div>
                  <h5 className="font-display font-black text-xs text-[#121212] leading-tight group-hover:text-[#004B6E]">
                    {cred.title}
                  </h5>
                  <span className="text-[10px] text-stone-500 font-semibold block">
                    {cred.issuer} • {cred.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Badge Certificate Proof Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl border-2 border-black p-6 shadow-[8px_8px_0px_#121212] space-y-4"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-stone-100 text-stone-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#CCFF00] border-2 border-black flex items-center justify-center mx-auto text-2xl shadow-[3px_3px_0px_#121212]">
                🏆
              </div>

              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase bg-[#FFE500] px-2.5 py-0.5 rounded-full border border-black inline-block">
                  VERIFIED CREDENTIAL
                </span>
                <h3 className="text-xl font-display font-black text-[#121212]">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Issued by {selectedBadge.issuer} on {selectedBadge.date}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-1 text-stone-600">
                <p className="flex justify-between">
                  <span>Cryptographic Proof:</span>
                  <span className="font-bold text-emerald-600">SHA-256 Validated</span>
                </p>
                <p className="text-[10px] text-stone-400 truncate">
                  0x7f9a8b1c4e2d3f6a89c2014bdf88934a
                </p>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full py-2.5 rounded-xl bg-[#121212] text-white font-display font-black text-xs hover:bg-stone-800 cursor-pointer shadow-xs"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
