import React from 'react';
import { DietPlan } from '../types';

interface Props {
  plan: DietPlan;
}

const DietPlanView: React.FC<Props> = ({ plan }) => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nourishment</h2>
          <p className="text-slate-500 text-sm">Fuel your body with the good stuff.</p>
        </div>
        <div className="w-10 h-10 bg-[#52B788]/10 rounded-xl flex items-center justify-center text-[#52B788]">
          <i className="fa-solid fa-leaf text-lg"></i>
        </div>
      </div>

      <div className="space-y-4">
        {plan.weeklyPlan.map((day, idx) => (
          <div key={idx} className="soft-card p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-slate-800">{day.day}</span>
              <span className="text-xs font-bold text-[#52B788] bg-[#F8FAF9] px-3 py-1 rounded-full border border-slate-100">{day.totalCalories} kcal</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: 'sun', label: 'Breakfast', val: day.breakfast },
                { icon: 'utensils', label: 'Lunch', val: day.lunch },
                { icon: 'moon', label: 'Dinner', val: day.dinner }
              ].map((meal, mIdx) => (
                <div key={mIdx} className="bg-[#F8FAF9] p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-2 mb-2 text-[#52B788]">
                    <i className={`fa-solid fa-${meal.icon} text-xs`}></i>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{meal.label}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">{meal.val}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="soft-card p-6 bg-[#52B788] text-white border-none">
        <div className="flex items-center space-x-3 mb-3">
          <i className="fa-solid fa-sparkles text-white/80"></i>
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">Coach's Advice</span>
        </div>
        <p className="text-sm font-medium leading-relaxed italic">
          "{plan.generalAdvice}"
        </p>
      </div>
    </div>
  );
};

export default DietPlanView;