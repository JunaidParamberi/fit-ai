
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WeeklyProgress, UserProfile, AssessmentResult, StrengthMetric } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';
import { Svg, Circle, Line, Path } from 'react-native-svg';

interface Props { profile: UserProfile; assessment: AssessmentResult; }

type Period = '7 Days' | '14 Days' | '30 Days';

const ProgressTracker: React.FC<Props> = ({ profile, assessment }) => {
  const [period, setPeriod] = useState<Period>('14 Days');
  const [isGraphLoading, setIsGraphLoading] = useState(true);

  useEffect(() => {
    setIsGraphLoading(true);
    const timer = setTimeout(() => setIsGraphLoading(false), 300);
    return () => clearTimeout(timer);
  }, [period]);

  const strengthMetrics: StrengthMetric[] = [
    { name: 'Squat', previousWeight: 100, currentWeight: 105, unit: 'kg' },
    { name: 'Bench Press', previousWeight: 80, currentWeight: 82.5, unit: 'kg' },
    { name: 'Deadlift', previousWeight: 140, currentWeight: 145, unit: 'kg' },
  ];

  const consistencyScore = 92;

  const getGraphPath = () => {
    if (period === '7 Days') return "M0,80 C40,75 80,85 120,70 S160,75 200,60";
    if (period === '14 Days') return "M0,90 C40,85 80,95 120,80 S160,85 200,70";
    return "M0,95 C40,90 80,100 120,85 S160,90 200,75";
  };

  return (
    <View style={tw`space-y-6`}>
      <View style={tw`px-1 mb-6`}>
        <Text style={tw`text-3xl font-bold text-slate-900 tracking-tight`}>Progress</Text>
        <Text style={tw`text-slate-500 font-medium text-sm mt-1`}>Consistency creates results.</Text>
      </View>

      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex-row items-center justify-between mb-6`}>
        <View style={tw`space-y-1`}>
          <Text style={tw`font-bold text-slate-800 text-sm`}>Consistency</Text>
          <Text style={tw`text-xs text-slate-500 font-medium`}>92% attendance this month</Text>
        </View>
        <View style={tw`relative w-12 h-12 items-center justify-center`}>
          <Svg height="48" width="48" viewBox="0 0 48 48" style={tw`absolute`}>
            <Circle cx="24" cy="24" r="20" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
            <Circle
              cx="24" cy="24" r="20"
              stroke="#52B788" strokeWidth="4" fill="transparent"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * consistencyScore) / 100}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </Svg>
          <Text style={tw`text-[10px] font-bold text-slate-800`}>{consistencyScore}%</Text>
        </View>
      </View>

      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
        <View style={tw`flex-row justify-between items-start mb-8`}>
          <View>
            <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1`}>Body Weight</Text>
            <View style={tw`flex-row items-baseline space-x-1`}>
              <Text style={tw`text-3xl font-bold text-slate-900`}>74.2</Text>
              <Text style={tw`text-sm font-bold text-slate-400 ml-1`}>kg</Text>
            </View>
          </View>
          <View style={tw`flex-row bg-slate-50 p-1 rounded-xl border border-slate-100`}>
            {(['7 Days', '14 Days', '30 Days'] as Period[]).map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriod(p)}
                style={[tw`px-3 py-1 rounded-lg`, period === p ? tw`bg-white shadow-sm` : null]}
              >
                <Text style={[tw`text-[9px] font-bold uppercase transition-all`, period === p ? tw`text-[#52B788]` : tw`text-slate-400`]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tw`h-40 w-full relative`}>
          <Svg height="160" width="100%" viewBox="0 0 200 100">
            <Line x1="0" y1="25" x2="200" y2="25" stroke="#F1F5F9" strokeWidth="1" />
            <Line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="1" />
            <Line x1="0" y1="75" x2="200" y2="75" stroke="#F1F5F9" strokeWidth="1" />
            <Path
              d={getGraphPath()}
              fill="none"
              stroke="#52B788"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={isGraphLoading ? 0 : 1}
            />
          </Svg>
        </View>
      </View>

      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
        <Text style={tw`text-sm font-bold text-slate-800 mb-4`}>Strength Stats</Text>
        {strengthMetrics.map((m, i) => (
          <View key={i} style={tw`mb-6`}>
            <View style={tw`flex-row justify-between items-end mb-2`}>
              <Text style={tw`text-xs font-bold text-slate-500 uppercase tracking-wider`}>{m.name}</Text>
              <Text style={tw`text-sm font-bold text-slate-800`}>{m.currentWeight}{m.unit}</Text>
            </View>
            <View style={tw`h-1.5 w-full bg-slate-50 rounded-full overflow-hidden`}>
              <View style={[tw`h-full bg-[#52B788] rounded-full`, { width: `${60 + (i * 10)}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={tw`bg-[#EDF2F0] p-6 rounded-3xl mb-12`}>
        <View style={tw`flex-row items-start`}>
          <View style={tw`w-10 h-10 rounded-xl bg-white items-center justify-center shadow-sm mr-4`}>
            <FontAwesome6 name="sparkles" size={14} color="#52B788" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-[#2D6A4F]`}>Smart Tip</Text>
            <Text style={tw`text-xs text-[#2D6A4F] font-medium leading-relaxed mt-1`}>
              Your recovery is improving. Add small weight increases to your next session!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressTracker;
