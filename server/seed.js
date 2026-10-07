const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Event = require('./models/Event');
const connectDB = require('./config/db');

const COMPREHENSIVE_EVENTS = [
  // ==========================================
  // --- CULTURAL EVENTS ---
  // ==========================================
  {
    title: 'Choreoday (Theme Based Mega Dance)',
    section: 'Cultural',
    category: 'Choreoday',
    genderCategory: 'All',
    venue: 'Open Air Theatre (OAT Main Stage)',
    date: 'Day 2 - Feb 27, 2027',
    timing: '06:00 PM - 09:30 PM',
    prizes: {
      team: { first: '₹15,000', second: '₹10,000', third: '₹6,000' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'The premier flagship theme-based synchronized dance spectacle under multi-stop laser arrays with dynamic lighting and professional sound engineering.',
    rules: [
      'Each performance must convey a cohesive story, myth, or social awareness theme.',
      'Team squad size: 8 to 25 registered dancers per group.',
      'Time slot: 10 - 14 minutes including prop setup and clearance.',
      'Audio tracks must be submitted in 320kbps MP3 format via USB at the sound booth 2 hours prior.',
      'Judging criteria: Choreography innovation (30%), Theme expression (25%), Synchronization (25%), Costumes & Stage Presence (20%).'
    ],
    organizer: 'Choreoday Steering Committee & Cultural Wing',
    featured: true,
    iconName: 'Flame'
  },
  {
    title: 'Music & Band (Solo & Battle of Bands)',
    section: 'Cultural',
    category: 'Music & Band',
    genderCategory: 'All',
    venue: 'Silver Jubilee Main Auditorium',
    date: 'Day 2 - Feb 27, 2027',
    timing: '02:00 PM - 05:30 PM',
    prizes: {
      team: { first: '₹10,000', second: '₹6,000', third: '₹3,000' },
      solo: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
    },
    description: 'High-voltage vocal clashes and battle-of-the-bands across Classical Fusion, Rock, Pop, Telugu Folk, and Indie anthems.',
    rules: [
      'Solo time: 4 - 6 minutes; Band clash: 15 minutes total (3 mins soundcheck + 12 mins performance).',
      'Stage equipment provided: 5-piece acoustic drum kit, guitar/bass amplifiers, vocal microphones, DI boxes.',
      'Bands must bring their own guitars, keyboards, pedals, and drumsticks.',
      'Obscenity or vulgarity in lyrics results in immediate disqualification.'
    ],
    organizer: 'RVR & JC Music Club & ECA',
    featured: true,
    iconName: 'Mic'
  },
  {
    title: 'Dance Clash (Classical, Western & Folk)',
    section: 'Cultural',
    category: 'Dance',
    genderCategory: 'All',
    venue: 'Open Air Theatre (OAT Stage)',
    date: 'Day 1 - Feb 26, 2027',
    timing: '03:30 PM - 07:30 PM',
    prizes: {
      team: { first: '₹8,000', second: '₹5,000', third: '₹2,500' },
      solo: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
    },
    description: 'A dazzling showcase of rhythm, precision, and expressions across Kuchipudi/Bharatanatyam, Hip-Hop, Popping, and Indian Folk traditions.',
    rules: [
      'Solo performance: 3 - 5 mins; Duo / Group: 5 - 8 mins.',
      'Fire, water, glass, or dangerous props are strictly prohibited on stage.',
      'Costumes must adhere to academic institutional decency standards.',
      'Submissions judged on rhythm (Taal), bhavam, choreography, and footwork.'
    ],
    organizer: 'Dance Club RVR & JC',
    featured: true,
    iconName: 'Music'
  },
  {
    title: 'Fashion Show (Theme & Couture)',
    section: 'Cultural',
    category: 'Fashion Show',
    genderCategory: 'All',
    venue: 'Silver Jubilee Open Arena Stage',
    date: 'Day 2 - Feb 27, 2027',
    timing: '07:30 PM - 09:15 PM',
    prizes: {
      team: { first: '₹12,000', second: '₹7,500', third: '₹4,000' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'Ramp walk presentation celebrating ethnic heritage, cyber-punk elegance, and sustainable couture designed by student delegations.',
    rules: [
      'Approved Themes: Royal Indian Heritage, Cyberpunk 2077, or Eco-Friendly Sustainable Fashion.',
      'Team composition: 10 to 18 models plus 2 dressers/makeup coordinators.',
      'Stage time: 10 - 12 minutes per delegation.',
      'Judging parameters: Theme coherence, runway posture, costume originality, and synchronization.'
    ],
    organizer: 'Fashion & Styling Committee',
    featured: true,
    iconName: 'Sparkles'
  },
  {
    title: 'Fine Arts (Painting, Sketching & Rangoli)',
    section: 'Cultural',
    category: 'Fine Arts',
    genderCategory: 'All',
    venue: 'Fine Arts Studio & Gallery - Architecture Block',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:00 AM - 01:00 PM',
    prizes: {
      team: { first: '₹3,500', second: '₹2,000', third: '₹1,000' },
      solo: { first: '₹2,000', second: '₹1,200', third: '₹600' },
    },
    description: 'Express imaginative visions on canvas and floor space across acrylic painting, pencil shading, watercolor, and traditional rangoli art.',
    rules: [
      'Theme will be announced on-spot 15 minutes before competition start.',
      'Standard drawing charts provided; participants bring colors, brushes, and pallets.',
      'Duration: 2.5 hours strictly.',
      'No use of mobile phones or reference images during the event.'
    ],
    organizer: 'Cultural Fine Arts Society',
    featured: false,
    iconName: 'Sparkles'
  },
  {
    title: 'Dramatics (Skit, Mime & Mono Acting)',
    section: 'Cultural',
    category: 'Dramatics',
    genderCategory: 'All',
    venue: 'Decennial Seminar Hall 2',
    date: 'Day 1 - Feb 26, 2027',
    timing: '01:30 PM - 04:30 PM',
    prizes: {
      team: { first: '₹6,000', second: '₹3,500', third: '₹2,000' },
      solo: { first: '₹2,000', second: '₹1,000', third: '₹500' },
    },
    description: 'Theatrical skits, silent mime storytelling, and emotional mono-acting exploring societal satire and dramatic scripts.',
    rules: [
      'Medium: English, Telugu, or Silent (Mime).',
      'Team size: 4 to 10 actors. Solo limit: 5 minutes.',
      'Team skit limit: 10 - 12 minutes.',
      'Strictly no political disparagement or derogatory remarks.'
    ],
    organizer: 'Dramatics & Theater Society',
    featured: false,
    iconName: 'Sparkles'
  },
  {
    title: 'Tekraft (E-Waste Sculpting & Tech Art)',
    section: 'Cultural',
    category: 'Tekraft Events',
    genderCategory: 'All',
    venue: 'Central Innovation Workshop (Room 204)',
    date: 'Day 1 - Feb 26, 2027',
    timing: '11:00 AM - 02:00 PM',
    prizes: {
      team: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
      solo: { first: '₹1,500', second: '₹1,000', third: '₹500' },
    },
    description: 'Upcycle old motherboards, discarded electronic parts, cables, and scrap metal into creative tech installations.',
    rules: [
      'Scrap electronic components and adhesive materials provided on-spot.',
      'Participants may bring specialized hand tools if required.',
      'Judging: Ingenuity (35%), Aesthetic appeal (35%), Mechanical finishing (30%).'
    ],
    organizer: 'Tekraft & Makers Guild',
    featured: false,
    iconName: 'Cpu'
  },
  {
    title: 'Short Film Contest & Mobile Photography',
    section: 'Cultural',
    category: 'Media & Arts',
    genderCategory: 'All',
    venue: 'Digital Media Studio (CSE Block)',
    date: 'Day 2 - Feb 27, 2027',
    timing: '11:00 AM - 01:30 PM',
    prizes: {
      team: { first: '₹5,000', second: '₹3,000', third: '₹1,500' },
      solo: { first: '₹2,000', second: '₹1,000', third: '₹500' },
    },
    description: 'Screening of student-directed short movies (under 10 mins) and live campus photo exhibition capturing the spirit of COLORIDO.',
    rules: [
      'Short film duration: 5 to 10 minutes including titles.',
      'Original cinematography and copyright-free background music required.',
      'Photography submissions must include raw EXIF metadata.'
    ],
    organizer: 'Digital Media Club',
    featured: false,
    iconName: 'Globe'
  },
  {
    title: 'Literary Arena (Oxford Debate & Master Quiz)',
    section: 'Cultural',
    category: 'Literary',
    genderCategory: 'All',
    venue: 'Central Library Conference Hall',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:30 AM - 01:30 PM',
    prizes: {
      team: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
      solo: { first: '₹2,000', second: '₹1,000', third: '₹500' },
    },
    description: 'Spirited parliamentary debates on technology and society, paired with a general trivia and pop-culture buzzer quiz.',
    rules: [
      'Debate: 3 mins for constructive speeches, 1 min rebuttal, 1 min summary.',
      'Quiz: 25-question written prelims followed by top 6 teams live buzzer finals.'
    ],
    organizer: 'Literary & Debating Society',
    featured: false,
    iconName: 'Globe'
  },

  // ==========================================
  // --- SPORTS EVENTS (BOYS) ---
  // ==========================================
  {
    title: 'Basketball Championship (Boys)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Floodlit Basketball Arena - Sports Pavilion',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '08:30 AM onwards',
    prizes: {
      team: { first: '₹8,000', second: '₹5,000', third: '₹2,500' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'Inter-collegiate 5v5 full court basketball knockout tournament officiated under international FIBA standards.',
    rules: [
      'Knockout tournament format with 4 quarters of 10 minutes each.',
      'Squad size: 5 on-court + up to 7 rolling substitutes.',
      'Standard team jerseys with visible numbers and non-marking basketball shoes mandatory.',
      'Referee decisions are absolute and non-negotiable.'
    ],
    organizer: 'Department of Physical Education (Boys Wing)',
    featured: true,
    iconName: 'Trophy'
  },
  {
    title: 'Volleyball Championship (Boys)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Volleyball Arena - Court 1 & 2',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '09:00 AM onwards',
    prizes: {
      team: { first: '₹7,000', second: '₹4,500', third: '₹2,000' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: '6v6 outdoor smash volleyball championship played in best-of-3 sets of 25 points.',
    rules: [
      'Standard Volleyball Federation of India (VFI) regulations apply.',
      'Team size: 6 playing + 6 substitutes.',
      'Net height: 2.43 meters. Official Cosco tournament balls provided.'
    ],
    organizer: 'Department of Physical Education',
    featured: true,
    iconName: 'Trophy'
  },
  {
    title: 'Kabaddi Tournament (Boys)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Mud Arena Ground 3 - Sports Complex',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '09:30 AM onwards',
    prizes: {
      team: { first: '₹8,000', second: '₹5,000', third: '₹2,500' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'High-intensity traditional Pro-Kabaddi style clash on specialized prepared clay court.',
    rules: [
      'Weight restriction: Maximum 80 kg per player at official weigh-in.',
      'Match duration: Two halves of 20 minutes with a 5-minute halftime break.',
      'Pro-Kabaddi rules for bonus points and super tackles in effect.'
    ],
    organizer: 'RVR & JC Sports Board',
    featured: true,
    iconName: 'Trophy'
  },
  {
    title: 'Table Tennis Championship (Boys Singles & Doubles)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Indoor Sports Pavilion - Table Tennis Wing',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:00 AM - 04:30 PM',
    prizes: {
      team: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
      solo: { first: '₹2,000', second: '₹1,200', third: '₹600' },
    },
    description: 'Fast-paced spin table tennis championship played on ITTF-certified Stag tables and 40mm+ poly balls.',
    rules: [
      'Matches played in best of 5 games (11 points per game).',
      'Participants must bring their own ITTF-approved rubber bats.'
    ],
    organizer: 'Table Tennis Club RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },
  {
    title: 'Badminton Championship (Boys Singles & Doubles)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Indoor Badminton Stadium (Wooden Courts)',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '08:30 AM onwards',
    prizes: {
      team: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
      solo: { first: '₹2,500', second: '₹1,500', third: '₹800' },
    },
    description: 'High-intensity shuttle smash tournament on BWF standard synthetic wooden courts with Yonex feather shuttles.',
    rules: [
      'Best of 3 sets of 21 rally points (BWF rules).',
      'Non-marking gum-sole shoes strictly mandatory on wooden courts.'
    ],
    organizer: 'Badminton Association RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },
  {
    title: 'Rapid Chess Masters (Boys Open)',
    section: 'Sports',
    category: 'Boys Sports',
    genderCategory: 'Boys',
    venue: 'Chess Training Hall - Decennial Block',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:00 AM - 03:30 PM',
    prizes: {
      team: { first: '₹0', second: '₹0', third: '₹0' },
      solo: { first: '₹3,000', second: '₹1,800', third: '₹1,000' },
    },
    description: 'FIDE Swiss-system 5-round rapid chess championship with electronic chess clocks.',
    rules: [
      'Time control: 15 minutes + 5 seconds increment per move.',
      'Touch-move rule strictly observed.'
    ],
    organizer: 'Chess Club RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },

  // ==========================================
  // --- SPORTS EVENTS (GIRLS) ---
  // ==========================================
  {
    title: 'Throwball Championship (Girls)',
    section: 'Sports',
    category: 'Girls Sports',
    genderCategory: 'Girls',
    venue: 'Athletic Sports Complex (Girls Arena)',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '09:00 AM onwards',
    prizes: {
      team: { first: '₹8,000', second: '₹5,000', third: '₹2,500' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'Speed, reflex, and team synchronization throwball tournament for women collegiate delegations.',
    rules: [
      '7 active court players + 5 substitutes per team.',
      'Matches played in best of 3 sets of 25 points.',
      'Strict compliance with Throwball Federation of India service and rotation rules.'
    ],
    organizer: 'Department of Physical Education (Women Wing)',
    featured: true,
    iconName: 'Trophy'
  },
  {
    title: 'TenniKoit Tournament (Girls Singles & Doubles)',
    section: 'Sports',
    category: 'Girls Sports',
    genderCategory: 'Girls',
    venue: 'TenniKoit Outdoor Arena - Courts A & B',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:00 AM - 03:00 PM',
    prizes: {
      team: { first: '₹3,500', second: '₹2,000', third: '₹1,000' },
      solo: { first: '₹2,000', second: '₹1,200', third: '₹600' },
    },
    description: 'Precision ring tennikoit competition featuring lightning-fast hand-eye coordination over the high net.',
    rules: [
      'Best of 3 sets of 21 points.',
      'Official regulation foam rings provided.',
      'Ring must be caught cleanly with one hand and released immediately without body contact.'
    ],
    organizer: 'Women Sports Committee',
    featured: false,
    iconName: 'Trophy'
  },
  {
    title: 'Table Tennis Championship (Girls Singles & Doubles)',
    section: 'Sports',
    category: 'Girls Sports',
    genderCategory: 'Girls',
    venue: 'Indoor Sports Pavilion (Girls Wing)',
    date: 'Day 1 - Feb 26, 2027',
    timing: '11:00 AM - 04:00 PM',
    prizes: {
      team: { first: '₹3,000', second: '₹2,000', third: '₹1,000' },
      solo: { first: '₹2,000', second: '₹1,200', third: '₹600' },
    },
    description: 'Singles and doubles table tennis clash for collegiate women athletes.',
    rules: [
      'Best of 5 sets of 11 points.',
      'ITTF equipment and rules apply.'
    ],
    organizer: 'Table Tennis Club RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },
  {
    title: 'Badminton Championship (Girls Singles & Doubles)',
    section: 'Sports',
    category: 'Girls Sports',
    genderCategory: 'Girls',
    venue: 'Indoor Badminton Stadium (Girls Court)',
    date: 'Day 1 & Day 2 - Feb 26-27, 2027',
    timing: '09:00 AM onwards',
    prizes: {
      team: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
      solo: { first: '₹2,500', second: '₹1,500', third: '₹800' },
    },
    description: 'Women badminton championship across singles and doubles categories with high-speed shuttle rallies.',
    rules: [
      'Matches played best of 3 sets of 21 points.',
      'Yonex feather shuttles provided.'
    ],
    organizer: 'Badminton Association RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },
  {
    title: 'Rapid Chess Masters (Girls Open)',
    section: 'Sports',
    category: 'Girls Sports',
    genderCategory: 'Girls',
    venue: 'Chess Training Hall - Decennial Block',
    date: 'Day 1 - Feb 26, 2027',
    timing: '10:00 AM - 03:30 PM',
    prizes: {
      team: { first: '₹0', second: '₹0', third: '₹0' },
      solo: { first: '₹3,000', second: '₹1,800', third: '₹1,000' },
    },
    description: 'Rapid chess championship for female strategists using FIDE Swiss system pairing.',
    rules: [
      '15 minutes + 5 seconds increment per move.',
      'Electronic digital clocks utilized.'
    ],
    organizer: 'Chess Club RVR & JC',
    featured: false,
    iconName: 'Trophy'
  },

  // ==========================================
  // --- DIGITAL CLUB & TECH INNOVATION ---
  // ==========================================
  {
    title: 'Hack-a-Fest: 12-Hour Web & AI Hackathon',
    section: 'Digital Club',
    category: 'Digital Club',
    genderCategory: 'All',
    venue: 'Advanced AI & Cloud Computing Lab (Room 312)',
    date: 'Day 1 - Feb 26, 2027',
    timing: '09:00 AM - 09:00 PM',
    prizes: {
      team: { first: '₹10,000', second: '₹6,000', third: '₹3,000' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'Build production-ready web apps or AI agents solving real campus, healthcare, or sustainability challenges within 12 hours.',
    rules: [
      'Team size: 2 to 4 developers.',
      'Problem statements released at 08:30 AM on Day 1.',
      'All code must be committed to public GitHub repository with regular commits.',
      'Evaluation: Tech stack depth (30%), Practical utility (25%), UI/UX Design (25%), Live pitch (20%).'
    ],
    organizer: 'Digital Club & IEEE Student Branch',
    featured: true,
    iconName: 'Cpu'
  },
  {
    title: 'UI/UX Design Sprint (Figma Championship)',
    section: 'Digital Club',
    category: 'Digital Club',
    genderCategory: 'All',
    venue: 'Software Engineering CAD Lab 1',
    date: 'Day 2 - Feb 27, 2027',
    timing: '10:00 AM - 01:00 PM',
    prizes: {
      team: { first: '₹4,000', second: '₹2,500', third: '₹1,500' },
      solo: { first: '₹2,500', second: '₹1,500', third: '₹800' },
    },
    description: 'Design sleek, accessible mobile and web design systems on Figma inspired by Mobbin, Linear, and modern glassmorphism.',
    rules: [
      'Live prompt given at the start of the 3-hour sprint.',
      'Participants must submit an interactive Figma prototype link.',
      'Judging on visual hierarchy, accessibility, component reusability, and micro-interactions.'
    ],
    organizer: 'Digital Club Design Wing',
    featured: true,
    iconName: 'Sparkles'
  },
  {
    title: 'Cyber Hunt (Crypto & CTF Challenge)',
    section: 'Digital Club',
    category: 'Digital Club',
    genderCategory: 'All',
    venue: 'Cyber Security Lab (CSE Department)',
    date: 'Day 2 - Feb 27, 2027',
    timing: '02:00 PM - 05:00 PM',
    prizes: {
      team: { first: '₹5,000', second: '₹3,000', third: '₹1,500' },
      solo: { first: '₹2,000', second: '₹1,000', third: '₹500' },
    },
    description: 'Jeopardy-style Capture The Flag covering web exploitation, cryptography, reverse engineering, and digital forensics.',
    rules: [
      'Team size: Up to 2 members.',
      'Scoring: Dynamic points per flag captured.',
      'Strict prohibition against DDoS or attacking event infrastructure.'
    ],
    organizer: 'Digital Club & CSI Chapter',
    featured: false,
    iconName: 'ShieldCheck'
  },
  {
    title: 'E-Sports Arena (BGMI & FreeFire Clashes)',
    section: 'Digital Club',
    category: 'Digital Club',
    genderCategory: 'All',
    venue: 'E-Sports Gaming Arena (Seminar Hall 1)',
    date: 'Day 2 - Feb 27, 2027',
    timing: '01:30 PM - 06:00 PM',
    prizes: {
      team: { first: '₹6,000', second: '₹4,000', third: '₹2,000' },
      solo: { first: '₹0', second: '₹0', third: '₹0' },
    },
    description: 'Battle Royale esports tournament with live projection screen commentary and spectator arena.',
    rules: [
      'Squad matches: 4 players per squad.',
      'Emulators, triggers, and iPad devices are strictly banned. Mobile phones only.',
      'Custom room credentials shared 10 minutes prior.'
    ],
    organizer: 'Digital Club Gaming Wing',
    featured: true,
    iconName: 'Flame'
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('🔄 Connected to MongoDB. Seeding detailed COLORIDO-2K27 events...');
    
    // Clear old events
    await Event.deleteMany({});
    console.log('🗑️ Removed outdated event records.');

    // Insert enriched events
    const inserted = await Event.insertMany(COMPREHENSIVE_EVENTS);
    console.log(`✅ Successfully seeded ${inserted.length} official COLORIDO-2K27 events with rich cash prizes & rules!`);
    
    let totalCashPrize = 0;
    inserted.forEach(ev => {
      const p1 = parseInt((ev.prizes?.team?.first || '0').replace(/[^0-9]/g, '')) || 0;
      const p2 = parseInt((ev.prizes?.team?.second || '0').replace(/[^0-9]/g, '')) || 0;
      const p3 = parseInt((ev.prizes?.team?.third || '0').replace(/[^0-9]/g, '')) || 0;
      const s1 = parseInt((ev.prizes?.solo?.first || '0').replace(/[^0-9]/g, '')) || 0;
      totalCashPrize += (p1 + p2 + p3 + s1);
    });

    console.log(`💰 Verified Total Cash Prize Pool: ₹${totalCashPrize.toLocaleString('en-IN')}+`);
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { COMPREHENSIVE_EVENTS };
