import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CampusHero from './components/CampusHero';
import CampusDigitalTwin from './components/CampusDigitalTwin';
import CampusAICopilot from './components/CampusAICopilot';
import CampusNavigation from './components/CampusNavigation';
import CampusCollabHub from './components/CampusCollabHub';
import CampusSkillPassport from './components/CampusSkillPassport';
import CampusQuest from './components/CampusQuest';
import CampusMemory from './components/CampusMemory';
import CampusPulseAndAction from './components/CampusPulseAndAction';
import CampusSmartSpaces from './components/CampusSmartSpaces';
import CampusPredictionEngine from './components/CampusPredictionEngine';
import ColoridoFestPortal from './components/ColoridoFestPortal';
import DiscussionFeed from './components/DiscussionFeed';
import TicketPassModal from './components/TicketPassModal';
import TicketLookupModal from './components/TicketLookupModal';
import FloatingAIButton from './components/FloatingAIButton';
import AIChatbot from './components/AIChatbot';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { AnimatePresence, motion } from 'framer-motion';
import Interactive3DBackground from './components/Interactive3DBackground';
import SplashScreen from './components/SplashScreen';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const getPageFromUrl = () => {
    if (typeof window === 'undefined') return 'campus';
    const hash = (window.location.hash || '').toLowerCase();
    const path = (window.location.pathname || '').toLowerCase();
    if (hash.includes('admin') || path.includes('/admin')) return 'admin';
    if (hash.includes('register') || path.includes('/register')) return 'register';
    if (hash.includes('login') || path.includes('/login')) return 'login';
    if (hash.includes('events') || hash.includes('colorido') || path.includes('/events') || path.includes('/colorido')) return 'colorido';
    return 'campus';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromUrl); // 'campus' | 'colorido' | 'register' | 'login' | 'admin'
  const [selectedEventForReg, setSelectedEventForReg] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [showTicketLookup, setShowTicketLookup] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [activeCampusTab, setActiveCampusTab] = useState('twin'); // 'twin' | 'copilot' | 'navigation' | 'collab' | 'passport' | 'quest' | 'ecosystem'
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const [savedBookmarks, setSavedBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('colorido_saved_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with browser URL / hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const toggleBookmark = (title) => {
    setSavedBookmarks((prev) => {
      let updated;
      if (prev.includes(title)) {
        updated = prev.filter((t) => t !== title);
        setToastMessage(`Removed "${title}" from Saved`);
      } else {
        updated = [...prev, title];
        setToastMessage(`Saved "${title}" to My Events!`);
      }
      try {
        localStorage.setItem('colorido_saved_events', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return updated;
    });
  };

  const handleRegisterClick = (eventName = '') => {
    setSelectedEventForReg(eventName);
    setCurrentPage('register');
    window.location.hash = 'register';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
    window.location.hash = 'login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    setCurrentPage('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCampus = () => {
    setCurrentPage('campus');
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenColoridoFest = () => {
    setCurrentPage('colorido');
    window.location.hash = 'events';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (sectionId) => {
    if (currentPage !== 'campus') {
      setCurrentPage('campus');
    }
    if (sectionId === 'digital-twin' || sectionId === 'twin' || sectionId === 'spaces' || sectionId === 'intelligence') {
      setActiveCampusTab('twin');
    } else if (sectionId === 'copilot' || sectionId === 'pulse') {
      setActiveCampusTab('copilot');
    } else if (sectionId === 'navigation' || sectionId === 'routes') {
      setActiveCampusTab('navigation');
    } else if (sectionId === 'collab') {
      setActiveCampusTab('collab');
    } else if (sectionId === 'passport') {
      setActiveCampusTab('passport');
    } else if (sectionId === 'quests' || sectionId === 'quest') {
      setActiveCampusTab('quest');
    } else if (sectionId === 'discussions' || sectionId === 'ecosystem') {
      setActiveCampusTab('quest');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE]/90 text-[#121212] font-sans relative selection:bg-[#CCFF00] selection:text-[#121212]">
      {/* Dynamic Campus 2.0 Boot Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* 3D WebGL Background Scene */}
      <Interactive3DBackground />

      {/* Main Header Navbar with Colorful Logo & Rounded Pills */}
      <Navbar
        currentPage={currentPage}
        onGoToHome={handleGoToCampus}
        onOpenColoridoFest={handleOpenColoridoFest}
        onOpenAdmin={handleAdminClick}
        onOpenLogin={handleLoginClick}
        onRegisterClick={() => handleRegisterClick('')}
        onOpenTicketLookup={() => setShowTicketLookup(true)}
        onNavigateToSection={handleNavigateToSection}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
      />

      {/* Dynamic View Routing */}
      {currentPage === 'register' ? (
        <RegisterPage
          onBackToHome={() => setCurrentPage('colorido')}
          onGoToLogin={handleLoginClick}
          selectedEventName={selectedEventForReg}
          onSuccessRegistration={(ticket) => {
            setGeneratedTicket(ticket);
            setCurrentPage('colorido');
          }}
        />
      ) : currentPage === 'login' ? (
        <LoginPage
          onBackToHome={handleGoToCampus}
          onGoToRegister={() => handleRegisterClick()}
          onGoToAdmin={handleAdminClick}
          onSuccessLogin={(ticket) => {
            setGeneratedTicket(ticket);
            setCurrentPage('campus');
          }}
        />
      ) : currentPage === 'admin' ? (
        <AdminPage
          onBackToHome={handleGoToCampus}
          onViewPass={(ticket) => setGeneratedTicket(ticket)}
        />
      ) : currentPage === 'colorido' ? (
        /* Dedicated Festival Chapter */
        <>
          <ColoridoFestPortal
            onBackToCampus={handleGoToCampus}
            onOpenRegister={handleRegisterClick}
            onOpenTicketLookup={() => setShowTicketLookup(true)}
            onOpenAdmin={handleAdminClick}
            onGoToLogin={handleLoginClick}
            savedBookmarks={savedBookmarks}
            onToggleBookmark={toggleBookmark}
          />
          <Footer
            onOpenAdmin={handleAdminClick}
            onOpenColoridoFest={handleOpenColoridoFest}
          />
        </>
      ) : (
        /* Primary CAMPUS 2.0 Interactive Tabbed Dashboard */
        <>
          <CampusHero
            activeTab={activeCampusTab}
            onSelectTab={(tab) => setActiveCampusTab(tab)}
            onOpenColoridoFest={handleOpenColoridoFest}
          />

          {/* Interactive Single-Screen Tabbed Viewport Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <AnimatePresence mode="wait">
              {activeCampusTab === 'twin' && (
                <motion.div
                  key="tab-twin"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusDigitalTwin />
                  <CampusSmartSpaces />
                  <CampusPredictionEngine />
                </motion.div>
              )}

              {activeCampusTab === 'copilot' && (
                <motion.div
                  key="tab-copilot"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusAICopilot onOpenColoridoFest={handleOpenColoridoFest} />
                  <CampusPulseAndAction />
                </motion.div>
              )}

              {activeCampusTab === 'navigation' && (
                <motion.div
                  key="tab-navigation"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusNavigation />
                </motion.div>
              )}

              {activeCampusTab === 'collab' && (
                <motion.div
                  key="tab-collab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusCollabHub onOpenColoridoFest={handleOpenColoridoFest} />
                </motion.div>
              )}

              {activeCampusTab === 'passport' && (
                <motion.div
                  key="tab-passport"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusSkillPassport />
                </motion.div>
              )}

              {activeCampusTab === 'quest' && (
                <motion.div
                  key="tab-quest"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusQuest />
                  <CampusMemory />
                  <DiscussionFeed
                    onRegisterClick={handleRegisterClick}
                    onGoToLogin={handleLoginClick}
                  />
                </motion.div>
              )}

              {activeCampusTab === 'ecosystem' && (
                <motion.div
                  key="tab-ecosystem"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <CampusCollabHub onOpenColoridoFest={handleOpenColoridoFest} />
                  <CampusSkillPassport />
                  <CampusQuest />
                  <CampusMemory />
                  <DiscussionFeed
                    onRegisterClick={handleRegisterClick}
                    onGoToLogin={handleLoginClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <Footer 
            onOpenAdmin={handleAdminClick} 
            onOpenColoridoFest={handleOpenColoridoFest} 
          />
        </>
      )}

      {/* Floating AI Copilot Chatbot */}
      <AIChatbot
        onNavigate={(target) => handleNavigateToSection(target.replace('#', ''))}
      />

      {/* Global Modals & Notifications */}
      {showTicketLookup && (
        <TicketLookupModal
          onClose={() => setShowTicketLookup(false)}
          onFoundTicket={(ticket) => {
            setShowTicketLookup(false);
            setGeneratedTicket(ticket);
          }}
        />
      )}

      {generatedTicket && (
        <TicketPassModal
          ticket={generatedTicket}
          onClose={() => setGeneratedTicket(null)}
        />
      )}

      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

      {/* Spotlight Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectTab={(tab) => {
          setActiveCampusTab(tab);
          if (currentPage !== 'campus') {
            setCurrentPage('campus');
          }
        }}
        onOpenEvents={handleOpenColoridoFest}
      />
    </div>
  );
}
