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
  Flame
} from 'lucide-react';
import { fetchStudentPassport } from '../api';

export default function CampusSkillPassport() {
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentPassport('Y22CS084').then(res => {
      if (res && res.data) setPassport(res.data);
      setLoading(false);
    });
  }, []);

  if (!passport) return null;

  return (
    <section id="passport" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Award className="w-3.5 h-3.5 text-[#121212]" />
            FEATURE 05: CAMPUS SKILL & GROWTH PASSPORT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Digital Career & Achievement Passport
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Maintains your comprehensive campus achievements, hackathon victories, and skill profile. AI identifies where your skill gaps lie and suggests exact workshops, clubs, and projects to advance your career.
          </p>
        </div>

        {/* Passport Credential Container */}
        <div className="bg-white rounded-3xl brutal-border p-6 sm:p-8 shadow-[8px_8px_0px_#121212] space-y-8">
          
          {/* Student Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-[#121212] pb-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
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
                    <div className="w-full h-2.5 rounded-full bg-stone-100 border border-[#121212] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          val >= 85 ? 'bg-[#CCFF00]' : val >= 75 ? 'bg-[#FFE500]' : 'bg-[#D4F6FF]'
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Skill Gap Analysis */}
            <div className="lg:col-span-6 bg-[#F8F5EE] rounded-2xl brutal-border p-5 space-y-4">
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
                    <span key={i} className="px-2 py-0.5 rounded-md bg-[#CCFF00] text-[#121212] text-xs font-mono font-bold border border-[#121212]">
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
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-white brutal-border-2">
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
            <h4 className="text-base font-display font-black text-[#121212] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#007A3D]" />
              <span>Verified Campus Milestone Badges</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {passport.verifiedCredentials?.map((cred) => (
                <div key={cred.id} className="p-3.5 rounded-2xl bg-white brutal-border shadow-[3px_3px_0px_#121212] text-center space-y-1.5">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-[#FFE500] brutal-border flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#121212]" />
                  </div>
                  <h5 className="font-display font-black text-xs text-[#121212] leading-tight">
                    {cred.title}
                  </h5>
                  <span className="text-[10px] text-stone-500 font-semibold block">
                    {cred.issuer} • {cred.date}
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
