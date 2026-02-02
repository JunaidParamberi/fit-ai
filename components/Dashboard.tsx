
import React from 'react';
import { AssessmentResult, UserProfile } from '../types';

interface Props {
  assessment: AssessmentResult;
  profile: UserProfile;
}

const Dashboard: React.FC<Props> = ({ assessment, profile }) => {
  // Mocking some daily data for visualization
  const consumedCalories = 1420;
  const consumedProtein = 65;
  const calPercent = Math.min((consumedCalories / assessment.tdee) * 100, 100);
  const proteinPercent = Math.min((consumedProtein / assessment.macros.protein) * 100, 100);

  // Simple weight trend data for the sparkline
  const weightTrend = [75.2, 75.0, 74.8, 74.9, 74.5, 74.3, 74.2];
  const minWeight = Math.min(...weightTrend);
  const maxWeight = Math.max(...weightTrend);
  const range = maxWeight - minWeight;
  
  const sparklinePoints = weightTrend.map((w, i) => {
    const x = (i / (weightTrend.length - 1)) * 100;
    const y = 40 - ((w - minWeight) / (range || 1)) * 30; // 40 is height, 30 is range
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6 pb-12 animate-view-transition">
      {/* Greeting Section */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Hi, {profile.gender === 'female' ? 'Sarah' : 'Friend'}!
          </h2>
          <p className="text-slate-500 font-medium">Ready for a great day?</p>
        </div>
        <div className="w-14 h-14 bg-white rounded-2xl soft-shadow border border-slate-50 flex items-center justify-center overflow-hidden">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.gender}&backgroundColor=F8FAF9`} 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Nutrition Card */}
      <div className="soft-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Daily Progress</h3>
          <span className="text-[10px] font-bold text-[#52B788] bg-[#52B788]/10 px-3 py-1 rounded-full uppercase tracking-wider">
            In Sync
          </span>
        </div>

        <div className="space-y-5">
          {/* Calorie Progress */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-600">Calories</span>
              <span className="text-slate-900">{consumedCalories} / {assessment.tdee} kcal</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#52B788] rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${calPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Protein Progress */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-600">Protein</span>
              <span className="text-slate-900">{consumedProtein}g / {assessment.macros.protein}g</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#95D5B2] rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${proteinPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Workout Status */}
        <div className="soft-card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#F8FAF9] rounded-2xl flex items-center justify-center text-[#52B788]">
            <i className="fa-solid fa-person-running text-xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Today's Routine</h4>
            <p className="text-sm text-slate-500 font-medium">Legs & Core • 45m</p>
          </div>
        </div>

        {/* Weight Trend */}
        <div className="soft-card p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-slate-800">Weight</h4>
              <p className="text-xs text-slate-500 font-medium">Down 0.8kg this week</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900">74.2</span>
              <span className="text-xs font-bold text-slate-400 ml-1">kg</span>
            </div>
          </div>
          <div className="h-10 w-full mt-2">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#52B788"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={sparklinePoints}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Ask Coach Call-to-Action */}
      <div className="soft-card p-6 bg-white border-[#52B788]/10 group cursor-pointer hover:bg-[#F8FAF9]">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#52B788] rounded-full flex items-center justify-center text-white shadow-sm">
            <i className="fa-solid fa-comment-dots text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">Have a question?</h4>
            <p className="text-sm text-slate-500 font-medium">Ask your coach for some quick advice.</p>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-300 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <div className="px-1 text-center">
        <p className="text-xs text-slate-400 font-medium">
          Last updated today at 10:30 AM
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
