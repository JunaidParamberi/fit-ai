import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AssessmentResult, LoggedMeal } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';

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
    <View style={tw`space-y-6 pb-24`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-1 mb-6`}>
        <View>
          <Text style={tw`text-[10px] font-bold text-[#52B788] uppercase tracking-[0.2em] mb-1`}>Nutrition Hub</Text>
          <Text style={tw`text-3xl font-bold text-slate-800 tracking-tight`}>Today's Meals</Text>
        </View>
        <View style={tw`w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-50 shadow-sm`}>
          <FontAwesome6 name="apple-whole" size={20} color="#52B788" style={tw`opacity-80`} />
        </View>
      </View>

      {/* Hero Calorie Card */}
      <View style={tw`bg-white p-10 rounded-3xl items-center justify-center border border-slate-50 shadow-sm mb-6`}>
        <View style={tw`relative w-full max-w-[280px] aspect-square items-center justify-center`}>
          <Svg height="200" width="200" viewBox="0 0 256 256">
            <Circle
              cx="128" cy="128" r="100" 
              stroke="#F1F5F9" strokeWidth="8" fill="transparent" 
            />
            <Circle
              cx="128" cy="128" r="100" 
              stroke="#52B788" strokeWidth="12" fill="transparent" 
              strokeDasharray="628.3" strokeDashoffset={628.3 - (628.3 * progressPercent) / 100}
              strokeLinecap="round"
              transform="rotate(-90 128 128)"
            />
          </Svg>
          
          <View style={[tw`absolute items-center justify-center`, { top: 0, left: 0, right: 0, bottom: 0 }]}>
            <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1`}>Total Consumed</Text>
            <Text style={tw`text-5xl font-extrabold text-[#334155] tracking-tighter`}>{totalConsumed}</Text>
            <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-3`}>of {totalTarget} kcal</Text>
          </View>
        </View>
        
        <Text style={tw`text-sm font-medium text-slate-400 mt-6`}>
          You have <Text style={tw`text-[#52B788] font-bold`}>{remaining} kcal</Text> remaining for the day.
        </Text>
      </View>

      {/* Macro Grid */}
      <View style={tw`flex-row justify-between mb-6`}>
        {[
          { label: 'PROTEIN', val: totalMacros.p, color: 'bg-[#52B788]', pct: 64 },
          { label: 'CARBS', val: totalMacros.c, color: 'bg-[#74C69D]', pct: 27 },
          { label: 'FATS', val: totalMacros.f, color: 'bg-[#95D5B2]', pct: 32 }
        ].map((macro, i) => (
          <View key={i} style={tw`w-[31%] bg-white p-5 rounded-3xl items-center border border-slate-50 shadow-sm`}>
            <Text style={tw`text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center`}>{macro.label}</Text>
            <Text style={tw`text-lg font-bold text-slate-800 mb-4`}>{macro.val}g</Text>
            <View style={tw`w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-2`}>
              <View style={[tw`h-full ${macro.color} rounded-full`, { width: `${macro.pct}%` }]} />
            </View>
            <Text style={tw`text-[9px] font-bold text-slate-300 uppercase`}>{macro.pct}%</Text>
          </View>
        ))}
      </View>

      {/* Meal List Section */}
      <View style={tw`space-y-4 mb-6`}>
        <View style={tw`flex-row items-center justify-between px-1 mb-4`}>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest`}>Logged Today</Text>
          <TouchableOpacity>
            <Text style={tw`text-[10px] font-bold text-[#52B788] uppercase`}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {meals.map((meal) => (
          <View key={meal.id} style={tw`bg-white p-5 rounded-3xl border border-slate-50 shadow-sm mb-3 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center space-x-4`}>
              <View style={tw`w-10 h-10 bg-slate-50 rounded-xl items-center justify-center border border-slate-100 mr-4`}>
                <FontAwesome6 name="utensils" size={12} color="#52B788" style={tw`opacity-60`} />
              </View>
              <View>
                <Text style={tw`font-bold text-slate-700 text-sm`}>{meal.name}</Text>
                <Text style={tw`text-[10px] font-bold text-slate-300 uppercase mt-0.5`}>{meal.time}</Text>
              </View>
            </View>
            <View style={tw`items-end`}>
              <Text style={tw`text-sm font-bold text-slate-800`}>{meal.calories} kcal</Text>
            </View>
          </View>
        ))}
      </View>

      {/* CTA Button */}
      <TouchableOpacity style={tw`w-full bg-white border border-slate-100 py-5 rounded-3xl flex-row items-center justify-center shadow-sm`}>
        <FontAwesome6 name="plus" size={12} color="#52B788" style={tw`opacity-30 mr-3`} />
        <Text style={tw`text-xs font-bold text-slate-500`}>Log New Meal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalorieTracker;
