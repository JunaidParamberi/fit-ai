
import React, { useState } from 'react';
import { 
  UserProfile, Gender, ActivityLevel, Goal, DietType, 
  ExperienceLevel, CuisineStyle, MealPattern 
} from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

type OnboardingStep = 
  | 'welcome' 
  | 'basics' 
  | 'goal' 
  | 'activity' 
  | 'workout' 
  | 'nutrition' 
  | 'pattern' 
  | 'habits' 
  | 'final';

const AssessmentForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [formData, setFormData] = useState<UserProfile>({
    age: 28,
    gender: 'male',
    height_cm: 170,
    weight_kg: 65,
    activityLevel: 'moderate',
    goal: 'recomposition',
    experienceLevel: 'beginner',
    workoutPreference: 'both',
    cuisineStyle: 'Mixed',
    dietType: 'mixed',
    mealPattern: '3 meals',
    sleepHours: 7,
    waterIntake: 8,
    stressLevel: 5,
    injuries: '',
    gymAccess: true,
    schedule: 'Standard',
    workoutDays: 3,
    workoutDuration: 45
  });

  const updateData = (updates: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const steps: OnboardingStep[] = [
    'welcome', 'basics', 'goal', 'activity', 'workout', 
    'nutrition', 'pattern', 'habits', 'final'
  ];

  const nextStep = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const prevStep = () => {
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const progress = ((steps.indexOf(step) + 1) / steps.length) * 100;

  const buttonClass = "w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98]";
  const primaryBtn = `${buttonClass} bg-[#52B788] text-white shadow-md hover:bg-[#40916C]`;
  const secondaryBtn = `${buttonClass} bg-white border border-slate-100 text-slate-500 hover:text-[#52B788]`;
  
  const optionCardClass = (selected: boolean) => 
    `flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
      selected ? 'border-[#52B788] bg-[#F8FAF9]' : 'border-slate-50 bg-white hover:border-slate-200'
    }`;

  const sliderLabelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2";

  return (
    <div className="w-full max-w-md mx-auto">
      {step !== 'welcome' && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-[#52B788] transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="animate-soft-fade-in" key={step}>
        {step === 'welcome' && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-[#52B788]/10 rounded-[32px] flex items-center justify-center mx-auto pulse-soft">
              <i className="fa-solid fa-leaf text-4xl text-[#52B788]"></i>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight leading-tight">Welcome to your <br/>better self</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Let's spend 2 minutes building your custom AI fitness plan. Ready to transform?
              </p>
            </div>
            <button onClick={nextStep} className={primaryBtn}>
              Start Journey
            </button>
          </div>
        )}

        {step === 'basics' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">The Basics</h2>
              <p className="text-slate-500 text-sm font-medium">Let's get your vitals down first.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={sliderLabelClass}>I identify as</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['male', 'female', 'other'] as Gender[]).map(g => (
                    <button 
                      key={g}
                      onClick={() => updateData({ gender: g })}
                      className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all ${formData.gender === g ? 'border-[#52B788] bg-[#F8FAF9] text-[#2D6A4F]' : 'border-slate-50 bg-white text-slate-400'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Age</label>
                  <span className="text-lg font-bold text-slate-800">{formData.age}</span>
                </div>
                <input 
                  type="range" min="14" max="90" 
                  value={formData.age} 
                  onChange={(e) => updateData({ age: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Height</label>
                  <span className="text-lg font-bold text-slate-800">{formData.height_cm} <span className="text-xs text-slate-300">cm</span></span>
                </div>
                <input 
                  type="range" min="120" max="230" 
                  value={formData.height_cm} 
                  onChange={(e) => updateData({ height_cm: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Weight</label>
                  <span className="text-lg font-bold text-slate-800">{formData.weight_kg} <span className="text-xs text-slate-300">kg</span></span>
                </div>
                <input 
                  type="range" min="30" max="200" 
                  value={formData.weight_kg} 
                  onChange={(e) => updateData({ weight_kg: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={prevStep} className={secondaryBtn}>Back</button>
              <button onClick={nextStep} className={primaryBtn}>Continue</button>
            </div>
          </div>
        )}

        {step === 'goal' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Your Goal</h2>
              <p className="text-slate-500 text-sm font-medium">What is the finish line for you?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'fat loss', label: 'Lose Fat', icon: 'fa-fire' },
                { id: 'muscle gain', label: 'Build Muscle', icon: 'fa-dumbbell' },
                { id: 'recomposition', label: 'Stay Fit', icon: 'fa-wand-magic-sparkles' },
                { id: 'endurance', label: 'Endurance', icon: 'fa-person-running' }
              ].map((opt) => (
                <div 
                  key={opt.id} 
                  onClick={() => { updateData({ goal: opt.id as Goal }); setTimeout(nextStep, 200); }}
                  className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all cursor-pointer ${formData.goal === opt.id ? 'border-[#52B788] bg-[#F8FAF9]' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                >
                  <i className={`fa-solid ${opt.icon} text-xl mb-3 ${formData.goal === opt.id ? 'text-[#52B788]' : 'text-slate-200'}`}></i>
                  <span className="text-xs font-bold text-slate-700">{opt.label}</span>
                </div>
              ))}
            </div>
            
            <button onClick={prevStep} className={secondaryBtn}>Back</button>
          </div>
        )}

        {step === 'activity' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Movement</h2>
              <p className="text-slate-500 text-sm font-medium">Be honest! It helps the math.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'sedentary', label: 'Mostly Sitting', desc: 'Desk job, very little activity' },
                { id: 'light', label: 'Lightly Active', desc: 'Daily walks, active at home' },
                { id: 'moderate', label: 'Active', desc: 'Workout 3-4 times per week' },
                { id: 'active', label: 'Very Active', desc: 'Athlete level or manual labor' }
              ].map((opt) => (
                <div 
                  key={opt.id} 
                  onClick={() => { updateData({ activityLevel: opt.id as ActivityLevel }); setTimeout(nextStep, 200); }}
                  className={optionCardClass(formData.activityLevel === opt.id)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${formData.activityLevel === opt.id ? 'bg-[#52B788] text-white' : 'bg-slate-50 text-slate-300'}`}>
                    <i className="fa-solid fa-person-walking text-sm"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{opt.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={prevStep} className={secondaryBtn}>Back</button>
          </div>
        )}

        {step === 'workout' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Training</h2>
              <p className="text-slate-500 text-sm font-medium">Where and how do you want to train?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className={sliderLabelClass}>Preferred Setting</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['gym', 'home', 'both'] as const).map(p => (
                    <button 
                      key={p}
                      onClick={() => updateData({ workoutPreference: p, gymAccess: p !== 'home' })}
                      className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 transition-all ${formData.workoutPreference === p ? 'border-[#52B788] bg-[#F8FAF9] text-[#2D6A4F]' : 'border-slate-50 bg-white text-slate-400'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={sliderLabelClass}>Experience Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(e => (
                    <button 
                      key={e}
                      onClick={() => updateData({ experienceLevel: e })}
                      className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 transition-all ${formData.experienceLevel === e ? 'border-[#52B788] bg-[#F8FAF9] text-[#2D6A4F]' : 'border-slate-50 bg-white text-slate-400'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={prevStep} className={secondaryBtn}>Back</button>
              <button onClick={nextStep} className={primaryBtn}>Continue</button>
            </div>
          </div>
        )}

        {step === 'nutrition' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Eating Style</h2>
              <p className="text-slate-500 text-sm font-medium">What's on your plate usually?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className={sliderLabelClass}>Cuisine Preference</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Indian', 'Western', 'Middle Eastern', 'Asian', 'Mixed'] as CuisineStyle[]).map(c => (
                    <button 
                      key={c}
                      onClick={() => updateData({ cuisineStyle: c })}
                      className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${formData.cuisineStyle === c ? 'border-[#52B788] bg-[#F8FAF9] text-[#2D6A4F]' : 'border-slate-50 bg-white text-slate-400'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={sliderLabelClass}>Diet Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['veg', 'non-veg', 'eggetarian', 'vegan', 'mixed'] as DietType[]).map(d => (
                    <button 
                      key={d}
                      onClick={() => updateData({ dietType: d })}
                      className={`py-3 rounded-xl text-[10px] font-bold uppercase border-2 transition-all ${formData.dietType === d ? 'border-[#52B788] bg-[#F8FAF9] text-[#2D6A4F]' : 'border-slate-50 bg-white text-slate-400'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={prevStep} className={secondaryBtn}>Back</button>
              <button onClick={nextStep} className={primaryBtn}>Continue</button>
            </div>
          </div>
        )}

        {step === 'pattern' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Meal Habits</h2>
              <p className="text-slate-500 text-sm font-medium">How often do you eat?</p>
            </div>

            <div className="space-y-3">
              {[
                { id: '2 meals', label: '2 Meals/Day', icon: 'fa-clock' },
                { id: '3 meals', label: '3 Standard Meals', icon: 'fa-utensils' },
                { id: 'snacker', label: 'Frequent Snacker', icon: 'fa-cookie-bite' },
                { id: 'skip breakfast', label: 'Skip Breakfast', icon: 'fa-sun' }
              ].map((opt) => (
                <div 
                  key={opt.id} 
                  onClick={() => { updateData({ mealPattern: opt.id as MealPattern }); setTimeout(nextStep, 200); }}
                  className={optionCardClass(formData.mealPattern === opt.id)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${formData.mealPattern === opt.id ? 'bg-[#52B788] text-white' : 'bg-slate-50 text-slate-300'}`}>
                    <i className={`fa-solid ${opt.icon} text-sm`}></i>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{opt.label}</span>
                </div>
              ))}
            </div>
            
            <button onClick={prevStep} className={secondaryBtn}>Back</button>
          </div>
        )}

        {step === 'habits' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Lifestyle</h2>
              <p className="text-slate-500 text-sm font-medium">The small things matter most.</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Avg Sleep</label>
                  <span className="text-lg font-bold text-slate-800">{formData.sleepHours} <span className="text-xs text-slate-300">hrs</span></span>
                </div>
                <input 
                  type="range" min="4" max="12" 
                  value={formData.sleepHours} 
                  onChange={(e) => updateData({ sleepHours: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Water Intake</label>
                  <span className="text-lg font-bold text-slate-800">{formData.waterIntake} <span className="text-xs text-slate-300">glasses</span></span>
                </div>
                <input 
                  type="range" min="2" max="20" 
                  value={formData.waterIntake} 
                  onChange={(e) => updateData({ waterIntake: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className={sliderLabelClass}>Stress Level</label>
                  <span className="text-lg font-bold text-slate-800">{formData.stressLevel}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={formData.stressLevel} 
                  onChange={(e) => updateData({ stressLevel: parseInt(e.target.value) })}
                  className="w-full accent-[#52B788]"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={prevStep} className={secondaryBtn}>Back</button>
              <button onClick={nextStep} className={primaryBtn}>Continue</button>
            </div>
          </div>
        )}

        {step === 'final' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Health Check</h2>
              <p className="text-slate-500 text-sm font-medium">Last step to safety.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className={sliderLabelClass}>Injuries or Conditions</label>
                <textarea 
                  rows={4}
                  value={formData.injuries}
                  onChange={(e) => updateData({ injuries: e.target.value })}
                  placeholder="e.g. Lower back pain, knee issues, or 'None'..."
                  className="w-full bg-white border border-slate-100 p-4 rounded-xl outline-none focus:border-[#52B788] text-sm font-medium resize-none shadow-sm"
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl flex items-start space-x-3 border border-amber-100">
                <i className="fa-solid fa-shield-halved text-amber-500 text-sm mt-1"></i>
                <p className="text-[10px] text-amber-700 leading-relaxed font-bold uppercase tracking-wider">
                  Always consult a doctor before starting a new fitness routine. Safety first.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={prevStep} className={secondaryBtn}>Back</button>
              <button 
                onClick={() => onSubmit(formData)} 
                disabled={isLoading}
                className={primaryBtn}
              >
                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Create My Vision Plan'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
