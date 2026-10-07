import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, Users, Check, AlertCircle, Loader2, Sparkles, Trophy, CheckSquare, Square, Lock, Key, Heart, ArrowRight } from 'lucide-react';
import { registerParticipant } from '../api';

const DEPARTMENTS = [
  'CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CSBS', 'AI&ML', 'Data Science'
];

const YEARS_OF_STUDY = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate (M.Tech/MCA/MBA)'
];

const AVAILABLE_EVENTS = [
  // Cultural
  { id: 'choreoday', name: 'Choreoday (Theme Based Mega Dance)', tag: 'Cultural' },
  { id: 'music-band', name: 'Music & Band (Solo & Battle of Bands)', tag: 'Cultural' },
  { id: 'dance', name: 'Dance Clash (Classical, Western & Folk)', tag: 'Cultural' },
  { id: 'fine-arts', name: 'Fine Arts (Painting, Sketching & Rangoli)', tag: 'Cultural' },
  { id: 'dramatics', name: 'Dramatics (Skit, Mime & Mono Acting)', tag: 'Cultural' },
  { id: 'fashion-show', name: 'Fashion Show (Theme & Couture)', tag: 'Cultural' },
  { id: 'tekraft', name: 'Tekraft (E-Waste Sculpting & Tech Art)', tag: 'Cultural' },
  { id: 'short-film', name: 'Short Film Contest & Mobile Photography', tag: 'Cultural' },
  { id: 'literary', name: 'Literary Arena (Oxford Debate & Master Quiz)', tag: 'Cultural' },
  // Boys Sports
  { id: 'bb-boys', name: 'Basketball Championship (Boys)', tag: 'Boys Sports' },
  { id: 'vb-boys', name: 'Volleyball Championship (Boys)', tag: 'Boys Sports' },
  { id: 'kb-boys', name: 'Kabaddi Tournament (Boys)', tag: 'Boys Sports' },
  { id: 'tt-boys', name: 'Table Tennis Championship (Boys Singles & Doubles)', tag: 'Boys Sports' },
  { id: 'bm-boys', name: 'Badminton Championship (Boys Singles & Doubles)', tag: 'Boys Sports' },
  { id: 'chess-boys', name: 'Rapid Chess Masters (Boys Open)', tag: 'Boys Sports' },
  // Girls Sports
  { id: 'tb-girls', name: 'Throwball Championship (Girls)', tag: 'Girls Sports' },
  { id: 'tk-girls', name: 'TenniKoit Tournament (Girls Singles & Doubles)', tag: 'Girls Sports' },
  { id: 'tt-girls', name: 'Table Tennis Championship (Girls Singles & Doubles)', tag: 'Girls Sports' },
  { id: 'bm-girls', name: 'Badminton Championship (Girls Singles & Doubles)', tag: 'Girls Sports' },
  { id: 'chess-girls', name: 'Rapid Chess Masters (Girls Open)', tag: 'Girls Sports' },
  // Digital Club
  { id: 'hackathon', name: 'Hack-a-Fest: 12-Hour Web & AI Hackathon', tag: 'Digital Club' },
  { id: 'uiux-sprint', name: 'UI/UX Design Sprint (Figma Championship)', tag: 'Digital Club' },
  { id: 'cyber-hunt', name: 'Cyber Hunt (Crypto & CTF Challenge)', tag: 'Digital Club' },
  { id: 'esports', name: 'E-Sports Arena (BGMI & FreeFire Clashes)', tag: 'Digital Club' },
];

export default function RegistrationForm({ selectedEventName, onSuccessRegistration }) {
  const [accountType, setAccountType] = useState('student'); // 'student' | 'volunteer'
  const [isSignInMode, setIsSignInMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '2nd Year',
    department: 'CSE',
    regdNo: '',
    participationType: 'Solo',
    teamName: '',
    teamMembers: ['', ''],
    events: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (selectedEventName && !formData.events.includes(selectedEventName)) {
      setFormData(prev => ({
        ...prev,
        events: [...prev.events, selectedEventName]
      }));
    }
  }, [selectedEventName]);

  const validateField = (name, value) => {
    let err = '';
    if (name === 'fullName' && !value.trim() && !isSignInMode) err = 'Full name is required';
    if (name === 'email') {
      if (!value.trim()) err = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) err = 'Enter a valid email address';
    }
    if (name === 'password') {
      if (!value.trim()) err = 'Password is required';
      else if (value.trim().length < 6) err = 'Password must be at least 6 characters';
    }
    if (name === 'phone' && !isSignInMode) {
      if (!value.trim()) err = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(value.replace(/\s+/g, ''))) err = 'Must be a valid 10-digit phone number';
    }
    if (name === 'regdNo' && !isSignInMode) {
      if (!value.trim()) err = 'Student ID / Roll Number is required';
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    setServerError('');
    setIsDuplicate(false);
  };

  const toggleEventPill = (eventName) => {
    setFormData(prev => {
      const exists = prev.events.includes(eventName);
      const updatedEvents = exists
        ? prev.events.filter(e => e !== eventName)
        : [...prev.events, eventName];
      return { ...prev, events: updatedEvents };
    });
    if (errors.events) {
      setErrors(prev => ({ ...prev, events: '' }));
    }
  };

  const handleTeamMemberChange = (index, value) => {
    const updated = [...formData.teamMembers];
    updated[index] = value;
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  const addTeamMemberField = () => {
    setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsDuplicate(false);

    if (isSignInMode) {
      // Sign In Logic
      const newErrors = {};
      newErrors.email = validateField('email', formData.email);
      newErrors.password = validateField('password', formData.password);
      setErrors(newErrors);
      if (newErrors.email || newErrors.password) return;

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const mockTicket = {
          ticketId: `COL-${Math.floor(100000 + Math.random() * 900000)}`,
          fullName: formData.fullName || 'RVR & JC Delegate',
          regdNo: formData.regdNo || 'Y22CS001',
          email: formData.email,
          phone: formData.phone || '9876543210',
          department: formData.department,
          events: formData.events.length > 0 ? formData.events : ['Choreoday (Theme Based)'],
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=COLORIDO2K27-${formData.email}`
        };
        if (onSuccessRegistration) {
          onSuccessRegistration(mockTicket);
        }
      }, 800);
      return;
    }

    // Sign Up Registration Logic
    const newErrors = {};
    newErrors.fullName = validateField('fullName', formData.fullName);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.regdNo = validateField('regdNo', formData.regdNo);

    if (accountType === 'student' && (!formData.events || formData.events.length === 0)) {
      newErrors.events = 'Please select at least one competition track.';
    }

    if (formData.participationType === 'Team' && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required for team entry.';
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(val => val !== '');
    if (hasErrors) return;

    setLoading(true);

    try {
      const response = await registerParticipant({
        ...formData,
        role: accountType
      });
      setLoading(false);

      if (response.success) {
        window.dispatchEvent(new CustomEvent('colorido_registration_completed', { detail: response.data }));
        if (onSuccessRegistration) {
          onSuccessRegistration(response.data);
        }
      } else {
        if (response.isDuplicate) {
          setIsDuplicate(true);
        }
        setServerError(response.message || 'Registration failed.');
      }
    } catch (err) {
      setLoading(false);
      setServerError(err.message || 'Server connection error.');
    }
  };

  return (
    <div id="register-section" className="max-w-3xl mx-auto py-6">
      {/* Neo-Brutalist Krackerz Registration Card */}
      <div className="bg-white text-[#121212] rounded-3xl p-6 sm:p-10 brutal-border shadow-[8px_8px_0px_#121212] relative overflow-hidden">
        
        {/* Top Header Badge & Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
              R.V.R. & J.C. COLLEGE OF ENGINEERING
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#121212] tracking-tight">
            {isSignInMode ? 'Sign In to Fest Account' : 'Colorido Student Pass Portal'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-medium">
            {isSignInMode
              ? 'Access your official verified QR pass, registered competitions, and fest schedules'
              : 'Join competitions, reserve team slots, and receive your instant digital QR pass via email'}
          </p>
        </div>

        {/* Server Error / Duplicate Warning */}
        {serverError && (
          <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 brutal-border-2 text-xs font-bold ${
            isDuplicate
              ? 'bg-[#FFF5C0] text-[#121212]'
              : 'bg-[#FEE7EA] text-[#5C1D24]'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0 text-[#FF5A1F] mt-0.5" />
            <div>
              <p className="font-display font-black text-sm">{isDuplicate ? 'Account Already Exists' : 'Registration Alert'}</p>
              <p className="mt-0.5 font-medium">{serverError}</p>
            </div>
          </div>
        )}

        {/* Account Type Selector Tabs */}
        {!isSignInMode && (
          <div className="p-1 rounded-2xl bg-[#F8F5EE] brutal-border-2 grid grid-cols-2 gap-2 mb-8">
            <button
              type="button"
              onClick={() => setAccountType('student')}
              className={`py-3 px-4 rounded-xl font-display font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                accountType === 'student'
                  ? 'bg-[#CCFF00] text-[#121212] brutal-border shadow-[2.5px_2.5px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              <span>🎓 Student Participant</span>
            </button>

            <button
              type="button"
              onClick={() => setAccountType('volunteer')}
              className={`py-3 px-4 rounded-xl font-display font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                accountType === 'volunteer'
                  ? 'bg-[#FF5A1F] text-white brutal-border shadow-[2.5px_2.5px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              <span>🤝 Festival Volunteer</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Sign Up Form Fields */}
          {!isSignInMode ? (
            <>
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Manikanta Srinivas"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    EMAIL ADDRESS (PASS DISPATCH) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. student@rvrjc.ac.in"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Password & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    FESTIVAL PASSWORD *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.password && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    CONTACT NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 3: College / University & Year of Study */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    COLLEGE / UNIVERSITY *
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="R.V.R. & J.C. College of Engineering"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    YEAR OF STUDY
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold text-sm brutal-border focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {YEARS_OF_STUDY.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Department & Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    DEPARTMENT
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold text-sm brutal-border focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    ROLL NUMBER / STUDENT ID *
                  </label>
                  <input
                    type="text"
                    name="regdNo"
                    value={formData.regdNo}
                    onChange={handleChange}
                    placeholder="e.g. Y22CS001 or CS23B104"
                    className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] uppercase font-mono font-bold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                      errors.regdNo ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.regdNo && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.regdNo}</p>}
                </div>
              </div>

              {/* Participation Type: Solo vs Team */}
              {accountType === 'student' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2">
                      PARTICIPATION TYPE
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, participationType: 'Solo' }))}
                        className={`py-3 px-4 rounded-xl brutal-border font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          formData.participationType === 'Solo'
                            ? 'bg-[#CCFF00] text-[#121212] shadow-[3px_3px_0px_#121212]'
                            : 'bg-white text-stone-700 shadow-[1.5px_1.5px_0px_#121212] hover:bg-stone-50'
                        }`}
                      >
                        <User className="w-4 h-4 text-[#121212]" />
                        <span>Solo Participant</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, participationType: 'Team' }))}
                        className={`py-3 px-4 rounded-xl brutal-border font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          formData.participationType === 'Team'
                            ? 'bg-[#FF5A1F] text-white shadow-[3px_3px_0px_#121212]'
                            : 'bg-white text-stone-700 shadow-[1.5px_1.5px_0px_#121212] hover:bg-stone-50'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span>Team Delegation</span>
                      </button>
                    </div>
                  </div>

                  {formData.participationType === 'Team' && (
                    <div className="p-4 rounded-2xl bg-[#F8F5EE] brutal-border space-y-3 shadow-[2.5px_2.5px_0px_#121212]">
                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                          TEAM NAME *
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleChange}
                          placeholder="e.g. Rhythm Knights"
                          className="w-full px-4 py-2.5 rounded-xl bg-white text-[#121212] font-semibold text-xs brutal-border focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1">
                          ADDITIONAL TEAM MEMBERS
                        </label>
                        <div className="space-y-2">
                          {formData.teamMembers.map((member, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={member}
                              onChange={(e) => handleTeamMemberChange(idx, e.target.value)}
                              placeholder={`Member #${idx + 2} Name or Regd No`}
                              className="w-full px-4 py-2 rounded-xl bg-white text-[#121212] font-medium text-xs brutal-border focus:outline-none"
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={addTeamMemberField}
                          className="mt-1 text-xs font-mono font-bold text-[#FF5A1F] hover:underline cursor-pointer"
                        >
                          + Add team member
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Competitions Selection Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
                        SELECT FESTIVAL COMPETITIONS *
                      </label>
                      <span className="text-xs font-mono font-bold text-[#121212] bg-[#CCFF00] brutal-border-2 px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#121212]">
                        {formData.events.length} Selected
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-3 bg-[#F8F5EE] brutal-border rounded-2xl">
                      {AVAILABLE_EVENTS.map((item) => {
                        const isSelected = formData.events.includes(item.name);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleEventPill(item.name)}
                            className={`p-3 rounded-xl brutal-border-2 cursor-pointer select-none transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-[#CCFF00] text-[#121212] shadow-[2.5px_2.5px_0px_#121212] -translate-y-0.5'
                                : 'bg-white text-stone-800 shadow-[1.5px_1.5px_0px_#121212] hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-[#121212] shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-stone-400 shrink-0" />
                              )}
                              <span className="text-xs font-display font-bold truncate">{item.name}</span>
                            </div>
                            <span className="text-[9px] font-mono font-bold bg-white text-[#121212] border border-[#121212] px-1.5 py-0.5 rounded shrink-0">
                              {item.tag}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.events && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.events}</p>}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Sign In Mode Form */
            <div className="space-y-4 py-3">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. y22cs001@rvrjc.ac.in"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  PASSWORD *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your festival password"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-semibold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none transition-all ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                {errors.password && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.password}</p>}
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full font-display font-black text-[#121212] text-sm sm:text-base bg-[#CCFF00] brutal-border shadow-[4px_4px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-5"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#121212]" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#FF5A1F]" />
                <span>{isSignInMode ? 'SIGN IN & ACCESS PASSES' : 'CREATE ACCOUNT & GET DIGITAL PASS'}</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-6 border-t-2 border-dashed border-[#121212]/20 text-center mt-6">
          <p className="text-xs sm:text-sm font-medium text-stone-600">
            {isSignInMode ? "Don't have a festival account yet? " : "Already registered? "}
            <button
              type="button"
              onClick={() => {
                setIsSignInMode(!isSignInMode);
                setServerError('');
                setErrors({});
              }}
              className="font-bold text-[#FF5A1F] hover:underline cursor-pointer"
            >
              {isSignInMode ? 'Create Account here' : 'Sign In here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
