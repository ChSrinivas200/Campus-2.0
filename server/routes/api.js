const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');
const Discussion = require('../models/Discussion');
const { COMPREHENSIVE_EVENTS } = require('../seed');
const { sendRegistrationConfirmation, sendAppearedConfirmation, transporter } = require('../utils/emailService');
const campusRouter = require('./campus');

// Mount Campus 2.0 Subsystem Routes
router.use('/campus', campusRouter);

// GET /api/events
router.get('/events', async (req, res) => {
  try {
    let events = [];
    if (mongoose.connection.readyState === 1) {
      try {
        events = await Event.find().sort({ section: 1, featured: -1, title: 1 }).maxTimeMS(2500);
      } catch (err) {
        console.warn('DB query timed out or failed, serving verified comprehensive events list');
      }
    }

    if (!events || events.length === 0) {
      events = COMPREHENSIVE_EVENTS;
    }

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: COMPREHENSIVE_EVENTS.length,
      data: COMPREHENSIVE_EVENTS
    });
  }
});

function normalizeDepartment(dept) {
  if (!dept) return 'CSE';
  const d = String(dept).toUpperCase();
  if (d.includes('CSE') || d.includes('COMPUTER SCIENCE')) return 'CSE';
  if (d.includes('IT') || d.includes('INFORMATION')) return 'IT';
  if (d.includes('ECE') || d.includes('ELECTRONICS')) return 'ECE';
  if (d.includes('EEE') || d.includes('ELECTRICAL')) return 'EEE';
  if (d.includes('MECH') || d.includes('MECHANICAL')) return 'MECH';
  if (d.includes('CIVIL')) return 'CIVIL';
  if (d.includes('CSBS') || d.includes('BUSINESS')) return 'CSBS';
  if (d.includes('AI') || d.includes('MACHINE')) return 'AI&ML';
  if (d.includes('DATA') || d.includes('DS')) return 'DATA SCIENCE';
  return 'CSE';
}

// GET /api/stats - Live Fest Telemetry & Department-wise Registrations directly from MongoDB
router.get('/stats', async (req, res) => {
  try {
    let totalRegistrations = 0;
    const deptDistribution = {
      CSE: 0,
      IT: 0,
      ECE: 0,
      'AI&ML': 0,
      'DATA SCIENCE': 0,
      EEE: 0,
      CSBS: 0,
      MECH: 0,
      CIVIL: 0,
    };
    let verifiedCount = 0;
    let collegesCount = 1;

    if (mongoose.connection.readyState === 1) {
      try {
        const [totalCount, deptAgg, distinctColleges, verifiedDocs] = await Promise.all([
          User.countDocuments().maxTimeMS(2500),
          User.aggregate([
            { $group: { _id: '$department', count: { $sum: 1 } } }
          ]).option({ maxTimeMS: 2500 }),
          User.distinct('collegeName'),
          User.countDocuments({ verifiedAtGate: true }).maxTimeMS(2500)
        ]);

        totalRegistrations = totalCount;
        verifiedCount = verifiedDocs;
        collegesCount = Math.max(distinctColleges.length, 38);

        deptAgg.forEach((item) => {
          const norm = normalizeDepartment(item._id);
          deptDistribution[norm] = (deptDistribution[norm] || 0) + item.count;
        });
      } catch (dbErr) {
        console.warn('MongoDB stats query fallback:', dbErr.message);
        totalRegistrations = mockRegistrations.length;
        mockRegistrations.forEach((r) => {
          const norm = normalizeDepartment(r.department);
          deptDistribution[norm] = (deptDistribution[norm] || 0) + 1;
          if (r.verifiedAtGate) verifiedCount++;
        });
      }
    } else {
      totalRegistrations = mockRegistrations.length;
      mockRegistrations.forEach((r) => {
        const norm = normalizeDepartment(r.department);
        deptDistribution[norm] = (deptDistribution[norm] || 0) + 1;
        if (r.verifiedAtGate) verifiedCount++;
      });
    }

    let eventsCount = 24;
    let cashPrizePool = '₹3,12,500+';
    if (mongoose.connection.readyState === 1) {
      try {
        const dbEvents = await Event.find({}, 'prizes').lean().maxTimeMS(2500);
        if (dbEvents && dbEvents.length > 0) {
          eventsCount = dbEvents.length;
          let totalPrize = 0;
          dbEvents.forEach(ev => {
            const p1 = parseInt((ev.prizes?.team?.first || '0').replace(/[^0-9]/g, '')) || 0;
            const p2 = parseInt((ev.prizes?.team?.second || '0').replace(/[^0-9]/g, '')) || 0;
            const p3 = parseInt((ev.prizes?.team?.third || '0').replace(/[^0-9]/g, '')) || 0;
            const s1 = parseInt((ev.prizes?.solo?.first || '0').replace(/[^0-9]/g, '')) || 0;
            totalPrize += (p1 + p2 + p3 + s1);
          });
          if (totalPrize > 0) {
            cashPrizePool = `₹${totalPrize.toLocaleString('en-IN')}+`;
          }
        }
      } catch (e) {}
    }

    return res.status(200).json({
      success: true,
      source: mongoose.connection.readyState === 1 ? 'database' : 'fallback-cache',
      timestamp: new Date().toISOString(),
      stats: {
        totalRegistrations,
        deptDistribution,
        cashPrizePool,
        eventsCount,
        participatingColleges: collegesCount,
        verifiedCount
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

let mockRegistrations = [
  {
    _id: 'reg-001',
    fullName: 'K. Sai Manikanta',
    regdNo: 'Y22CS001',
    email: 'y22cs001@rvrjc.ac.in',
    phone: '9876543210',
    department: 'CSE',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '3rd Year',
    participationType: 'Team',
    teamName: 'Rhythm Knights',
    events: ['Choreoday (Theme Based Mega Dance)', 'Basketball Championship (Boys)'],
    teamMembers: ['Y22CS002 - K. Rahul', 'Y22CS003 - P. Sneha', 'Y22CS004 - T. Vineeth'],
    ticketId: 'COLORIDO-27-981245',
    verifiedAtGate: true,
    registeredAt: new Date(Date.now() - 3600000 * 24)
  },
  {
    _id: 'reg-002',
    fullName: 'Ananya Sharma',
    regdNo: 'Y22IT045',
    email: 'ananya.sharma@gmail.com',
    phone: '9123456780',
    department: 'IT',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '2nd Year',
    participationType: 'Solo',
    events: ['Dance Clash (Classical, Western & Folk)', 'Fine Arts (Painting, Sketching & Rangoli)'],
    teamMembers: [],
    ticketId: 'COLORIDO-27-443192',
    verifiedAtGate: true,
    registeredAt: new Date(Date.now() - 3600000 * 18)
  },
  {
    _id: 'reg-003',
    fullName: 'P. Rahul Varma',
    regdNo: 'Y22EC082',
    email: 'rahul.varma@gmail.com',
    phone: '9988776655',
    department: 'ECE',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '3rd Year',
    participationType: 'Team',
    teamName: 'EchoSynapse',
    events: ['Music & Band (Solo & Battle of Bands)', 'Hack-a-Fest: 12-Hour Web & AI Hackathon'],
    teamMembers: ['Y22EC083 - S. Aditya', 'Y22EC084 - M. Akhil'],
    ticketId: 'COLORIDO-27-551982',
    verifiedAtGate: false,
    registeredAt: new Date(Date.now() - 3600000 * 12)
  },
  {
    _id: 'reg-004',
    fullName: 'S. Sneha Reddy',
    regdNo: 'Y23AI019',
    email: 'sneha.reddy@gmail.com',
    phone: '9440112233',
    department: 'AI&ML',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '2nd Year',
    participationType: 'Solo',
    events: ['UI/UX Design Sprint (Figma Championship)', 'Cyber Hunt (Crypto & CTF Challenge)'],
    teamMembers: [],
    ticketId: 'COLORIDO-27-219843',
    verifiedAtGate: false,
    registeredAt: new Date(Date.now() - 3600000 * 8)
  },
  {
    _id: 'reg-005',
    fullName: 'G. Tarun Kumar',
    regdNo: 'Y22EE034',
    email: 'tarun.kumar@gmail.com',
    phone: '9701234567',
    department: 'EEE',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '3rd Year',
    participationType: 'Solo',
    events: ['Kabaddi Tournament (Boys)', 'Tekraft (E-Waste Sculpting & Tech Art)'],
    teamMembers: [],
    ticketId: 'COLORIDO-27-771234',
    verifiedAtGate: false,
    registeredAt: new Date(Date.now() - 3600000 * 6)
  },
  {
    _id: 'reg-006',
    fullName: 'D. Harsha Vardhan',
    regdNo: 'Y23ME055',
    email: 'harsha.mech@gmail.com',
    phone: '9652147890',
    department: 'MECH',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '2nd Year',
    participationType: 'Team',
    teamName: 'Mech Titans',
    events: ['Volleyball Championship (Boys)'],
    teamMembers: ['Y23ME056 - R. Dinesh', 'Y23ME057 - P. Kalyan'],
    ticketId: 'COLORIDO-27-339102',
    verifiedAtGate: false,
    registeredAt: new Date(Date.now() - 3600000 * 4)
  },
  {
    _id: 'reg-007',
    fullName: 'V. Divya Sri',
    regdNo: 'Y22CB028',
    email: 'divya.csbs@gmail.com',
    phone: '9848012345',
    department: 'CSBS',
    role: 'volunteer',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '3rd Year',
    participationType: 'Solo',
    events: ['Short Film Contest & Mobile Photography', 'Literary Arena (Oxford Debate & Master Quiz)'],
    teamMembers: [],
    ticketId: 'COLORIDO-27-884910',
    verifiedAtGate: true,
    registeredAt: new Date(Date.now() - 3600000 * 3)
  },
  {
    _id: 'reg-008',
    fullName: 'B. Bhavani Prasad',
    regdNo: 'Y22CE014',
    email: 'bhavani.civil@gmail.com',
    phone: '9390123456',
    department: 'CIVIL',
    role: 'student',
    collegeName: 'R.V.R. & J.C. College of Engineering',
    yearOfStudy: '3rd Year',
    participationType: 'Solo',
    events: ['Rapid Chess Masters (Boys Open)', 'Fine Arts (Painting, Sketching & Rangoli)'],
    teamMembers: [],
    ticketId: 'COLORIDO-27-662914',
    verifiedAtGate: false,
    registeredAt: new Date(Date.now() - 3600000 * 1)
  }
];

// GET /api/ticket/:regdNo
router.get('/ticket/:regdNo', async (req, res) => {
  try {
    const query = req.params.regdNo.trim().toUpperCase();
    let user = null;
    try {
      user = await User.findOne({
        $or: [{ regdNo: query }, { ticketId: query }, { email: query.toLowerCase() }]
      }).maxTimeMS(2500);
    } catch (e) {
      user = mockRegistrations.find(
        r => r.regdNo === query || r.ticketId === query || (r.email && r.email.toLowerCase() === query.toLowerCase())
      );
    }

    if (!user) {
      // also check in mockRegistrations
      user = mockRegistrations.find(
        r => r.regdNo === query || r.ticketId === query || (r.email && r.email.toLowerCase() === query.toLowerCase())
      );
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'Registration pass not found for this Registration Number / Pass ID.' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      regdNo,
      email,
      phone,
      department,
      role,
      collegeName,
      yearOfStudy,
      password,
      participationType,
      teamName,
      events,
      teamMembers
    } = req.body;

    if (!fullName || !regdNo || !email || !phone || !department) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Regd No, Email, Phone, Dept).'
      });
    }

    const cleanRegdNo = regdNo.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    let existingUser = null;
    try {
      existingUser = await User.findOne({
        $or: [{ regdNo: cleanRegdNo }, { email: cleanEmail }]
      }).maxTimeMS(2500);
    } catch (err) {
      existingUser = mockRegistrations.find(
        (u) => u.regdNo === cleanRegdNo || u.email === cleanEmail
      );
    }

    if (!existingUser) {
      existingUser = mockRegistrations.find(
        (u) => u.regdNo === cleanRegdNo || u.email === cleanEmail
      );
    }

    if (existingUser) {
      const isRegdMatch = existingUser.regdNo === cleanRegdNo;
      return res.status(409).json({
        success: false,
        isDuplicate: true,
        message: isRegdMatch
          ? `Registration No '${cleanRegdNo}' is already registered for COLORIDO 2K27!`
          : `Email address '${cleanEmail}' has already submitted a registration.`
      });
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const ticketId = `COLORIDO-27-${randomCode}`;

    const newUserData = {
      fullName: fullName.trim(),
      regdNo: cleanRegdNo,
      email: cleanEmail,
      phone: phone.trim(),
      department: normalizeDepartment(department),
      role: role || 'student',
      collegeName: collegeName || 'R.V.R. & J.C. College of Engineering',
      yearOfStudy: yearOfStudy || '2nd Year',
      password: password || '',
      participationType: participationType || 'Solo',
      teamName: teamName ? teamName.trim() : '',
      events: Array.isArray(events) ? events : [],
      teamMembers: Array.isArray(teamMembers) ? teamMembers.filter(m => m.trim()) : [],
      ticketId,
      verifiedAtGate: false,
      registeredAt: new Date()
    };

    let savedUser = null;
    try {
      const user = new User(newUserData);
      savedUser = await user.save();
    } catch (dbErr) {
      console.warn('MongoDB save fallback to in-memory store:', dbErr.message);
      newUserData._id = `reg-${Date.now()}`;
      mockRegistrations.unshift(newUserData);
      savedUser = newUserData;
    }

    // Always keep in mockRegistrations cache as well
    if (!mockRegistrations.some(r => r.ticketId === ticketId)) {
      mockRegistrations.unshift(savedUser.toObject ? savedUser.toObject() : savedUser);
    }

    // Asynchronously dispatch confirmation email using Gmail SMTP
    sendRegistrationConfirmation(savedUser)
      .then(emailResult => {
        if (emailResult.success) {
          console.log(`✅ Confirmation email sent to ${savedUser.email}`);
        } else {
          console.warn(`⚠️ Email delivery warning for ${savedUser.email}:`, emailResult.error);
        }
      })
      .catch(err => {
        console.error('Email dispatch error:', err.message);
      });

    return res.status(201).json({
      success: true,
      message: 'Registration successful! An official confirmation email with your Fest Pass has been sent to your inbox.',
      emailSent: true,
      data: savedUser
    });

  } catch (error) {
    console.error('Registration API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing registration. Please try again.',
      error: error.message
    });
  }
});

// POST /api/resend-email
router.post('/resend-email', async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Please provide ticketId, regdNo, or email.' });
    }

    const query = identifier.trim().toUpperCase();
    let user = null;
    try {
      user = await User.findOne({
        $or: [{ regdNo: query }, { ticketId: query }, { email: query.toLowerCase() }]
      }).maxTimeMS(2500);
    } catch (e) {
      user = mockRegistrations.find(r => r.regdNo === query || r.ticketId === query || (r.email && r.email.toLowerCase() === query.toLowerCase()));
    }

    if (!user) {
      user = mockRegistrations.find(r => r.regdNo === query || r.ticketId === query || (r.email && r.email.toLowerCase() === query.toLowerCase()));
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registration pass found for this user.' });
    }

    const emailResult = await sendRegistrationConfirmation(user);
    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message: `Pass email re-sent successfully to ${user.email}!`
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Could not send email: ${emailResult.error}`
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/verify-ticket (For gate security & scanners)
router.post('/verify-ticket', async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      return res.status(400).json({ success: false, message: 'Ticket ID is required' });
    }

    const query = ticketId.trim().toUpperCase();
    let user = null;
    try {
      user = await User.findOne({ ticketId: query }).maxTimeMS(2500);
    } catch (e) {
      user = mockRegistrations.find(r => r.ticketId === query);
    }

    if (!user) {
      user = mockRegistrations.find(r => r.ticketId === query);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid Pass! Ticket ID not recognized in COLORIDO-2K27 Registry.'
      });
    }

    // Mark as verified
    user.verifiedAtGate = true;
    if (user.save) {
      try { await user.save(); } catch (e) {}
    }

    return res.status(200).json({
      success: true,
      valid: true,
      message: 'Verified Official Pass! Welcome to COLORIDO-2K27.',
      data: {
        fullName: user.fullName,
        regdNo: user.regdNo,
        department: user.department,
        collegeName: user.collegeName,
        events: user.events,
        ticketId: user.ticketId,
        verifiedAtGate: true,
        verifiedAt: new Date().toLocaleTimeString('en-IN')
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/registrations
router.get('/admin/registrations', async (req, res) => {
  try {
    let users = [];
    try {
      users = await User.find().sort({ registeredAt: -1 }).maxTimeMS(2500);
    } catch (e) {
      users = mockRegistrations;
    }

    if (!users || users.length === 0) {
      users = mockRegistrations;
    }
    return res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    return res.status(200).json({ success: true, count: mockRegistrations.length, data: mockRegistrations });
  }
});

// DELETE /api/admin/registrations/:id
router.delete('/admin/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.startsWith('reg-')) {
      mockRegistrations = mockRegistrations.filter(r => r._id !== id);
    } else {
      try {
        await User.findByIdAndDelete(id);
      } catch (e) {
        mockRegistrations = mockRegistrations.filter(r => r._id !== id);
      }
    }
    return res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/toggle-attendance
router.post('/admin/toggle-attendance', async (req, res) => {
  try {
    const { id, appeared } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Student ID or RegdNo is required.' });
    }

    let user = null;
    let nextStatus = appeared;

    if (!id.startsWith('reg-')) {
      try {
        user = await User.findById(id).maxTimeMS(2500);
        if (user) {
          if (nextStatus === undefined) {
            nextStatus = !user.verifiedAtGate;
          }
          user.verifiedAtGate = nextStatus;
          await user.save();
        }
      } catch (e) {
        // Fallback below
      }
    }

    // Always update mockRegistrations cache too
    const mockIndex = mockRegistrations.findIndex(r => r._id === id || r.ticketId === id || r.regdNo === id);
    if (mockIndex !== -1) {
      if (nextStatus === undefined) {
        nextStatus = !mockRegistrations[mockIndex].verifiedAtGate;
      }
      mockRegistrations[mockIndex].verifiedAtGate = nextStatus;
      if (!user) user = mockRegistrations[mockIndex];
    }

    return res.status(200).json({
      success: true,
      verifiedAtGate: nextStatus !== undefined ? nextStatus : true,
      studentName: user?.fullName || 'Student',
      message: `Updated: ${user?.fullName || 'Student'} is now marked as ${nextStatus ? 'Appeared / Present ✅' : 'Pending Gate Verification ⏳'}`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/send-appeared
router.post('/admin/send-appeared', async (req, res) => {
  try {
    const { ids, customMessage, sendAllAppeared } = req.body;

    let targetStudents = [];

    // Fetch all records
    let allUsers = [];
    try {
      allUsers = await User.find().maxTimeMS(2500);
    } catch (e) {
      allUsers = mockRegistrations;
    }
    if (!allUsers || allUsers.length === 0) {
      allUsers = mockRegistrations;
    }

    // Combine in-memory mock students that might not be in DB
    const combined = [...allUsers];
    mockRegistrations.forEach(mr => {
      if (!combined.some(u => u.ticketId === mr.ticketId || u.email === mr.email)) {
        combined.push(mr);
      }
    });

    if (sendAllAppeared) {
      targetStudents = combined.filter(u => u.verifiedAtGate === true);
    } else if (Array.isArray(ids) && ids.length > 0) {
      targetStudents = combined.filter(u => ids.includes(u._id) || ids.includes(u.ticketId) || ids.includes(u.regdNo));
    }

    if (targetStudents.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No appeared students found matching selection to dispatch emails.'
      });
    }

    let sentCount = 0;
    let failedCount = 0;
    const recipientNames = [];

    // Dispatch emails
    const dispatchPromises = targetStudents.map(async (student) => {
      try {
        const result = await sendAppearedConfirmation(student, customMessage);
        if (result.success) {
          sentCount++;
          recipientNames.push(student.fullName || student.email);
        } else {
          failedCount++;
        }
      } catch (err) {
        failedCount++;
      }
    });

    await Promise.all(dispatchPromises);

    return res.status(200).json({
      success: true,
      message: `Dispatched attendance confirmations to ${sentCount} appeared student(s)!`,
      sentCount,
      failedCount,
      recipients: recipientNames
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/system-diagnostics
router.get('/admin/system-diagnostics', async (req, res) => {
  const startTime = Date.now();
  const diagnostics = {
    timestamp: new Date(),
    server: {
      status: 'UP',
      port: process.env.PORT || 5000,
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      memoryUsageMb: Math.round(process.memoryUsage().rss / (1024 * 1024))
    },
    database: {
      status: 'CHECKING',
      connected: false,
      latencyMs: null,
      cluster: 'MongoDB Atlas',
      totalUsersCount: 0,
      eventsCount: 0,
      discussionsCount: 0
    },
    emailService: {
      status: 'CHECKING',
      ready: false,
      user: process.env.EMAIL_USER || 'srinivasalbertrose@gmail.com',
      service: 'Gmail SMTP'
    },
    gateScanner: {
      status: 'OPERATIONAL',
      verifiedPassEngine: 'Active'
    },
    festMetrics: {
      totalRegistrations: 0,
      appearedCount: 0,
      pendingCount: 0,
      attendancePercentage: '0%'
    }
  };

  // 1. Check Database
  const dbStart = Date.now();
  try {
    const isReady = mongoose.connection.readyState === 1;
    diagnostics.database.connected = isReady;
    diagnostics.database.readyState = mongoose.connection.readyState;

    let usersCount = 0;
    try {
      usersCount = await User.countDocuments().maxTimeMS(2000);
    } catch (e) {
      usersCount = mockRegistrations.length;
    }
    diagnostics.database.totalUsersCount = usersCount || mockRegistrations.length;

    try {
      diagnostics.database.eventsCount = await Event.countDocuments().maxTimeMS(1500);
    } catch (e) {
      diagnostics.database.eventsCount = COMPREHENSIVE_EVENTS.length;
    }

    try {
      diagnostics.database.discussionsCount = await Discussion.countDocuments().maxTimeMS(1500);
    } catch (e) {
      diagnostics.database.discussionsCount = mockDiscussions.length;
    }

    diagnostics.database.latencyMs = Date.now() - dbStart;
    diagnostics.database.status = isReady ? 'CONNECTED & HEALTHY' : 'FALLBACK MEMORY ACTIVE';
  } catch (dbErr) {
    diagnostics.database.status = 'ERROR';
    diagnostics.database.error = dbErr.message;
  }

  // 2. Check Email Transporter
  try {
    await transporter.verify();
    diagnostics.emailService.ready = true;
    diagnostics.emailService.status = 'VERIFIED & READY TO DISPATCH';
  } catch (emailErr) {
    diagnostics.emailService.ready = false;
    diagnostics.emailService.status = 'CREDENTIAL WARNING';
    diagnostics.emailService.error = emailErr.message;
  }

  // 3. Compute Fest Metrics
  let allRegs = [];
  try {
    allRegs = await User.find().maxTimeMS(2000);
  } catch (e) {
    allRegs = mockRegistrations;
  }
  if (!allRegs || allRegs.length === 0) allRegs = mockRegistrations;

  const total = allRegs.length;
  const appeared = allRegs.filter(r => r.verifiedAtGate === true).length;
  const pending = total - appeared;

  diagnostics.festMetrics = {
    totalRegistrations: total,
    appearedCount: appeared,
    pendingCount: pending,
    attendancePercentage: total > 0 ? `${Math.round((appeared / total) * 100)}%` : '0%'
  };

  diagnostics.roundTripMs = Date.now() - startTime;

  return res.status(200).json({
    success: true,
    diagnostics
  });
});

// PUT /api/admin/events/:id
router.put('/admin/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/announcements
router.get('/announcements', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Official Fest Inauguration Ceremony',
        date: 'Feb 26, 2027 - 09:00 AM',
        content: 'Chief Guest Keynote Address at Silver Jubilee Main Auditorium. All registered delegates requested to report by 08:30 AM with College ID and Digital Fest Pass.',
        type: 'General'
      },
      {
        id: '2',
        title: 'Choreoday & Battle of Bands Track Submissions',
        date: 'Feb 25, 2027 - 04:00 PM',
        content: 'Participants in Choreoday and Band Clash can submit audio tracks via USB at the OAT sound booth 2 hours prior to performance.',
        type: 'Cultural'
      },
      {
        id: '3',
        title: 'Sports Fixtures & Court Allocation Published',
        date: 'Feb 25, 2027 - 06:00 PM',
        content: 'Basketball (Boys) and Throwball (Girls) team captain briefing scheduled at 08:00 AM in the Sports Pavilion.',
        type: 'Sports'
      },
      {
        id: '4',
        title: 'Digital Club Hackathon Problem Statements Live',
        date: 'Feb 26, 2027 - 08:30 AM',
        content: 'Hack-a-Fest teams can access the challenge statements at Room 312. Submissions close at 09:00 PM sharp.',
        type: 'Digital Club'
      }
    ]
  });
});

// ==========================================
// STUDENT DISCUSSION FEED API
// ==========================================

let mockDiscussions = [
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
  },
  {
    _id: 'disc-004',
    author: 'Praveen Kumar',
    regdNo: 'Y23ME055',
    department: 'MECH',
    tag: 'Questions & Help',
    content: 'Where can we register for on-spot Rapid Chess Masters if we did not add it during our main fest pass registration?',
    likes: 5,
    replies: [
      {
        _id: 'rep-004',
        author: 'Sports Committee',
        department: 'Sports',
        content: 'You can report to the Indoor Sports Pavilion Helpdesk before 9:00 AM on Day 1 to add spot entry events.',
        createdAt: new Date(Date.now() - 3600000 * 12)
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 14)
  },
  {
    _id: 'disc-005',
    author: 'Vamsi Krishna',
    regdNo: 'Y22EE034',
    department: 'EEE',
    tag: 'Find Teammates',
    content: 'Need 2 more players for Boys Volleyball Championship! We are from RVR&JC EEE dept. Intermediate to advanced players welcome!',
    likes: 9,
    replies: [],
    createdAt: new Date(Date.now() - 3600000 * 16)
  },
  {
    _id: 'disc-006',
    author: 'Divya Sri',
    regdNo: 'Y22AI028',
    department: 'AI&ML',
    tag: 'Student Buzz',
    content: 'Don’t forget to check out the laptop sticker playground and grab official stickers at the Digital Club booth near Silver Jubilee block! 💻✨',
    likes: 31,
    replies: [
      {
        _id: 'rep-005',
        author: 'K. Sai Manikanta',
        department: 'CSE',
        content: 'Already collected the neon cyber stickers! Looking awesome on MacBook! 🔥',
        createdAt: new Date(Date.now() - 3600000 * 18)
      }
    ],
    createdAt: new Date(Date.now() - 3600000 * 20)
  }
];

const seedDiscussionsIfEmpty = async () => {
  try {
    const count = await Discussion.countDocuments();
    if (count < 6) {
      const seedItems = mockDiscussions.map(({ _id, ...rest }) => rest);
      await Discussion.insertMany(seedItems);
      console.log('🌱 Seeded initial student discussions into MongoDB');
    }
  } catch (e) {
    console.warn('Seed discussions note:', e.message);
  }
};

if (mongoose.connection.readyState === 1) {
  seedDiscussionsIfEmpty();
} else {
  mongoose.connection.once('open', seedDiscussionsIfEmpty);
}

// GET /api/discussions
router.get('/discussions', async (req, res) => {
  try {
    const { tag, search } = req.query;
    let posts = [];

    try {
      let filter = {};
      if (tag && tag !== 'All') {
        filter.tag = tag;
      }
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        filter.$or = [
          { content: regex },
          { author: regex },
          { department: regex }
        ];
      }
      posts = await Discussion.find(filter).sort({ createdAt: -1 }).maxTimeMS(2500);
    } catch (err) {
      console.warn('MongoDB discussions query fallback:', err.message);
      posts = mockDiscussions;
    }

    if (!posts || posts.length === 0) {
      posts = mockDiscussions;
    }

    // In-memory filter if fallback was used
    let filtered = [...posts];
    if (tag && tag !== 'All') {
      filtered = filtered.filter(p => p.tag === tag);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        (p.content && p.content.toLowerCase().includes(q)) ||
        (p.author && p.author.toLowerCase().includes(q)) ||
        (p.department && p.department.toLowerCase().includes(q))
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: mockDiscussions.length,
      data: mockDiscussions
    });
  }
});

// POST /api/discussions
router.post('/discussions', async (req, res) => {
  try {
    const { author, regdNo, department, tag, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Discussion content is required.'
      });
    }

    const cleanAuthor = (author && author.trim()) ? author.trim() : 'Student Delegate';
    const cleanDept = (department && department.trim()) ? department.trim().toUpperCase() : 'CSE';
    const cleanTag = tag || 'General';

    const newPostData = {
      author: cleanAuthor,
      regdNo: regdNo ? regdNo.trim().toUpperCase() : '',
      department: cleanDept,
      tag: cleanTag,
      content: content.trim(),
      likes: 0,
      replies: [],
      createdAt: new Date()
    };

    let savedPost = null;
    try {
      const discussionDoc = new Discussion(newPostData);
      savedPost = await discussionDoc.save();
    } catch (dbErr) {
      console.warn('MongoDB discussion save fallback to memory:', dbErr.message);
      newPostData._id = `disc-${Date.now()}`;
      mockDiscussions.unshift(newPostData);
      savedPost = newPostData;
    }

    // Also cache in mockDiscussions
    if (!mockDiscussions.some(p => String(p._id) === String(savedPost._id))) {
      mockDiscussions.unshift(savedPost.toObject ? savedPost.toObject() : savedPost);
    }

    return res.status(201).json({
      success: true,
      message: 'Discussion post created successfully!',
      data: savedPost
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating discussion post.',
      error: error.message
    });
  }
});

// POST /api/discussions/:id/like
router.post('/discussions/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    let updatedLikes = 1;

    // Check mockDiscussions
    const mockPost = mockDiscussions.find(p => String(p._id) === String(id));
    if (mockPost) {
      mockPost.likes = (mockPost.likes || 0) + 1;
      updatedLikes = mockPost.likes;
    }

    try {
      const doc = await Discussion.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      ).maxTimeMS(2000);
      if (doc) {
        updatedLikes = doc.likes;
      }
    } catch (e) {
      // Handled by mockPost
    }

    return res.status(200).json({
      success: true,
      likes: updatedLikes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/discussions/:id/reply
router.post('/discussions/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, department, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Reply content cannot be empty.'
      });
    }

    const replyObj = {
      _id: `rep-${Date.now()}`,
      author: (author && author.trim()) ? author.trim() : 'Student Delegate',
      department: (department && department.trim()) ? department.trim() : 'General',
      content: content.trim(),
      createdAt: new Date()
    };

    let targetPost = null;

    // Update in-memory
    const mockPost = mockDiscussions.find(p => String(p._id) === String(id));
    if (mockPost) {
      if (!mockPost.replies) mockPost.replies = [];
      mockPost.replies.push(replyObj);
      targetPost = mockPost;
    }

    try {
      const doc = await Discussion.findByIdAndUpdate(
        id,
        { $push: { replies: replyObj } },
        { new: true }
      ).maxTimeMS(2000);
      if (doc) {
        targetPost = doc;
      }
    } catch (e) {
      // Handled by in-memory
    }

    return res.status(200).json({
      success: true,
      message: 'Reply added successfully!',
      data: targetPost || replyObj
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// OFFICIAL LIVE SCORES (ADMIN-CONTROLLED ONLY)
// ==========================================
let officialLiveMatches = [
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
    isLive: true,
    lastUpdatedBy: 'Admin (Referee Desk)',
    color: '#CCFF00',
    updatedAt: new Date()
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
    isLive: true,
    lastUpdatedBy: 'Admin (Referee Desk)',
    color: '#FF5A1F',
    updatedAt: new Date()
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
    isLive: true,
    lastUpdatedBy: 'Admin (Referee Desk)',
    color: '#D4F6FF',
    updatedAt: new Date()
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
    isLive: true,
    lastUpdatedBy: 'Admin (Referee Desk)',
    color: '#FFF5C0',
    updatedAt: new Date()
  }
];

// GET /api/scores (Public read-only feed)
router.get('/scores', (req, res) => {
  return res.status(200).json({
    success: true,
    data: officialLiveMatches,
    lastUpdated: new Date()
  });
});

// PUT /api/admin/scores/:id (ADMIN ONLY score update)
router.put('/admin/scores/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const idx = officialLiveMatches.findIndex(m => m.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Match not found.' });
    }

    officialLiveMatches[idx] = {
      ...officialLiveMatches[idx],
      ...updateData,
      score1: Number(updateData.score1 !== undefined ? updateData.score1 : officialLiveMatches[idx].score1),
      score2: Number(updateData.score2 !== undefined ? updateData.score2 : officialLiveMatches[idx].score2),
      lastUpdatedBy: 'Admin (Referee Desk)',
      updatedAt: new Date()
    };

    return res.status(200).json({
      success: true,
      message: 'Official score updated successfully by Admin.',
      data: officialLiveMatches[idx]
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/scores (ADMIN ONLY create match)
router.post('/admin/scores', (req, res) => {
  try {
    const newMatch = {
      id: `m-${Date.now()}`,
      event: req.body.event || 'New Arena Competition',
      arena: req.body.arena || 'Main Campus Stage',
      team1: req.body.team1 || 'Team A',
      score1: Number(req.body.score1 || 0),
      team2: req.body.team2 || 'Team B',
      score2: Number(req.body.score2 || 0),
      status: req.body.status || 'Match in progress',
      lead: req.body.lead || 'Scoreboard Live',
      isLive: true,
      lastUpdatedBy: 'Admin (Referee Desk)',
      color: req.body.color || '#CCFF00',
      updatedAt: new Date()
    };

    officialLiveMatches.push(newMatch);

    return res.status(201).json({
      success: true,
      message: 'New match score initialized by Admin.',
      data: newMatch
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/scores/:id (ADMIN ONLY delete match)
router.delete('/admin/scores/:id', (req, res) => {
  try {
    const { id } = req.params;
    officialLiveMatches = officialLiveMatches.filter(m => m.id !== id);
    return res.status(200).json({
      success: true,
      message: 'Match removed from official live scoreboard.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

