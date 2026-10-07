import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Trophy, Ticket, CheckCircle2 } from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';

export default function RegisterPage({ onBackToHome, onGoToLogin, onSuccessRegistration, selectedEventName }) {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#121212] font-sans relative pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white brutal-border-2 text-xs font-display font-black text-[#121212] shadow-[2px_2px_0px_#121212] hover:bg-[#CCFF00] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-600">
            <span>Already registered?</span>
            <button
              onClick={onGoToLogin}
              className="px-3.5 py-1 rounded-full bg-white brutal-border-2 text-[#121212] font-display font-black hover:bg-[#FFE500] shadow-[2px_2px_0px_#121212] transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Embedded Registration Form */}
        <RegistrationForm
          selectedEventName={selectedEventName}
          onSuccessRegistration={onSuccessRegistration}
        />

      </div>
    </div>
  );
}
