import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Search, MessageSquare, Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'General & Entry',
    question: 'Who is eligible to participate in COLORIDO 2K27?',
    answer: 'Students from any recognized engineering, degree, diploma, or postgraduate institution in India with a valid college ID card are eligible to participate.'
  },
  {
    category: 'Registration & Pass',
    question: 'How do I obtain my official COLORIDO 2K27 Digital Fest Pass?',
    answer: 'Complete the online registration form on this portal. Upon submission, a verified digital fest pass containing your unique pass code (e.g. COLORIDO-27-XXXX) and QR code will be generated instantly and dispatched to your email. You can download it or look it up anytime using your roll number.'
  },
  {
    category: 'Competitions',
    question: 'Can a participant register for multiple event tracks?',
    answer: 'Yes! Participants are encouraged to select multiple event tracks across Cultural (Choreoday, Music, Dramatics, Fine Arts, Fashion) and Sports (Basketball, Throwball, Table Tennis) provided timing schedules do not conflict.'
  },
  {
    category: 'Spot Registration',
    question: 'Will there be on-spot registrations on event days?',
    answer: 'Limited spot registrations will be open at the Central SAC Helpdesk near the Silver Jubilee Block on Feb 26 up to 10:00 AM. Online pre-registration is strongly recommended to guarantee entry.'
  },
  {
    category: 'Prizes & Certification',
    question: 'When and how will cash prizes and certificates be awarded?',
    answer: 'Cash prize checks totaling ₹1,50,000+ and official merit certificates will be presented by college dignitaries during the Grand Valedictory Ceremony on Day 2 at the OAT Auditorium.'
  },
  {
    category: 'Transport & Support',
    question: 'Is college transport provided for delegates coming from outside Guntur?',
    answer: 'Yes! RVR & JC official college buses will operate continuously from Guntur Railway Station and RTC Bus Complex throughout the fest days.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General & Entry', 'Registration & Pass', 'Competitions', 'Prizes & Certification', 'Transport & Support'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212]">
            <HelpCircle className="w-3.5 h-3.5" />
            ATTENDEE HELPDESK
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            got questions?
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Got Questions? <span className="underline decoration-[#CCFF00] decoration-4">We Have Answers</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Everything you need to know about COLORIDO 2K27 rules, registration passes, venues, and cash prizes.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. digital pass, cash prize, transport)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-[#121212] placeholder-stone-500 text-xs sm:text-sm brutal-border focus:bg-[#FFF5C0] focus:outline-none transition-all shadow-[3px_3px_0px_#121212]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#121212] text-white shadow-[2.5px_2.5px_0px_#121212] -translate-y-0.5'
                  : 'bg-white text-stone-700 shadow-[1.5px_1.5px_0px_#121212] hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white brutal-border rounded-2xl overflow-hidden shadow-[4px_4px_0px_#121212] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8F5EE] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#FF5A1F] uppercase">
                      {faq.category}
                    </span>
                    <h4 className="font-display font-black text-sm sm:text-base text-[#121212]">
                      {faq.question}
                    </h4>
                  </div>
                  <div className={`p-1.5 rounded-lg brutal-border-2 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'bg-[#CCFF00] rotate-180' : 'bg-white'
                  }`}>
                    <ChevronDown className="w-4 h-4 text-[#121212]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium border-t-2 border-dashed border-[#121212]/20 bg-[#F8F5EE]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 bg-white brutal-border rounded-2xl shadow-[4px_4px_0px_#121212]">
            <p className="text-xs font-mono font-bold text-stone-500">No matching questions found.</p>
          </div>
        )}
      </div>

    </section>
  );
}
