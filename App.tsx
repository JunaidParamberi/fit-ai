import React, { useState } from 'react';
import { UserProfile, AssessmentResult, DietPlan, WorkoutPlan } from './types';
import { getFitnessAssessment, getDietPlan, getWorkoutPlan } from './services/geminiService';
import AssessmentForm from './components/AssessmentForm';
import ReportView from './components/ReportView';
import ImageAnalyzer from './components/ImageAnalyzer';
import DietPlanView from './components/DietPlanView';
import WorkoutPlanView from './components/WorkoutPlanView';
import ProgressTracker from './components/ProgressTracker';
import Dashboard from './components/Dashboard';
import CalorieTracker from './components/CalorieTracker';
import CoachView from './components/CoachView';
import ProcessingView from './components/ProcessingView';

type ViewState = 'setup' | 'dashboard' | 'training' | 'nutrition' | 'progress' | 'calories' | 'coach';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('setup');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssessmentSubmit = async (data: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setProfile(data);
    
    try {
      const result = await getFitnessAssessment(data);
      setAssessment(result);
      
      const [planDiet, planWorkout] = await Promise.all([
        getDietPlan(result, data),
        getWorkoutPlan(result, data)
      ]);
      
      setDietPlan(planDiet);
      setWorkoutPlan(planWorkout);
      setActiveView('dashboard');
    } catch (err) {
      console.error(err);
      setError("We had a small issue creating your plan. Let's try once more.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setAssessment(null);
    setDietPlan(null);
    setWorkoutPlan(null);
    setError(null);
    setActiveView('setup');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800 pb-24">
      {isLoading && <ProcessingView />}

      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveView('setup')}>
            <div className="w-8 h-8 bg-[#52B788] rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-seedling text-sm"></i>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800">
              FitAI <span className="text-[#52B788]">Wellness</span>
            </span>
          </div>

          {assessment && (
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
              <button onClick={() => setActiveView('dashboard')} className={`${activeView === 'dashboard' ? 'text-[#52B788]' : 'hover:text-[#52B788]'} transition-colors`}>Home</button>
              <button onClick={() => setActiveView('training')} className={`${activeView === 'training' ? 'text-[#52B788]' : 'hover:text-[#52B788]'} transition-colors`}>Routine</button>
              <button onClick={() => setActiveView('calories')} className={`${activeView === 'calories' ? 'text-[#52B788]' : 'hover:text-[#52B788]'} transition-colors`}>Meals</button>
              <button onClick={() => setActiveView('coach')} className={`${activeView === 'coach' ? 'text-[#52B788]' : 'hover:text-[#52B788]'} transition-colors`}>Coach</button>
            </div>
          )}

          <div className="w-8 md:w-auto"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-8 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl flex items-center text-sm">
            <i className="fa-solid fa-circle-info mr-2"></i>
            <span>{error}</span>
          </div>
        )}

        <div key={activeView} className="view-transition">
          {activeView === 'setup' ? (
            <div className="flex flex-col items-center py-10">
              <div className="text-center space-y-4 mb-10 max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Your journey to <br/> 
                  <span className="text-[#52B788]">balanced wellness</span>.
                </h1>
                <p className="text-slate-500 text-lg">
                  Let's create a routine that fits your life and makes you feel great.
                </p>
              </div>
              <div className="w-full max-w-md">
                <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {activeView === 'dashboard' && profile && assessment && (
                <Dashboard profile={profile} assessment={assessment} />
              )}
              {activeView === 'training' && workoutPlan && (
                <WorkoutPlanView plan={workoutPlan} />
              )}
              {activeView === 'calories' && assessment && (
                <CalorieTracker assessment={assessment} />
              )}
              {activeView === 'coach' && profile && assessment && (
                <CoachView profile={profile} assessment={assessment} />
              )}
              {activeView === 'progress' && profile && assessment && (
                <div className="space-y-8">
                  <ImageAnalyzer />
                  <ProgressTracker profile={profile} assessment={assessment} />
                  <ReportView result={assessment} onReset={handleReset} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {assessment && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-20 md:hidden flex items-center justify-around px-2 z-40 rounded-t-[24px] shadow-lg">
           <button onClick={() => setActiveView('dashboard')} className={`flex flex-col items-center flex-1 py-2 ${activeView === 'dashboard' ? 'text-[#52B788]' : 'text-slate-400'}`}>
             <i className="fa-solid fa-house text-lg"></i>
             <span className="text-[10px] mt-1 font-semibold">Home</span>
           </button>
           <button onClick={() => setActiveView('training')} className={`flex flex-col items-center flex-1 py-2 ${activeView === 'training' ? 'text-[#52B788]' : 'text-slate-400'}`}>
             <i className="fa-solid fa-heart text-lg"></i>
             <span className="text-[10px] mt-1 font-semibold">Routine</span>
           </button>
           <button onClick={() => setActiveView('coach')} className={`flex flex-col items-center flex-1 py-2 ${activeView === 'coach' ? 'text-[#52B788]' : 'text-slate-400'}`}>
             <i className="fa-solid fa-comment text-lg"></i>
             <span className="text-[10px] mt-1 font-semibold">Coach</span>
           </button>
           <button onClick={() => setActiveView('calories')} className={`flex flex-col items-center flex-1 py-2 ${activeView === 'calories' ? 'text-[#52B788]' : 'text-slate-400'}`}>
             <i className="fa-solid fa-bowl-food text-lg"></i>
             <span className="text-[10px] mt-1 font-semibold">Meals</span>
           </button>
           <button onClick={() => setActiveView('progress')} className={`flex flex-col items-center flex-1 py-2 ${activeView === 'progress' ? 'text-[#52B788]' : 'text-slate-400'}`}>
             <i className="fa-solid fa-chart-simple text-lg"></i>
             <span className="text-[10px] mt-1 font-semibold">Log</span>
           </button>
        </nav>
      )}
    </div>
  );
};

export default App;