import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  Clock, 
  Layers, 
  Wrench, 
  Wifi, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { fetchCampusPulse, reportCampusIssue, fetchCampusActions, updateCampusAction } from '../api';

export default function CampusPulseAndAction() {
  const [pulseData, setPulseData] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Report form state
  const [category, setCategory] = useState('Wi-Fi & Connectivity');
  const [location, setLocation] = useState('Silver Jubilee Block • Floor 3');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reportResult, setReportResult] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [pRes, aRes] = await Promise.all([fetchCampusPulse(), fetchCampusActions()]);
    if (pRes) setPulseData(pRes);
    if (aRes && aRes.activeActions) setActions(aRes.activeActions);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;
    setSubmitting(true);
    const res = await reportCampusIssue({ category, location, description });
    setSubmitting(false);
    if (res && res.success) {
      setReportResult(res.message);
      setDescription('');
      loadData();
      setTimeout(() => setReportResult(''), 6000);
    }
  };

  const handleStageChange = async (actionId, nextStage) => {
    const res = await updateCampusAction(actionId, nextStage, `Stage advanced to ${nextStage}`);
    if (res && res.success) {
      loadData();
    }
  };

  return (
    <section id="pulse" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
              <Activity className="w-3.5 h-3.5 text-[#121212]" />
              CAMPUS PULSE & ACTION ENGINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Feedback Clustering & Automated Resolution
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Campus Pulse listens to student feedback, AI groups similar complaints into major incidents (e.g. 187 Wi-Fi reports clustered together), and the Action Engine dispatches teams from Reported → Assigned → In Progress → Resolved.
          </p>
        </div>

        {/* 1. Report Issue & AI Clustering Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left: Quick Issue Reporter (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl brutal-border p-6 shadow-[6px_6px_0px_#121212] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#121212] pb-3">
              <h3 className="font-display font-black text-lg text-[#121212] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#FF5A1F]" />
                <span>Report Campus Issue</span>
              </h3>
              <span className="text-[10px] font-mono font-bold bg-[#FFE500] px-2 py-0.5 rounded-full border border-[#121212]">
                INSTANT AI TRIAGE
              </span>
            </div>

            {reportResult && (
              <div className="p-3 rounded-xl bg-[#E8FAD5] brutal-border-2 text-[#1E520A] text-xs font-bold animate-fadeIn">
                {reportResult}
              </div>
            )}

            <form onSubmit={handleReportSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold text-[#121212]"
                >
                  <option>Wi-Fi & Connectivity</option>
                  <option>HVAC & Air Conditioning</option>
                  <option>Cleanliness & Washrooms</option>
                  <option>Drinking Water Stations</option>
                  <option>Transport & Electric Shuttles</option>
                  <option>Lab Equipment & Power</option>
                  <option>Campus Safety & Lighting</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Exact Campus Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Silver Jubilee Block • Floor 3 • Room 312"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold text-[#121212] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Problem Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue observed (Wi-Fi latency, AC noise, water filter...)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-medium text-[#121212] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Analyzing & Clustering...' : 'Submit to Campus Pulse'}</span>
              </button>
            </form>
          </div>

          {/* Right: AI Clustering Engine Showcase (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl brutal-border p-6 shadow-[6px_6px_0px_#121212] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#121212] pb-3">
              <div>
                <span className="text-[10px] font-mono font-black text-[#FF5A1F] uppercase tracking-wider block">
                  AI AGGREGATION ENGINE
                </span>
                <h3 className="font-display font-black text-lg text-[#121212]">
                  Clustered Campus Incidents
                </h3>
              </div>
              <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-[10px] font-black">
                {pulseData?.overallCampusSentiment?.status || 'Active Triage'}
              </span>
            </div>

            <div className="space-y-3">
              {pulseData?.issues?.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-2xl bg-[#F8F5EE] brutal-border-2 space-y-2 hover:bg-white transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#121212] text-white font-mono font-black text-[10px]">
                        {issue.id}
                      </span>
                      <h4 className="font-display font-black text-xs sm:text-sm text-[#121212]">
                        {issue.clusterTitle || issue.category}
                      </h4>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-[#FF5A1F] text-white font-mono font-black text-[10px] whitespace-nowrap shadow-[1.5px_1.5px_0px_#121212]">
                      👥 {issue.reportedByCount} REPORTS CLUSTERED
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 font-medium">
                    {issue.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-bold pt-1 border-t border-stone-200">
                    <span>📍 {issue.location}</span>
                    <span className="text-[#121212] font-mono font-black bg-[#CCFF00] px-2 py-0.5 rounded">
                      STATUS: {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 2. Campus Action Engine - Live Kanban Pipeline */}
        <div className="bg-white rounded-3xl brutal-border p-6 sm:p-8 shadow-[8px_8px_0px_#121212] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-[#121212] pb-4">
            <div>
              <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px] font-black mb-1 inline-block">
                ACTION & RESOLUTION WORKFLOW
              </span>
              <h3 className="text-2xl font-display font-black text-[#121212]">
                Active Campus Resolution Pipeline
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono font-bold">
              <span className="p-2 rounded-xl bg-stone-100 brutal-border-2">Avg SLA: 2.8 hrs</span>
              <span className="p-2 rounded-xl bg-[#E8FAD5] brutal-border-2 text-[#1E520A]">Compliance: 98.4%</span>
            </div>
          </div>

          {/* Kanban Columns (Reported -> Assigned -> In Progress -> Resolved) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((act) => {
              const isResolved = act.stage === 'Resolved';
              return (
                <div
                  key={act.id}
                  className={`p-5 rounded-2xl brutal-border flex flex-col justify-between space-y-4 ${
                    isResolved ? 'bg-[#E8FAD5]/40 border-[#1E520A]' : 'bg-[#F8F5EE]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#121212] text-white font-mono font-black text-[10px]">
                        {act.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                        act.priority.includes('P1') ? 'bg-[#FEE7EA] text-[#5C1D24] border-[#5C1D24]' : 'bg-[#FFE500] text-[#121212] border-[#121212]'
                      }`}>
                        {act.priority}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-sm text-[#121212]">
                      {act.title}
                    </h4>

                    <p className="text-[11px] text-stone-600 font-semibold">
                      Dept: {act.department}
                    </p>

                    <div className="p-2.5 rounded-xl bg-white brutal-border-2 text-[11px] text-stone-800 space-y-1">
                      <div>👷 <strong className="text-[#121212]">Assigned:</strong> {act.assignedTechnician}</div>
                      <div>⏱️ <strong className="text-[#121212]">Stage:</strong> <span className="font-mono font-bold text-purple-700">{act.stage}</span></div>
                    </div>

                    {act.resolutionSummary && (
                      <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-medium">
                        ✓ {act.resolutionSummary}
                      </p>
                    )}
                  </div>

                  {/* Stage Advancement Control */}
                  {!isResolved ? (
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleStageChange(act.id, act.stage === 'Reported' ? 'Assigned' : act.stage === 'Assigned' ? 'In Progress' : 'Resolved')}
                        className="w-full py-2 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#d8ff33] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Advance to {act.stage === 'Assigned' ? 'In Progress' : 'Resolved'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 text-center text-xs font-mono font-black text-emerald-700">
                      ✓ INCIDENT VERIFIED & CLOSED
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
