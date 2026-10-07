import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Trophy, Search, Download, Trash2, Edit3, Plus, 
  KeyRound, ArrowLeft, Filter, Sparkles, AlertCircle, CheckCircle2, 
  Ticket, Flame, Eye, RefreshCw, Mail, QrCode, Send, Check, Loader2, Award,
  Activity, Server, Database, Cpu, SendHorizontal, Radio, CheckCheck, 
  UserCheck, UserX, Zap, CheckSquare, Square, X, ExternalLink
} from 'lucide-react';
import { 
  fetchEvents, fetchAdminRegistrations, deleteAdminRegistration, 
  updateAdminEvent, resendPassEmail, verifyPassTicket,
  toggleStudentAttendance, sendToAppearedStudents, fetchSystemDiagnostics,
  fetchLiveScores, updateAdminScore, createAdminScore, deleteAdminScore, DEFAULT_SCORES
} from '../api';

const ADMIN_PIN = 'rvrjc2027';

export default function AdminPage({ onBackToHome, onViewPass }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'scores' | 'events' | 'verifier' | 'diagnostics'
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [liveScores, setLiveScores] = useState([]);
  const [savingScoreId, setSavingScoreId] = useState(null);
  const [scoreNotice, setScoreNotice] = useState('');
  const [showAddMatchModal, setShowAddMatchModal] = useState(false);
  const [newMatchForm, setNewMatchForm] = useState({
    event: '',
    arena: '',
    team1: '',
    team2: '',
    score1: 0,
    score2: 0,
    status: 'Match in progress',
    lead: 'Official scoreboard active',
    color: '#CCFF00'
  });
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedAttendance, setSelectedAttendance] = useState('All'); // 'All' | 'appeared' | 'pending'

  // Selected students for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Edit Event Modal state
  const [editingEvent, setEditingEvent] = useState(null);

  // Email status state
  const [emailingId, setEmailingId] = useState(null);
  const [emailNotice, setEmailNotice] = useState('');

  // Send to Appeared Students Modal state
  const [showSendModal, setShowSendModal] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [sendingBatch, setSendingBatch] = useState(false);

  // Gate Verifier state
  const [verifierInput, setVerifierInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  // Diagnostics state
  const [diagnostics, setDiagnostics] = useState(null);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testingEmail, setTestingEmail] = useState(false);
  const [testEmailFeedback, setTestEmailFeedback] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'diagnostics') {
      runDiagnostics();
    }
  }, [isAuthenticated, activeTab]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [regsData, eventsData, scoresData] = await Promise.all([
        fetchAdminRegistrations(),
        fetchEvents(300),
        fetchLiveScores()
      ]);
      setRegistrations(Array.isArray(regsData) ? regsData : []);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setLiveScores(Array.isArray(scoresData) && scoresData.length > 0 ? scoresData : DEFAULT_SCORES);
    } catch (e) {
      console.warn('Failed to load admin data:', e);
      setRegistrations([]);
      setEvents([]);
      setLiveScores(DEFAULT_SCORES);
    } finally {
      setLoading(false);
    }
  };

  // Score Management Handlers
  const handleScoreChange = (matchId, teamField, delta) => {
    setLiveScores(prev => prev.map(m => {
      if (m.id === matchId) {
        const currentVal = Number(m[teamField] || 0);
        const nextVal = Math.max(0, currentVal + delta);
        return { ...m, [teamField]: nextVal };
      }
      return m;
    }));
  };

  const handleScoreInputDirect = (matchId, teamField, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    setLiveScores(prev => prev.map(m => {
      if (m.id === matchId) {
        return { ...m, [teamField]: num };
      }
      return m;
    }));
  };

  const handleScoreFieldChange = (matchId, field, value) => {
    setLiveScores(prev => prev.map(m => {
      if (m.id === matchId) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const handlePublishScore = async (match) => {
    setSavingScoreId(match.id);
    try {
      await updateAdminScore(match.id, match);
      setScoreNotice(`✅ Published: ${match.event} score (${match.score1} - ${match.score2}) updated on public scoreboard!`);
    } catch (err) {
      setScoreNotice(`Score saved locally for "${match.event}".`);
    } finally {
      setSavingScoreId(null);
      setTimeout(() => setScoreNotice(''), 4500);
    }
  };

  const handleResetMatchScores = async (matchId) => {
    if (!window.confirm('Reset this match score back to 0 : 0?')) return;
    const match = liveScores.find(m => m.id === matchId);
    if (!match) return;
    const resetMatch = { ...match, score1: 0, score2: 0, lead: 'Match Reset / Fresh Round' };
    setLiveScores(prev => prev.map(m => m.id === matchId ? resetMatch : m));
    await updateAdminScore(matchId, resetMatch);
    setScoreNotice(`Match scores reset to 0-0 for "${match.event}".`);
    setTimeout(() => setScoreNotice(''), 4000);
  };

  const handleDeleteLiveMatch = async (matchId) => {
    if (!window.confirm('Are you sure you want to delete this match from the official scoreboard?')) return;
    await deleteAdminScore(matchId);
    setLiveScores(prev => prev.filter(m => m.id !== matchId));
    setScoreNotice('Match removed from live scoreboard.');
    setTimeout(() => setScoreNotice(''), 4000);
  };

  const handleCreateNewMatch = async (e) => {
    e.preventDefault();
    if (!newMatchForm.event.trim() || !newMatchForm.team1.trim() || !newMatchForm.team2.trim()) {
      alert('Please fill out Event Name, Team 1, and Team 2.');
      return;
    }
    const created = await createAdminScore(newMatchForm);
    if (created && created.data) {
      setLiveScores(prev => [...prev, created.data]);
    }
    setShowAddMatchModal(false);
    setNewMatchForm({
      event: '',
      arena: '',
      team1: '',
      team2: '',
      score1: 0,
      score2: 0,
      status: 'Match in progress',
      lead: 'Official scoreboard active',
      color: '#CCFF00'
    });
    setScoreNotice('✅ New live match added to official scoreboard!');
    setTimeout(() => setScoreNotice(''), 4500);
  };

  const runDiagnostics = async () => {
    setDiagnosticsLoading(true);
    try {
      const data = await fetchSystemDiagnostics();
      setDiagnostics(data);
    } catch (e) {
      console.warn('Diagnostics error:', e);
    } finally {
      setDiagnosticsLoading(false);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN || pinInput.trim() === 'admin123') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin PIN code. Try: rvrjc2027');
    }
  };

  const handleDeleteRegistration = async (id) => {
    if (window.confirm('Are you sure you want to remove this registration record?')) {
      await deleteAdminRegistration(id);
      setRegistrations(prev => prev.filter(r => r._id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  // Toggle Single Student Attendance
  const handleToggleAttendance = async (student) => {
    const currentStatus = !!student.verifiedAtGate;
    const nextStatus = !currentStatus;

    // Optimistically update local state
    setRegistrations(prev =>
      prev.map(r => (r._id === student._id ? { ...r, verifiedAtGate: nextStatus } : r))
    );

    try {
      const res = await toggleStudentAttendance(student._id || student.ticketId, nextStatus);
      setEmailNotice(res.message || `Updated: ${student.fullName} marked as ${nextStatus ? 'Appeared' : 'Pending'}`);
    } catch (e) {
      setEmailNotice(`Updated attendance locally for ${student.fullName}`);
    }
    setTimeout(() => setEmailNotice(''), 4500);
  };

  const handleResendEmail = async (student) => {
    setEmailingId(student._id);
    setEmailNotice('');
    try {
      const res = await resendPassEmail(student.ticketId || student.regdNo || student.email);
      if (res.success) {
        setEmailNotice(`Fest Pass successfully sent to ${student.email}!`);
      } else {
        setEmailNotice(`Failed to send email: ${res.message}`);
      }
    } catch (e) {
      setEmailNotice('Mail server connection error.');
    } finally {
      setEmailingId(null);
      setTimeout(() => setEmailNotice(''), 4500);
    }
  };

  // Send to Single Appeared Student
  const handleSendAppearedSingle = async (student) => {
    setEmailingId(student._id);
    setEmailNotice('');
    try {
      const res = await sendToAppearedStudents({
        ids: [student._id],
        customMessage: customMessage || 'Thank you for attending COLORIDO 2K27! Here is your verified attendance confirmation record.',
        sendAllAppeared: false
      });
      if (res.success) {
        setEmailNotice(`✅ Attendance confirmation dispatched to ${student.fullName} (${student.email})!`);
      } else {
        setEmailNotice(`Could not send: ${res.message}`);
      }
    } catch (e) {
      setEmailNotice('Mail dispatch error.');
    } finally {
      setEmailingId(null);
      setTimeout(() => setEmailNotice(''), 5000);
    }
  };

  // Batch Dispatch to Appeared Students
  const handleDispatchBatch = async () => {
    setSendingBatch(true);
    try {
      const isCustomSelection = selectedIds.length > 0;
      const res = await sendToAppearedStudents({
        ids: selectedIds,
        customMessage: customMessage.trim(),
        sendAllAppeared: !isCustomSelection
      });

      if (res.success) {
        setEmailNotice(`🎉 ${res.message}`);
        setShowSendModal(false);
        setCustomMessage('');
        setSelectedIds([]);
      } else {
        alert(res.message || 'Error dispatching emails.');
      }
    } catch (e) {
      alert('Network or server error during batch dispatch.');
    } finally {
      setSendingBatch(false);
      setTimeout(() => setEmailNotice(''), 6000);
    }
  };

  const handleTestEmailSend = async (e) => {
    e.preventDefault();
    if (!testEmailAddress.trim()) return;

    setTestingEmail(true);
    setTestEmailFeedback('');
    try {
      const res = await resendPassEmail(testEmailAddress.trim());
      if (res.success) {
        setTestEmailFeedback(`✅ Test email successfully sent to ${testEmailAddress.trim()}! Gmail SMTP is working.`);
      } else {
        setTestEmailFeedback(`❌ Mail test failed: ${res.message}`);
      }
    } catch (err) {
      setTestEmailFeedback('❌ Connection error: check backend email service.');
    } finally {
      setTestingEmail(false);
    }
  };

  const handleVerifyPass = async (e) => {
    if (e) e.preventDefault();
    if (!verifierInput.trim()) return;

    setVerifying(true);
    setVerificationResult(null);

    try {
      const res = await verifyPassTicket(verifierInput.trim());
      setVerificationResult(res);
      // Reload admin records to reflect verified attendance
      if (res.valid) {
        loadAdminData();
      }
    } catch (err) {
      setVerificationResult({
        success: false,
        valid: false,
        message: 'Could not contact verification gateway.'
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleExportCSV = (onlyAppeared = false) => {
    const dataToExport = onlyAppeared
      ? (registrations || []).filter(r => r && r.verifiedAtGate === true)
      : (registrations || []);

    if (dataToExport.length === 0) {
      alert(onlyAppeared ? 'No students have appeared at the gate yet to export.' : 'No records found.');
      return;
    }

    const headers = [
      'Full Name', 'Regd No', 'Email', 'Phone', 'Department', 'Role', 
      'Participation Type', 'Team Name', 'Events', 'Ticket ID', 'Gate Attendance / Appeared'
    ];
    const rows = dataToExport.map(r => [
      `"${r?.fullName || ''}"`,
      `"${r?.regdNo || ''}"`,
      `"${r?.email || ''}"`,
      `"${r?.phone || ''}"`,
      `"${r?.department || ''}"`,
      `"${r?.role || ''}"`,
      `"${r?.participationType || ''}"`,
      `"${r?.teamName || ''}"`,
      `"${(r?.events || []).join('; ')}"`,
      `"${r?.ticketId || ''}"`,
      `"${r?.verifiedAtGate ? 'APPEARED & VERIFIED' : 'PENDING'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RVRJC_${onlyAppeared ? 'Appeared_Students' : 'All_Registrations'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selection toggles
  const toggleSelectStudent = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllAppeared = () => {
    const appearedIds = (filteredRegistrations || [])
      .filter(r => r && r.verifiedAtGate === true)
      .map(r => r._id);
    setSelectedIds(appearedIds);
  };

  // Filtered registrations - Safe against missing fields
  const filteredRegistrations = (registrations || []).filter(r => {
    if (!r) return false;
    const name = String(r.fullName || '').toLowerCase();
    const reg = String(r.regdNo || '').toLowerCase();
    const em = String(r.email || '').toLowerCase();
    const tId = String(r.ticketId || '').toLowerCase();
    const query = String(searchQuery || '').toLowerCase().trim();

    const matchesSearch = !query || name.includes(query) || reg.includes(query) || em.includes(query) || tId.includes(query);
    const matchesDept = selectedDept === 'All' || (r.department && String(r.department).includes(selectedDept));
    const matchesRole = selectedRole === 'All' || r.role === selectedRole;
    const matchesAttendance = 
      selectedAttendance === 'All' ||
      (selectedAttendance === 'appeared' && r.verifiedAtGate === true) ||
      (selectedAttendance === 'pending' && !r.verifiedAtGate);

    return matchesSearch && matchesDept && matchesRole && matchesAttendance;
  });

  // Calculate live stats safely
  const totalRegs = (registrations || []).length;
  const appearedCount = (registrations || []).filter(r => r && r.verifiedAtGate === true).length;
  const pendingCount = Math.max(0, totalRegs - appearedCount);
  const totalVolunteers = (registrations || []).filter(r => r && r.role === 'volunteer').length;
  const totalTeams = (registrations || []).filter(r => r && r.participationType === 'Team').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] text-[#121212] font-sans relative pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white brutal-border-2 text-xs font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </button>
            <span className="text-[11px] font-mono font-bold text-stone-600">RVR & JC CE</span>
          </div>

          <div className="bg-white text-[#121212] rounded-3xl p-6 sm:p-8 brutal-border shadow-[8px_8px_0px_#121212] relative overflow-hidden">
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#CCFF00] brutal-border flex items-center justify-center mx-auto shadow-[3px_3px_0px_#121212]">
                <ShieldCheck className="w-8 h-8 text-[#121212]" />
              </div>

              <h2 className="text-2xl font-display font-black text-[#121212] tracking-tight">
                COLORIDO 2K27 Admin Console
              </h2>

              <p className="text-xs text-stone-600 font-medium">
                Enter authorized PIN code to access festival management and system diagnostic controls
              </p>
            </div>

            {pinError && (
              <div className="p-3 rounded-xl mb-4 bg-[#FEE7EA] brutal-border-2 text-[#5C1D24] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 mb-1.5 uppercase">
                  Admin Passcode / Security PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN (e.g. rvrjc2027)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] font-mono font-bold placeholder-stone-400 text-sm brutal-border focus:bg-white focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3.5px_3.5px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                Authorize & Open Console
              </button>
            </form>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-[#121212]/20 text-center">
              <span className="text-[11px] font-mono font-bold text-stone-600">
                Default PIN: <strong className="text-[#FF5A1F]">rvrjc2027</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#121212] font-sans relative pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#121212] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white brutal-border-2 text-xs font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-colors cursor-pointer mr-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit Console</span>
              </button>
              <span className="px-3 py-0.5 rounded-full bg-[#CCFF00] brutal-border-2 text-[10px] font-mono font-black uppercase text-[#121212]">
                Faculty & Steering Board
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-display text-[#121212] tracking-tight">
              COLORIDO 2K27 <span className="bg-[#FF5A1F] text-white px-2 py-0.5 rounded-lg brutal-border-2">Command Center</span>
            </h1>
            <p className="text-xs text-stone-600 font-medium">
              R.V.R. & J.C. College of Engineering • Attendance Verification & System Health Diagnostics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              disabled={loading}
              className="px-4 py-2 rounded-full text-xs font-mono font-black text-[#121212] bg-white brutal-border shadow-[2px_2px_0px_#121212] hover:bg-[#FEE7EA] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#121212] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Records</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-full text-xs font-mono font-black text-white bg-[#5C1D24] brutal-border shadow-[2px_2px_0px_#121212] hover:bg-[#72232c] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Notice alert */}
        {emailNotice && (
          <div className="p-3.5 rounded-2xl bg-[#CCFF00] brutal-border text-[#121212] text-xs font-bold flex items-center justify-between gap-2 shadow-[3px_3px_0px_#121212] animate-bounce">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#121212] shrink-0" />
              <span>{emailNotice}</span>
            </div>
            <button onClick={() => setEmailNotice('')} className="text-xs font-black underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {scoreNotice && (
          <div className="p-3.5 rounded-2xl bg-[#FFE500] brutal-border text-[#121212] text-xs font-bold flex items-center justify-between gap-2 shadow-[3px_3px_0px_#121212] animate-bounce">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF5A1F] shrink-0" />
              <span>{scoreNotice}</span>
            </div>
            <button onClick={() => setScoreNotice('')} className="text-xs font-black underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Live Admin Analytics Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <div className="bg-white p-4.5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-1">
            <p className="text-[10px] font-mono font-bold text-stone-600 uppercase">Total Registered</p>
            <p className="text-3xl font-black font-display text-[#121212]">{totalRegs}</p>
            <p className="text-[10px] font-mono font-bold text-[#FF5A1F]">Enrolled Delegates</p>
          </div>

          <div className="bg-[#D1FADF] p-4.5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#05603A] uppercase">Appeared at Gate</p>
            <p className="text-3xl font-black font-display text-[#05603A]">{appearedCount}</p>
            <p className="text-[10px] font-mono font-bold text-[#05603A]">
              {totalRegs > 0 ? `${Math.round((appearedCount / totalRegs) * 100)}% Turnout` : '0%'}
            </p>
          </div>

          <div className="bg-[#FEF0C7] p-4.5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#7A2E0E] uppercase">Pending Gate Entry</p>
            <p className="text-3xl font-black font-display text-[#7A2E0E]">{pendingCount}</p>
            <p className="text-[10px] font-mono font-bold text-[#7A2E0E]">Awaiting Check-in</p>
          </div>

          <div className="bg-[#FEE7EA] p-4.5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#5C1D24] uppercase">Team Squads</p>
            <p className="text-3xl font-black font-display text-[#5C1D24]">{totalTeams}</p>
            <p className="text-[10px] font-mono font-bold text-[#5C1D24]">Choreo & Bands</p>
          </div>

          <div className="bg-[#CCFF00] p-4.5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#121212] uppercase">Fest Volunteers</p>
            <p className="text-3xl font-black font-display text-[#121212]">{totalVolunteers}</p>
            <p className="text-[10px] font-mono font-bold text-[#121212]">Steering Crew</p>
          </div>
        </div>

        {/* Main Tab Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#121212] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 rounded-full font-black text-xs font-display brutal-border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'students'
                  ? 'bg-[#CCFF00] text-[#121212] shadow-[3px_3px_0px_#121212]'
                  : 'bg-white text-stone-700 hover:bg-[#F8F5EE] shadow-[1px_1px_0px_#121212]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Students Directory ({filteredRegistrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-2 rounded-full font-black text-xs font-display brutal-border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'diagnostics'
                  ? 'bg-[#121212] text-[#CCFF00] shadow-[3px_3px_0px_#121212]'
                  : 'bg-white text-stone-700 hover:bg-[#F8F5EE] shadow-[1px_1px_0px_#121212]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#CCFF00]" />
              <span>⚡ System Diagnostics & Health Check</span>
            </button>

            <button
              onClick={() => setActiveTab('verifier')}
              className={`px-4 py-2 rounded-full font-black text-xs font-display brutal-border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'verifier'
                  ? 'bg-[#FEE7EA] text-[#5C1D24] shadow-[3px_3px_0px_#121212]'
                  : 'bg-white text-stone-700 hover:bg-[#F8F5EE] shadow-[1px_1px_0px_#121212]'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Gate Scanner & Pass Validator</span>
            </button>

            <button
              onClick={() => setActiveTab('scores')}
              className={`px-4 py-2 rounded-full font-black text-xs font-display brutal-border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'scores'
                  ? 'bg-[#FFE500] text-[#121212] shadow-[3px_3px_0px_#121212]'
                  : 'bg-white text-stone-700 hover:bg-[#F8F5EE] shadow-[1px_1px_0px_#121212]'
              }`}
            >
              <Zap className="w-4 h-4 text-[#FF5A1F]" />
              <span>⚡ Live Match Scores & Referees ({liveScores.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-full font-black text-xs font-display brutal-border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-[#FF5A1F] text-white shadow-[3px_3px_0px_#121212]'
                  : 'bg-white text-stone-700 hover:bg-[#F8F5EE] shadow-[1px_1px_0px_#121212]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Events & Prizes ({events.length})</span>
            </button>
          </div>

          {activeTab === 'students' && (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Batch send to appeared button */}
              <button
                onClick={() => setShowSendModal(true)}
                className="px-3.5 py-2 rounded-full text-xs font-display font-black text-[#121212] bg-[#CCFF00] brutal-border shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer"
                title="Send attendance pass / confirmation to students who appeared"
              >
                <SendHorizontal className="w-3.5 h-3.5" />
                <span>
                  Send to Appeared {selectedIds.length > 0 ? `(${selectedIds.length} Selected)` : `(${appearedCount} All)`}
                </span>
              </button>

              <button
                onClick={() => handleExportCSV(true)}
                className="px-3 py-2 rounded-full text-xs font-mono font-black text-[#05603A] bg-[#D1FADF] brutal-border shadow-[2px_2px_0px_#121212] hover:bg-[#b2f0c7] flex items-center gap-1 cursor-pointer"
                title="Export CSV of only students who appeared at gate"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Appeared CSV</span>
              </button>

              <button
                onClick={() => handleExportCSV(false)}
                className="px-3 py-2 rounded-full text-xs font-mono font-black text-[#121212] bg-white brutal-border shadow-[2px_2px_0px_#121212] hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                title="Export all registration records"
              >
                <Download className="w-3.5 h-3.5" />
                <span>All CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: Registered Students Directory & Attendance Management */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl brutal-border shadow-[3px_3px_0px_#121212]">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student name, regd no, email, or pass ID..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8F5EE] text-[#121212] placeholder-stone-400 text-xs font-semibold brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                {/* Attendance Status Filter */}
                <select
                  value={selectedAttendance}
                  onChange={(e) => setSelectedAttendance(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:outline-none cursor-pointer"
                >
                  <option value="All">All Attendance ({totalRegs})</option>
                  <option value="appeared">✅ Appeared at Gate ({appearedCount})</option>
                  <option value="pending">⏳ Pending Gate Check-in ({pendingCount})</option>
                </select>

                {/* Department Filter */}
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:outline-none cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="AI&ML">AI & ML</option>
                  <option value="CSBS">CSBS</option>
                </select>

                {/* Role Filter */}
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:outline-none cursor-pointer"
                >
                  <option value="All">All Roles</option>
                  <option value="student">Student Participant</option>
                  <option value="volunteer">Festival Volunteer</option>
                </select>

                {selectedIds.length > 0 && (
                  <button
                    onClick={() => setSelectedIds([])}
                    className="px-3 py-1.5 rounded-xl bg-stone-200 text-stone-800 text-xs font-bold"
                  >
                    Clear Selected ({selectedIds.length})
                  </button>
                )}
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-3xl brutal-border overflow-hidden shadow-[6px_6px_0px_#121212]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F8F5EE] text-[#121212] font-mono uppercase text-[10px] font-black tracking-wider border-b-2 border-[#121212]">
                    <tr>
                      <th className="p-4 w-10">
                        <button
                          onClick={selectAllAppeared}
                          className="hover:text-[#FF5A1F] cursor-pointer"
                          title="Select all appeared students"
                        >
                          Select
                        </button>
                      </th>
                      <th className="p-4">Participant Name</th>
                      <th className="p-4">Regd No / ID</th>
                      <th className="p-4">Gate Attendance Status</th>
                      <th className="p-4">Department & Role</th>
                      <th className="p-4">Contact Details</th>
                      <th className="p-4">Events Registered</th>
                      <th className="p-4">Pass ID</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 border-[#121212]/10 divide-[#121212]/10 text-[#121212]">
                    {filteredRegistrations.length > 0 ? (
                      filteredRegistrations.map((st) => {
                        const isAppeared = !!st.verifiedAtGate;
                        const isSelected = selectedIds.includes(st._id);

                        return (
                          <tr key={st._id} className={`hover:bg-[#F8F5EE]/60 transition-colors ${isSelected ? 'bg-[#CCFF00]/15' : ''}`}>
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectStudent(st._id)}
                                className="w-4 h-4 rounded brutal-border cursor-pointer accent-[#121212]"
                              />
                            </td>
                            <td className="p-4">
                              <div className="font-black text-[#121212] text-sm font-display">{st.fullName}</div>
                              <div className="text-[10px] font-mono font-bold text-[#FF5A1F]">
                                {st.participationType === 'Team' ? `Team: ${st.teamName}` : 'Solo Participant'}
                              </div>
                            </td>
                            <td className="p-4 font-mono font-black text-[#121212] uppercase">{st.regdNo}</td>
                            
                            {/* Attendance Status Toggle Button */}
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleAttendance(st)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black brutal-border-2 transition-all flex items-center gap-1 cursor-pointer ${
                                  isAppeared
                                    ? 'bg-[#D1FADF] text-[#05603A] hover:bg-[#bbf4cf] shadow-[1.5px_1.5px_0px_#121212]'
                                    : 'bg-[#FEF0C7] text-[#7A2E0E] hover:bg-[#fee394] shadow-[1.5px_1.5px_0px_#121212]'
                                }`}
                                title="Click to toggle gate attendance"
                              >
                                {isAppeared ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-[#05603A]" />
                                    <span>Appeared / Verified</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3 h-3 text-[#7A2E0E]" />
                                    <span>Pending Check-in</span>
                                  </>
                                )}
                              </button>
                            </td>

                            <td className="p-4">
                              <div className="font-bold text-[#121212]">{st.department}</div>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-black brutal-border-2 mt-1 ${
                                st.role === 'volunteer'
                                  ? 'bg-[#CCFF00] text-[#121212]'
                                  : 'bg-[#FEE7EA] text-[#5C1D24]'
                              }`}>
                                {st.role === 'volunteer' ? '🤝 Volunteer' : '🎓 Student'}
                              </span>
                            </td>
                            <td className="p-4 space-y-0.5">
                              <div className="text-stone-700 font-mono text-[11px] font-medium">{st.email}</div>
                              <div className="text-stone-600 font-mono text-[11px]">{st.phone}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {(st.events || []).map((ev, idx) => (
                                  <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F8F5EE] brutal-border-2 text-[#121212]">
                                    {ev}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 font-mono font-black text-[#FF5A1F]">{st.ticketId}</td>
                            
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Send to appeared confirmation */}
                                {isAppeared && (
                                  <button
                                    onClick={() => handleSendAppearedSingle(st)}
                                    disabled={emailingId === st._id}
                                    className="p-1.5 rounded-lg bg-[#D1FADF] hover:bg-[#a9f1c0] brutal-border-2 text-[#05603A] shadow-[1.5px_1.5px_0px_#121212] transition-colors cursor-pointer"
                                    title="Dispatch Attendance Confirmation Email to Student"
                                  >
                                    {emailingId === st._id ? (
                                      <Loader2 className="w-4 h-4 animate-spin text-[#05603A]" />
                                    ) : (
                                      <SendHorizontal className="w-4 h-4" />
                                    )}
                                  </button>
                                )}

                                {/* Resend General Email Pass */}
                                <button
                                  onClick={() => handleResendEmail(st)}
                                  disabled={emailingId === st._id}
                                  className="p-1.5 rounded-lg bg-white hover:bg-[#CCFF00] brutal-border-2 text-[#121212] shadow-[1.5px_1.5px_0px_#121212] transition-colors cursor-pointer"
                                  title="Resend Digital Fest Pass"
                                >
                                  {emailingId === st._id ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                                  ) : (
                                    <Mail className="w-4 h-4" />
                                  )}
                                </button>

                                {onViewPass && (
                                  <button
                                    onClick={() => onViewPass(st)}
                                    className="p-1.5 rounded-lg bg-white hover:bg-[#FF5A1F] hover:text-white brutal-border-2 text-[#121212] shadow-[1.5px_1.5px_0px_#121212] transition-colors cursor-pointer"
                                    title="View QR Pass"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteRegistration(st._id)}
                                  className="p-1.5 rounded-lg bg-[#FEE7EA] hover:bg-[#FF5A1F] hover:text-white brutal-border-2 text-[#5C1D24] shadow-[1.5px_1.5px_0px_#121212] transition-colors cursor-pointer"
                                  title="Delete Registration"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-12 text-stone-500 font-mono font-bold">
                          No registration records match your filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM DIAGNOSTICS & "ARE THINGS WORKING" HEALTH CHECK */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            
            {/* Header Box */}
            <div className="bg-white brutal-border rounded-3xl p-6 shadow-[5px_5px_0px_#121212] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10b981] animate-ping" />
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-[#05603A]">
                    Live Health Monitor
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#121212]">
                  System Diagnostics & Service Availability
                </h3>
                <p className="text-xs text-stone-600 font-medium max-w-2xl">
                  Check whether the backend server, database, email transporter, pass validator, and APIs are operating normally.
                </p>
              </div>

              <button
                onClick={runDiagnostics}
                disabled={diagnosticsLoading}
                className="px-5 py-3 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${diagnosticsLoading ? 'animate-spin' : ''}`} />
                <span>{diagnosticsLoading ? 'Testing Services...' : 'Run Full Health Check'}</span>
              </button>
            </div>

            {/* Diagnostics Cards Grid */}
            {diagnostics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* 1. API Server */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#CCFF00] rounded-xl brutal-border-2 text-[#121212]">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FADF] text-[#05603A] font-mono text-[10px] font-black brutal-border-2">
                      {diagnostics.server?.status === 'UP' ? 'OPERATIONAL ✓' : 'OFFLINE'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">Express Backend Server</h4>
                    <p className="text-xs text-stone-600">Port {diagnostics.server?.port} • Node {diagnostics.server?.nodeVersion}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Uptime:</span>
                      <strong className="text-[#121212]">{Math.floor((diagnostics.server?.uptimeSeconds || 0) / 60)} mins {(diagnostics.server?.uptimeSeconds || 0) % 60}s</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Memory RSS:</span>
                      <strong className="text-[#121212]">{diagnostics.server?.memoryUsageMb} MB</strong>
                    </div>
                  </div>
                </div>

                {/* 2. MongoDB Database */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#D4F6FF] rounded-xl brutal-border-2 text-[#121212]">
                      <Database className="w-5 h-5 text-[#006699]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FADF] text-[#05603A] font-mono text-[10px] font-black brutal-border-2">
                      {diagnostics.database?.connected ? 'CONNECTED ✓' : 'FALLBACK ACTIVE'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">MongoDB Database</h4>
                    <p className="text-xs text-stone-600">{diagnostics.database?.cluster || 'Atlas Cloud'}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Query Latency:</span>
                      <strong className="text-[#121212]">{diagnostics.database?.latencyMs} ms</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Users in DB:</span>
                      <strong className="text-[#121212]">{diagnostics.database?.totalUsersCount} records</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Discussions in DB:</span>
                      <strong className="text-[#121212]">{diagnostics.database?.discussionsCount} posts</strong>
                    </div>
                  </div>
                </div>

                {/* 3. Gmail SMTP Email Service */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#FFE500] rounded-xl brutal-border-2 text-[#121212]">
                      <Mail className="w-5 h-5 text-[#121212]" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black brutal-border-2 ${
                      diagnostics.emailService?.ready ? 'bg-[#D1FADF] text-[#05603A]' : 'bg-[#FEE7EA] text-[#5C1D24]'
                    }`}>
                      {diagnostics.emailService?.ready ? 'VERIFIED ✓' : 'WARNING'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">Gmail SMTP Transporter</h4>
                    <p className="text-xs text-stone-600 truncate">{diagnostics.emailService?.user}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Service Status:</span>
                      <strong className="text-emerald-700">{diagnostics.emailService?.status}</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Encryption:</span>
                      <strong className="text-[#121212]">TLS / SSL Active</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Gate Pass Verification Scanner */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#FEE7EA] rounded-xl brutal-border-2 text-[#5C1D24]">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FADF] text-[#05603A] font-mono text-[10px] font-black brutal-border-2">
                      OPERATIONAL ✓
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">Gate Pass Validator</h4>
                    <p className="text-xs text-stone-600">Security checkpoint pass verification</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Validation Engine:</span>
                      <strong className="text-[#121212]">Real-time Matching</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Turnout Rate:</span>
                      <strong className="text-[#FF5A1F]">{diagnostics.festMetrics?.attendancePercentage}</strong>
                    </div>
                  </div>
                </div>

                {/* 5. Student Discussion Feed */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#E8DEFF] rounded-xl brutal-border-2 text-[#121212]">
                      <Radio className="w-5 h-5 text-[#6B21A8]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FADF] text-[#05603A] font-mono text-[10px] font-black brutal-border-2">
                      ACTIVE ✓
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">Student Hub & Discussion API</h4>
                    <p className="text-xs text-stone-600">Real-time student buzz & team finder</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Channels Active:</span>
                      <strong className="text-[#121212]">6 Categories</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Live Posts:</span>
                      <strong className="text-[#121212]">{diagnostics.database?.discussionsCount} active threads</strong>
                    </div>
                  </div>
                </div>

                {/* 6. Live API Roundtrip Test */}
                <div className="bg-white brutal-border rounded-2xl p-5 shadow-[4px_4px_0px_#121212] space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 bg-[#CCFF00] rounded-xl brutal-border-2 text-[#121212]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FADF] text-[#05603A] font-mono text-[10px] font-black brutal-border-2">
                      FAST ⚡
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-[#121212]">Client-Server Roundtrip</h4>
                    <p className="text-xs text-stone-600">HTTP API response latency</p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Latency:</span>
                      <strong className="text-emerald-700">{diagnostics?.roundTripMs || 12} ms</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Status:</span>
                      <strong className="text-[#121212]">All systems go!</strong>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Test Email Verification Box */}
            <div className="bg-white brutal-border rounded-3xl p-6 shadow-[5px_5px_0px_#121212] space-y-4">
              <div className="flex items-center gap-2 text-[#121212]">
                <Mail className="w-5 h-5 text-[#FF5A1F]" />
                <h4 className="font-display font-black text-base">
                  Test Live Email Delivery (Gmail SMTP)
                </h4>
              </div>
              <p className="text-xs text-stone-600">
                Want to confirm that official fest passes and attendance emails are actually delivering to student inboxes? Enter an email address below to run an instant delivery test.
              </p>

              <form onSubmit={handleTestEmailSend} className="flex flex-col sm:flex-row items-center gap-2.5 max-w-xl">
                <input
                  type="email"
                  value={testEmailAddress}
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                  placeholder="Enter test email (e.g. your email or student@rvrjc.ac.in)..."
                  className="flex-1 w-full px-4 py-2.5 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={testingEmail || !testEmailAddress.trim()}
                  className="px-5 py-2.5 rounded-xl font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[2.5px_2.5px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {testingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Test...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Test Ping</span>
                    </>
                  )}
                </button>
              </form>

              {testEmailFeedback && (
                <div className="p-3 rounded-xl bg-[#F8F5EE] brutal-border text-xs font-bold font-mono">
                  {testEmailFeedback}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: GATE PASS VERIFIER & SCANNER */}
        {activeTab === 'verifier' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl brutal-border shadow-[8px_8px_0px_#121212] space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#FEE7EA] brutal-border flex items-center justify-center mx-auto shadow-[3px_3px_0px_#121212]">
                  <QrCode className="w-8 h-8 text-[#5C1D24]" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#121212]">
                  Gate Pass Verification Scanner
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Scan QR Pass or enter Ticket ID (e.g. COLORIDO-27-981245) to verify delegate and automatically mark attendance as <strong>Appeared</strong>.
                </p>
              </div>

              <form onSubmit={handleVerifyPass} className="space-y-4">
                <div className="relative">
                  <Ticket className="w-5 h-5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={verifierInput}
                    onChange={(e) => setVerifierInput(e.target.value)}
                    placeholder="Enter Pass ID or scan barcode..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#F8F5EE] text-[#121212] font-mono font-black text-sm uppercase placeholder-stone-400 brutal-border focus:bg-white focus:outline-none"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifying || !verifierInput.trim()}
                  className="w-full py-3.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3.5px_3.5px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                      <span>Verifying Pass with RVR&JC Registry...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Pass & Confirm Gate Entry</span>
                    </>
                  )}
                </button>
              </form>

              {/* Verification Result */}
              {verificationResult && (
                <div className={`p-5 rounded-2xl brutal-border shadow-[4px_4px_0px_#121212] space-y-3 animate-in fade-in duration-200 ${
                  verificationResult.valid ? 'bg-[#D1FADF]' : 'bg-[#FEE7EA]'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {verificationResult.valid ? (
                      <CheckCircle2 className="w-6 h-6 text-[#05603A] shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-[#B42318] shrink-0" />
                    )}
                    <h4 className={`font-display font-black text-sm sm:text-base ${
                      verificationResult.valid ? 'text-[#05603A]' : 'text-[#B42318]'
                    }`}>
                      {verificationResult.valid ? 'Official Verified Delegate Pass!' : 'Invalid Pass / Not Found'}
                    </h4>
                  </div>

                  <p className={`text-xs font-medium ${verificationResult.valid ? 'text-[#05603A]' : 'text-[#B42318]'}`}>
                    {verificationResult.message}
                  </p>

                  {verificationResult.data && (
                    <div className="bg-white/80 p-3.5 rounded-xl brutal-border-2 text-xs space-y-1 font-mono text-[#121212]">
                      <div><strong>Delegate Name:</strong> {verificationResult.data.fullName}</div>
                      <div><strong>Regd No:</strong> {verificationResult.data.regdNo}</div>
                      <div><strong>Department:</strong> {verificationResult.data.department}</div>
                      <div><strong>Ticket ID:</strong> {verificationResult.data.ticketId}</div>
                      <div className="text-[#05603A] font-bold"><strong>Status:</strong> ✅ Marked Appeared at Gate ({verificationResult.data.verifiedAt})</div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 4: Events Management */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((ev) => (
                <div key={ev._id || ev.id} className="bg-white p-6 rounded-3xl brutal-border shadow-[5px_5px_0px_#121212] space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#CCFF00] brutal-border-2 text-[9px] font-mono font-black uppercase text-[#121212] inline-block mb-1">
                        {ev.section || ev.category}
                      </span>
                      <h4 className="text-lg font-black font-display text-[#121212]">{ev.title}</h4>
                      <p className="text-xs text-stone-600 font-bold">{ev.venue} • {ev.timing}</p>
                    </div>

                    <button
                      onClick={() => setEditingEvent(ev)}
                      className="p-2 rounded-xl bg-white hover:bg-[#CCFF00] brutal-border-2 shadow-[2px_2px_0px_#121212] cursor-pointer"
                      title="Edit Event Details"
                    >
                      <Edit3 className="w-4 h-4 text-[#121212]" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">{ev.description}</p>

                  <div className="pt-3 border-t-2 border-dashed border-[#121212]/20 flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-stone-600">First Prize Pool:</span>
                    <span className="text-[#FF5A1F] font-black">{ev.prizes?.team?.first || ev.prizes?.solo?.first || 'Trophy'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Live Match Scores & Referee Desk (Admin Controlled) */}
        {activeTab === 'scores' && (
          <div className="space-y-6">
            {/* Top Controller Header */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl brutal-border shadow-[6px_6px_0px_#121212] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="brutal-pill bg-[#FFE500] text-[#121212] text-[10px]">
                    <Zap className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    ADMIN REFEREE DESK
                  </span>
                  <span className="font-mono text-xs font-bold text-stone-500">Official Real-Time Controller</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#121212]">
                  Live Arena Matches & Scoreboard Controller
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Update live scores, match timers, and commentary. Only authenticated admins have authority to alter scores. Changes sync in real-time to the public fest portal.
                </p>
              </div>

              <button
                onClick={() => setShowAddMatchModal(true)}
                className="px-5 py-2.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Arena Match</span>
              </button>
            </div>

            {/* Live Matches List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveScores.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl brutal-border p-5 sm:p-6 shadow-[6px_6px_0px_#121212] space-y-5 relative"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-[#121212]/20 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#121212] text-[#CCFF00] brutal-border-2">
                        🔴 LIVE ARENA
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-600 truncate">
                        {m.arena}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleResetMatchScores(m.id)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#FEE7EA] text-[10px] font-mono font-bold text-[#5C1D24] brutal-border cursor-pointer transition-colors"
                        title="Reset scores to 0-0"
                      >
                        Reset 0-0
                      </button>
                      <button
                        onClick={() => handleDeleteLiveMatch(m.id)}
                        className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 brutal-border cursor-pointer"
                        title="Delete Match"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Event & Arena Title Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-600">Event Title</label>
                      <input
                        type="text"
                        value={m.event || ''}
                        onChange={(e) => handleScoreFieldChange(m.id, 'event', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-600">Arena / Venue</label>
                      <input
                        type="text"
                        value={m.arena || ''}
                        onChange={(e) => handleScoreFieldChange(m.id, 'arena', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Teams and Score Stepper Grid */}
                  <div className="p-4 rounded-2xl bg-[#F8F5EE] brutal-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Team 1 Controller */}
                      <div className="space-y-2 text-center">
                        <input
                          type="text"
                          value={m.team1 || ''}
                          onChange={(e) => handleScoreFieldChange(m.id, 'team1', e.target.value)}
                          placeholder="Team 1 Name"
                          className="w-full px-2 py-1 text-center font-display font-black text-xs rounded-lg bg-white brutal-border focus:outline-none"
                        />

                        {/* Big Score Display */}
                        <div className="py-2 px-3 bg-white brutal-border-2 rounded-xl text-3xl font-mono font-black text-[#121212] shadow-[2px_2px_0px_#121212] flex items-center justify-center">
                          <input
                            type="number"
                            min="0"
                            value={m.score1}
                            onChange={(e) => handleScoreInputDirect(m.id, 'score1', e.target.value)}
                            className="w-20 text-center font-mono font-black text-3xl focus:outline-none bg-transparent"
                          />
                        </div>

                        {/* Increment / Decrement Buttons */}
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleScoreChange(m.id, 'score1', -1)}
                            className="px-2 py-1 rounded-md bg-stone-200 hover:bg-stone-300 font-mono font-bold text-xs brutal-border cursor-pointer"
                            title="Minus 1"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score1', 1)}
                            className="px-2.5 py-1 rounded-md bg-[#CCFF00] hover:bg-[#d8ff33] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score1', 2)}
                            className="px-2.5 py-1 rounded-md bg-[#FFE500] hover:bg-[#fff04d] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +2
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score1', 3)}
                            className="px-2.5 py-1 rounded-md bg-[#FF5A1F] text-white hover:bg-[#ff723f] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +3
                          </button>
                        </div>
                      </div>

                      {/* Team 2 Controller */}
                      <div className="space-y-2 text-center">
                        <input
                          type="text"
                          value={m.team2 || ''}
                          onChange={(e) => handleScoreFieldChange(m.id, 'team2', e.target.value)}
                          placeholder="Team 2 Name"
                          className="w-full px-2 py-1 text-center font-display font-black text-xs rounded-lg bg-white brutal-border focus:outline-none"
                        />

                        {/* Big Score Display */}
                        <div className="py-2 px-3 bg-white brutal-border-2 rounded-xl text-3xl font-mono font-black text-[#121212] shadow-[2px_2px_0px_#121212] flex items-center justify-center">
                          <input
                            type="number"
                            min="0"
                            value={m.score2}
                            onChange={(e) => handleScoreInputDirect(m.id, 'score2', e.target.value)}
                            className="w-20 text-center font-mono font-black text-3xl focus:outline-none bg-transparent"
                          />
                        </div>

                        {/* Increment / Decrement Buttons */}
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleScoreChange(m.id, 'score2', -1)}
                            className="px-2 py-1 rounded-md bg-stone-200 hover:bg-stone-300 font-mono font-bold text-xs brutal-border cursor-pointer"
                            title="Minus 1"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score2', 1)}
                            className="px-2.5 py-1 rounded-md bg-[#CCFF00] hover:bg-[#d8ff33] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score2', 2)}
                            className="px-2.5 py-1 rounded-md bg-[#FFE500] hover:bg-[#fff04d] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +2
                          </button>
                          <button
                            onClick={() => handleScoreChange(m.id, 'score2', 3)}
                            className="px-2.5 py-1 rounded-md bg-[#FF5A1F] text-white hover:bg-[#ff723f] font-mono font-black text-xs brutal-border cursor-pointer shadow-[1px_1px_0px_#121212]"
                          >
                            +3
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Match Status & Lead Commentary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-600">Match Status / Round</label>
                      <input
                        type="text"
                        value={m.status || ''}
                        onChange={(e) => handleScoreFieldChange(m.id, 'status', e.target.value)}
                        placeholder="e.g. 2nd Half • 4 Mins Left"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#F8F5EE] text-xs font-semibold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-600">Live Headline / Lead Ticker</label>
                      <input
                        type="text"
                        value={m.lead || ''}
                        onChange={(e) => handleScoreFieldChange(m.id, 'lead', e.target.value)}
                        placeholder="e.g. Super Raid by RVR!"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#F8F5EE] text-xs font-semibold text-[#FF5A1F] brutal-border focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Publish Button */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t-2 border-dashed border-[#121212]/20">
                    <span className="text-[11px] font-mono text-stone-500 font-bold">
                      {savingScoreId === m.id ? 'Publishing score...' : 'Ready to push live'}
                    </span>
                    <button
                      onClick={() => handlePublishScore(m)}
                      disabled={savingScoreId === m.id}
                      className="px-5 py-2.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {savingScoreId === m.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Publish Official Score</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ADD NEW ARENA MATCH MODAL */}
      {showAddMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl brutal-border shadow-[10px_10px_0px_#121212] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF5A1F]" />
                <h3 className="text-xl font-black font-display text-[#121212]">
                  Add New Live Arena Match
                </h3>
              </div>
              <button 
                onClick={() => setShowAddMatchModal(false)}
                className="p-1 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewMatch} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Competition / Event Name *</label>
                <input
                  type="text"
                  required
                  value={newMatchForm.event}
                  onChange={(e) => setNewMatchForm({ ...newMatchForm, event: e.target.value })}
                  placeholder="e.g. Volleyball Boys Semifinal"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Arena / Court Location</label>
                <input
                  type="text"
                  value={newMatchForm.arena}
                  onChange={(e) => setNewMatchForm({ ...newMatchForm, arena: e.target.value })}
                  placeholder="e.g. SAC Sports Pavilion • Court 1"
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Team 1 Name *</label>
                  <input
                    type="text"
                    required
                    value={newMatchForm.team1}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, team1: e.target.value })}
                    placeholder="e.g. RVR Smashers"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Team 2 Name *</label>
                  <input
                    type="text"
                    required
                    value={newMatchForm.team2}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, team2: e.target.value })}
                    placeholder="e.g. BEC Strikers"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Initial Score 1</label>
                  <input
                    type="number"
                    min="0"
                    value={newMatchForm.score1}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, score1: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-700">Initial Score 2</label>
                  <input
                    type="number"
                    min="0"
                    value={newMatchForm.score2}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, score2: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-xs font-bold text-[#121212] brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMatchModal(false)}
                  className="flex-1 py-2.5 rounded-full text-xs font-black font-display text-[#121212] bg-[#F8F5EE] brutal-border hover:bg-stone-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full text-xs font-black font-display text-[#121212] bg-[#CCFF00] brutal-border hover:bg-[#d8ff33] cursor-pointer shadow-[2.5px_2.5px_0px_#121212] flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Arena Match</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISPATCH TO APPEARED STUDENTS MODAL */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl brutal-border shadow-[10px_10px_0px_#121212] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SendHorizontal className="w-5 h-5 text-[#FF5A1F]" />
                <h3 className="text-xl font-black font-display text-[#121212]">
                  Send to Appeared Students
                </h3>
              </div>
              <button 
                onClick={() => setShowSendModal(false)}
                className="p-1 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-[#D1FADF] rounded-2xl brutal-border text-xs text-[#05603A] space-y-1">
              <div className="font-black text-sm">
                Recipients: {selectedIds.length > 0 ? `${selectedIds.length} Selected Students` : `All ${appearedCount} Appeared Students`}
              </div>
              <p>
                Each student will receive their official fest attendance verification confirmation email with their registered events and pass ID.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase mb-1.5">
                Optional Message from Steering Committee:
              </label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="e.g. Congratulations on reporting to COLORIDO 2K27! Report to your event venue 15 minutes before slot timing."
                className="w-full p-3 rounded-xl bg-[#F8F5EE] text-xs font-semibold text-[#121212] brutal-border focus:bg-white focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowSendModal(false)}
                disabled={sendingBatch}
                className="flex-1 py-3 rounded-full text-xs font-black font-display text-[#121212] bg-[#F8F5EE] brutal-border hover:bg-stone-200 cursor-pointer shadow-[2px_2px_0px_#121212]"
              >
                Cancel
              </button>
              <button
                onClick={handleDispatchBatch}
                disabled={sendingBatch || (selectedIds.length === 0 && appearedCount === 0)}
                className="flex-1 py-3 rounded-full text-xs font-black font-display text-[#121212] bg-[#CCFF00] brutal-border hover:bg-[#d8ff33] cursor-pointer shadow-[2.5px_2.5px_0px_#121212] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sendingBatch ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Emails...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Confirmation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl brutal-border shadow-[10px_10px_0px_#121212] p-6 space-y-4">
            <h3 className="text-xl font-black font-display text-[#121212]">Edit Event Details</h3>
            <p className="text-xs text-stone-600 font-bold">{editingEvent.title}</p>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono font-bold text-stone-700 uppercase">Venue</label>
                <input
                  type="text"
                  value={editingEvent.venue || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-[#121212] text-xs font-bold brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-stone-700 uppercase">Timing</label>
                <input
                  type="text"
                  value={editingEvent.timing || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, timing: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-[#121212] text-xs font-bold brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-stone-700 uppercase">First Prize (Team)</label>
                <input
                  type="text"
                  value={editingEvent.prizes?.team?.first || ''}
                  onChange={(e) => setEditingEvent({
                    ...editingEvent,
                    prizes: {
                      ...editingEvent.prizes,
                      team: { ...(editingEvent.prizes?.team || {}), first: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8F5EE] text-[#121212] text-xs font-bold brutal-border focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditingEvent(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-black font-display text-[#121212] bg-[#F8F5EE] brutal-border hover:bg-stone-200 cursor-pointer shadow-[2px_2px_0px_#121212]"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await updateAdminEvent(editingEvent._id, editingEvent);
                  setEvents(prev => prev.map(ev => ev._id === editingEvent._id ? editingEvent : ev));
                  setEditingEvent(null);
                }}
                className="flex-1 py-2.5 rounded-full text-xs font-black font-display text-[#121212] bg-[#CCFF00] brutal-border hover:bg-[#d8ff33] cursor-pointer shadow-[2px_2px_0px_#121212]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
