import React, { useState } from 'react';
import { AssessmentResult, LoggedMeal } from '../types';

interface Props {
  assessment: AssessmentResult;
}

const CalorieTracker: React.FC<Props> = ({ assessment }) => {
  // Mocking some daily data for visualization based on screenshot values
  const [meals] = useState<LoggedMeal[]>([
    { id: '1', name: 'Whey Isolate + Berries', calories: 280, protein: 32, carbs: 28, fats: 4, time: '08:42 AM' },
    { id: '2', name: 'Grilled Chicken + Quinoa', calories: 540, protein: 48, carbs: 45, fats: 12, time: '12:15 PM' },
    { id: '3', name: 'Greek Yogurt + Almonds', calories: 220, protein: 18, carbs: 12, fats: 10, time: '04:30 PM' },
  ]);

  const totalConsumed = 1040; // Hardcoded to match screenshot example for visual fidelity
  const totalTarget = 2600; // Matches screenshot precisely
  const remaining = totalTarget - totalConsumed;
  const progressPercent = Math.min((totalConsumed / totalTarget) * 100, 100);

  const totalMacros = {
    p: 98,
    c: 85,
    f: 26
  };

  const macroTargets = {
    p: assessment.macros.protein,
    c: assessment.macros.carbs,
    f: assessment.macros.fats
  };

  return (
    <div className="space-y-6 animate-soft-fade-in pb-24">
      {/* Header - Matching Screenshot */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-bold text-[#52B788] uppercase tracking-[0.2em] block mb-1">Nutrition Hub</span>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Today's Meals</h2>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl soft-shadow flex items-center justify-center text-[#52B788] border border-slate-50">
          <i className="fa-solid fa-apple-whole text-xl opacity-80"></i>
        </div>
      </div>

      {/* Hero Calorie Card - Fixed SVG scaling and positioning */}
      <div className="soft-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            {/* Background Track */}
            <circle 
              cx="128" cy="128" r="100" 
              stroke="#F1F5F9" strokeWidth="8" fill="transparent" 
            />
            {/* Progress Bar */}
            <circle 
              cx="128" cy="128" r="100" 
              stroke="#52B788" strokeWidth="12" fill="transparent" 
              strokeDasharray="628.3" strokeDashoffset={628.3 - (628.3 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out opacity-70"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total Consumed</span>
            <span className="text-6xl font-extrabold text-[#334155] tracking-tighter leading-none">{totalConsumed}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-3">of {totalTarget} kcal</span>
          </div>
        </div>
        
        <p className="text-sm font-medium text-slate-400 mt-6">
          You have <span className="text-[#52B788] font-bold">{remaining} kcal</span> remaining for the day.
        </p>
      </div>

      {/* Macro Grid - Matching bottom row layout */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'PROTEIN', val: totalMacros.p, color: 'bg-[#52B788]', pct: 64 },
          { label: 'CARBS', val: totalMacros.c, color: 'bg-[#74C69D]', pct: 27 },
          { label: 'FATS', val: totalMacros.f, color: 'bg-[#95D5B2]', pct: 32 }
        ].map((macro, i) => (
          <div key={i} className="soft-card p-5 flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">{macro.label}</span>
            <div className="text-xl font-bold text-slate-800 mb-4">{macro.val}g</div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className={`h-full ${macro.color} rounded-full`} style={{ width: `${macro.pct}%` }}></div>
            </div>
            <span className="text-[9px] font-bold text-slate-300 uppercase">{macro.pct}%</span>
          </div>
        ))}
      </div>

      {/* Meal List Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged Today</h4>
          <button className="text-[10px] font-bold text-[#52B788] uppercase hover:underline">View All</button>
        </div>
        
        {meals.map((meal) => (
          <div key={meal.id} className="soft-card p-5 flex items-center justify-between group hover:border-[#52B788]/20">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#52B788] border border-slate-100">
                <i className="fa-solid fa-utensils text-xs opacity-60"></i>
              </div>
              <div>
                <h5 className="font-bold text-slate-700 text-sm">{meal.name}</h5>
                <p className="text-[10px] font-bold text-slate-300 uppercase mt-0.5">{meal.time}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-800">{meal.calories} kcal</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <button className="w-full bg-white border border-slate-100 py-5 rounded-2xl text-xs font-bold text-slate-500 hover:text-[#52B788] hover:border-[#52B788]/30 transition-all flex items-center justify-center space-x-3 active:scale-[0.98] shadow-sm">
          <i className="fa-solid fa-plus-circle opacity-30"></i>
          <span>Log New Meal</span>
        </button>
      </div>
    </div>
  );
};

export default CalorieTracker;