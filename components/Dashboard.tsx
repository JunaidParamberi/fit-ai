
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AssessmentResult, UserProfile } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';
import { Svg, Polyline } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

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
    <View style={tw`space-y-6 pb-12`}>
      {/* Greeting Section */}
      <View style={tw`flex-row items-center justify-between px-1 mb-6`}>
        <View style={tw`space-y-1`}>
          <Text style={tw`text-3xl font-bold text-slate-900 tracking-tight`}>
            Hi, {profile.gender === 'female' ? 'Sarah' : 'Friend'}!
          </Text>
          <Text style={tw`text-slate-500 font-medium`}>Ready for a great day?</Text>
        </View>
        <View style={tw`w-14 h-14 bg-white rounded-2xl border border-slate-50 items-center justify-center overflow-hidden shadow-sm`}>
          <SvgUri
            width="100%"
            height="100%"
            uri={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.gender}&backgroundColor=F8FAF9`}
          />
        </View>
      </View>

      {/* Main Nutrition Card */}
      <View style={tw`bg-white p-6 rounded-3xl shadow-sm mb-6 border border-slate-50`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`font-bold text-slate-800`}>Daily Progress</Text>
          <View style={tw`bg-[#52B7881A] px-3 py-1 rounded-full`}>
            <Text style={tw`text-[10px] font-bold text-[#52B788] uppercase tracking-wider`}>
              In Sync
            </Text>
          </View>
        </View>

        <View style={tw`space-y-5`}>
          {/* Calorie Progress */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-sm font-semibold text-slate-600`}>Calories</Text>
              <Text style={tw`text-sm font-semibold text-slate-900`}>{consumedCalories} / {assessment.tdee} kcal</Text>
            </View>
            <View style={tw`h-3 w-full bg-slate-100 rounded-full overflow-hidden`}>
              <View
                style={[tw`h-full bg-[#52B788] rounded-full`, { width: `${calPercent}%` }]}
              />
            </View>
          </View>

          {/* Protein Progress */}
          <View>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-sm font-semibold text-slate-600`}>Protein</Text>
              <Text style={tw`text-sm font-semibold text-slate-900`}>{consumedProtein}g / {assessment.macros.protein}g</Text>
            </View>
            <View style={tw`h-3 w-full bg-slate-100 rounded-full overflow-hidden`}>
              <View
                style={[tw`h-full bg-[#95D5B2] rounded-full`, { width: `${proteinPercent}%` }]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Secondary Row */}
      <View style={tw`flex-row space-x-4 mb-6`}>
        {/* Workout Status */}
        <View style={tw`flex-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex-row items-center space-x-4`}>
          <View style={tw`w-12 h-12 bg-[#F8FAF9] rounded-2xl items-center justify-center`}>
            <FontAwesome6 name="person-running" size={20} color="#52B788" />
          </View>
          <View>
            <Text style={tw`font-bold text-slate-800`}>Today's Routine</Text>
            <Text style={tw`text-sm text-slate-500 font-medium`}>Legs & Core • 45m</Text>
          </View>
        </View>
      </View>

      <View style={tw`flex-row space-x-4 mb-6`}>
        {/* Weight Trend */}
        <View style={tw`flex-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-50`}>
          <View style={tw`flex-row justify-between items-start mb-2`}>
            <View>
              <Text style={tw`font-bold text-slate-800`}>Weight</Text>
              <Text style={tw`text-xs text-slate-500 font-medium`}>Down 0.8kg this week</Text>
            </View>
            <View style={tw`flex-row items-baseline`}>
              <Text style={tw`text-lg font-bold text-slate-900`}>74.2</Text>
              <Text style={tw`text-xs font-bold text-slate-400 ml-1`}>kg</Text>
            </View>
          </View>
          <View style={tw`h-10 w-full mt-2`}>
            <Svg height="40" width="100%" viewBox="0 0 100 40">
              <Polyline
                points={sparklinePoints}
                fill="none"
                stroke="#52B788"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>
      </View>

      {/* Ask Coach Call-to-Action */}
      <TouchableOpacity style={tw`bg-white p-6 rounded-3xl shadow-sm border border-[#52B7881A] flex-row items-center space-x-4`}>
        <View style={tw`w-12 h-12 bg-[#52B788] rounded-full items-center justify-center shadow-sm`}>
          <FontAwesome6 name="comment-dots" size={18} color="white" />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-slate-800`}>Have a question?</Text>
          <Text style={tw`text-sm text-slate-500 font-medium`}>Ask your coach for some quick advice.</Text>
        </View>
        <FontAwesome6 name="chevron-right" size={14} color="#CBD5E1" />
      </TouchableOpacity>

      <View style={tw`px-1 mt-6 items-center`}>
        <Text style={tw`text-xs text-slate-400 font-medium text-center`}>
          Last updated today at 10:30 AM
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
