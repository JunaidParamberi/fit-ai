import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AssessmentResult } from '../types';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

interface Props {
  result: AssessmentResult;
  onReset: () => void;
}

const ReportView: React.FC<Props> = ({ result, onReset }) => {
  return (
    <View style={tw`space-y-6 pb-24`}>
      {/* Header Section */}
      <View style={tw`px-1 mb-6`}>
        <Text style={tw`text-3xl font-bold text-slate-900 tracking-tight`}>Analysis</Text>
        <Text style={tw`text-slate-500 font-medium text-sm mt-1`}>Your wellness blueprint is ready.</Text>
      </View>

      {/* Wellness Snapshot - 2x2 Grid */}
      <View style={tw`flex-row flex-wrap justify-between mb-6`}>
        <View style={tw`w-[48%] bg-white p-5 rounded-3xl shadow-sm border border-slate-50 mb-4`}>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2`}>BMI Score</Text>
          <View style={tw`flex-row items-baseline mb-1`}>
            <Text style={tw`text-2xl font-bold text-slate-800`}>{result.bmi.toFixed(1)}</Text>
          </View>
          <Text style={tw`text-[10px] font-bold text-[#52B788]`}>{result.bmiClassification}</Text>
        </View>
        
        <View style={tw`w-[48%] bg-white p-5 rounded-3xl shadow-sm border border-slate-50 mb-4`}>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2`}>Daily Goal</Text>
          <View style={tw`flex-row items-baseline mb-1`}>
            <Text style={tw`text-2xl font-bold text-slate-800`}>{result.tdee}</Text>
            <Text style={tw`text-[10px] font-bold text-slate-400 ml-1`}>kcal</Text>
          </View>
          <Text style={tw`text-[10px] font-bold text-slate-400 tracking-tight`}>Maintained energy</Text>
        </View>

        <View style={tw`w-[48%] bg-white p-5 rounded-3xl shadow-sm border border-slate-50 mb-4`}>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2`}>Primary Focus</Text>
          <Text style={tw`text-sm font-bold text-slate-800`} numberOfLines={1}>{result.primaryFocus}</Text>
          <FontAwesome6 name="bullseye" size={12} color="#52B788" style={tw`mt-2`} />
        </View>

        <View style={tw`w-[48%] bg-white p-5 rounded-3xl shadow-sm border border-slate-50 mb-4`}>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2`}>Health Status</Text>
          <Text style={tw`text-sm font-bold text-slate-800`}>Nominal</Text>
          <View style={tw`flex-row space-x-1 mt-2`}>
            {[1, 2, 3].map(i => (
              <View key={i} style={tw`w-1.5 h-1.5 rounded-full bg-[#52B788] mx-0.5`} />
            ))}
          </View>
        </View>
      </View>

      {/* Macros Card */}
      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`font-bold text-slate-800 text-sm`}>Macro Distribution</Text>
          <FontAwesome6 name="chart-pie" size={16} color="#E2E8F0" />
        </View>
        <View style={tw`space-y-5`}>
          {[
            { label: 'Protein', val: result.macros.protein, color: 'bg-[#52B788]' },
            { label: 'Carbs', val: result.macros.carbs, color: 'bg-[#74C69D]' },
            { label: 'Fats', val: result.macros.fats, color: 'bg-[#95D5B2]' }
          ].map((macro, i) => (
            <View key={i} style={tw`mb-4`}>
              <View style={tw`flex-row justify-between mb-2`}>
                <Text style={tw`text-xs font-bold text-slate-500 uppercase tracking-wider`}>{macro.label}</Text>
                <Text style={tw`text-slate-800 font-bold text-xs`}>{macro.val}g</Text>
              </View>
              <View style={tw`h-2 w-full bg-slate-100 rounded-full overflow-hidden`}>
                <View
                  style={[tw`h-full ${macro.color} rounded-full`, { width: `${Math.min((macro.val / (macro.val + 50)) * 100, 100)}%` }]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Focus Areas Card */}
      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
        <Text style={tw`font-bold text-slate-800 text-sm mb-4`}>Focus Areas</Text>
        <View style={tw`space-y-3`}>
          {result.issues.map((issue, idx) => (
            <View key={idx} style={tw`flex-row items-center p-3 bg-[#F8FAF9] rounded-xl border border-slate-100 mb-2`}>
              <View style={tw`w-2 h-2 rounded-full bg-[#52B788] mr-3`} />
              <Text style={tw`text-xs font-medium text-slate-700`}>{issue}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations Card */}
      <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
        <Text style={tw`font-bold text-slate-800 text-sm mb-4`}>Next Steps</Text>
        <View style={tw`space-y-4`}>
          {result.recommendations.split('\n').filter(l => l.trim()).map((line, i) => (
            <View key={i} style={tw`flex-row items-start mb-4`}>
              <View style={tw`w-5 h-5 rounded-full bg-[#EDF2F0] items-center justify-center mr-3`}>
                <Text style={tw`text-[10px] text-[#52B788] font-bold`}>{i + 1}</Text>
              </View>
              <Text style={tw`text-xs font-medium text-slate-600 leading-relaxed flex-1`}>
                {line.replace(/^[•\s*-]+/, '')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={tw`pt-4 px-1 space-y-3`}>
        <TouchableOpacity
          onPress={() => Alert.alert("PDF Export", "In a real app, this would generate and save a PDF report.")}
          style={tw`w-full bg-white border border-slate-200 py-4 rounded-2xl items-center justify-center flex-row mb-3 shadow-sm`}
        >
          <FontAwesome6 name="file-pdf" size={14} color="#94A3B8" style={tw`mr-2`} />
          <Text style={tw`text-slate-600 font-bold text-sm`}>Save as PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onReset}
          style={tw`w-full bg-rose-50 py-4 rounded-2xl items-center justify-center flex-row shadow-sm`}
        >
          <FontAwesome6 name="rotate-left" size={14} color="#F43F5E" style={tw`mr-2`} />
          <Text style={tw`text-rose-500 font-bold text-sm`}>Restart Assessment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportView;
