import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  Accessibility, 
  AlertTriangle, 
  CheckCircle, 
  Footprints, 
  ArrowUp, 
  RotateCcw,
  Sparkles,
  Navigation
} from 'lucide-react';
import { fetchNavigationRoute } from '../api';

const LOCATIONS = [
  { id: 'gate-1', name: 'Main Campus North Gate 1 (Entrance)', type: 'Gate' },
  { id: 'sjb', name: 'Silver Jubilee Block (Main Portico)', type: 'Academic' },
  { id: 'sjb-l3', name: 'SJB 3rd Floor (AI & CS Labs - Room 312)', type: 'Labs' },
  { id: 'lib', name: 'Central Library & Digital Twin Deck', type: 'Library' },
  { id: 'canteen', name: 'Central Food Court & Canteen', type: 'Dining' },
  { id: 'sac', name: 'Student Activity Centre (SAC Studios)', type: 'Recreation' },
  { id: 'oat', name: 'Open Air Theatre (OAT Main Stage)', type: 'Amphitheatre' },
  { id: 'htc', name: 'Hi-Tech Electronics Block (VLSI Labs)', type: 'Labs' },
  { id: 'parking', name: 'North EV Transit & Shuttle Bay', type: 'Transit' }
];

export default function CampusNavigation() {
  const [fromLocation, setFromLocation] = useState('gate-1');
  const [toLocation, setToLocation] = useState('sjb-l3');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRoute = async () => {
    setLoading(true);
    const data = await fetchNavigationRoute(fromLocation, toLocation, accessibleOnly);
    setLoading(false);
    if (data) {
      setRouteData(data);
    }
  };

  useEffect(() => {
    calculateRoute();
  }, [fromLocation, toLocation, accessibleOnly]);

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <section id="navigation" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="brutal-pill bg-[#FFE500] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Compass className="w-3.5 h-3.5 text-[#121212]" />
            FEATURE 03: SMART & ACCESSIBLE NAVIGATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Campus-Specific Waypoint Router
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Find turn-by-turn routes through classrooms, labs, elevators, entrances, restrooms, and emergency exits. Offers dedicated accessible paths for delegates who cannot use stairs, with auto-detours around blocked corridors.
          </p>
        </div>

        {/* Route Planner Card & Waypoints Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Planner Controls (Left) */}
          <div className="lg:col-span-5 bg-white rounded-3xl brutal-border p-6 sm:p-7 shadow-[6px_6px_0px_#121212] space-y-5">
            <h3 className="text-lg font-display font-black text-[#121212] flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#FF5A1F]" />
              <span>Route Parameters</span>
            </h3>

            {/* From Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-stone-500 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Starting Point</span>
              </label>
              <select
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs sm:text-sm font-bold text-[#121212] focus:outline-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1">
              <button
                onClick={handleSwap}
                className="p-2 rounded-full bg-stone-100 hover:bg-[#CCFF00] brutal-border text-xs shadow-[2px_2px_0px_#121212] transition-colors cursor-pointer"
                title="Swap Start and Destination"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#121212]" />
              </button>
            </div>

            {/* To Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-stone-500 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F]"></span>
                <span>Target Destination</span>
              </label>
              <select
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs sm:text-sm font-bold text-[#121212] focus:outline-none"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Accessible Route Toggle */}
            <div className="p-4 rounded-2xl bg-[#D4F6FF]/50 brutal-border-2 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-[#004B6E]" />
                  <span className="text-xs font-display font-black text-[#121212]">
                    Accessible Route (Wheelchair & Elevators)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  onChange={(e) => setAccessibleOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#004B6E] cursor-pointer"
                />
              </label>
              <p className="text-[11px] text-stone-600 font-medium">
                Strictly avoids staircases; routes via smooth ramps, ADA tactile paving, and smart voice elevators.
              </p>
            </div>

            {/* Stats Summary */}
            {routeData && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-stone-50 brutal-border-2 text-center">
                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Distance</span>
                  <span className="text-lg font-mono font-black text-[#121212]">
                    {routeData.totalDistanceM} m
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#CCFF00]/40 brutal-border-2 text-center">
                  <span className="text-[10px] font-mono font-bold text-stone-700 uppercase block">Walk Time</span>
                  <span className="text-lg font-mono font-black text-[#121212]">
                    ~{routeData.estimatedWalkMinutes} mins
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Waypoints & Turn Guidance (Right) */}
          <div className="lg:col-span-7 space-y-4">
            {routeData?.detourAlert && (
              <div className="p-4 rounded-2xl bg-[#FFF9CC] brutal-border text-xs font-bold text-[#7A6100] shadow-[3px_3px_0px_#121212] flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#FF5A1F]" />
                <span><strong>Active Detour:</strong> {routeData.detourAlert}</span>
              </div>
            )}

            <div className="bg-white rounded-3xl brutal-border p-6 sm:p-8 shadow-[6px_6px_0px_#121212]">
              <div className="flex items-center justify-between border-b-2 border-[#121212] pb-4 mb-6">
                <div>
                  <h4 className="font-display font-black text-lg text-[#121212]">
                    Turn-by-Turn Navigation Waypoints
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    {accessibleOnly ? '♿ Accessible Navigation Mode Active' : 'Standard Walking Route'}
                  </p>
                </div>
                <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-[10px] font-black">
                  OPTIMIZED PATH
                </span>
              </div>

              {/* Waypoint Steps */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[#121212]">
                {routeData?.waypoints?.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-1">
                    {/* Step Node */}
                    <div className={`w-8 h-8 rounded-full brutal-border shrink-0 flex items-center justify-center font-mono font-black text-xs z-10 ${
                      step.accessibleHighlight ? 'bg-[#D4F6FF] text-[#004B6E]' :
                      idx === routeData.waypoints.length - 1 ? 'bg-[#CCFF00] text-[#121212]' :
                      'bg-white text-[#121212]'
                    }`}>
                      {step.step}
                    </div>

                    {/* Step Card */}
                    <div className={`flex-1 p-3.5 rounded-2xl brutal-border-2 text-xs sm:text-sm font-medium ${
                      step.accessibleHighlight ? 'bg-[#D4F6FF]/40 border-[#004B6E]' : 'bg-[#F8F5EE]'
                    }`}>
                      <p className="text-stone-900 font-bold leading-snug">
                        {step.text}
                      </p>
                      {step.distanceM > 0 && (
                        <span className="text-[10px] font-mono text-stone-500 font-semibold block mt-1">
                          + {step.distanceM} meters
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
