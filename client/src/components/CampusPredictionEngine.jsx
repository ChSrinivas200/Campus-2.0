import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Zap, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { fetchCampusPredictions } from '../api';

export default function CampusPredictionEngine() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampusPredictions().then(res => {
      if (res && res.predictiveInsights) {
        setPredictions(res.predictiveInsights);
      }
      setLoading(false);
    });
  }, []);

  return (
    <section id="intelligence" className="py-16 md:py-20 border-b-2 border-[#121212] bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="brutal-pill bg-[#CCFF00] text-[#121212] text-xs font-black shadow-[2px_2px_0px_#121212]">
            <Cpu className="w-3.5 h-3.5 text-[#121212]" />
            FEATURE 10: CAMPUS INTELLIGENCE & PREDICTION ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#121212]">
            From Reactive to Predictive Campus Brain
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-medium">
            Instead of waiting for rooms to overflow or equipment to fail, the Intelligence Engine analyzes crowd flow, exam schedules, and sensor telemetry to predict what will happen 6 hours in advance.
          </p>
        </div>

        {/* Prediction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              className="bg-white rounded-3xl brutal-border p-6 sm:p-7 shadow-[6px_6px_0px_#121212] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="brutal-pill bg-[#D4F6FF] text-[#004B6E] text-[10px] font-black">
                    📍 {pred.location}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A1F] text-white font-mono font-black text-xs shadow-[2px_2px_0px_#121212]">
                    {pred.probability} PROBABILITY
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>WINDOW: {pred.timeWindow}</span>
                </div>

                <h3 className="text-xl font-display font-black text-[#121212]">
                  {pred.title}
                </h3>

                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  {pred.forecastDescription}
                </p>

                {/* Autonomous Action Taken */}
                <div className="p-3.5 rounded-2xl bg-[#E8FAD5] brutal-border-2 text-xs space-y-1 text-[#1E520A]">
                  <span className="text-[10px] font-mono font-black uppercase block tracking-wider">
                    Automated Preventative Measure Triggered:
                  </span>
                  <p className="font-bold">
                    ✓ {pred.recommendedAction}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#121212] flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-stone-500">Autonomous Status:</span>
                <span className="bg-[#121212] text-[#CCFF00] px-2.5 py-1 rounded-lg">
                  {pred.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
