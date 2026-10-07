import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Flame, 
  Trophy, 
  Search, 
  Star, 
  Sparkles, 
  SlidersHorizontal, 
  RotateCw, 
  Heart, 
  Tag, 
  HelpCircle,
  Ticket,
  Calendar,
  MessageSquare
} from 'lucide-react';
import EventCard from './EventCard';
import Interactive3DFlipCard from './Interactive3DFlipCard';
import EventModal from './EventModal';
import LiveStats from './LiveStats';
import DiscussionFeed from './DiscussionFeed';
import AnnouncementsResults from './AnnouncementsResults';
import TechDigitalClubBanner from './TechDigitalClubBanner';
import HeroPolaroidStack from './HeroPolaroidStack';
import ScheduleSection from './ScheduleSection';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection';
import FaqSection from './FaqSection';
import SponsorsSection from './SponsorsSection';
import SkeletonGrid from './SkeletonLoader';
import { fetchEvents } from '../api';

export default function ColoridoFestPortal({
  onBackToCampus,
  onOpenRegister,
  onOpenTicketLookup,
  onOpenAdmin,
  onGoToLogin,
  savedBookmarks = [],
  onToggleBookmark
}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [is3DFlipCardMode, setIs3DFlipCardMode] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    fetchEvents(0).then(data => {
      setEvents(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filterTabs = ['All', 'Cultural', 'Sports', 'Digital Club', 'Boys Sports', 'Girls Sports'];

  let processedEvents = events.filter((e) => {
    const matchesSection =
      selectedSectionFilter === 'All' ||
      e.section === selectedSectionFilter ||
      e.category === selectedSectionFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.category && e.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.venue && e.venue.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSection && matchesSearch;
  });

  if (sortBy === 'prize') {
    processedEvents = [...processedEvents].sort((a, b) => {
      const pA = parseInt((a.prizes?.team?.first || '0').replace(/[^0-9]/g, '')) || 0;
      const pB = parseInt((b.prizes?.team?.first || '0').replace(/[^0-9]/g, '')) || 0;
      return pB - pA;
    });
  } else if (sortBy === 'title') {
    processedEvents = [...processedEvents].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    processedEvents = [...processedEvents].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#121212] font-sans pb-20">

      {/* Hero Banner for Fest */}
      <div className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#121212] bg-[#FFE500]/20 bg-dot-pattern">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="brutal-pill bg-[#FF5A1F] text-white shadow-[2px_2px_0px_#121212]">
              <Flame className="w-3.5 h-3.5 fill-white" />
              R.V.R. & J.C. ANNUAL EXTRAVAGANZA
            </span>
            <span className="brutal-pill bg-[#CCFF00] text-[#121212] shadow-[2px_2px_0px_#121212]">
              ₹3,12,500+ CASH PRIZE POOL
            </span>
            <span className="brutal-pill bg-[#D4F6FF] text-[#121212] shadow-[2px_2px_0px_#121212]">
              38+ COMPETITIONS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#121212]">
            COLORIDO 2K27 <br />
            <span className="bg-[#CCFF00] px-4 py-0.5 rounded-2xl brutal-border inline-block rotate-[-1deg] shadow-[4px_4px_0px_#121212]">
              Cultural & Sports Arena
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto font-medium">
            Explore 38+ inter-college cultural, sports, and technical competitions. Register for official digital entry passes with QR authentication dispatched instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenRegister && onOpenRegister('')}
              className="brutal-btn-tactile px-6 py-3 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#FF5A1F]" />
              <span>Register for Competitions</span>
            </button>

            <button
              onClick={onOpenTicketLookup}
              className="brutal-btn-tactile px-5 py-3 rounded-full font-display font-black text-xs text-[#121212] bg-white brutal-border shadow-[3px_3px_0px_#121212] hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-[#004B6E]" />
              <span>Lookup My Pass</span>
            </button>
          </div>

          {/* Interactive Polaroid Stack Showcase */}
          <div className="pt-6 max-w-4xl mx-auto">
            <HeroPolaroidStack onSelectCard={(title) => setSearchQuery(title)} />
          </div>
        </div>
      </div>

      {/* Live Stats Telemetry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <LiveStats />
      </div>



      {/* Digital Club Hackathon Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <TechDigitalClubBanner onRegisterClick={(name) => onOpenRegister && onOpenRegister(name)} />
      </div>

      {/* Competitions Browser Section */}
      <div id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212] mb-1 inline-block">
              BROWSE ALL 38+ COMPETITIONS
            </span>
            <h2 className="text-3xl font-display font-black text-[#121212]">
              Fest Event Schedule & Regulations
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs3DFlipCardMode(prev => !prev)}
              className="px-3.5 py-1.5 rounded-xl bg-white brutal-border text-xs font-black shadow-[2px_2px_0px_#121212] hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>{is3DFlipCardMode ? '3D Flip Cards Active' : 'Compact Cards Active'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white rounded-3xl brutal-border p-4 shadow-[4px_4px_0px_#121212] mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedSectionFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black brutal-border transition-all cursor-pointer ${
                    selectedSectionFilter === tab
                      ? 'bg-[#121212] text-white shadow-[2px_2px_0px_#CCFF00]'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-500">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
              >
                <option value="featured">Featured First</option>
                <option value="prize">Highest Prize Pool</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, category, rules or venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : processedEvents.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl brutal-border space-y-2">
            <h4 className="font-display font-black text-lg">No events matching search filter</h4>
            <p className="text-xs text-stone-500">Try adjusting your category filter or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedEvents.map((event) => {
              const isSaved = savedBookmarks.includes(event.title);
              return is3DFlipCardMode ? (
                <Interactive3DFlipCard
                  key={event._id || event.title}
                  event={event}
                  onViewDetails={() => setActiveModalEvent(event)}
                  onRegister={() => onOpenRegister && onOpenRegister(event.title)}
                  isSaved={isSaved}
                  onToggleSave={() => onToggleBookmark && onToggleBookmark(event.title)}
                />
              ) : (
                <EventCard
                  key={event._id || event.title}
                  event={event}
                  onViewDetails={() => setActiveModalEvent(event)}
                  onRegister={() => onOpenRegister && onOpenRegister(event.title)}
                  isSaved={isSaved}
                  onToggleSave={() => onToggleBookmark && onToggleBookmark(event.title)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Discussion Feed & Buzz */}
      <div id="discussions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <DiscussionFeed 
          onRegisterClick={(name) => onOpenRegister && onOpenRegister(name)}
          onGoToLogin={onGoToLogin}
        />
      </div>

      {/* Announcements & Match Scoreboard */}
      <div id="announcements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <AnnouncementsResults onRegisterClick={(name) => onOpenRegister && onOpenRegister(name)} />
      </div>

      {/* Schedule Timeline Section */}
      <div id="schedule" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <ScheduleSection onRegisterForEvent={(name) => onOpenRegister && onOpenRegister(name)} />
      </div>

      {/* About Fest Manifesto Section */}
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <AboutSection />
      </div>

      {/* Gallery Polaroid Section */}
      <div id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <GallerySection />
      </div>

      {/* FAQ Helpdesk Section */}
      <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <FaqSection />
      </div>

      {/* Sponsors Section */}
      <div id="sponsors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SponsorsSection />
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
          onRegister={(eventName) => {
            setActiveModalEvent(null);
            if (onOpenRegister) onOpenRegister(eventName);
          }}
          isSaved={savedBookmarks.includes(activeModalEvent.title)}
          onToggleSave={() => onToggleBookmark && onToggleBookmark(activeModalEvent.title)}
        />
      )}

    </div>
  );
}
