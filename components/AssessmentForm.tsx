import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { 
  UserProfile, Gender, ActivityLevel, Goal, DietType, 
  ExperienceLevel, CuisineStyle, MealPattern 
} from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

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

  const buttonClass = tw`w-full py-4 rounded-2xl items-center`;
  const primaryBtn = tw`${buttonClass} bg-[#52B788]`;
  const secondaryBtn = tw`${buttonClass} bg-white border border-slate-100`;
  
  const optionCardClass = (selected: boolean) => 
    tw`flex-row items-center p-4 rounded-2xl border-2 ${
      selected ? 'border-[#52B788] bg-[#F8FAF9]' : 'border-slate-50 bg-white'
    }`;

  const sliderLabelClass = tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2`;

  return (
    <View style={tw`w-full max-w-md`}>
      {step !== 'welcome' && (
        <View style={tw`w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden`}>
          <View
            style={[tw`h-full bg-[#52B788]`, { width: `${progress}%` }]}
          />
        </View>
      )}

      <View key={step}>
        {step === 'welcome' && (
          <View style={tw`items-center`}>
            <View style={tw`w-24 h-24 bg-[#52B7881A] rounded-[32px] items-center justify-center mb-8`}>
              <FontAwesome6 name="leaf" size={40} color="#52B788" />
            </View>
            <View style={tw`items-center mb-8`}>
              <Text style={tw`text-3xl font-bold text-slate-800 text-center tracking-tight`}>Welcome to your {"\n"}better self</Text>
              <Text style={tw`text-slate-500 font-medium text-center mt-4 px-4`}>
                Let's spend 2 minutes building your custom AI fitness plan. Ready to transform?
              </Text>
            </View>
            <TouchableOpacity onPress={nextStep} style={primaryBtn}>
              <Text style={tw`text-white font-bold text-sm`}>Start Journey</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'basics' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>The Basics</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>Let's get your vitals down first.</Text>
            </View>
            
            <View style={tw`space-y-6`}>
              <View style={tw`mb-6`}>
                <Text style={sliderLabelClass}>I identify as</Text>
                <View style={tw`flex-row justify-between`}>
                  {(['male', 'female', 'other'] as Gender[]).map(g => (
                    <TouchableOpacity
                      key={g}
                      onPress={() => updateData({ gender: g })}
                      style={[tw`flex-1 py-3 rounded-xl items-center border-2 mx-1`, formData.gender === g ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                    >
                      <Text style={[tw`text-xs font-bold uppercase tracking-wider`, formData.gender === g ? tw`text-[#2D6A4F]` : tw`text-slate-400`]}>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={tw`mb-6`}>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Age</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.age}</Text>
                </View>
                <Slider
                  minimumValue={14} maximumValue={90} step={1}
                  value={formData.age} 
                  onValueChange={(val) => updateData({ age: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>

              <View style={tw`mb-6`}>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Height</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.height_cm} <Text style={tw`text-xs text-slate-300`}>cm</Text></Text>
                </View>
                <Slider
                  minimumValue={120} maximumValue={230} step={1}
                  value={formData.height_cm} 
                  onValueChange={(val) => updateData({ height_cm: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>

              <View style={tw`mb-6`}>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Weight</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.weight_kg} <Text style={tw`text-xs text-slate-300`}>kg</Text></Text>
                </View>
                <Slider
                  minimumValue={30} maximumValue={200} step={1}
                  value={formData.weight_kg} 
                  onValueChange={(val) => updateData({ weight_kg: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>
            </View>

            <View style={tw`flex-row pt-4`}>
              <TouchableOpacity onPress={prevStep} style={[secondaryBtn, tw`flex-1 mr-2`]}>
                <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextStep} style={[primaryBtn, tw`flex-1 ml-2`]}>
                <Text style={tw`text-white font-bold text-sm`}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'goal' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Your Goal</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>What is the finish line for you?</Text>
            </View>

            <View style={tw`flex-row flex-wrap justify-between mb-8`}>
              {[
                { id: 'fat loss', label: 'Lose Fat', icon: 'fire' },
                { id: 'muscle gain', label: 'Build Muscle', icon: 'dumbbell' },
                { id: 'recomposition', label: 'Stay Fit', icon: 'wand-magic-sparkles' },
                { id: 'endurance', label: 'Endurance', icon: 'person-running' }
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.id} 
                  onPress={() => { updateData({ goal: opt.id as Goal }); setTimeout(nextStep, 200); }}
                  style={[tw`w-[48%] flex-col items-center p-6 rounded-2xl border-2 mb-4`, formData.goal === opt.id ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                >
                  <FontAwesome6 name={opt.icon} size={20} color={formData.goal === opt.id ? '#52B788' : '#E2E8F0'} style={tw`mb-3`} />
                  <Text style={tw`text-xs font-bold text-slate-700`}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity onPress={prevStep} style={secondaryBtn}>
              <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'activity' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Movement</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>Be honest! It helps the math.</Text>
            </View>

            <View style={tw`space-y-3 mb-8`}>
              {[
                { id: 'sedentary', label: 'Mostly Sitting', desc: 'Desk job, very little activity' },
                { id: 'light', label: 'Lightly Active', desc: 'Daily walks, active at home' },
                { id: 'moderate', label: 'Active', desc: 'Workout 3-4 times per week' },
                { id: 'active', label: 'Very Active', desc: 'Athlete level or manual labor' }
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.id} 
                  onPress={() => { updateData({ activityLevel: opt.id as ActivityLevel }); setTimeout(nextStep, 200); }}
                  style={optionCardClass(formData.activityLevel === opt.id)}
                >
                  <View style={[tw`w-10 h-10 rounded-xl items-center justify-center mr-4`, formData.activityLevel === opt.id ? tw`bg-[#52B788]` : tw`bg-slate-50`]}>
                    <FontAwesome6 name="person-walking" size={14} color={formData.activityLevel === opt.id ? 'white' : '#CBD5E1'} />
                  </View>
                  <View>
                    <Text style={tw`text-sm font-bold text-slate-800`}>{opt.label}</Text>
                    <Text style={tw`text-[10px] text-slate-400 font-medium`}>{opt.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity onPress={prevStep} style={secondaryBtn}>
              <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'workout' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Training</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>Where and how do you want to train?</Text>
            </View>

            <View style={tw`space-y-6 mb-8`}>
              <View>
                <Text style={sliderLabelClass}>Preferred Setting</Text>
                <View style={tw`flex-row justify-between`}>
                  {(['gym', 'home', 'both'] as const).map(p => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => updateData({ workoutPreference: p, gymAccess: p !== 'home' })}
                      style={[tw`flex-1 py-3 rounded-xl items-center border-2 mx-1`, formData.workoutPreference === p ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                    >
                      <Text style={[tw`text-[10px] font-bold uppercase tracking-wider`, formData.workoutPreference === p ? tw`text-[#2D6A4F]` : tw`text-slate-400`]}>{p}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text style={sliderLabelClass}>Experience Level</Text>
                <View style={tw`flex-row justify-between`}>
                  {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(e => (
                    <TouchableOpacity
                      key={e}
                      onPress={() => updateData({ experienceLevel: e })}
                      style={[tw`flex-1 py-3 rounded-xl items-center border-2 mx-1`, formData.experienceLevel === e ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                    >
                      <Text style={[tw`text-[10px] font-bold uppercase tracking-wider`, formData.experienceLevel === e ? tw`text-[#2D6A4F]` : tw`text-slate-400`]}>{e}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={tw`flex-row pt-4`}>
              <TouchableOpacity onPress={prevStep} style={[secondaryBtn, tw`flex-1 mr-2`]}>
                <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextStep} style={[primaryBtn, tw`flex-1 ml-2`]}>
                <Text style={tw`text-white font-bold text-sm`}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'nutrition' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Eating Style</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>What's on your plate usually?</Text>
            </View>

            <View style={tw`space-y-6 mb-8`}>
              <View>
                <Text style={sliderLabelClass}>Cuisine Preference</Text>
                <View style={tw`flex-row flex-wrap`}>
                  {(['Indian', 'Western', 'Middle Eastern', 'Asian', 'Mixed'] as CuisineStyle[]).map(c => (
                    <TouchableOpacity
                      key={c}
                      onPress={() => updateData({ cuisineStyle: c })}
                      style={[tw`w-[48%] py-3 rounded-xl items-center border-2 m-1`, formData.cuisineStyle === c ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                    >
                      <Text style={[tw`text-xs font-bold`, formData.cuisineStyle === c ? tw`text-[#2D6A4F]` : tw`text-slate-400`]}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text style={sliderLabelClass}>Diet Type</Text>
                <View style={tw`flex-row flex-wrap`}>
                  {(['veg', 'non-veg', 'eggetarian', 'vegan', 'mixed'] as DietType[]).map(d => (
                    <TouchableOpacity
                      key={d}
                      onPress={() => updateData({ dietType: d })}
                      style={[tw`w-[31%] py-3 rounded-xl items-center border-2 m-1`, formData.dietType === d ? tw`border-[#52B788] bg-[#F8FAF9]` : tw`border-slate-50 bg-white`]}
                    >
                      <Text style={[tw`text-[10px] font-bold uppercase`, formData.dietType === d ? tw`text-[#2D6A4F]` : tw`text-slate-400`]}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={tw`flex-row pt-4`}>
              <TouchableOpacity onPress={prevStep} style={[secondaryBtn, tw`flex-1 mr-2`]}>
                <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextStep} style={[primaryBtn, tw`flex-1 ml-2`]}>
                <Text style={tw`text-white font-bold text-sm`}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'pattern' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Meal Habits</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>How often do you eat?</Text>
            </View>

            <View style={tw`space-y-3 mb-8`}>
              {[
                { id: '2 meals', label: '2 Meals/Day', icon: 'clock' },
                { id: '3 meals', label: '3 Standard Meals', icon: 'utensils' },
                { id: 'snacker', label: 'Frequent Snacker', icon: 'cookie-bite' },
                { id: 'skip breakfast', label: 'Skip Breakfast', icon: 'sun' }
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.id} 
                  onPress={() => { updateData({ mealPattern: opt.id as MealPattern }); setTimeout(nextStep, 200); }}
                  style={optionCardClass(formData.mealPattern === opt.id)}
                >
                  <View style={[tw`w-10 h-10 rounded-xl items-center justify-center mr-4`, formData.mealPattern === opt.id ? tw`bg-[#52B788]` : tw`bg-slate-50`]}>
                    <FontAwesome6 name={opt.icon} size={14} color={formData.mealPattern === opt.id ? 'white' : '#CBD5E1'} />
                  </View>
                  <Text style={tw`text-sm font-bold text-slate-800`}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity onPress={prevStep} style={secondaryBtn}>
              <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'habits' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Lifestyle</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>The small things matter most.</Text>
            </View>

            <View style={tw`space-y-8 mb-8`}>
              <View>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Avg Sleep</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.sleepHours} <Text style={tw`text-xs text-slate-300`}>hrs</Text></Text>
                </View>
                <Slider
                  minimumValue={4} maximumValue={12} step={1}
                  value={formData.sleepHours} 
                  onValueChange={(val) => updateData({ sleepHours: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>

              <View>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Water Intake</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.waterIntake} <Text style={tw`text-xs text-slate-300`}>glasses</Text></Text>
                </View>
                <Slider
                  minimumValue={2} maximumValue={20} step={1}
                  value={formData.waterIntake} 
                  onValueChange={(val) => updateData({ waterIntake: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>

              <View>
                <View style={tw`flex-row justify-between items-end mb-2`}>
                  <Text style={sliderLabelClass}>Stress Level</Text>
                  <Text style={tw`text-lg font-bold text-slate-800`}>{formData.stressLevel}/10</Text>
                </View>
                <Slider
                  minimumValue={1} maximumValue={10} step={1}
                  value={formData.stressLevel} 
                  onValueChange={(val) => updateData({ stressLevel: val })}
                  minimumTrackTintColor="#52B788"
                  thumbTintColor="#52B788"
                />
              </View>
            </View>

            <View style={tw`flex-row pt-4`}>
              <TouchableOpacity onPress={prevStep} style={[secondaryBtn, tw`flex-1 mr-2`]}>
                <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextStep} style={[primaryBtn, tw`flex-1 ml-2`]}>
                <Text style={tw`text-white font-bold text-sm`}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'final' && (
          <View style={tw`space-y-8`}>
            <View style={tw`mb-6`}>
              <Text style={tw`text-2xl font-bold text-slate-800`}>Health Check</Text>
              <Text style={tw`text-slate-500 text-sm font-medium mt-1`}>Last step to safety.</Text>
            </View>

            <View style={tw`space-y-6 mb-8`}>
              <View>
                <Text style={sliderLabelClass}>Injuries or Conditions</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  value={formData.injuries}
                  onChangeText={(text) => updateData({ injuries: text })}
                  placeholder="e.g. Lower back pain, knee issues, or 'None'..."
                  style={tw`w-full bg-white border border-slate-100 p-4 rounded-xl text-sm font-medium text-slate-700 min-h-[100px] shadow-sm`}
                  textAlignVertical="top"
                />
              </View>

              <View style={tw`p-4 bg-amber-50 rounded-2xl flex-row items-start border border-amber-100`}>
                <FontAwesome6 name="shield-halved" size={14} color="#F59E0B" style={tw`mt-1 mr-3`} />
                <Text style={tw`text-[10px] text-amber-700 leading-relaxed font-bold uppercase tracking-wider flex-1`}>
                  Always consult a doctor before starting a new fitness routine. Safety first.
                </Text>
              </View>
            </View>

            <View style={tw`flex-row pt-4`}>
              <TouchableOpacity onPress={prevStep} style={[secondaryBtn, tw`flex-1 mr-2`]}>
                <Text style={tw`text-slate-500 font-bold text-sm`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubmit(formData)}
                disabled={isLoading}
                style={[primaryBtn, tw`flex-1 ml-2`]}
              >
                {isLoading ? (
                  <FontAwesome6 name="circle-notch" size={14} color="white" />
                ) : (
                  <Text style={tw`text-white font-bold text-sm`}>Create My Vision Plan</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AssessmentForm;
