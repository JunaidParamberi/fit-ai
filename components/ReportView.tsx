
import React from 'react';
import { AssessmentResult } from '../types';

interface Props {
  result: AssessmentResult;
  onReset: () => void;
}

const ReportView: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="space-y-6 animate-soft-fade-in pb-24">
      {/* Header Section */}
      <div className="px-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Analysis</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Your wellness blueprint is ready.</p>
      </div>

      {/* Wellness Snapshot - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="soft-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">BMI Score</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-slate-800">{result.bmi.toFixed(1)}</span>
          </div>
          <span className="text-[10px] font-bold text-[#52B788] mt-1 block">{result.bmiClassification}</span>
        </div>
        
        <div className="soft-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Daily Goal</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-slate-800">{result.tdee}</span>
            <span className="text-[10px] font-bold text-slate-400">kcal</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-1 block tracking-tight">Maintained energy</span>
        </div>

        <div className="soft-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Primary Focus</span>
          <div className="text-sm font-bold text-slate-800 line-clamp-1">{result.primaryFocus}</div>
          <i className="fa-solid fa-bullseye text-[#52B788] text-xs mt-2 block"></i>
        </div>

        <div className="soft-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Health Status</span>
          <div className="text-sm font-bold text-slate-800">Nominal</div>
          <div className="flex space-x-1 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#52B788]"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Macros Card */}
      <div className="soft-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-sm">Macro Distribution</h3>
          <i className="fa-solid fa-chart-pie text-slate-200"></i>
        </div>
        <div className="space-y-5">
          {[
            { label: 'Protein', val: result.macros.protein, color: 'bg-[#52B788]', target: 150 },
            { label: 'Carbs', val: result.macros.carbs, color: 'bg-[#74C69D]', target: 200 },
            { label: 'Fats', val: result.macros.fats, color: 'bg-[#95D5B2]', target: 70 }
          ].map((macro, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-500 uppercase tracking-wider">{macro.label}</span>
                <span className="text-slate-800">{macro.val}g</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${macro.color} rounded-full`} 
                  style={{ width: `${Math.min((macro.val / (macro.val + 50)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas Card */}
      <div className="soft-card p-6">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Focus Areas</h3>
        <div className="space-y-3">
          {result.issues.map((issue, idx) => (
            <div key={idx} className="flex items-center p-3 bg-[#F8FAF9] rounded-xl border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-[#52B788] mr-3"></div>
              <span className="text-xs font-medium text-slate-700">{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="soft-card p-6">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Next Steps</h3>
        <div className="space-y-4">
          {result.recommendations.split('\n').filter(l => l.trim()).map((line, i) => (
            <div key={i} className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-[#EDF2F0] flex items-center justify-center text-[10px] text-[#52B788] font-bold mr-3 flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                {line.replace(/^[•\s*-]+/, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 px-1 space-y-3">
        <button 
          onClick={() => window.print()} 
          className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all text-sm flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-file-pdf opacity-50"></i>
          <span>Save as PDF</span>
        </button>
        <button 
          onClick={onReset} 
          className="w-full bg-rose-50 text-rose-500 font-bold py-4 rounded-2xl active:scale-[0.98] transition-all text-sm flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-rotate-left opacity-50"></i>
          <span>Restart Assessment</span>
        </button>
      </div>
    </div>
  );
};

export default ReportView;
