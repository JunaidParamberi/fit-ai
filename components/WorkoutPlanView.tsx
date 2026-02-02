import React, { useState } from 'react';
import { WorkoutPlan } from '../types';

interface Props {
  plan: WorkoutPlan;
}

const WorkoutPlanView: React.FC<Props> = ({ plan }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const currentWorkout = plan.weeklySplit[selectedDayIdx] || plan.weeklySplit[0];

  return (
    <div className="space-y-6 pb-24 animate-soft-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          <span className="text-xs font-bold text-[#52B788] uppercase tracking-wider">Your Routine</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">Today's Session</h2>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl soft-shadow flex items-center justify-center text-[#52B788] border border-slate-50">
          <i className="fa-solid fa-dumbbell text-lg"></i>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-2 -mx-1 px-1">
        {plan.weeklySplit.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDayIdx(idx)}
            className={`flex-shrink-0 px-5 py-3 rounded-2xl font-bold transition-all text-sm ${
              selectedDayIdx === idx 
              ? 'bg-[#52B788] text-white shadow-md' 
              : 'bg-white text-slate-400 border border-slate-100 hover:border-[#52B788]/30'
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Routine Focus Card */}
      <div className="soft-card p-6 border-l-4 border-l-[#52B788]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{currentWorkout.focus}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Estimated duration: <span className="text-[#2D6A4F] font-bold">45 mins</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Intensity</span>
            <div className="flex space-x-0.5 mt-1 justify-end">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-1 rounded-full ${i <= 3 ? 'bg-[#52B788]' : 'bg-slate-100'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Exercises</h4>
        {currentWorkout.exercises.map((ex, idx) => (
          <div key={idx} className="soft-card p-5 group hover:bg-[#F8FAF9] cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#F8FAF9] rounded-xl flex items-center justify-center text-slate-400 font-bold text-sm border border-slate-50 group-hover:bg-white group-hover:text-[#52B788] transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-base">{ex.name}</h5>
                  <div className="flex items-center space-x-3 mt-1 text-xs font-semibold text-slate-500">
                    <span className="bg-[#EDF2F0] px-2 py-0.5 rounded text-[#2D6A4F]">{ex.sets} Sets</span>
                    <span>{ex.reps} Reps</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Rest</span>
                <span className="text-sm font-bold text-slate-600">{ex.rest}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tip Card */}
      <div className="soft-card p-6 bg-[#EDF2F0]/50 border-dashed">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#52B788] flex-shrink-0 shadow-sm">
            <i className="fa-solid fa-lightbulb text-sm"></i>
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-800 mb-1">Trainer Tip</h5>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {plan.progressiveOverloadGuidance || "Focus on your breathing and maintain a steady tempo throughout each movement."}
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4">
        <button className="w-full bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-5 rounded-2xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3">
          <i className="fa-solid fa-play text-sm"></i>
          <span>Start Workout</span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanView;