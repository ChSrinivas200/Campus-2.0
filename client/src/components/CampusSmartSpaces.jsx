import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  Calendar, 
  CheckCircle, 
  Search, 
  Clock, 
  Sparkles, 
  Monitor, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { fetchCampusSpaces, bookCampusSpace } from '../api';

export default function CampusSmartSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [minCapacity, setMinCapacity] = useState('8');
  const [amenity, setAmenity] = useState('');
  const [bookingSpace, setBookingSpace] = useState(null);
  const [bookingNotice, setBookingNotice] = useState('');
  const [loading, setLoading] = useState(false);

  // Booking Form State
  const [studentName, setStudentName] = useState('K. Manikanta Srinivas');
  const [regdNo, setRegdNo] = useState('Y22CS084');
  const [purpose, setPurpose] = useState('Hack-a-Fest Team Sprint & Architecture Planning');
  const [peopleCount, setPeopleCount] = useState(8);

  const loadSpaces = async () => {
    setLoading(true);
    const res = await fetchCampusSpaces(minCapacity, amenity);
    if (res && res.spaces) {
      setSpaces(res.spaces);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSpaces();
  }, [minCapacity, amenity]);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!bookingSpace) return;
    const res = await bookCampusSpace({
      spaceId: bookingSpace.id,
      studentName,
      regdNo,
      purpose,
      peopleCount
    });
    if (res && res.success) {
      setBookingNotice(`Room booked successfully! Reservation Code: ${res.reservationCode}. Access granted via Student ID scan.`);
      setBookingSpace(null);
      loadSpaces();
      setTimeout(() => setBookingNotice(''), 7000);
    }
  };

  return (
    <section id="spaces" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="brutal-pill bg-[#FFDEEB] text-[#80183E] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Building className="w-3.5 h-3.5 text-[#80183E]" />
            FEATURE 09: SMART SPACES & FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            Dynamic Room Allocation & Space Utilization
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Find and instantly reserve study pods, GPU labs, and seminar halls. Need a room for 8 people with a projector? The smart space engine matches available resources in seconds.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-3xl brutal-border p-5 shadow-[6px_6px_0px_#121212] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-600 uppercase">Min Capacity:</span>
              <select
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
              >
                <option value="1">Any Size</option>
                <option value="8">8+ People (Study Pod)</option>
                <option value="25">25+ People (Conference)</option>
                <option value="45">45+ People (Seminar Suite)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-600 uppercase">Amenity:</span>
              <select
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
              >
                <option value="">All Amenities</option>
                <option value="Projector">4K Projector</option>
                <option value="Whiteboard">Acoustic Whiteboard</option>
                <option value="RTX">GPU RTX 4090 Workstations</option>
                <option value="Polycom">Video Conferencing</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-stone-600 bg-[#CCFF00] px-3 py-1 rounded-xl brutal-border">
            Overall Campus Utilization: 74%
          </div>
        </div>

        {bookingNotice && (
          <div className="p-4 rounded-2xl bg-[#E8FAD5] brutal-border text-[#1E520A] text-xs font-bold text-center mb-6 shadow-[3px_3px_0px_#121212] animate-fadeIn">
            {bookingNotice}
          </div>
        )}

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map((sp) => (
            <div
              key={sp.id}
              className="bg-white rounded-3xl brutal-border p-6 shadow-[6px_6px_0px_#121212] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-[10px] font-black mb-1 inline-block">
                      {sp.building} • {sp.floor}
                    </span>
                    <h3 className="font-display font-black text-xl text-[#121212]">
                      {sp.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    sp.isAvailable 
                      ? 'bg-[#E8FAD5] text-[#1E520A] border-[#1E520A]' 
                      : 'bg-[#FEE7EA] text-[#5C1D24] border-[#5C1D24]'
                  }`}>
                    {sp.isAvailable ? 'AVAILABLE NOW' : 'OCCUPIED'}
                  </span>
                </div>

                <p className="text-xs text-stone-600 font-medium mb-3">
                  Optimal For: <strong className="text-[#121212]">{sp.suitableFor}</strong> • Capacity: <strong>{sp.capacity} Persons</strong>
                </p>

                {/* Amenities */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Installed Equipment:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sp.amenities.map((am, aIdx) => (
                      <span key={aIdx} className="px-2 py-0.5 rounded-md bg-[#F8F5EE] text-[11px] font-bold text-[#121212] border border-stone-300">
                        ✓ {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#121212] flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-stone-500">
                  Utilization: {sp.utilizationRate}
                </span>

                {sp.isAvailable ? (
                  <button
                    onClick={() => setBookingSpace(sp)}
                    className="px-4 py-2 rounded-xl bg-[#CCFF00] brutal-border font-display font-black text-xs text-[#121212] shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Instant Reserve Space</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono font-bold text-stone-500">
                    Booked until 04:00 PM
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {bookingSpace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-white brutal-border rounded-3xl p-6 sm:p-7 shadow-[8px_8px_0px_#121212]">
              <h3 className="text-xl font-display font-black text-[#121212] mb-1">
                Confirm Reservation: {bookingSpace.name}
              </h3>
              <p className="text-xs text-stone-600 font-medium mb-4">
                Location: {bookingSpace.building} • Max Capacity: {bookingSpace.capacity}
              </p>

              <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Lead Student / Faculty Name</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Regd No</label>
                    <input
                      type="text"
                      required
                      value={regdNo}
                      onChange={(e) => setRegdNo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Attendees Count</label>
                    <input
                      type="number"
                      required
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-bold text-stone-500 uppercase block mb-1">Meeting / Study Purpose</label>
                  <input
                    type="text"
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingSpace(null)}
                    className="w-1/2 py-2.5 rounded-full font-display font-black text-xs text-stone-700 bg-stone-100 brutal-border hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[2px_2px_0px_#121212] hover:bg-[#d8ff33]"
                  >
                    Confirm & Keycode
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
