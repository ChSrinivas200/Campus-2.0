import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck, Ticket, User, Loader2, AlertCircle, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onBackToHome, onGoToRegister, onGoToAdmin, onSuccessLogin }) {
  const [activeTab, setActiveTab] = useState('account');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regdNo, setRegdNo] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAccountLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email/student ID and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockTicket = {
        ticketId: `COL-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: 'RVR & JC Delegate',
        regdNo: email.includes('@') ? 'Y22CS001' : email.toUpperCase(),
        email: email.includes('@') ? email : `${email}@rvrjc.ac.in`,
        phone: '9876543210',
        department: 'Computer Science (CSE)',
        events: ['Choreoday (Theme Based)', 'Battle of the Bands'],
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=COLORIDO2K27-${email}`
      };
      if (onSuccessLogin) onSuccessLogin(mockTicket);
    }, 800);
  };

  const handlePassLookup = (e) => {
    e.preventDefault();
    setError('');
    if (!regdNo.trim() || !phone.trim()) {
      setError('Please enter your Registration Number and Mobile Number');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockTicket = {
        ticketId: `COL-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: 'Verified Fest Participant',
        regdNo: regdNo.toUpperCase(),
        email: `${regdNo.toLowerCase()}@rvrjc.ac.in`,
        phone: phone,
        department: 'Engineering Department',
        events: ['Choreoday (Theme Based)'],
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=COLORIDO2K27-${regdNo}`
      };
      if (onSuccessLogin) onSuccessLogin(mockTicket);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#121212] font-sans relative pt-24 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white brutal-border-2 text-xs font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </button>

          <span className="text-[11px] font-mono font-bold text-stone-600">R.V.R. & J.C. CE Portal</span>
        </div>

        {/* Neo-Brutalist Login Card */}
        <div className="bg-white text-[#121212] rounded-3xl p-6 sm:p-8 brutal-border shadow-[8px_8px_0px_#121212] relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#CCFF00] brutal-border flex items-center justify-center mx-auto shadow-[3px_3px_0px_#121212]">
              <KeyRound className="w-7 h-7 text-[#121212]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212] tracking-tight">
              Sign In to Fest Portal
            </h2>

            <p className="text-xs text-stone-600 font-medium">
              Access your festival registration pass, verified QR barcode, and schedule.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-[#F8F5EE] rounded-2xl brutal-border-2">
            <button
              onClick={() => { setActiveTab('account'); setError(''); }}
              className={`py-2 px-3 rounded-xl font-display font-black text-xs transition-all cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-[#121212] text-white shadow-[2px_2px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              Account Login
            </button>
            <button
              onClick={() => { setActiveTab('ticket-lookup'); setError(''); }}
              className={`py-2 px-3 rounded-xl font-display font-black text-xs transition-all cursor-pointer ${
                activeTab === 'ticket-lookup'
                  ? 'bg-[#121212] text-white shadow-[2px_2px_0px_#121212]'
                  : 'text-stone-600 hover:text-[#121212]'
              }`}
            >
              Fast Pass Lookup
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FEE7EA] brutal-border-2 text-[#5C1D24] text-xs font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Account Login Form */}
          {activeTab === 'account' ? (
            <form onSubmit={handleAccountLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  EMAIL OR STUDENT ID *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. Y22CS001 or email@rvrjc.ac.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] placeholder-stone-400 text-xs sm:text-sm brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  PASSWORD *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your account password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] placeholder-stone-400 text-xs sm:text-sm brutal-border focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-display font-black text-xs text-[#121212] bg-[#CCFF00] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#d8ff33] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-[#FF5A1F]" />}
                <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handlePassLookup} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  COLLEGE REGD NUMBER *
                </label>
                <input
                  type="text"
                  value={regdNo}
                  onChange={(e) => setRegdNo(e.target.value)}
                  placeholder="e.g. Y22CS084"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] uppercase font-mono font-bold placeholder-stone-400 text-xs sm:text-sm brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  REGISTERED PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F5EE] text-[#121212] placeholder-stone-400 text-xs sm:text-sm brutal-border focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-display font-black text-xs text-white bg-[#FF5A1F] brutal-border shadow-[3px_3px_0px_#121212] hover:bg-[#ff6e38] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                <span>{loading ? 'Locating Pass...' : 'Retrieve Festival Pass'}</span>
              </button>
            </form>
          )}

          {/* Footer Action */}
          <div className="pt-6 border-t-2 border-dashed border-[#121212]/20 text-center mt-6 space-y-3">
            <p className="text-xs text-stone-600 font-medium">
              Don't have a festival account yet?{' '}
              <button
                type="button"
                onClick={onGoToRegister}
                className="font-bold text-[#FF5A1F] hover:underline cursor-pointer"
              >
                Create Account here
              </button>
            </p>

            {onGoToAdmin && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onGoToAdmin}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE500] hover:bg-[#CCFF00] brutal-border-2 text-xs font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#121212]" />
                  <span>Faculty & Organizer Admin Portal</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
