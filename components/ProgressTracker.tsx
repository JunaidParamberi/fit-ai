
import React, { useState, useEffect } from 'react';
import { WeeklyProgress, UserProfile, AssessmentResult, StrengthMetric } from '../types';

interface Props { profile: UserProfile; assessment: AssessmentResult; }

type Period = '7 Days' | '14 Days' | '30 Days';

const ProgressTracker: React.FC<Props> = ({ profile, assessment }) => {
  const [period, setPeriod] = useState<Period>('14 Days');
  const [isGraphLoading, setIsGraphLoading] = useState(true);

  useEffect(() => {
    setIsGraphLoading(true);
    const timer = setTimeout(() => setIsGraphLoading(false), 300);
    return () => clearTimeout(timer);
  }, [period]);

  const strengthMetrics: StrengthMetric[] = [
    { name: 'Squat', previousWeight: 100, currentWeight: 105, unit: 'kg' },
    { name: 'Bench Press', previousWeight: 80, currentWeight: 82.5, unit: 'kg' },
    { name: 'Deadlift', previousWeight: 140, currentWeight: 145, unit: 'kg' },
  ];

  const consistencyScore = 92;

  const getGraphPath = () => {
    if (period === '7 Days') return "M0,80 C40,75 80,85 120,70 S160,75 200,60";
    if (period === '14 Days') return "M0,90 C40,85 80,95 120,80 S160,85 200,70";
    return "M0,95 C40,90 80,100 120,85 S160,90 200,75";
  };

  return (
    <div className="space-y-6 animate-soft-fade-in">
      <div className="px-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Progress</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Consistency creates results.</p>
      </div>

      <div className="soft-card p-6 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-sm">Consistency</h3>
          <p className="text-xs text-slate-500 font-medium">92% attendance this month</p>
        </div>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="24" cy="24" r="20" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
            <circle cx="24" cy="24" r="20" stroke="#52B788" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * consistencyScore) / 100} strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-bold text-slate-800">{consistencyScore}%</span>
        </div>
      </div>

      <div className="soft-card p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Body Weight</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-slate-900">74.2</span>
              <span className="text-sm font-bold text-slate-400">kg</span>
            </div>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {(['7 Days', '14 Days', '30 Days'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                  period === p ? 'bg-white text-[#52B788] shadow-sm' : 'text-slate-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-40 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <line x1="0" y1="25" x2="200" y2="25" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="0" y1="75" x2="200" y2="75" stroke="#F1F5F9" strokeWidth="1" />
            <path d={getGraphPath()} fill="none" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" className={`transition-all duration-500 ease-in-out ${isGraphLoading ? 'opacity-0' : 'opacity-100'}`} />
          </svg>
        </div>
      </div>

      <div className="soft-card p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-800 mb-2">Strength Stats</h3>
        {strengthMetrics.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.name}</span>
              <span className="text-sm font-bold text-slate-800">{m.currentWeight}{m.unit}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-[#52B788] rounded-full transition-all duration-1000" style={{ width: `${60 + (i * 10)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="soft-card p-6 bg-[#EDF2F0] border-none">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#52B788] shadow-sm flex-shrink-0">
            <i className="fa-solid fa-sparkles text-sm"></i>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#2D6A4F]">Smart Tip</h4>
            <p className="text-xs text-[#2D6A4F] font-medium leading-relaxed">
              Your recovery is improving. Add small weight increases to your next session!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
