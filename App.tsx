import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
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
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <SafeAreaView style={tw`flex-1 bg-[#F8FAF9]`}>
        <StatusBar barStyle="dark-content" />
        {isLoading && <ProcessingView />}

        <View style={tw`bg-white border-b border-slate-100 px-4 h-16 flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => setActiveView('setup')}
          >
            <View style={tw`w-8 h-8 bg-[#52B788] rounded-lg items-center justify-center`}>
              <FontAwesome6 name="seedling" size={14} color="white" />
            </View>
            <Text style={tw`text-lg font-bold tracking-tight text-slate-800 ml-2`}>
              FitAI <Text style={tw`text-[#52B788]`}>Wellness</Text>
            </Text>
          </TouchableOpacity>

          <View style={tw`w-8`} />
        </View>

        <ScrollView contentContainerStyle={tw`px-4 py-8 pb-32`}>
          {error && (
            <View style={tw`mb-8 bg-rose-50 border border-rose-100 px-4 py-3 rounded-2xl flex-row items-center`}>
              <FontAwesome6 name="circle-info" size={14} color="#E11D48" style={tw`mr-2`} />
              <Text style={tw`text-rose-600 text-sm flex-1`}>{error}</Text>
            </View>
          )}

          <View>
            {activeView === 'setup' ? (
              <View style={tw`items-center py-10`}>
                <View style={tw`text-center space-y-4 mb-10 max-w-xs`}>
                  <Text style={tw`text-3xl font-bold tracking-tight text-slate-900 text-center`}>
                    Your journey to {"\n"}
                    <Text style={tw`text-[#52B788]`}>balanced wellness</Text>.
                  </Text>
                  <Text style={tw`text-slate-500 text-lg text-center mt-4`}>
                    Let's create a routine that fits your life and makes you feel great.
                  </Text>
                </View>
                <View style={tw`w-full`}>
                  <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
                </View>
              </View>
            ) : (
              <View style={tw`w-full`}>
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
                  <View style={tw`space-y-8`}>
                    <ImageAnalyzer />
                    <View style={tw`h-8`} />
                    <ProgressTracker profile={profile} assessment={assessment} />
                    <View style={tw`h-8`} />
                    <ReportView result={assessment} onReset={handleReset} />
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {assessment && (
          <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-24 flex-row items-center justify-around px-2 rounded-t-[24px] shadow-lg`}>
            {[
              { id: 'dashboard', icon: 'house', label: 'Home' },
              { id: 'training', icon: 'heart', label: 'Routine' },
              { id: 'coach', icon: 'comment', label: 'Coach' },
              { id: 'calories', icon: 'bowl-food', label: 'Meals' },
              { id: 'progress', icon: 'chart-simple', label: 'Log' },
            ].map((nav) => (
              <TouchableOpacity
                key={nav.id}
                onPress={() => setActiveView(nav.id as ViewState)}
                style={tw`items-center flex-1 py-2`}
              >
                <FontAwesome6
                  name={nav.icon}
                  size={20}
                  color={activeView === nav.id ? '#52B788' : '#94A3B8'}
                />
                <Text style={tw`text-[10px] mt-1 font-semibold ${activeView === nav.id ? 'text-[#52B788]' : 'text-slate-400'}`}>
                  {nav.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
