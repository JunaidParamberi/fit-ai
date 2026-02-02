import React from 'react';
import { View, Text } from 'react-native';
import { DietPlan } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

interface Props {
  plan: DietPlan;
}

const DietPlanView: React.FC<Props> = ({ plan }) => {
  return (
    <View style={tw`space-y-6 pb-20`}>
      <View style={tw`flex-row items-center justify-between px-1 mb-6`}>
        <View>
          <Text style={tw`text-2xl font-bold text-slate-900`}>Nourishment</Text>
          <Text style={tw`text-slate-500 text-sm mt-1`}>Fuel your body with the good stuff.</Text>
        </View>
        <View style={tw`w-10 h-10 bg-[#52B7881A] rounded-xl items-center justify-center`}>
          <FontAwesome6 name="leaf" size={18} color="#52B788" />
        </View>
      </View>

      <View style={tw`space-y-4`}>
        {plan.weeklyPlan.map((day, idx) => (
          <View key={idx} style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`font-bold text-slate-800`}>{day.day}</Text>
              <View style={tw`bg-[#F8FAF9] px-3 py-1 rounded-full border border-slate-100`}>
                <Text style={tw`text-xs font-bold text-[#52B788]`}>{day.totalCalories} kcal</Text>
              </View>
            </View>
            
            <View>
              {[
                { icon: 'sun', label: 'Breakfast', val: day.breakfast },
                { icon: 'utensils', label: 'Lunch', val: day.lunch },
                { icon: 'moon', label: 'Dinner', val: day.dinner }
              ].map((meal, mIdx) => (
                <View key={mIdx} style={tw`bg-[#F8FAF9] p-4 rounded-2xl border border-slate-100 mb-4`}>
                  <View style={tw`flex-row items-center mb-2`}>
                    <FontAwesome6 name={meal.icon === 'moon' ? 'moon' : meal.icon} size={10} color="#52B788" style={tw`mr-2`} />
                    <Text style={tw`text-[10px] font-bold uppercase tracking-widest text-slate-400`}>{meal.label}</Text>
                  </View>
                  <Text style={tw`text-xs font-medium text-slate-700 leading-relaxed`}>{meal.val}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={tw`bg-[#52B788] p-6 rounded-3xl mb-12`}>
        <View style={tw`flex-row items-center mb-3`}>
          <FontAwesome6 name="sparkles" size={14} color="rgba(255, 255, 255, 0.8)" style={tw`mr-3`} />
          <Text style={tw`text-xs font-bold uppercase tracking-widest text-white opacity-80`}>Coach's Advice</Text>
        </View>
        <Text style={tw`text-sm font-medium leading-relaxed italic text-white`}>
          "{plan.generalAdvice}"
        </Text>
      </View>
    </View>
  );
};

export default DietPlanView;
