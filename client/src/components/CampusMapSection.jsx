import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Navigation, Compass, Shield, Users, Layers, ExternalLink, 
  CheckCircle2, Box, Globe, RotateCw, Sparkles, Move3d, Loader2, 
  Flag, Award, Info, ChevronRight, School, Utensils, Trophy, Laptop, Radio
} from 'lucide-react';
import ThreeCampusViewer from './ThreeCampusViewer';

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/ij6GqxZnJShXEqTq8";
const GOOGLE_MAPS_3D_URL = "https://www.google.com/maps/@16.2559568,80.3253252,380m/data=!3m1!1e3";
const GOOGLE_EARTH_3D_URL = "https://earth.google.com/web/search/R.V.R.+%26+J.C.+College+of+Engineering/@16.2559568,80.3253252,45a,750d,35y,-20h,58t,0r";
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.435759714853!2d80.32313627490656!3d16.255956784451034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a755d28b087bd%3A0xb304b5003eb8b22a!2sR.V.R.%20%26%20J.C.%20College%20of%20Engineering!5e1!3m2!1sen!2sin!4v1711800000000!5m2!1sen!2sin";

export const CAMPUS_BLOCKS = [
  {
    id: 'main-gate',
    name: 'Main Arch Gate & Checkpoint',
    shortName: 'Main Arch Gate',
    zone: 'main-axis',
    zoneLabel: 'Campus Entry & Main Axis',
    type: 'Entry Portal & Security',
    landmark: 'Highway entrance • Parking on immediate right',
    capacity: 'Delegate Check-in Gate',
    events: ['Security Frisking', 'Fest ID Verification', 'Visitor & Two-Wheeler Parking'],
    rules: ['Digital QR Pass must be ready at barrier.', 'Parking marshals direct two-wheelers and buses to the right.'],
    description: 'The monumental grand entrance archway of R.V.R. & J.C. College of Engineering. Parking is immediately to your right upon entry, with the expansive sports grounds on your left.',
    image: '/images/rvrjc_campus_main_building.jpg',
    cardBg: '#CCFF00',
    color3d: 'bg-[#CCFF00] text-[#121212]',
    height3d: 'h-16',
    specialVisual: 'gate-arch',
    badges: ['Entry Point', 'Parking Right'],
    coordText: 'Zone A • South Boundary'
  },
  {
    id: 'main-block',
    name: 'Main Administrative Block (EEE & Admissions)',
    shortName: 'Main Admin Block',
    zone: 'main-axis',
    zoneLabel: 'Campus Entry & Main Axis',
    type: 'Administrative Headquarters & EEE',
    landmark: 'Located straight ahead from Main Gate',
    capacity: 'Principal Wing & 4 Academic Floors',
    events: ['Central Fest Helpdesk', 'Faculty Coordination Desk', 'Honorary Guest Reception'],
    rules: ['Visitor sign-in at administrative reception.', 'Official quiet zone on second floor.'],
    description: 'The flagship central building of RVR&JC, located straight ahead as you drive through the main gate. Features stately entrance pillars, red fascia banner, and the proud Indian national flag atop the rooftop emblem.',
    image: '/images/rvrjc_main_block_facade.png',
    cardBg: '#FFE500',
    color3d: 'bg-[#FFE500] text-[#121212]',
    height3d: 'h-24',
    specialVisual: 'admin-columns',
    badges: ['Indian Flag', 'Principal Wing', 'EEE Dept'],
    coordText: 'Zone A • Central Axis'
  },
  {
    id: 'library',
    name: 'Central Library Block',
    shortName: 'Central Library',
    zone: 'main-axis',
    zoneLabel: 'Campus Entry & Main Axis',
    type: 'Knowledge Resource Hub',
    landmark: 'Immediately adjacent to Main Block',
    capacity: '3 Floors • 1,00,000+ Volumes',
    events: ['Quiz Prelims (Digital)', 'Technical Paper Presentations', 'Quiet Study & Media Center'],
    rules: ['Digital barcode scan at turnstile entrance.', 'Quiet reading protocols strictly enforced.'],
    description: 'A 3-floor intellectual powerhouse situated right beside the Main Block. Houses comprehensive IEEE digital suites, reference archives, and automated circulation desks.',
    image: '/images/rvrjc_main_block_facade.png',
    cardBg: '#D4F6FF',
    color3d: 'bg-[#D4F6FF] text-[#121212]',
    height3d: 'h-22',
    specialVisual: 'library-stack',
    badges: ['3 Floors', 'DELNET / IEEE'],
    coordText: 'Zone A • Adjacent Admin'
  },
  {
    id: 'oat',
    name: 'Open Air Theatre (OAT Amphitheater)',
    shortName: 'Open Air Theatre (OAT)',
    zone: 'tech-hub',
    zoneLabel: 'North-Central Tech & Cultural Hub',
    type: 'Mega Cultural Amphitheater',
    landmark: 'Located just past the Main Block',
    capacity: '3,500+ Spectators',
    events: ['Choreoday (Theme Dance)', 'Battle of Bands', 'Grand Valedictory', 'EDM Celebration'],
    rules: ['Festival wristband required at stage ramps.', 'Follow security marshals during high-decibel performances.'],
    description: 'The monumental outdoor cultural bowl of RVR&JC, situated just past the Main Block. Features tiered semicircular seating, multi-array stage lighting, and world-class concert audio systems.',
    image: '/images/annual_day_celebration.png',
    cardBg: '#FF5A1F',
    color3d: 'bg-[#FF5A1F] text-white',
    height3d: 'h-28',
    specialVisual: 'oat-bowl',
    badges: ['3,500+ Seats', 'Flagship Stage'],
    coordText: 'Zone B • North-Central'
  },
  {
    id: 'hitech-block',
    name: 'High-Tech Block (MCA, CSM & IT)',
    shortName: 'Hi-Tech Block',
    zone: 'tech-hub',
    zoneLabel: 'North-Central Tech & Cultural Hub',
    type: 'Computer Science & Software Labs',
    landmark: 'Directly behind OAT • Stationery store nearby',
    capacity: '12 Advanced Software Labs',
    events: ['Prototype Sprint Challenge', 'Speed Coding Odyssey', 'UI/UX Hackathon'],
    rules: ['Proxy credentials distributed on-spot.', 'Stationery & photocopy shop located at ground level.'],
    description: 'Positioned directly behind the Open-Air Theatre. Distinguished by its monumental ochre-colored portico arch boldly inscribed with "HI TECH BLOCK" and broad driveway underpass.',
    image: '/images/rvrjc_hitech_block.png',
    cardBg: '#FEE7EA',
    color3d: 'bg-[#FEE7EA] text-[#5C1D24]',
    height3d: 'h-24',
    specialVisual: 'hitech-arch',
    badges: ['IT & CSM Hub', '12 Labs'],
    coordText: 'Zone B • Behind OAT'
  },
  {
    id: 'digital-block',
    name: 'Digital Block (ECE & Communications)',
    shortName: 'Digital Block (Red Dome)',
    zone: 'tech-hub',
    zoneLabel: 'North-Central Tech & Cultural Hub',
    type: 'Electronics, VLSI & Robotics Hub',
    landmark: 'Between Hi-Tech Block and Cyber Block',
    capacity: '4 Floors • Microprocessor Suites',
    events: ['Robotics Maze Solver', 'Drone Obstacle Run', 'Circuit Debugging', 'IoT Sensor Expo'],
    rules: ['Safety goggles mandatory in soldering bays.', 'Drone takeoff restricted to designated test enclosures.'],
    description: 'Iconic campus landmark located straight between the Hi-Tech and Cyber Blocks. Crowned by a glorious terracotta-red rooftop dome, towering telecommunications antenna mast, and elegant arched verandahs.',
    image: '/images/rvrjc_digital_block.png',
    cardBg: '#FFE500',
    color3d: 'bg-[#FFE500] text-[#121212]',
    height3d: 'h-26',
    specialVisual: 'red-dome',
    badges: ['Red Dome', 'Antenna Mast', 'ECE Wing'],
    coordText: 'Zone B • Center Spine'
  },
  {
    id: 'cyber-block',
    name: 'Cyber Block (Data Science, CSE & Research)',
    shortName: 'Cyber Block (Roundabout)',
    zone: 'tech-hub',
    zoneLabel: 'North-Central Tech & Cultural Hub',
    type: 'AI, Machine Learning & Esports Arena',
    landmark: 'Further down from Digital Block • Front Roundabout',
    capacity: '500+ High-Performance Workstations',
    events: ['Valorant LAN Esports Arena', 'AI Prompt Engineering', 'Cybersecurity Capture The Flag'],
    rules: ['Tournament machines pre-imaged with 144Hz monitors.', 'No external storage sticks allowed in LAN rooms.'],
    description: 'Situated further down the avenue from the Digital Block. Features a welcoming pink entrance portico, an iconic circular roundabout landscaped with flowers, and cutting-edge artificial intelligence suites.',
    image: '/images/rvrjc_cyber_block.png',
    cardBg: '#E8DEFF',
    color3d: 'bg-[#E8DEFF] text-[#121212]',
    height3d: 'h-28',
    specialVisual: 'cyber-roundabout',
    badges: ['Roundabout', 'Esports Arena', 'CSE Labs'],
    coordText: 'Zone B • North End'
  },
  {
    id: 'silver-jubilee',
    name: 'Silver Jubilee Block (Mechanical & Civil)',
    shortName: 'Silver Jubilee Block',
    zone: 'west-loop',
    zoneLabel: 'West Loop & South-West Grounds',
    type: 'Auditorium Hall & Core Engineering',
    landmark: 'Across from CS Hub • Adjacent volleyball nets',
    capacity: '1,200 Seats AC Stage Hall',
    events: ['Solo & Group Band Clashes', 'Classical Solo Dance', 'Inaugural Keynote Lectures'],
    rules: ['Fully air-conditioned acoustic hall - food items barred.', 'Volleyball nets adjacent outside.'],
    description: 'Positioned across from the Computer Science hub on the West Loop. Features the premier air-conditioned Silver Jubilee Auditorium, adjacent volleyball courts, and open athletic fields.',
    image: '/images/colorido_fest_stage_inauguration.jpg',
    cardBg: '#CCFF00',
    color3d: 'bg-[#CCFF00] text-[#121212]',
    height3d: 'h-22',
    specialVisual: 'silver-auditorium',
    badges: ['1200 AC Hall', 'Sports Fields'],
    coordText: 'Zone C • West Loop'
  },
  {
    id: 'decennial-block',
    name: 'Decennial Block (RJ E-Nest Incubator)',
    shortName: 'Decennial Block',
    zone: 'west-loop',
    zoneLabel: 'West Loop & South-West Grounds',
    type: 'Innovation & Incubation Hub',
    landmark: 'Located nearby Silver Jubilee Block',
    capacity: 'MSME Approved Innovation Center',
    events: ['Startup Pitch Tank', 'Hardware Prototype Demonstrations', 'Venture Mentorship'],
    rules: ['Pitch decks uploaded 1 hour prior.', 'Prototyping equipment supervised by incubation managers.'],
    description: 'Located nearby the Silver Jubilee Block. Houses the esteemed RJ E-Nest innovation foundation, incubation laboratories, and startup mentoring conference rooms.',
    image: '/images/aicte_bootcamp_inauguration.jpg',
    cardBg: '#FFF5C0',
    color3d: 'bg-[#FFF5C0] text-[#121212]',
    height3d: 'h-20',
    specialVisual: 'enest-incubator',
    badges: ['RJ E-Nest', 'Startup Hub'],
    coordText: 'Zone C • West Loop'
  },
  {
    id: 'chemical-sac',
    name: 'Chemical Block & Student Activity Center (SAC)',
    shortName: 'Chemical & SAC Canteen',
    zone: 'west-loop',
    zoneLabel: 'West Loop & South-West Grounds',
    type: 'Amenities, Canteen & Club Rooms',
    landmark: 'Directly opposite main student canteen',
    capacity: '1st Floor SAC Club Rooms • 2,000 Diners',
    events: ['Student Activity Center Operations', 'Food Carnival', 'ECA Club Lounges'],
    rules: ['Main canteen open 7:30 AM to 8:30 PM during fest.', 'Digital UPI accepted across all food counters.'],
    description: 'Positioned toward the amenities area directly opposite the bustling main student canteen. The Student Activity Center (SAC) occupies the first floor, coordinating student clubs and delegate hospitality.',
    image: '/images/rvrjc_campus_main_building.jpg',
    cardBg: '#D4F6FF',
    color3d: 'bg-[#D4F6FF] text-[#121212]',
    height3d: 'h-20',
    specialVisual: 'canteen-sac',
    badges: ['SAC 1st Floor', 'Main Canteen'],
    coordText: 'Zone C • Amenities'
  },
  {
    id: 'sports-complex',
    name: 'Indoor Sports Complex & Athletic Grounds',
    shortName: 'Indoor Sports Complex',
    zone: 'west-loop',
    zoneLabel: 'West Loop & South-West Grounds',
    type: 'Athletics & Multi-Floor Sports Arena',
    landmark: 'Directly behind Chemical Block',
    capacity: 'Floor 1 (Boys Gym & Courts) • Floor 2 (Girls Arena)',
    events: ['Kabaddi Championship', 'Basketball Tournament', 'Badminton & Table Tennis'],
    rules: ['Indoor wooden courts require non-marking sports footwear.', 'First floor: Boys gym; Second floor: Girls arena.'],
    description: 'Located directly behind the Chemical Block. The first floor features an indoor gym and courts for boys, while the entire second floor is dedicated to indoor sports and recreation for girls.',
    image: '/images/rvrjc_campus_main_building.jpg',
    cardBg: '#FF5A1F',
    color3d: 'bg-[#FF5A1F] text-white',
    height3d: 'h-24',
    specialVisual: 'sports-arena',
    badges: ['Floor 1: Boys', 'Floor 2: Girls'],
    coordText: 'Zone C • Athletic Complex'
  }
];

export default function CampusMapSection() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(CAMPUS_BLOCKS[1]); // Default to Main Block
  const [mapMode, setMapMode] = useState('3d'); // '3d' | 'satellite' | 'guide'
  const [cameraAngle, setCameraAngle] = useState(0); // 0: Isometric, 1: North High, 2: Top Plan
  const [activeZoneFilter, setActiveZoneFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredBlocks = activeZoneFilter === 'all'
    ? CAMPUS_BLOCKS
    : CAMPUS_BLOCKS.filter(b => b.zone === activeZoneFilter);

  // Camera transform configurations
  const cameraTransforms = [
    'perspective(1100px) rotateX(50deg) rotateZ(-22deg)', // 0: Neo-Brutalist Isometric
    'perspective(1200px) rotateX(62deg) rotateZ(28deg)',  // 1: North Aerial High-Angle
    'perspective(900px) rotateX(15deg) rotateZ(0deg)',    // 2: Flat Strategic Plan
  ];

  return (
    <section ref={sectionRef} id="campus-map" className="py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-3 px-4">
        <div className="inline-flex items-center gap-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] shadow-[2px_2px_0px_#121212]">
            <Move3d className="w-3.5 h-3.5" />
            3D SPATIAL DIRECTORY
          </span>
          <span className="font-script text-base text-[#FF5A1F] font-bold rotate-[-3deg]">
            — architectural roadmap of RVR & JC
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212] tracking-tight">
          Campus 3D View & <span className="bg-[#CCFF00] px-3 py-0.5 rounded-2xl brutal-border inline-block rotate-[-1deg] shadow-[3.5px_3.5px_0px_#121212]">Venue Navigator</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto font-medium">
          Professional 3D Digital Twin of <strong>R.V.R. & J.C. College of Engineering</strong> — featuring the exact architectural clone of the <strong>Front Main Administrative Block</strong> (white colonnade, maroon title fascia, rooftop crest & waving Indian flag), <strong>Digital Block (Red Dome)</strong>, <strong>Hi-Tech Block</strong>, <strong>Cyber Roundabout</strong>, <strong>OAT Amphitheater</strong>, and <strong>Athletic Stadium</strong>.
        </p>

        {/* View Toggle Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setMapMode('toy-world')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black brutal-border-2 flex items-center gap-2 transition-all cursor-pointer ${
              mapMode === 'toy-world'
                ? 'bg-[#CCFF00] text-[#121212] shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
            <span>🎮 Toy World 3D (Bruno Simon)</span>
          </button>

          <button
            onClick={() => setMapMode('3d')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black brutal-border-2 flex items-center gap-2 transition-all cursor-pointer ${
              mapMode === '3d'
                ? 'bg-[#FFE500] text-[#121212] shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
            }`}
          >
            <Box className="w-4 h-4 text-[#121212]" />
            <span>Interactive 3D WebGL</span>
          </button>

          <button
            onClick={() => setMapMode('guide')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black brutal-border-2 flex items-center gap-2 transition-all cursor-pointer ${
              mapMode === 'guide'
                ? 'bg-[#D4F6FF] text-[#121212] shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
            }`}
          >
            <Navigation className="w-4 h-4 text-[#FF5A1F]" />
            <span>Campus 3D Guide & Earth</span>
          </button>

          <button
            onClick={() => setMapMode('satellite')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black brutal-border-2 flex items-center gap-2 transition-all cursor-pointer ${
              mapMode === 'satellite'
                ? 'bg-[#FF5A1F] text-white shadow-[3px_3px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 shadow-[2px_2px_0px_#121212] hover:bg-stone-50'
            }`}
          >
            <Globe className="w-4 h-4 text-white" />
            <span>Live Satellite Map</span>
          </button>

          <a
            href={GOOGLE_EARTH_3D_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-display font-black bg-white text-[#121212] brutal-border-2 shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-all flex items-center gap-1.5"
            title="Launch photorealistic 3D aerial view on Google Earth"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Google Earth 3D</span>
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </a>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white brutal-border rounded-3xl p-4 sm:p-6 shadow-[6px_6px_0px_#121212] relative overflow-hidden">
          
          {!isInView ? (
            <div className="h-[440px] w-full rounded-2xl bg-[#F8F5EE] brutal-border flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-7 h-7 animate-spin text-[#FF5A1F]" />
              <span className="text-xs font-mono font-bold text-stone-600">Loading 3D Campus Spatial Models...</span>
            </div>
          ) : mapMode === 'toy-world' ? (
            /* Bruno Simon Toy World Level View */
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-[#121212] text-white p-4 sm:p-5 rounded-2xl brutal-border shadow-[4px_4px_0px_#CCFF00] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
                      BRUNO SIMON TOY WORLD AESTHETIC
                    </span>
                    <span className="font-mono text-xs text-[#FFE500] font-bold">
                      Miniature 3D Game Level
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white">
                    Isometric University Toy Map & Driving Car
                  </h3>
                  <p className="text-xs text-stone-300 max-w-xl">
                    Top-down angled 3D game level with smooth clay buildings, winding roads, sports courts, and stylized fluffy trees. Click any building badge to inspect!
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setMapMode('3d')}
                    className="brutal-btn-tactile px-4 py-2.5 bg-[#CCFF00] text-[#121212] font-display font-black text-xs rounded-xl brutal-border shadow-[2.5px_2.5px_0px_#FFFFFF] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Box className="w-4 h-4 text-[#121212]" />
                    <span>Launch 3D WebGL Driver</span>
                  </button>
                </div>
              </div>

              {/* Interactive Isometric Toy Map with Hotspots */}
              <div className="relative rounded-2xl overflow-hidden brutal-border shadow-[4px_4px_0px_#121212] bg-[#F8F5EE] group">
                <img
                  src="/images/campus_toy_world.jpg"
                  alt="Isometric 3D render of miniature university campus with toy car and buildings"
                  className="w-full h-auto object-cover max-h-[640px] transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {/* Hotspot 1: Central Library Block (Top Center) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[2])}
                  className="absolute top-[18%] left-[58%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#121212]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl brutal-border text-[11px] font-display font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#CCFF00] hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                    <span>📚 Central Library</span>
                  </div>
                </div>

                {/* Hotspot 2: Main Administrative Block (Top Left) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[1])}
                  className="absolute top-[28%] left-[31%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#121212]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl brutal-border text-[11px] font-display font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#FFE500] hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#FFE500] animate-ping" />
                    <span>🏛️ Main Block</span>
                  </div>
                </div>

                {/* Hotspot 3: Open-Air Amphitheater OAT (Bottom Left/Center) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[3])}
                  className="absolute top-[60%] left-[36%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#121212]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl brutal-border text-[11px] font-display font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#FF5A1F] hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
                    <span>🎭 OAT Amphitheater</span>
                  </div>
                </div>

                {/* Hotspot 4: Sports Arena & Basketball Court (Bottom Right) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[8])}
                  className="absolute top-[72%] left-[68%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#121212]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl brutal-border text-[11px] font-display font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#CCFF00] hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                    <span>🏀 Sports Complex</span>
                  </div>
                </div>

                {/* Hotspot 5: Campus Cafe & SAC (Center Right) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[7])}
                  className="absolute top-[48%] left-[64%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#121212]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl brutal-border text-[11px] font-display font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#00E5FF] hover:scale-110 transition-transform">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                    <span>☕ Campus Cafe & SAC</span>
                  </div>
                </div>

                {/* Hotspot 6: Main Entry Road & Toy Car (Center Road) */}
                <div
                  onClick={() => setSelectedBlock(CAMPUS_BLOCKS[0])}
                  className="absolute top-[51%] left-[48%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className="bg-[#2A75D3] text-white px-2.5 py-1 rounded-xl brutal-border text-[10px] font-mono font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#121212] hover:scale-110 transition-transform">
                    <span>🚗 Toy Car Patrol</span>
                  </div>
                </div>
              </div>

              {/* Selected Block Quick Card */}
              {selectedBlock && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white brutal-border shadow-[4px_4px_0px_#121212] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#FF5A1F] uppercase">
                      Selected Landmark
                    </span>
                    <h4 className="font-display font-black text-base sm:text-lg text-[#121212]">
                      {selectedBlock.name}
                    </h4>
                    <p className="text-xs text-stone-600 font-medium">
                      {selectedBlock.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {selectedBlock.events?.map((ev, i) => (
                      <span key={i} className="text-[10px] font-mono font-bold bg-[#F8F5EE] brutal-border px-2.5 py-1 rounded-lg">
                        ★ {ev}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : mapMode === '3d' ? (
            <div className="space-y-4">
              <ThreeCampusViewer
                selectedBlockId={selectedBlock.id}
                onSelectBlock={(id) => {
                  const found = CAMPUS_BLOCKS.find((b) => b.id === id);
                  if (found) setSelectedBlock(found);
                }}
              />
            </div>
          ) : mapMode === 'guide' ? (
            /* 3D Navigation Guide & Roadmap View */
            <div className="p-4 sm:p-6 bg-[#F8F5EE] brutal-border rounded-2xl space-y-6">
              
              <div className="bg-[#121212] text-white p-5 rounded-2xl brutal-border shadow-[4px_4px_0px_#CCFF00] space-y-3">
                <div className="flex items-center gap-2 text-[#CCFF00]">
                  <Sparkles className="w-5 h-5 text-[#CCFF00]" />
                  <h3 className="font-display font-black text-lg">
                    How to View R.V.R. & J.C. Campus in Full 3D
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  While standard college portals show a flat 2D satellite map, you can unlock full photorealistic 3D building geometry of R.V.R. & J.C. through Google Maps and Google Earth:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 space-y-1">
                    <span className="font-mono text-[#CCFF00] font-bold block">1. Click "Open in Maps"</span>
                    <span className="text-stone-300">Open the satellite view or launch the Google Earth 3D link directly.</span>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 space-y-1">
                    <span className="font-mono text-[#FFE500] font-bold block">2. Satellite Layer</span>
                    <span className="text-stone-300">Ensure the "Satellite" layer is turned on (bottom left layer switch).</span>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 space-y-1">
                    <span className="font-mono text-[#FF5A1F] font-bold block">3. Hold Ctrl + Drag Mouse</span>
                    <span className="text-stone-300">Hold the <strong>Ctrl key</strong> while dragging to tilt the camera at an angle and inspect all 3D blocks!</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={GOOGLE_EARTH_3D_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn-tactile px-4 py-2 bg-[#CCFF00] text-[#121212] font-display font-black text-xs rounded-xl brutal-border shadow-[2.5px_2.5px_0px_#FFFFFF] flex items-center gap-1.5"
                  >
                    <span>Launch Google Earth 3D Mode</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={GOOGLE_MAPS_3D_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn-tactile px-4 py-2 bg-white text-[#121212] font-display font-black text-xs rounded-xl brutal-border shadow-[2.5px_2.5px_0px_#FFFFFF] flex items-center gap-1.5"
                  >
                    <span>Open Google Maps 3D View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Campus Roadmap Checklist */}
              <div className="space-y-4">
                <h4 className="font-display font-black text-base text-[#121212] uppercase tracking-wide">
                  Official Campus Roadmap & Landmark Navigation
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Axis 1 */}
                  <div className="p-4 bg-white brutal-border rounded-xl space-y-2 shadow-[3px_3px_0px_#121212]">
                    <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
                      1. Campus Entry & Main Axis
                    </span>
                    <ul className="text-xs space-y-1.5 text-stone-700 font-medium">
                      <li>• <strong>Main Gate & Parking:</strong> Parking on immediate right upon entry; sports grounds on left.</li>
                      <li>• <strong>Main Block (EEE & Admin):</strong> Directly straight ahead with columns and Indian flag.</li>
                      <li>• <strong>Central Library:</strong> 3-floor building situated immediately adjacent to Main Block.</li>
                    </ul>
                  </div>

                  {/* Axis 2 */}
                  <div className="p-4 bg-white brutal-border rounded-xl space-y-2 shadow-[3px_3px_0px_#121212]">
                    <span className="brutal-pill bg-[#FF5A1F] text-white text-[10px]">
                      2. North-Central Tech Hub
                    </span>
                    <ul className="text-xs space-y-1.5 text-stone-700 font-medium">
                      <li>• <strong>Open-Air Theatre (OAT):</strong> Located just past the Main Block.</li>
                      <li>• <strong>High-Tech Block (MCA/CSM):</strong> Directly behind OAT with ochre portico & stationery store.</li>
                      <li>• <strong>Digital Block (ECE):</strong> Between Hi-Tech and Cyber Block; crowned with red dome.</li>
                      <li>• <strong>Cyber Block (Data Science):</strong> Pink canopy entrance & circular flower roundabout.</li>
                    </ul>
                  </div>

                  {/* Axis 3 */}
                  <div className="p-4 bg-white brutal-border rounded-xl space-y-2 shadow-[3px_3px_0px_#121212]">
                    <span className="brutal-pill bg-[#D4F6FF] text-[#121212] text-[10px]">
                      3. West Loop & South-West
                    </span>
                    <ul className="text-xs space-y-1.5 text-stone-700 font-medium">
                      <li>• <strong>Silver Jubilee Block:</strong> 1200-seat AC hall, Mech/Civil & volleyball nets.</li>
                      <li>• <strong>Decennial Block:</strong> Houses RJ E-Nest innovation & startup center.</li>
                      <li>• <strong>Chemical & SAC:</strong> Student Activity Center on 1st floor; canteen opposite.</li>
                      <li>• <strong>Indoor Sports Complex:</strong> Floor 1 boys gym/courts; Floor 2 girls arena.</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            /* Live Satellite Google Map Embed */
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden brutal-border bg-stone-100">
              <iframe
                title="RVR & JC Satellite Map"
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

        </div>
      </div>

      {/* Real Landmark Photo & Inspection Dossier Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Block Selector Grid */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-1">
              <p className="text-xs font-mono font-bold text-[#121212] uppercase tracking-wider">
                Select Campus Landmark
              </p>
              <span className="text-[11px] font-mono text-[#FF5A1F] font-bold">
                {CAMPUS_BLOCKS.length} Key Hubs
              </span>
            </div>

            {CAMPUS_BLOCKS.map((block) => {
              const isSelected = selectedBlock.id === block.id;
              return (
                <div
                  key={block.id}
                  onClick={() => setSelectedBlock(block)}
                  className={`p-3.5 rounded-2xl brutal-border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white shadow-[4px_4px_0px_#121212] -translate-y-0.5 border-[#121212]'
                      : 'bg-[#F8F5EE] shadow-[2px_2px_0px_#121212] hover:bg-white'
                  }`}
                >
                  <div
                    style={{ backgroundColor: block.cardBg }}
                    className="p-2.5 rounded-xl brutal-border-2 text-[#121212] shrink-0 shadow-[2px_2px_0px_#121212]"
                  >
                    <MapPin className="w-4 h-4 text-[#121212]" />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-xs sm:text-sm text-[#121212] truncate">
                        {block.name}
                      </h4>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] border border-[#121212] shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] font-mono font-bold text-[#FF5A1F]">{block.type}</p>
                    <p className="text-[11px] text-stone-600 line-clamp-1 font-medium">{block.landmark}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Selected Landmark Detailed Dossier */}
          <div className="lg:col-span-7">
            <div className="bg-white brutal-border rounded-3xl p-6 sm:p-7 shadow-[5px_5px_0px_#121212] space-y-4 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px]">
                      {selectedBlock.zoneLabel}
                    </span>
                    <span className="brutal-pill bg-[#FFF5C0] text-[#121212] text-[10px]">
                      {selectedBlock.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#121212] bg-[#F8F5EE] brutal-border-2 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#121212]">
                    <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    {selectedBlock.capacity}
                  </span>
                </div>

                {/* Real Landmark Photo */}
                {selectedBlock.image && (
                  <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden brutal-border shadow-[3.5px_3.5px_0px_#121212] bg-stone-100 group">
                    <img
                      src={selectedBlock.image}
                      alt={selectedBlock.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/rvrjc_campus_main_building.jpg';
                      }}
                    />
                    <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono text-white font-bold flex items-center justify-between bg-[#121212]/90 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-stone-700">
                      <span className="truncate flex items-center gap-1.5">
                        <CameraIcon className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>Real Campus Photo • {selectedBlock.shortName}</span>
                      </span>
                      <span className="text-[#CCFF00] shrink-0 text-[10px]">VERIFIED LOCATION</span>
                    </div>
                  </div>
                )}

                {/* Block Name & Landmark */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-[#121212] leading-tight">
                    {selectedBlock.name}
                  </h3>
                  <p className="text-xs font-mono text-[#FF5A1F] font-bold flex items-center gap-1.5 mt-1">
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    {selectedBlock.landmark}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {selectedBlock.description}
                </p>

                {/* Events Hosted Here */}
                <div className="p-3.5 rounded-xl bg-[#F8F5EE] brutal-border space-y-1.5">
                  <p className="text-[11px] font-mono font-bold text-[#121212] uppercase flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    <span>Festival Activities & Events Hosted:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlock.events.map((ev, i) => (
                      <span key={i} className="text-xs font-display font-bold px-2.5 py-0.5 rounded-md bg-white brutal-border-2 text-[#121212] shadow-[1.5px_1.5px_0px_#121212]">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operational Rules */}
                <div className="space-y-1 text-xs text-stone-700 font-medium">
                  {selectedBlock.rules.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Direct 3D Navigation Action */}
              <div className="pt-3 border-t-2 border-dashed border-[#121212]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold">
                <span className="text-stone-600">{selectedBlock.coordText}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={GOOGLE_EARTH_3D_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#121212] hover:text-[#FF5A1F] bg-[#CCFF00] brutal-border-2 px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#121212] flex items-center gap-1 transition-all"
                  >
                    <span>View in Google Earth 3D</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-[#121212] flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

function CameraIcon(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}
