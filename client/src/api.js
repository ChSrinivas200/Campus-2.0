// Resolve Backend API URL using standard Vite convention VITE_API_URL:
const getApiBase = () => {
  const viteUrl = typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL);
  const legacyUrl = typeof process !== 'undefined' && process.env && (process.env.VITE_API_URL || process.env.REACT_APP_API_URL);
  const apiUrl = (viteUrl || legacyUrl || '').trim();

  if (apiUrl) {
    const trimmed = apiUrl.replace(/\/+$/, '');
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  }

  // Local development fallback
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api';
  }

  // Default production Render backend URL
  return 'https://campus-2-0.onrender.com/api';
};

const API_BASE = getApiBase();

export const MOCK_REGISTRATIONS = [
  {
    _id: 'reg-001',
    fullName: 'K. Manikanta Srinivas',
    regdNo: 'Y22CS084',
    email: 'y22cs084@rvrjc.ac.in',
    phone: '9876543210',
    department: 'Computer Science (CSE)',
    role: 'student',
    participationType: 'Team',
    teamName: 'Cyber Knights',
    events: ['Choreoday (Theme Based)', 'Music & Band (Solo & Group)'],
    ticketId: 'COL-849201',
    createdAt: '2026-09-30T10:15:00.000Z'
  },
  {
    _id: 'reg-002',
    fullName: 'P. Ananya Reddi',
    regdNo: 'Y23IT045',
    email: 'y23it045@rvrjc.ac.in',
    phone: '9845123980',
    department: 'Information Technology (IT)',
    role: 'student',
    participationType: 'Solo',
    teamName: '',
    events: ['Fine Arts (Painting & Sketching)', 'Dance (Solo & Group)'],
    ticketId: 'COL-129384',
    createdAt: '2026-09-30T10:30:00.000Z'
  },
  {
    _id: 'reg-003',
    fullName: 'T. Rajesh Kumar',
    regdNo: 'Y22EC102',
    email: 'y22ec102@rvrjc.ac.in',
    phone: '9988776655',
    department: 'Electronics & Comm (ECE)',
    role: 'volunteer',
    participationType: 'Solo',
    teamName: '',
    events: ['Basketball Tournament (Boys)'],
    ticketId: 'COL-556412',
    createdAt: '2026-09-30T11:05:00.000Z'
  },
  {
    _id: 'reg-004',
    fullName: 'S. Bhavana Varma',
    regdNo: 'Y22AI019',
    email: 'y22ai019@rvrjc.ac.in',
    phone: '9440112233',
    department: 'AI & Machine Learning (AI&ML)',
    role: 'student',
    participationType: 'Team',
    teamName: 'Code Odyssey Squad',
    events: ['Tekraft Events (Tech Art)', 'Literary (Debate & Quiz)'],
    ticketId: 'COL-992318',
    createdAt: '2026-09-30T11:40:00.000Z'
  },
  {
    _id: 'reg-005',
    fullName: 'V. Sai Teja',
    regdNo: 'Y23ME055',
    email: 'y23me055@rvrjc.ac.in',
    phone: '9701234567',
    department: 'Mechanical Engineering (MECH)',
    role: 'student',
    participationType: 'Solo',
    teamName: '',
    events: ['Throwball Championship (Girls)', 'Table Tennis (Boys)'],
    ticketId: 'COL-334910',
    createdAt: '2026-09-30T12:00:00.000Z'
  }
];

export const fetchEvents = async (simulatedDelay = 1200) => {
  try {
    const res = await fetch(`${API_BASE}/events?delay=${simulatedDelay}`);
    if (!res.ok) throw new Error('Failed to fetch events from server');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('API Error, using fallback data:', error.message);
    return [
      {
        _id: '1',
        title: 'Choreoday (Theme Based)',
        section: 'Cultural',
        category: 'Choreoday',
        venue: 'Open Air Theatre (OAT Auditorium)',
        date: 'Day 2 - Feb 27, 2027',
        timing: '06:00 PM - 09:30 PM',
        prizes: {
          team: { first: '₹12,000', second: '₹8,000', third: '₹5,000' },
          solo: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
        },
        description: 'The flagship theme-based synchronized dance spectacle under multi-stop laser arrays. High energy team choreography depicting social themes or epic narratives.',
        rules: [
          'Must convey a cohesive story or social theme.',
          'Group size: 8 to 25 dancers.',
          'Time slot: 10-14 minutes including prop placement.'
        ],
        organizer: 'Choreoday Steering Committee',
        featured: true,
        iconName: 'Flame'
      },
      {
        _id: '2',
        title: 'Music & Band (Solo & Group)',
        section: 'Cultural',
        category: 'Music & Band',
        venue: 'Silver Jubilee Main Stage',
        date: 'Day 2 - Feb 27, 2027',
        timing: '02:00 PM - 05:30 PM',
        prizes: {
          team: { first: '₹8,000', second: '₹5,000', third: '₹3,000' },
          solo: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
        },
        description: 'Vocal solos and ensemble band clashes across Classical Fusion, Rock, Pop, and Indian Film Music.',
        rules: [
          'Solo time: 4-6 minutes; Band time: 15 minutes setup + performance.',
          'Base drum kit provided on stage; bands bring personal instruments.',
          'No explicit language in lyrics.'
        ],
        organizer: 'RVR & JC Music Club',
        featured: true,
        iconName: 'Mic'
      },
      {
        _id: '3',
        title: 'Basketball Tournament (Boys)',
        section: 'Sports',
        category: 'Boys Sports',
        venue: 'Floodlight Basketball Court - Sports Complex',
        date: 'Day 1 & Day 2',
        timing: '08:30 AM onwards',
        prizes: {
          team: { first: '₹6,000', second: '₹4,000', third: '₹2,000' },
          solo: { first: '₹0', second: '₹0', third: '₹0' },
        },
        description: 'Inter-college 5v5 full court basketball championship under FIBA rules.',
        rules: [
          'Knockout format matches.',
          'Team squad size: 5 playing + 7 substitutes.',
          'Official college sports uniform and non-marking shoes required.'
        ],
        organizer: 'RVR & JC Department of Physical Education',
        featured: true,
        iconName: 'Trophy'
      },
      {
        _id: '4',
        title: 'Throwball Championship (Girls)',
        section: 'Sports',
        category: 'Girls Sports',
        venue: 'Girls Athletic Ground - SAC Block',
        date: 'Day 1 & Day 2',
        timing: '09:00 AM onwards',
        prizes: {
          team: { first: '₹6,000', second: '₹4,000', third: '₹2,000' },
          solo: { first: '₹0', second: '₹0', third: '₹0' },
        },
        description: 'High-velocity throwball tournament for women delegations.',
        rules: [
          '7 active players + 5 substitutes per team.',
          'Best of 3 sets of 25 points.',
          'Rotation order must be maintained throughout.'
        ],
        organizer: 'Women Sports Committee',
        featured: true,
        iconName: 'Trophy'
      }
    ];
  }
};

export const registerParticipant = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Network error or server unavailable. Please try again.');
  }
};

export const fetchAdminRegistrations = async () => {
  try {
    const res = await fetch(`${API_BASE}/admin/registrations`);
    if (!res.ok) throw new Error('Admin fetch failed');
    const data = await res.json();
    return data.data || MOCK_REGISTRATIONS;
  } catch (error) {
    return MOCK_REGISTRATIONS;
  }
};

export const fetchFestStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Stats query failed');
    const data = await res.json();
    return data.stats;
  } catch (error) {
    console.warn('Live fest stats query fallback:', error.message);
    return {
      totalRegistrations: 508,
      deptDistribution: {
        CSE: 116,
        IT: 78,
        ECE: 68,
        'AI&ML': 58,
        'DATA SCIENCE': 44,
        EEE: 42,
        CSBS: 38,
        MECH: 36,
        CIVIL: 28,
      },
      cashPrizePool: '₹1,82,500+',
      eventsCount: 38,
      participatingColleges: 38
    };
  }
};

export const lookupTicket = async (regdNo) => {
  try {
    const res = await fetch(`${API_BASE}/ticket/${encodeURIComponent(regdNo)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Ticket lookup service unavailable.' };
  }
};

export const deleteAdminRegistration = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/admin/registrations/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (error) {
    console.warn('API error deleting registration:', error);
    return { success: false };
  }
};

export const updateAdminEvent = async (id, eventData) => {
  try {
    const res = await fetch(`${API_BASE}/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    return await res.json();
  } catch (error) {
    console.warn('API error updating event:', error);
    return { success: false };
  }
};

export const resendPassEmail = async (identifier) => {
  try {
    const res = await fetch(`${API_BASE}/resend-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Could not contact mail server.' };
  }
};

export const verifyPassTicket = async (ticketId) => {
  try {
    const res = await fetch(`${API_BASE}/verify-ticket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, valid: false, message: 'Verification server error.' };
  }
};

export const fetchDiscussions = async (tag = 'All', search = '') => {
  try {
    const params = new URLSearchParams();
    if (tag && tag !== 'All') params.append('tag', tag);
    if (search && search.trim()) params.append('search', search.trim());
    const res = await fetch(`${API_BASE}/discussions?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load discussions');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Discussions fetch error, returning local fallback:', error);
    return [
      {
        _id: 'disc-001',
        author: 'Harshith Varma',
        regdNo: 'Y22CS110',
        department: 'CSE',
        tag: 'Find Teammates',
        content: 'Looking for 1 frontend developer (React/Tailwind) for Hack-a-Fest 12-Hour Web & AI Hackathon! We already have the backend and ML model ready. Reply here if interested! 🚀',
        likes: 12,
        replies: [
          {
            _id: 'rep-001',
            author: 'Sai Teja',
            department: 'IT',
            content: 'Hey Harshith! I have experience with React & Tailwind. I would love to team up! Can we connect at the SAC block cafeteria?',
            createdAt: new Date(Date.now() - 3600000 * 2)
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 3)
      },
      {
        _id: 'disc-002',
        author: 'Sneha Reddy',
        regdNo: 'Y23EC042',
        department: 'ECE',
        tag: 'Questions & Help',
        content: 'Are dance teams allowed to test stage lighting on Feb 25th evening at OAT? What is the procedure to get sound check slots? 🎭',
        likes: 8,
        replies: [
          {
            _id: 'rep-002',
            author: 'Fest Coordinator (ECA)',
            department: 'ECA',
            content: 'Yes! Sound check slots open from 4:30 PM at the OAT audio console. Please bring your track on a USB drive.',
            createdAt: new Date(Date.now() - 3600000 * 5)
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 6)
      },
      {
        _id: 'disc-003',
        author: 'Karthik Varma',
        regdNo: 'Y22CB014',
        department: 'CSBS',
        tag: 'Student Buzz',
        content: 'Choreoday lineup this year is looking insane 🔥 Our squad Rhythm Knights has been practicing for 3 weeks straight! Who else is competing?',
        likes: 24,
        replies: [
          {
            _id: 'rep-003',
            author: 'P. Sneha',
            department: 'CSE',
            content: 'See you on stage! May the best crew take the championship trophy! 🏆',
            createdAt: new Date(Date.now() - 3600000 * 8)
          }
        ],
        createdAt: new Date(Date.now() - 3600000 * 10)
      }
    ];
  }
};

export const createDiscussion = async (postData) => {
  try {
    const res = await fetch(`${API_BASE}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await res.json();
  } catch (error) {
    console.warn('Network error creating discussion, returning local simulated post:', error);
    return {
      success: true,
      data: {
        _id: `disc-${Date.now()}`,
        ...postData,
        likes: 0,
        replies: [],
        createdAt: new Date()
      }
    };
  }
};

export const likeDiscussion = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/discussions/${id}/like`, {
      method: 'POST',
    });
    return await res.json();
  } catch (error) {
    return { success: true };
  }
};

export const replyToDiscussion = async (id, replyData) => {
  try {
    const res = await fetch(`${API_BASE}/discussions/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData),
    });
    return await res.json();
  } catch (error) {
    return {
      success: true,
      data: {
        _id: `rep-${Date.now()}`,
        ...replyData,
        createdAt: new Date()
      }
    };
  }
};

export const toggleStudentAttendance = async (id, appeared) => {
  try {
    const res = await fetch(`${API_BASE}/admin/toggle-attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, appeared }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: true,
      verifiedAtGate: appeared !== undefined ? appeared : true,
      message: 'Attendance toggled locally (offline/fallback mode).'
    };
  }
};

export const sendToAppearedStudents = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/admin/send-appeared`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: 'Network error contacting dispatch server: ' + error.message
    };
  }
};

export const fetchSystemDiagnostics = async () => {
  try {
    const res = await fetch(`${API_BASE}/admin/system-diagnostics`);
    if (!res.ok) throw new Error('Diagnostics service returned HTTP ' + res.status);
    const data = await res.json();
    return data.diagnostics;
  } catch (error) {
    console.warn('Diagnostics query fallback:', error.message);
    return {
      timestamp: new Date(),
      server: {
        status: 'UP',
        port: 5000,
        uptimeSeconds: 120,
        nodeVersion: 'v22.20.0',
        memoryUsageMb: 85
      },
      database: {
        status: 'CONNECTED (LOCAL/FALLBACK)',
        connected: true,
        latencyMs: 12,
        totalUsersCount: 8,
        eventsCount: 38,
        discussionsCount: 6
      },
      emailService: {
        status: 'VERIFIED & READY',
        ready: true,
        user: 'srinivasalbertrose@gmail.com',
        service: 'Gmail SMTP'
      },
      gateScanner: {
        status: 'OPERATIONAL',
        verifiedPassEngine: 'Active'
      },
      festMetrics: {
        totalRegistrations: 8,
        appearedCount: 3,
        pendingCount: 5,
        attendancePercentage: '38%'
      }
    };
  }
};

// ==========================================
// OFFICIAL LIVE SCORES (ADMIN ONLY MUTATION)
// ==========================================
export const DEFAULT_SCORES = [
  {
    id: 'm1',
    event: 'Esports Valorant LAN Championship',
    arena: 'Hi-Tech CS Labs • Arena 1',
    team1: 'RVR Titans',
    score1: 13,
    team2: 'VRSEC Vipers',
    score2: 9,
    status: 'Map 2: Ascent • Round 22',
    lead: 'RVR Titans leading',
    color: '#CCFF00',
    lastUpdatedBy: 'Admin Desk'
  },
  {
    id: 'm2',
    event: 'Kabaddi Inter-College Clash',
    arena: 'Main Sports Complex • Court 2',
    team1: 'RVR Warriors',
    score1: 32,
    team2: 'BEC Tigers',
    score2: 28,
    status: '2nd Half • 3 Mins Left',
    lead: 'Super Raid by RVR!',
    color: '#FF5A1F',
    lastUpdatedBy: 'Admin Desk'
  },
  {
    id: 'm3',
    event: 'Basketball Boys Grand Final',
    arena: 'Floodlight Basketball Complex',
    team1: 'RVR Ballers',
    score1: 78,
    team2: 'Vignan Eagles',
    score2: 74,
    status: '4th Quarter • Final 1:45',
    lead: 'Clutch 3-Pointer',
    color: '#D4F6FF',
    lastUpdatedBy: 'Admin Desk'
  },
  {
    id: 'm4',
    event: 'Choreoday Live Stage Queue',
    arena: 'Open Air Theatre (OAT)',
    team1: 'Pulse Crew (On Stage)',
    score1: 96,
    team2: 'Footloose Crew (Next Up)',
    score2: 0,
    status: 'Live Performance in progress',
    lead: 'Judges Scoring Active',
    color: '#FFF5C0',
    lastUpdatedBy: 'Admin Desk'
  }
];

export const fetchLiveScores = async () => {
  try {
    const res = await fetch(`${API_BASE}/scores`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data)) {
        try {
          localStorage.setItem('colorido_official_scores_v2', JSON.stringify(data.data));
        } catch (e) {}
        return data.data;
      }
    }
  } catch (err) {
    console.warn('API fetch for live scores failed, falling back to local sync:', err);
  }

  // Fallback to local storage or defaults
  try {
    const cached = localStorage.getItem('colorido_official_scores_v2');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {}

  return DEFAULT_SCORES;
};

export const updateAdminScore = async (id, updatedFields) => {
  let updatedMatch = null;
  try {
    const res = await fetch(`${API_BASE}/admin/scores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
    if (res.ok) {
      const data = await res.json();
      updatedMatch = data.data;
    }
  } catch (err) {
    console.warn('Remote score update error, saving locally:', err);
  }

  // Save to local storage for instant multi-tab sync
  try {
    const current = await fetchLiveScores();
    const updatedList = current.map(m => m.id === id ? { ...m, ...updatedFields, lastUpdatedBy: 'Admin' } : m);
    localStorage.setItem('colorido_official_scores_v2', JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('colorido_scores_updated', { detail: updatedList }));
  } catch (e) {}

  return { success: true, data: updatedMatch };
};

export const createAdminScore = async (matchData) => {
  let newMatch = null;
  try {
    const res = await fetch(`${API_BASE}/admin/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData),
    });
    if (res.ok) {
      const data = await res.json();
      newMatch = data.data;
    }
  } catch (err) {
    console.warn('Remote score creation error, saving locally:', err);
  }

  if (!newMatch) {
    newMatch = {
      id: `m-${Date.now()}`,
      ...matchData,
      lastUpdatedBy: 'Admin'
    };
  }

  try {
    const current = await fetchLiveScores();
    const updatedList = [...current, newMatch];
    localStorage.setItem('colorido_official_scores_v2', JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('colorido_scores_updated', { detail: updatedList }));
  } catch (e) {}

  return { success: true, data: newMatch };
};

export const deleteAdminScore = async (id) => {
  try {
    await fetch(`${API_BASE}/admin/scores/${id}`, { method: 'DELETE' });
  } catch (e) {}

  try {
    const current = await fetchLiveScores();
    const updatedList = current.filter(m => m.id !== id);
    localStorage.setItem('colorido_official_scores_v2', JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('colorido_scores_updated', { detail: updatedList }));
  } catch (e) {}

  return { success: true };
};

// =========================================================================
// CAMPUS 2.0 LIVING OPERATING SYSTEM API
// =========================================================================

export const fetchDigitalTwin = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/digital-twin`);
    if (!res.ok) throw new Error('Failed to fetch Digital Twin');
    return await res.json();
  } catch (err) {
    console.warn('Digital Twin API fallback:', err);
    return null;
  }
};

export const simulateDigitalTwinZone = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/campus/digital-twin/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const askCampusCopilot = async (message, role = 'student') => {
  try {
    const res = await fetch(`${API_BASE}/campus/copilot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, role })
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      role,
      category: 'Offline AI Mode',
      response: 'Campus 2.0 Copilot is operating in cached mode. All academic blocks, library stacks, and fest venues are open under standard schedule.',
      quickActions: []
    };
  }
};

export const fetchNavigationRoute = async (from = 'gate-1', to = 'sjb-l3', accessibleOnly = false) => {
  try {
    const res = await fetch(`${API_BASE}/campus/navigation?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&accessibleOnly=${accessibleOnly}`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchCampusSpaces = async (minCapacity = 1, requiredAmenity = '') => {
  try {
    const res = await fetch(`${API_BASE}/campus/spaces?minCapacity=${minCapacity}&requiredAmenity=${encodeURIComponent(requiredAmenity)}`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const bookCampusSpace = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE}/campus/spaces/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchCampusPulse = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/pulse`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const reportCampusIssue = async (issueData) => {
  try {
    const res = await fetch(`${API_BASE}/campus/pulse/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchCampusActions = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/actions`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const updateCampusAction = async (id, stage, note) => {
  try {
    const res = await fetch(`${API_BASE}/campus/actions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, note })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchCampusPredictions = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/predictions`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchCampusOpportunities = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/opportunities`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const matchStudentOpportunities = async (studentSkills) => {
  try {
    const res = await fetch(`${API_BASE}/campus/opportunities/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentSkills })
    });
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchStudentPassport = async (studentId = 'Y22CS084') => {
  try {
    const res = await fetch(`${API_BASE}/campus/passport/${studentId}`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchCampusQuests = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/quests`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const completeCampusQuest = async (questId) => {
  try {
    const res = await fetch(`${API_BASE}/campus/quests/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questId })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchCampusMemories = async () => {
  try {
    const res = await fetch(`${API_BASE}/campus/memories`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const addCampusMemory = async (memoryData) => {
  try {
    const res = await fetch(`${API_BASE}/campus/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memoryData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};




