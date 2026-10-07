const express = require('express');
const router = express.Router();

// =========================================================================
// 1. 🗺️ LIVING DIGITAL TWIN - CAMPUS ZONES & LIVE TELEMETRY
// =========================================================================
let campusDigitalTwin = [
  {
    id: 'b-lib',
    name: 'Central Library & Learning Hub',
    code: 'LIB',
    type: 'Academic & Research',
    floors: 3,
    capacity: 600,
    currentOccupancy: 390, // 65% -> dynamic
    occupancyPercent: 65,
    status: 'Optimal',
    environmental: {
      tempC: 22.4,
      noiseDb: 34,
      airQualityAqi: 42,
      powerKw: 38.2,
      wifiLoadPercent: 74
    },
    zones: [
      { name: 'Ground Floor Reading Stacks', occupancy: 78, noise: 'Quiet' },
      { name: '1st Floor Digital Lab & Research', occupancy: 85, noise: 'Low' },
      { name: '2nd Floor Silent Cubicles', occupancy: 42, noise: 'Silent' }
    ],
    maintenanceStatus: 'All Systems Normal',
    coordinates: { x: 38, y: 45 },
    activeEvents: ['Research Methodology Clinic (Room 201)']
  },
  {
    id: 'b-sjb',
    name: 'Silver Jubilee Academic Block',
    code: 'SJB',
    type: 'Classrooms & CS Labs',
    floors: 4,
    capacity: 1200,
    currentOccupancy: 864,
    occupancyPercent: 72,
    status: 'Crowded',
    environmental: {
      tempC: 24.1,
      noiseDb: 58,
      airQualityAqi: 55,
      powerKw: 92.4,
      wifiLoadPercent: 88
    },
    zones: [
      { name: 'Ground Floor High-Tech Auditoriums', occupancy: 90, noise: 'Moderate' },
      { name: 'Floors 1-2 CSE/IT Lecture Theatres', occupancy: 70, noise: 'Normal' },
      { name: 'Floor 3 AI & Robotics Innovation Labs', occupancy: 65, noise: 'Normal' }
    ],
    maintenanceStatus: 'Elevator B under preventative check',
    coordinates: { x: 55, y: 35 },
    activeEvents: ['Hack-a-Fest 12-Hour Sprint (Labs 310-314)']
  },
  {
    id: 'b-htc',
    name: 'Hi-Tech Electronics & Computing Block',
    code: 'HTC',
    type: 'Labs & Seminar Halls',
    floors: 3,
    capacity: 850,
    currentOccupancy: 714,
    occupancyPercent: 84,
    status: 'High Demand',
    environmental: {
      tempC: 21.8,
      noiseDb: 62,
      airQualityAqi: 48,
      powerKw: 78.6,
      wifiLoadPercent: 91
    },
    zones: [
      { name: 'VLSI & IoT Testing Labs', occupancy: 82, noise: 'Moderate' },
      { name: 'Cloud Computing Centre', occupancy: 88, noise: 'Low' }
    ],
    maintenanceStatus: 'All Systems Normal',
    coordinates: { x: 68, y: 52 },
    activeEvents: ['Cyber Hunt CTF Qualifier']
  },
  {
    id: 'b-sac',
    name: 'Student Activity Centre (SAC)',
    code: 'SAC',
    type: 'Recreation & Student Welfare',
    floors: 2,
    capacity: 700,
    currentOccupancy: 420,
    occupancyPercent: 60,
    status: 'Optimal',
    environmental: {
      tempC: 25.0,
      noiseDb: 71,
      airQualityAqi: 50,
      powerKw: 45.1,
      wifiLoadPercent: 65
    },
    zones: [
      { name: 'Music & Cultural Rehearsal Studios', occupancy: 80, noise: 'Vibrant' },
      { name: 'Indoor Badminton & Table Tennis', occupancy: 55, noise: 'Active' }
    ],
    maintenanceStatus: 'Audio Console OAT calibration ongoing',
    coordinates: { x: 25, y: 65 },
    activeEvents: ['Choreoday Team Rehearsals']
  },
  {
    id: 'b-oat',
    name: 'Open Air Theatre (OAT)',
    code: 'OAT',
    type: 'Mega Amphitheatre',
    floors: 1,
    capacity: 3500,
    currentOccupancy: 1400,
    occupancyPercent: 40,
    status: 'Optimal',
    environmental: {
      tempC: 26.5,
      noiseDb: 76,
      airQualityAqi: 44,
      powerKw: 110.0,
      wifiLoadPercent: 55
    },
    zones: [
      { name: 'Main Stage & Laser Arrays', occupancy: 40, noise: 'Soundcheck' },
      { name: 'Spectator Tier Seating', occupancy: 35, noise: 'Moderate' }
    ],
    maintenanceStatus: 'Stage Rigging Inspected & Certified',
    coordinates: { x: 32, y: 20 },
    activeEvents: ['COLORIDO 2K27 Main Fest Stage Setup']
  },
  {
    id: 'b-fc',
    name: 'Central Food Court & Canteen',
    code: 'CFC',
    type: 'Dining & Social',
    floors: 2,
    capacity: 550,
    currentOccupancy: 429,
    occupancyPercent: 78,
    status: 'Crowded',
    environmental: {
      tempC: 25.8,
      noiseDb: 80,
      airQualityAqi: 62,
      powerKw: 58.0,
      wifiLoadPercent: 82
    },
    zones: [
      { name: 'Express Food Kiosks', occupancy: 85, noise: 'Rush' },
      { name: 'Mezzanine Seating Lounge', occupancy: 70, noise: 'Social' }
    ],
    maintenanceStatus: 'All Systems Normal',
    coordinates: { x: 45, y: 70 },
    activeEvents: ['Special Fest Menu Live']
  },
  {
    id: 'b-spc',
    name: 'Sports Pavilion & Floodlight Arena',
    code: 'SPC',
    type: 'Athletics & Sports Grounds',
    floors: 1,
    capacity: 1500,
    currentOccupancy: 525,
    occupancyPercent: 35,
    status: 'Optimal',
    environmental: {
      tempC: 27.2,
      noiseDb: 68,
      airQualityAqi: 40,
      powerKw: 42.0,
      wifiLoadPercent: 40
    },
    zones: [
      { name: 'FIBA Basketball Court', occupancy: 50, noise: 'Cheering' },
      { name: 'Kabaddi & Volleyball Arena', occupancy: 40, noise: 'Active' }
    ],
    maintenanceStatus: 'Floodlight Array Tested',
    coordinates: { x: 75, y: 25 },
    activeEvents: ['Inter-College Basketball Semi-Finals']
  },
  {
    id: 'b-park',
    name: 'North Smart Parking & Transit Bay',
    code: 'NPK',
    type: 'Transit & Parking',
    floors: 1,
    capacity: 450,
    currentOccupancy: 315,
    occupancyPercent: 70,
    status: 'Optimal',
    environmental: {
      tempC: 28.0,
      noiseDb: 60,
      airQualityAqi: 58,
      powerKw: 24.0,
      wifiLoadPercent: 35
    },
    zones: [
      { name: 'EV Fast Charging Hub', occupancy: 80, noise: 'Quiet' },
      { name: 'Campus Electric Shuttle Bay', occupancy: 65, noise: 'Transit' }
    ],
    maintenanceStatus: 'Gate 2 Boom Barrier Auto-Sensor Operational',
    coordinates: { x: 15, y: 40 },
    activeEvents: ['Campus Electric Shuttle 10-Min Loops Active']
  }
];

// GET /api/campus/digital-twin
router.get('/digital-twin', (req, res) => {
  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    zonesCount: campusDigitalTwin.length,
    overallCampusOccupancy: Math.round(
      campusDigitalTwin.reduce((acc, z) => acc + z.occupancyPercent, 0) / campusDigitalTwin.length
    ),
    data: campusDigitalTwin
  });
});

// POST /api/campus/digital-twin/simulate (Simulate dynamic condition, e.g. Library 65% -> 82% -> 94%)
router.post('/digital-twin/simulate', (req, res) => {
  const { zoneId, occupancyPercent, status, note } = req.body;
  const zone = campusDigitalTwin.find(z => z.id === (zoneId || 'b-lib'));
  if (zone) {
    if (occupancyPercent !== undefined) {
      zone.occupancyPercent = Number(occupancyPercent);
      zone.currentOccupancy = Math.round((zone.capacity * Number(occupancyPercent)) / 100);
    }
    if (status) zone.status = status;
    if (note) zone.maintenanceStatus = note;
  }
  return res.status(200).json({
    success: true,
    message: `Updated simulation telemetry for ${zone?.name || 'Campus zone'}`,
    data: zone
  });
});

// =========================================================================
// 2. 🤖 AI CAMPUS COPILOT - MULTI-PERSONA INTELLIGENT ASSISTANT
// =========================================================================
router.post('/copilot', (req, res) => {
  const { message, role = 'student' } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Prompt message is required' });
  }

  const query = message.toLowerCase().trim();
  let answer = '';
  let category = 'General Knowledge';
  let quickActions = [];

  // Knowledge base intent matching
  if (query.includes('python') || query.includes('workshop')) {
    category = 'Academic & Workshops';
    if (role === 'student') {
      answer = 'Today’s Hands-on Python & PyTorch Workshop is taking place at **Silver Jubilee Block — AI Lab 312** from **02:00 PM to 04:30 PM**. Speaker: Dr. P. K. Rao. Bring your laptop and student ID. Live GPU access tokens will be shared via QR code on arrival.';
      quickActions = [
        { label: 'Navigate to SJB Lab 312', action: 'navigate', target: 'sjb-312' },
        { label: 'View Workshop Material', action: 'link', target: '#collab-hub' }
      ];
    } else if (role === 'faculty') {
      answer = 'The Python workshop in SJB Room 312 is scheduled from 2:00 PM – 4:30 PM. Attendance scanner has been configured. Lab assistant Mr. G. Ramesh is on duty for workstation configuration.';
      quickActions = [{ label: 'View Lab System Logs', action: 'admin', target: 'logs' }];
    } else {
      answer = 'SJB Lab 312 Python workshop utilization: 48 registered students. Projector, LAN, and HVAC systems operating at standard load.';
    }
  } else if (query.includes('library') || query.includes('book') || query.includes('silent')) {
    category = 'Campus Facilities';
    const lib = campusDigitalTwin.find(z => z.id === 'b-lib');
    answer = `Central Library is currently at **${lib.occupancyPercent}% occupancy** (${lib.currentOccupancy}/${lib.capacity} delegates). The 2nd Floor Silent Research Cubicles have **24 seats available**. Operating hours today: 08:00 AM – 10:00 PM. High-speed Wi-Fi and power outlets active at all study pods.`;
    quickActions = [
      { label: 'Navigate to Central Library', action: 'navigate', target: 'b-lib' },
      { label: 'Book Silent Study Cubicle', action: 'spaces', target: 'lib-pod' }
    ];
  } else if (query.includes('route') || query.includes('where is') || query.includes('navigate') || query.includes('canteen') || query.includes('food')) {
    category = 'Navigation & Dining';
    answer = 'The Central Food Court & Canteen is situated centrally between the Silver Jubilee Block and SAC. Live wait time is currently **~14 minutes** with 78% seating occupied. Accessible ramp entry available via the East corridor.';
    quickActions = [
      { label: 'Start Turn-by-Turn Navigation', action: 'navigate', target: 'b-fc' },
      { label: 'Check Canteen Live Rush', action: 'pulse', target: 'b-fc' }
    ];
  } else if (query.includes('wifi') || query.includes('wi-fi') || query.includes('internet') || query.includes('network')) {
    category = 'IT Infrastructure';
    answer = 'Campus High-Speed 6GHz Wi-Fi SSID is `CAMPUS-2.0-SECURE`. Connect using your College Regd No and portal password. Notice: IT Team is monitoring an AP load spike in SJB Block C; AI Action Engine has escalated ticket #NET-104 for load balancing.';
    quickActions = [
      { label: 'Report Wi-Fi Issue in Campus Pulse', action: 'pulse', target: 'report' },
      { label: 'View IT Resolution Status', action: 'action', target: 'NET-104' }
    ];
  } else if (query.includes('colorido') || query.includes('fest') || query.includes('event') || query.includes('dance') || query.includes('hackathon')) {
    category = 'Campus Events & Festival';
    answer = '🎉 **COLORIDO 2K27** is our annual mega cultural & sports extravaganza! Featuring **38+ Competitions** (Choreoday, Hack-a-Fest, Battle of Bands, Basketball, E-Sports), **₹1,50,000+ Cash Pool**, and Instant Digital Passes. Click into the **Events Portal** to explore rules, prizes, and register!';
    quickActions = [
      { label: 'Launch Colorido 2K27 Fest Hub', action: 'events', target: 'colorido' },
      { label: 'Register for Hack-a-Fest', action: 'register', target: 'hackathon' }
    ];
  } else if (query.includes('od') || query.includes('leave') || query.includes('permission') || query.includes('gate pass')) {
    category = 'Student Welfare';
    answer = 'Digital On-Duty (OD) passes for academic workshops, inter-college events, and fest coordination can be generated directly via the **Campus Skill & Growth Passport**. Once approved by your department coordinator, QR passes update automatically in your digital wallet.';
    quickActions = [
      { label: 'Open Skill & Growth Passport', action: 'passport', target: 'my-passport' }
    ];
  } else {
    category = 'Campus Knowledge Engine';
    answer = `Campus 2.0 AI Copilot has processed your inquiry: "${message}". All campus academic complexes, digital twin telemetry, research labs, sports arenas, and administrative wings are operational under regular schedule. How else can I assist your day?`;
    quickActions = [
      { label: 'Explore Living Digital Twin', action: 'digital-twin', target: 'overview' },
      { label: 'Find Opportunities & Teammates', action: 'collab', target: 'hub' },
      { label: 'Check Campus Quests (+XP)', action: 'quests', target: 'active' }
    ];
  }

  return res.status(200).json({
    success: true,
    role,
    category,
    response: answer,
    quickActions,
    timestamp: new Date().toISOString()
  });
});

// =========================================================================
// 3. 🧭 SMART & ACCESSIBLE NAVIGATION ENGINE
// =========================================================================
const campusNodes = {
  'gate-1': { name: 'Main Campus North Gate 1', coords: [10, 10], type: 'Entrance' },
  'sjb': { name: 'Silver Jubilee Block (Main Portico)', coords: [55, 35], type: 'Academic' },
  'sjb-l3': { name: 'SJB 3rd Floor (AI & CS Labs)', coords: [55, 36], type: 'Labs', hasElevator: true },
  'lib': { name: 'Central Library & Digital Twin Deck', coords: [38, 45], type: 'Library', hasRamp: true, hasElevator: true },
  'canteen': { name: 'Central Food Court', coords: [45, 70], type: 'Dining', hasRamp: true },
  'sac': { name: 'Student Activity Centre (SAC)', coords: [25, 65], type: 'Recreation', hasRamp: true },
  'oat': { name: 'Open Air Theatre (OAT)', coords: [32, 20], type: 'Amphitheatre', hasRamp: true },
  'htc': { name: 'Hi-Tech Electronics Block', coords: [68, 52], type: 'Academic', hasElevator: true },
  'parking': { name: 'North EV Transit & Parking Bay', coords: [15, 40], type: 'Transit', hasRamp: true }
};

router.get('/navigation', (req, res) => {
  const { from = 'gate-1', to = 'sjb-l3', accessibleOnly = 'false' } = req.query;
  const isAccessible = accessibleOnly === 'true' || accessibleOnly === true;

  const start = campusNodes[from] || campusNodes['gate-1'];
  const dest = campusNodes[to] || campusNodes['sjb-l3'];

  // Route calculation with accessible elevator & ramp priority
  let waypoints = [
    { step: 1, text: `Depart from ${start.name}`, distanceM: 0, icon: 'MapPin' },
    { step: 2, text: 'Head south-east along the Main Palm Avenue walkway (Smooth paved surface)', distanceM: 95, icon: 'Footprints' }
  ];

  if (isAccessible) {
    waypoints.push({
      step: 3,
      text: 'Follow yellow tactile paving to East Access Ramp (Grade 1:12 ADA-compliant)',
      distanceM: 40,
      accessibleHighlight: true,
      icon: 'Accessibility'
    });
    waypoints.push({
      step: 4,
      text: 'Take North Core Smart Elevator A (Braille buttons + Voice enunciator) to Floor 3',
      distanceM: 25,
      accessibleHighlight: true,
      icon: 'ArrowUp'
    });
  } else {
    waypoints.push({
      step: 3,
      text: 'Enter Central Atrium and ascend Grand Staircase Wing to Floor 3',
      distanceM: 60,
      icon: 'TrendingUp'
    });
  }

  waypoints.push({
    step: waypoints.length + 1,
    text: `Arrived at destination: ${dest.name}. Entry door is straight ahead on the right corridor.`,
    distanceM: 20,
    icon: 'CheckCircle'
  });

  const totalDistance = waypoints.reduce((acc, w) => acc + w.distanceM, 0);
  const estimatedTimeMins = Math.max(2, Math.round(totalDistance / 65));

  return res.status(200).json({
    success: true,
    from: start.name,
    to: dest.name,
    accessibleMode: isAccessible,
    totalDistanceM: totalDistance,
    estimatedWalkMinutes: estimatedTimeMins,
    detourAlert: 'Corridor 2B floor polishing active; auto-rerouted through Courtyard Passage.',
    waypoints
  });
});

// =========================================================================
// 4. 👥 AI COLLABORATION & OPPORTUNITY HUB
// =========================================================================
let campusOpportunities = [
  {
    id: 'opp-01',
    title: 'Healthcare AI Predictive Diagnostics',
    type: 'Hackathon Team Opening',
    category: 'AI & Healthcare',
    deadline: 'Tomorrow, 06:00 PM',
    postedBy: 'Ananya Sharma (Y22AI018) • AI Club',
    lookingFor: ['PyTorch / ML Developer', 'FastAPI Backend Engineer', 'UI/UX Designer'],
    requiredSkills: ['Python', 'Machine Learning', 'Data Preprocessing'],
    description: 'Developing a low-latency edge AI system for early diabetic retinopathy scan classification for the national AI MedHack. Prototype model already trained with 94% accuracy.',
    teamSize: '3/4 filled (1 slot left)',
    stipendPrize: '₹50,000 Prize Pool',
    matchScore: 98,
    tags: ['Hackathon', 'Python', 'ML', 'Immediate']
  },
  {
    id: 'opp-02',
    title: 'Autonomous Campus Delivery Rover',
    type: 'Inter-Department Research Project',
    category: 'Robotics & Embedded Systems',
    deadline: 'Oct 15, 2026',
    postedBy: 'Dr. T. Venkat (ECE Dept) & Robotics Club',
    lookingFor: ['ROS2 / Computer Vision Engineer', 'SolidWorks CAD Designer', 'Firmware Engineer'],
    requiredSkills: ['C++', 'ROS2', 'Raspberry Pi / Arduino', 'Robotics'],
    description: 'Building an autonomous four-wheel indoor-outdoor LiDAR navigation rover to transport books and lab specimens across RVR&JC academic blocks.',
    teamSize: '4/6 filled',
    stipendPrize: 'Institute Research Grant ₹1.2L',
    matchScore: 84,
    tags: ['Research', 'Robotics', 'C++', 'Hardware']
  },
  {
    id: 'opp-03',
    title: 'Campus 2.0 Web3 Micro-Credentials & NFT Passports',
    type: 'Club Innovation Project',
    category: 'Web3 & Cloud',
    deadline: 'Rolling Basis',
    postedBy: 'CSI Student Chapter & Digital Club',
    lookingFor: ['Solidity Developer', 'React / Tailwind Frontend Lead'],
    requiredSkills: ['React', 'JavaScript', 'Smart Contracts', 'Web3'],
    description: 'Decentralized verifiable student milestone credentials on Polygon PoS. Tamper-proof badges for fest victories and workshop achievements.',
    teamSize: '2/4 filled',
    stipendPrize: 'Polygon Fellowship Track',
    matchScore: 92,
    tags: ['Web3', 'Blockchain', 'React', 'Open Source']
  },
  {
    id: 'opp-04',
    title: 'Choreoday Flagship Dance Squad (Theme: Cosmic Echoes)',
    type: 'Cultural Fest Crew Opening',
    category: 'Cultural & Performing Arts',
    deadline: 'Auditions Today 05:00 PM',
    postedBy: 'K. Sai Manikanta • Rhythm Knights',
    lookingFor: ['Hip-Hop / Contemporary Dancers (Male & Female)', 'Costume & Prop Coordinator'],
    requiredSkills: ['Stage Performance', 'Rhythm Coordination', 'Dance'],
    description: 'Competing in COLORIDO 2K27 Choreoday flagship category on OAT main stage. 3-week rigorous practice schedule with pro choreographers.',
    teamSize: '18/22 filled',
    stipendPrize: '₹15,000 Grand Championship Cash Prize',
    matchScore: 89,
    tags: ['Cultural', 'Dance', 'Colorido2K27', 'Auditions']
  }
];

router.get('/opportunities', (req, res) => {
  return res.status(200).json({
    success: true,
    count: campusOpportunities.length,
    data: campusOpportunities
  });
});

router.post('/opportunities/match', (req, res) => {
  const { studentSkills = ['Python', 'Machine Learning', 'React'] } = req.body;
  const skillsUpper = studentSkills.map(s => s.toUpperCase());

  const ranked = campusOpportunities.map(opp => {
    let hits = 0;
    opp.requiredSkills.forEach(reqSkill => {
      if (skillsUpper.some(s => s.includes(reqSkill.toUpperCase()) || reqSkill.toUpperCase().includes(s))) {
        hits++;
      }
    });
    const matchPct = Math.min(99, Math.max(65, Math.round((hits / opp.requiredSkills.length) * 40 + 58)));
    return {
      ...opp,
      matchScore: matchPct,
      matchReason: hits > 0 ? `Matched ${hits} of your verified skills (${opp.requiredSkills.join(', ')})` : 'Recommended based on high campus trending interest'
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return res.status(200).json({
    success: true,
    studentSkills,
    topMatch: ranked[0],
    data: ranked
  });
});

// =========================================================================
// 5. 🎯 CAMPUS SKILL & GROWTH PASSPORT
// =========================================================================
let studentPassports = {
  'Y22CS084': {
    regdNo: 'Y22CS084',
    fullName: 'K. Manikanta Srinivas',
    department: 'CSE',
    yearOfStudy: '3rd Year',
    overallXp: 2840,
    level: 'Campus Luminary (Tier 4)',
    careerGoal: 'AI Systems Architect & Full-Stack Engineer',
    skillRadar: {
      'AI & Machine Learning': 88,
      'Full-Stack Architecture': 92,
      'System Design & Cloud': 76,
      'Algorithmic Problem Solving': 85,
      'Collaborative Leadership': 90,
      'Public Speaking & Debates': 78
    },
    skillGapAnalysis: {
      targetRole: 'Senior Machine Learning & Systems Engineer',
      readySkills: ['Python', 'FastAPI', 'PyTorch', 'React.js', 'MongoDB', 'Docker basics'],
      recommendedGrowthSteps: [
        'Complete Triton / TensorRT GPU Inference optimization workshop in HTC Block.',
        'Contribute to ROS2 autonomous rover project team in collaboration hub.',
        'Earn AWS Cloud Practitioner micro-credential via Campus Digital Library portal.'
      ]
    },
    verifiedCredentials: [
      { id: 'c-01', title: 'Smart India Hackathon Finalist', issuer: 'Govt of India & RVR&JC', date: '2026', badge: 'Trophy' },
      { id: 'c-02', title: 'Full-Stack Web Architect Specialist', issuer: 'Digital Club Academy', date: '2025', badge: 'Code' },
      { id: 'c-03', title: 'Colorido 2K26 Choreoday 1st Runner Up', issuer: 'Cultural Wing', date: '2026', badge: 'Flame' },
      { id: 'c-04', title: 'Peer Mentor: Data Structures Bootcamp', issuer: 'CSE Dept', date: '2026', badge: 'Users' }
    ]
  }
};

router.get('/passport/:studentId', (req, res) => {
  const query = (req.params.studentId || 'Y22CS084').toUpperCase();
  const passport = studentPassports[query] || studentPassports['Y22CS084'];
  return res.status(200).json({
    success: true,
    data: passport
  });
});

// =========================================================================
// 6. 🏆 CAMPUS QUEST - MEANINGFUL GAMIFIED PARTICIPATION
// =========================================================================
let campusQuests = [
  {
    id: 'q-01',
    title: 'Attend Advanced PyTorch Deep Learning Clinic',
    category: 'Academic & Skill',
    xpReward: 100,
    progress: '1/1 Complete',
    completed: true,
    deadline: 'Today 04:30 PM',
    location: 'SJB Room 312',
    icon: 'Sparkles',
    badgeUnlock: 'Neural Pioneer'
  },
  {
    id: 'q-02',
    title: 'Report a Campus Maintenance or Wi-Fi Anomaly',
    category: 'Campus Citizenship',
    xpReward: 50,
    progress: '0/1 Pending',
    completed: false,
    deadline: 'Weekly Quest',
    location: 'Campus Pulse Engine',
    icon: 'ShieldAlert',
    badgeUnlock: 'Campus Sentinel'
  },
  {
    id: 'q-03',
    title: 'Register Team in COLORIDO 2K27 Flagship Competitions',
    category: 'Fest & Leadership',
    xpReward: 150,
    progress: '1/1 Complete',
    completed: true,
    deadline: 'Festival Special',
    location: 'Colorido Fest Portal',
    icon: 'Flame',
    badgeUnlock: 'Fest Luminary'
  },
  {
    id: 'q-04',
    title: 'Accumulate 5-Day Silent Library Study Streak',
    category: 'Academic Focus',
    xpReward: 80,
    progress: '4/5 Days',
    completed: false,
    deadline: '3 Days Remaining',
    location: 'Central Library 2nd Floor',
    icon: 'BookOpen',
    badgeUnlock: 'Scholar Scholar'
  }
];

let campusLeaderboard = [
  { rank: 1, name: 'K. Manikanta Srinivas', regdNo: 'Y22CS084', dept: 'CSE', xp: 2840, badge: 'Grandmaster' },
  { rank: 2, name: 'Ananya Sharma', regdNo: 'Y22IT045', dept: 'IT', xp: 2690, badge: 'Pioneer' },
  { rank: 3, name: 'P. Rahul Varma', regdNo: 'Y22EC082', dept: 'ECE', xp: 2510, badge: 'Pathfinder' },
  { rank: 4, name: 'Sneha Reddy', regdNo: 'Y23AI019', dept: 'AI&ML', xp: 2340, badge: 'Innovator' },
  { rank: 5, name: 'G. Tarun Kumar', regdNo: 'Y22EE034', dept: 'EEE', xp: 2190, badge: 'Sentinel' }
];

router.get('/quests', (req, res) => {
  return res.status(200).json({
    success: true,
    totalQuests: campusQuests.length,
    activeQuests: campusQuests,
    leaderboard: campusLeaderboard
  });
});

router.post('/quests/complete', (req, res) => {
  const { questId } = req.body;
  const quest = campusQuests.find(q => q.id === questId);
  if (quest) {
    quest.completed = true;
    quest.progress = '1/1 Complete';
  }
  return res.status(200).json({
    success: true,
    message: `Quest completed! Earned +${quest?.xpReward || 50} XP and unlocked badge: ${quest?.badgeUnlock || 'Champion'}!`,
    data: quest
  });
});

// =========================================================================
// 7. 📸 CAMPUS MEMORY - DIGITAL MILESTONE TIMELINE
// =========================================================================
let campusMemories = [
  {
    id: 'mem-01',
    year: '2026',
    title: 'Choreoday Victory Under OAT Laser Skies',
    tag: 'Cultural Fest',
    date: 'Feb 28, 2026',
    caption: '18 minutes of synchronized fury with Rhythm Knights crew. Taking 1st Runner-Up trophy in front of 3,500 roaring students!',
    location: 'Open Air Theatre (OAT)',
    teammates: ['Sai Manikanta', 'Sneha', 'Rahul', 'Vineeth'],
    mediaUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    likes: 142
  },
  {
    id: 'mem-02',
    year: '2025',
    title: 'Hack-a-Fest 24-Hour Finalist Sprint',
    tag: 'Hackathons',
    date: 'Nov 14, 2025',
    caption: 'Coding through 3:00 AM fueled by cold brew coffee and debugging neural weights. Built an automated drone dispatch dashboard in SJB Lab 310.',
    location: 'SJB Block • Lab 310',
    teammates: ['Harshith Varma', 'Ananya', 'Sai Teja'],
    mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    likes: 98
  },
  {
    id: 'mem-03',
    year: '2024',
    title: 'Day 1 Orientation: First Walk Up Palm Avenue',
    tag: 'Campus Milestones',
    date: 'Aug 22, 2024',
    caption: 'Stepping into R.V.R. & J.C. with dreams in our eyes, receiving the official welcome kits and exploring the massive library stacks.',
    location: 'Silver Jubilee Portico',
    teammates: ['Batch of 2022-2026'],
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    likes: 184
  }
];

router.get('/memories', (req, res) => {
  return res.status(200).json({
    success: true,
    journeyPeriod: 'Campus Journey — 2024–2028',
    count: campusMemories.length,
    data: campusMemories
  });
});

router.post('/memories', (req, res) => {
  const { title, tag, caption, year, location, mediaUrl } = req.body;
  const newMemory = {
    id: `mem-${Date.now()}`,
    year: year || '2027',
    title: title || 'New Campus Milestone',
    tag: tag || 'Campus Life',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    caption: caption || 'Memorable moment at RVR&JC campus.',
    location: location || 'Main Campus',
    teammates: ['Campus Peers'],
    mediaUrl: mediaUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    likes: 1
  };
  campusMemories.unshift(newMemory);
  return res.status(201).json({
    success: true,
    message: 'Campus memory recorded to your digital journey!',
    data: newMemory
  });
});

// =========================================================================
// 8. 📊 CAMPUS PULSE - ISSUE REPORTING & AI CLUSTERING ENGINE
// =========================================================================
let campusIssues = [
  {
    id: 'ISSUE-01',
    category: 'Wi-Fi & Connectivity',
    location: 'Silver Jubilee Block • Floor 2 & 3',
    description: 'High latency and intermittent dropping on CAMPUS-SECURE 5GHz APs during peak lunch hours.',
    reportedByCount: 187,
    urgency: 'High',
    sentiment: 'Needs Immediate Attention',
    aiClustered: true,
    clusterTitle: 'Major Incident: SJB High-Density Access Point Saturation',
    status: 'Assigned to IT Networks',
    ticketRef: 'ACT-NET-104',
    reportedAt: new Date(Date.now() - 3600000 * 4)
  },
  {
    id: 'ISSUE-02',
    category: 'HVAC & Cleanliness',
    location: 'Central Library • 3rd Floor Book Stacks',
    description: 'AC thermostat set too low; temperature dropping to 19°C causing condensation on study cubicles.',
    reportedByCount: 34,
    urgency: 'Medium',
    sentiment: 'Moderate Concern',
    aiClustered: true,
    clusterTitle: 'Library Zone 3 Climate Calibration',
    status: 'In Progress',
    ticketRef: 'ACT-EST-088',
    reportedAt: new Date(Date.now() - 3600000 * 8)
  },
  {
    id: 'ISSUE-03',
    category: 'Transport & Shuttle',
    location: 'North Transit Bay • Shuttle Route 2',
    description: 'Electric shuttle frequency delay during 5:00 PM evening dispersal surge.',
    reportedByCount: 76,
    urgency: 'High',
    sentiment: 'Urgent Transit Bottleneck',
    aiClustered: true,
    clusterTitle: 'Evening Peak Transit Loop Reinforcement',
    status: 'Resolved',
    ticketRef: 'ACT-TRN-042',
    reportedAt: new Date(Date.now() - 3600000 * 24)
  }
];

router.get('/pulse', (req, res) => {
  return res.status(200).json({
    success: true,
    overallCampusSentiment: {
      score: 78,
      status: 'Healthy & Vibrant (78% Positive)',
      activeHotspots: 2,
      resolvedLast24h: 9
    },
    issues: campusIssues
  });
});

router.post('/pulse/report', (req, res) => {
  const { category, location, description } = req.body;
  if (!description || !location) {
    return res.status(400).json({ success: false, message: 'Location and description are required.' });
  }

  // AI clustering: Check if matching issue already exists in location
  const existing = campusIssues.find(i => i.location.toLowerCase().includes(location.toLowerCase()) || location.toLowerCase().includes(i.location.toLowerCase()));
  if (existing) {
    existing.reportedByCount += 1;
    return res.status(200).json({
      success: true,
      message: `AI Clustering Engine grouped your report into existing incident #${existing.id} (${existing.reportedByCount} students affected). Action priority escalated!`,
      data: existing
    });
  }

  const newIssue = {
    id: `ISSUE-${Math.floor(10 + Math.random() * 90)}`,
    category: category || 'General Campus Facility',
    location: location.trim(),
    description: description.trim(),
    reportedByCount: 1,
    urgency: 'Normal',
    sentiment: 'Under Review',
    aiClustered: false,
    clusterTitle: `${category || 'Facility'} Report at ${location}`,
    status: 'Reported & Triaged',
    ticketRef: `ACT-${Date.now().toString().slice(-4)}`,
    reportedAt: new Date()
  };

  campusIssues.unshift(newIssue);
  return res.status(201).json({
    success: true,
    message: 'Report logged successfully! AI Engine has prioritized your feedback.',
    data: newIssue
  });
});

// =========================================================================
// 9. 🏢 SMART SPACES & FACILITIES ENGINE
// =========================================================================
let campusSpaces = [
  {
    id: 'sp-01',
    name: 'Innovation Seminar Suite 304',
    building: 'Silver Jubilee Block',
    floor: 'Floor 3',
    capacity: 45,
    suitableFor: 'Hackathons, Presentations, Guest Talks',
    amenities: ['4K Dual Projector', 'Surround Sound', 'Smart Board', 'Gigabit LAN', 'Central AC'],
    isAvailable: true,
    currentBooking: null,
    utilizationRate: '72%'
  },
  {
    id: 'sp-02',
    name: 'Collaborative Discussion Pod D-12',
    building: 'Central Library',
    floor: 'Floor 1',
    capacity: 8,
    suitableFor: 'Project Group Meetings, Brainstorming',
    amenities: ['Acoustic Glass', '65-inch Display', 'Whiteboard', 'Fast Wi-Fi', 'Air Purifier'],
    isAvailable: true,
    currentBooking: null,
    utilizationRate: '86%'
  },
  {
    id: 'sp-03',
    name: 'High-Performance GPU Computing Lab 208',
    building: 'Hi-Tech Block',
    floor: 'Floor 2',
    capacity: 60,
    suitableFor: 'AI Training, CAD Modeling, Deep Learning',
    amenities: ['RTX 4090 Workstations', 'Dual Monitors', 'Fiber Backbone', 'Lab Assistant on Duty'],
    isAvailable: false,
    currentBooking: 'CSE M.Tech Neural Networks Lab until 04:00 PM',
    utilizationRate: '94%'
  },
  {
    id: 'sp-04',
    name: 'Executive Boardroom Conference Hall',
    building: 'Admin Block',
    floor: 'Floor 1',
    capacity: 25,
    suitableFor: 'Faculty Meetings, Placement Interviews',
    amenities: ['Video Conferencing Polycom', 'Microphone Array', 'Leather Seating', 'Direct Pantry Access'],
    isAvailable: true,
    currentBooking: null,
    utilizationRate: '40%'
  }
];

router.get('/spaces', (req, res) => {
  const { minCapacity = 1, requiredAmenity } = req.query;
  let filtered = campusSpaces.filter(s => s.capacity >= Number(minCapacity));
  if (requiredAmenity) {
    filtered = filtered.filter(s => s.amenities.some(a => a.toLowerCase().includes(requiredAmenity.toLowerCase())));
  }
  return res.status(200).json({
    success: true,
    count: filtered.length,
    overallUtilization: '74%',
    spaces: filtered
  });
});

router.post('/spaces/book', (req, res) => {
  const { spaceId, studentName, regdNo, purpose, peopleCount } = req.body;
  const space = campusSpaces.find(s => s.id === spaceId);
  if (!space) {
    return res.status(404).json({ success: false, message: 'Campus space not found.' });
  }
  if (!space.isAvailable) {
    return res.status(409).json({ success: false, message: `Space is currently booked: ${space.currentBooking}` });
  }

  const reservationCode = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
  space.isAvailable = false;
  space.currentBooking = `Booked by ${studentName || regdNo || 'Student Team'} (${purpose || 'Academic Study'})`;

  return res.status(200).json({
    success: true,
    reservationCode,
    message: `Confirmed booking for ${space.name} for ${peopleCount || 8} people! Room keycode sent to delegate mobile.`,
    data: space
  });
});

// =========================================================================
// 10. 🧠 CAMPUS INTELLIGENCE & PREDICTION ENGINE
// =========================================================================
router.get('/predictions', (req, res) => {
  return res.status(200).json({
    success: true,
    generatedAt: new Date().toISOString(),
    forecastHorizonHours: 6,
    predictiveInsights: [
      {
        id: 'pred-01',
        title: 'Library Crunch Spike Forecast',
        location: 'Central Library',
        probability: '94%',
        timeWindow: '03:45 PM – 05:30 PM',
        forecastDescription: 'Predicted to surge from 65% to 94% occupancy as 3rd Year Mid-Term preparations overlap with evening study hours.',
        recommendedAction: 'Opening Annex Reading Rooms 204 & 205 early to redistribute crowd load.',
        status: 'Action Triggered'
      },
      {
        id: 'pred-02',
        title: 'Food Court Peak Surge Warning',
        location: 'Central Food Court',
        probability: '88%',
        timeWindow: '12:45 PM – 01:30 PM',
        forecastDescription: 'Expected queue wait times exceeding 18 mins due to 6 simultaneous lecture dismissals at 12:45 PM.',
        recommendedAction: 'Pre-packaged express lunch counters activated at East Gazebo.',
        status: 'Optimal'
      },
      {
        id: 'pred-03',
        title: 'Preventive HVAC Anomaly Detection',
        location: 'SJB Block • Server Room 102',
        probability: '82%',
        timeWindow: 'Next 24 Hours',
        forecastDescription: 'Compressor bearing vibration frequency +14Hz above nominal thresholds. Preventative failure risk 82%.',
        recommendedAction: 'Maintenance ticket #ACT-HVAC-91 auto-dispatched to Campus Estate Engineering.',
        status: 'Technician Dispatched'
      },
      {
        id: 'pred-04',
        title: 'Evening Transit Shuttle Bottleneck',
        location: 'North Gate Transit Bay',
        probability: '76%',
        timeWindow: '04:45 PM – 05:30 PM',
        forecastDescription: 'Rain radar indicates 65% shower probability at 5:00 PM; student pedestrian flow will redirect to electric shuttles.',
        recommendedAction: 'Deploying 2 reserve campus electric mini-buses on Route 1 & 2 loops.',
        status: 'Standby'
      }
    ]
  });
});

// =========================================================================
// 11. 🔄 CAMPUS ACTION & RESOLUTION ENGINE
// =========================================================================
let campusActions = [
  {
    id: 'ACT-NET-104',
    title: 'SJB Floor 3 Wi-Fi Channel Saturation Reroute',
    department: 'IT Infrastructure & Networks',
    priority: 'P1 - High',
    reportedVia: 'Campus Pulse (187 Students Clustered)',
    assignedTechnician: 'K. Srinivasa Rao (Senior Network Eng)',
    stage: 'In Progress', // Reported -> Assigned -> In Progress -> Resolved
    slaHoursRemaining: 1.5,
    timeline: [
      { time: '10:15 AM', note: 'AI Pulse grouped 187 reports into single root cause' },
      { time: '10:30 AM', note: 'Technician dispatched with spectrum analyzer' },
      { time: '11:10 AM', note: 'Load balancing traffic to HTC secondary optical line' }
    ]
  },
  {
    id: 'ACT-EST-088',
    title: 'Library 3rd Floor Digital Thermostat Recalibration',
    department: 'Campus Estate & HVAC',
    priority: 'P2 - Medium',
    reportedVia: 'Campus Pulse (34 Reports)',
    assignedTechnician: 'M. Kalyan (HVAC Lead)',
    stage: 'Resolved',
    slaHoursRemaining: 0,
    resolutionSummary: 'Thermostat sensor reset to 23.5°C; humidity controller stabilized.',
    timeline: [
      { time: '08:00 AM', note: 'Ticket initialized' },
      { time: '09:15 AM', note: 'Sensor recalibrated & tested' },
      { time: '09:40 AM', note: 'Verified by Library In-Charge' }
    ]
  },
  {
    id: 'ACT-SEC-019',
    title: 'Gate 2 QR Scanner Turnstile Firmware Sync',
    department: 'Security & Access Control',
    priority: 'P1 - High',
    reportedVia: 'Colorido Fest Security Desk',
    assignedTechnician: 'P. Prasad (Security Automation)',
    stage: 'Resolved',
    slaHoursRemaining: 0,
    resolutionSummary: 'Gate pass scanner synced with high-speed offline cache. Scan throughput at 0.4s/student.',
    timeline: [
      { time: '07:30 AM', note: 'Dispatched for fest readiness' },
      { time: '08:00 AM', note: 'Firmware updated & 500 test pass cards validated' }
    ]
  }
];

router.get('/actions', (req, res) => {
  return res.status(200).json({
    success: true,
    averageResolutionHours: 2.8,
    slaComplianceRate: '98.4%',
    activeActions: campusActions
  });
});

router.put('/actions/:id', (req, res) => {
  const { id } = req.params;
  const { stage, note } = req.body;
  const action = campusActions.find(a => a.id === id);
  if (!action) {
    return res.status(404).json({ success: false, message: 'Action ticket not found' });
  }

  if (stage) action.stage = stage;
  if (note) {
    action.timeline.push({
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      note
    });
  }

  return res.status(200).json({
    success: true,
    message: `Updated action #${id} to stage: ${action.stage}`,
    data: action
  });
});

module.exports = router;
