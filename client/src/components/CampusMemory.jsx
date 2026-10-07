import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Heart, 
  Users, 
  Plus, 
  X, 
  Check, 
  Image as ImageIcon 
} from 'lucide-react';
import { fetchCampusMemories, addCampusMemory } from '../api';

export default function CampusMemory() {
  const [memories, setMemories] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tag: 'Cultural Fest',
    caption: '',
    year: '2026',
    location: 'Open Air Theatre (OAT)',
    mediaUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const loadMemories = async () => {
    const res = await fetchCampusMemories();
    if (res && res.data) setMemories(res.data);
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.caption) return;
    setSubmitting(true);
    const res = await addCampusMemory(formData);
    setSubmitting(false);
    if (res && res.success) {
      loadMemories();
      setShowAddModal(false);
      setFormData({
        title: '',
        tag: 'Cultural Fest',
        caption: '',
        year: '2026',
        location: 'Open Air Theatre (OAT)',
        mediaUrl: ''
      });
    }
  };

  const filtered = memories.filter(m => selectedYear === 'All' || m.year === selectedYear);

  return (
    <section id="memory" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="brutal-pill bg-[#FFDEEB] text-[#80183E] text-xs font-black shadow-[2px_2px_0px_#121212]">
                <Camera className="w-3.5 h-3.5 text-[#80183E]" />
                FEATURE 07: CAMPUS MEMORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
              Your Campus Journey Timeline
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 max-w-2xl">
              A living digital scrapbook chronicling your milestones, hackathon late-night sprints, fest victories, and friendships from Year 1 to Graduation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Memory</span>
            </button>
          </div>
        </div>

        {/* Year Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {['All', '2026', '2025', '2024'].map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-4 py-1.5 rounded-full text-xs font-black brutal-border transition-all cursor-pointer ${
                selectedYear === yr
                  ? 'bg-[#121212] text-white shadow-[2.5px_2.5px_0px_#CCFF00]'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              {yr === 'All' ? 'Complete Journey (2024–2028)' : `Year ${yr}`}
            </button>
          ))}
        </div>

        {/* Timeline Memory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-3xl brutal-border overflow-hidden shadow-[6px_6px_0px_#121212] hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-48 overflow-hidden border-b-2 border-[#121212]">
                  <img
                    src={mem.mediaUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 brutal-pill bg-[#121212] text-white text-[10px] font-mono font-bold shadow-[2px_2px_0px_#CCFF00]">
                    {mem.year} • {mem.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500">
                    <Calendar className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>{mem.date}</span>
                    <span className="mx-1">•</span>
                    <MapPin className="w-3.5 h-3.5 text-[#004B6E]" />
                    <span>{mem.location}</span>
                  </div>

                  <h3 className="font-display font-black text-lg text-[#121212] leading-tight">
                    {mem.title}
                  </h3>

                  <p className="text-xs text-stone-700 font-medium leading-relaxed">
                    “{mem.caption}”
                  </p>

                  {/* Teammates tagged */}
                  {mem.teammates && (
                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-stone-500 font-semibold">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span>Tagged: {mem.teammates.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Likes counter bar */}
              <div className="p-4 border-t-2 border-[#121212] bg-[#F8F5EE] flex items-center justify-between text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1 text-rose-600">
                  <Heart className="w-3.5 h-3.5 fill-rose-600" />
                  <span>{mem.likes} cheers</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500">SAVED TO PASSPORT</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Memory Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-white brutal-border rounded-3xl p-6 sm:p-7 shadow-[8px_8px_0px_#121212]">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-stone-100 brutal-border hover:bg-[#FF5A1F] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-display font-black text-[#121212] mb-1">
                Log Campus Memory
              </h3>
              <p className="text-xs text-stone-500 font-medium mb-4">
                Record an achievement, fest moment, or hackathon project to your permanent campus timeline.
              </p>

              <form onSubmit={handleAddSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-mono font-bold text-stone-600 uppercase block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Colorido Choreoday Finals"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono font-bold text-stone-600 uppercase block mb-1">Category</label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                    >
                      <option>Cultural Fest</option>
                      <option>Hackathons</option>
                      <option>Sports Victory</option>
                      <option>Academic Milestone</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-stone-600 uppercase block mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-bold text-stone-600 uppercase block mb-1">Memory Reflection / Caption</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.caption}
                    onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Share what made this day special..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-medium focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{submitting ? 'Recording...' : 'Save to Campus Journey'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
