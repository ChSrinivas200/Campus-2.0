import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Trophy, 
  Briefcase, 
  Code, 
  Flame, 
  Check, 
  Layers 
} from 'lucide-react';
import { fetchCampusOpportunities, matchStudentOpportunities } from '../api';

export default function CampusCollabHub({ onOpenColoridoFest }) {
  const [opportunities, setOpportunities] = useState([]);
  const [skillsInput, setSkillsInput] = useState('Python, Machine Learning, React');
  const [matching, setMatching] = useState(false);
  const [matchNotice, setMatchNotice] = useState('');
  const [appliedMap, setAppliedMap] = useState({});

  useEffect(() => {
    fetchCampusOpportunities().then(res => {
      if (res && res.data) setOpportunities(res.data);
    });
  }, []);

  const handleRunAiMatch = async () => {
    setMatching(true);
    const skillsList = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const res = await matchStudentOpportunities(skillsList);
    setMatching(false);
    if (res && res.data) {
      setOpportunities(res.data);
      setMatchNotice(`AI Match Complete! Found top alignment (${res.topMatch?.matchScore}%) with "${res.topMatch?.title}".`);
      setTimeout(() => setMatchNotice(''), 6000);
    }
  };

  const handleApply = (oppId, oppTitle) => {
    setAppliedMap(prev => ({ ...prev, [oppId]: true }));
  };

  return (
    <section id="collab" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="brutal-pill bg-[#FFDEEB] text-[#80183E] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Users className="w-3.5 h-3.5 text-[#80183E]" />
            AI COLLABORATION & OPPORTUNITY HUB
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Match Skills with Teams & Hackathons
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            AI compares your skills and interests with cross-campus hackathon squads, research initiatives, and club projects. A Python + ML student gets instantly paired with high-impact healthcare and autonomous vehicle teams.
          </p>
        </div>

        {/* AI Skill Matcher Interactive Bar */}
        <div className="bg-white rounded-3xl brutal-border p-6 shadow-[6px_6px_0px_#121212] mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-[#FF5A1F] uppercase tracking-wider block">
                AI MATCHMAKING ENGINE
              </span>
              <h4 className="text-base font-display font-black text-[#121212]">
                Input Your Technical & Creative Skills:
              </h4>
            </div>

            <div className="flex flex-1 max-w-xl w-full items-center gap-2">
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g. Python, PyTorch, React, UI/UX, Dance..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs sm:text-sm font-bold text-[#121212] focus:outline-none"
              />
              <button
                onClick={handleRunAiMatch}
                disabled={matching || !skillsInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{matching ? 'Matching...' : 'Match Skills'}</span>
              </button>
            </div>
          </div>

          {matchNotice && (
            <div className="mt-4 p-3 rounded-xl bg-[#E8FAD5] brutal-border-2 text-[#1E520A] text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{matchNotice}</span>
            </div>
          )}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => {
            const isApplied = appliedMap[opp.id];
            return (
              <div
                key={opp.id}
                className="bg-white rounded-3xl brutal-border p-6 shadow-[5px_5px_0px_#121212] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-[10px] font-black">
                      {opp.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#CCFF00] brutal-border-2 font-mono font-black text-xs text-[#121212] shadow-[1.5px_1.5px_0px_#121212]">
                      ★ {opp.matchScore}% MATCH
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-[#121212] mb-1">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-semibold mb-3">
                    Posted by: {opp.postedBy} • {opp.teamSize}
                  </p>

                  <p className="text-xs text-stone-700 font-medium leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  {/* Looking For */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase block">
                      Looking For Talent:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.lookingFor?.map((role, rIdx) => (
                        <span key={rIdx} className="px-2 py-0.5 rounded-md bg-[#F8F5EE] text-[#121212] text-[11px] font-bold border border-stone-300">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase block">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills?.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-[#FFE500]/40 text-[#121212] text-[11px] font-mono font-bold">
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Apply Bar */}
                <div className="pt-3 border-t-2 border-[#121212] flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-black text-[#FF5A1F]">
                    {opp.stipendPrize}
                  </span>

                  <button
                    onClick={() => handleApply(opp.id, opp.title)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl brutal-border font-display font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isApplied 
                        ? 'bg-emerald-500 text-white shadow-none' 
                        : 'bg-[#121212] text-white shadow-[2.5px_2.5px_0px_#CCFF00] hover:bg-[#CCFF00] hover:text-[#121212]'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied! Profile Shared</span>
                      </>
                    ) : (
                      <>
                        <span>Connect & Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
