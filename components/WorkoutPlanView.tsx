import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WorkoutPlan } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

interface Props {
  plan: WorkoutPlan;
}

const WorkoutPlanView: React.FC<Props> = ({ plan }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const currentWorkout = plan.weeklySplit[selectedDayIdx] || plan.weeklySplit[0];

  return (
    <View style={tw`space-y-6 pb-24`}>
      {/* Header */}
      <View style={tw`flex-row items-end justify-between px-1 mb-6`}>
        <View>
          <Text style={tw`text-xs font-bold text-[#52B788] uppercase tracking-wider`}>Your Routine</Text>
          <Text style={tw`text-3xl font-bold text-slate-900 tracking-tight mt-1`}>Today's Session</Text>
        </View>
        <View style={tw`w-12 h-12 bg-white rounded-2xl items-center justify-center border border-slate-50 shadow-sm`}>
          <FontAwesome6 name="dumbbell" size={20} color="#52B788" />
        </View>
      </View>

      {/* Day Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row py-2 -mx-1 px-1 mb-6`}>
        {plan.weeklySplit.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setSelectedDayIdx(idx)}
            style={[tw`px-5 py-3 rounded-2xl font-bold mx-1 border`,
              selectedDayIdx === idx 
              ? tw`bg-[#52B788] border-[#52B788] shadow-md`
              : tw`bg-white border-slate-100`
            ]}
          >
            <Text style={[tw`font-bold text-sm`, selectedDayIdx === idx ? tw`text-white` : tw`text-slate-400`]}>
              {day.day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Routine Focus Card */}
      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border-l-4 border-l-[#52B788] mb-6`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-xl font-bold text-slate-800 tracking-tight`}>{currentWorkout.focus}</Text>
            <Text style={tw`text-sm text-slate-500 font-medium mt-1`}>
              Estimated duration: <Text style={tw`text-[#2D6A4F] font-bold`}>45 mins</Text>
            </Text>
          </View>
          <View style={tw`items-end`}>
            <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest`}>Intensity</Text>
            <View style={tw`flex-row space-x-0.5 mt-1`}>
              {[1, 2, 3, 4].map(i => (
                <View key={i} style={[tw`w-3 h-1 rounded-full mx-0.5`, i <= 3 ? tw`bg-[#52B788]` : tw`bg-slate-100`]} />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Exercise List */}
      <View style={tw`space-y-4 mb-6`}>
        <Text style={tw`text-xs font-bold text-slate-400 uppercase tracking-widest px-1 mb-4`}>Exercises</Text>
        {currentWorkout.exercises.map((ex, idx) => (
          <View key={idx} style={tw`bg-white p-5 rounded-3xl shadow-sm border border-slate-50 mb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center space-x-4`}>
                <View style={tw`w-10 h-10 bg-[#F8FAF9] rounded-xl items-center justify-center border border-slate-50 mr-4`}>
                  <Text style={tw`text-slate-400 font-bold text-sm`}>{idx + 1}</Text>
                </View>
                <View>
                  <Text style={tw`font-bold text-slate-800 text-base`}>{ex.name}</Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <View style={tw`bg-[#EDF2F0] px-2 py-0.5 rounded mr-3`}>
                      <Text style={tw`text-[#2D6A4F] text-xs font-semibold`}>{ex.sets} Sets</Text>
                    </View>
                    <Text style={tw`text-xs font-semibold text-slate-500`}>{ex.reps} Reps</Text>
                  </View>
                </View>
              </View>
              <View style={tw`items-end`}>
                <Text style={tw`text-[10px] font-bold text-slate-300 uppercase tracking-widest`}>Rest</Text>
                <Text style={tw`text-sm font-bold text-slate-600`}>{ex.rest}s</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Tip Card */}
      <View style={tw`bg-[#EDF2F0] p-6 rounded-3xl border border-dashed border-[#52B78833] mb-6`}>
        <View style={tw`flex-row items-start space-x-4`}>
          <View style={tw`w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm mr-4`}>
            <FontAwesome6 name="lightbulb" size={14} color="#52B788" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-slate-800 mb-1`}>Trainer Tip</Text>
            <Text style={tw`text-xs text-slate-600 leading-relaxed font-medium`}>
              {plan.progressiveOverloadGuidance || "Focus on your breathing and maintain a steady tempo throughout each movement."}
            </Text>
          </View>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity style={tw`w-full bg-[#52B788] py-5 rounded-2xl shadow-lg flex-row items-center justify-center`}>
        <FontAwesome6 name="play" size={14} color="white" style={tw`mr-3`} />
        <Text style={tw`text-white font-bold text-base`}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutPlanView;
