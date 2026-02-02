import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { analyzeHealthImage } from '../services/geminiService';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

const ImageAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPreview(asset.uri);
      setAnalysis(null);
      setIsLoading(true);

      try {
        if (asset.base64) {
          // Determine mime type from extension or default to image/jpeg
          const mimeType = asset.mimeType || 'image/jpeg';
          const res = await analyzeHealthImage(asset.base64, mimeType);
          setAnalysis(res);
        } else {
          setAnalysis("Could not get image data. Please try again.");
        }
      } catch (err) {
        setAnalysis("We couldn't process the image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={tw`bg-white p-6 rounded-3xl shadow-sm border border-slate-50 mb-6`}>
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <View>
          <Text style={tw`text-sm font-bold text-slate-800 uppercase tracking-wider`}>Photo Log</Text>
          <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1`}>Analyze meals or form</Text>
        </View>
        <View style={[tw`px-3 py-1 rounded-full border`, isLoading ? tw`bg-amber-50 border-amber-100` : tw`bg-slate-50 border-slate-100`]}>
          <Text style={[tw`text-[9px] font-bold uppercase tracking-widest`, isLoading ? tw`text-amber-600` : tw`text-slate-400`]}>
            {isLoading ? 'Processing...' : 'Ready'}
          </Text>
        </View>
      </View>

      <View style={tw`space-y-6`}>
        <TouchableOpacity
          onPress={handlePickImage}
          disabled={isLoading}
          style={[tw`relative items-center justify-center w-full h-64 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl overflow-hidden`, isLoading ? tw`opacity-70` : null]}
        >
          {preview ? (
            <>
              <Image source={{ uri: preview }} style={tw`w-full h-full`} resizeMode="cover" />
              
              {isLoading && (
                <View style={[tw`absolute inset-0 items-center justify-center`, { backgroundColor: 'rgba(255, 255, 255, 0.4)' }]}>
                  <ActivityIndicator size="large" color="#52B788" />
                  <Text style={tw`text-[10px] font-bold text-[#2D6A4F] uppercase tracking-widest mt-4`}>Analyzing Details</Text>
                </View>
              )}
            </>
          ) : (
            <View style={tw`items-center p-8`}>
              <View style={tw`w-14 h-14 rounded-2xl bg-white items-center justify-center border border-slate-50 mb-4 shadow-sm`}>
                <FontAwesome6 name="camera" size={20} color="#CBD5E1" />
              </View>
              <Text style={tw`text-[10px] font-bold text-slate-400 uppercase tracking-widest`}>Tap to upload photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {analysis && (
          <View style={tw`p-6 bg-[#F8FAF9] rounded-2xl border border-slate-100 mt-6`}>
            <View style={tw`flex-row items-center mb-4`}>
              <FontAwesome6 name="sparkles" size={12} color="#52B788" style={tw`mr-2`} />
              <Text style={tw`text-[10px] font-bold text-[#52B788] uppercase tracking-widest`}>Coach's Observation</Text>
            </View>
            
            <View style={tw`space-y-3`}>
              {analysis.split('\n').map((line, i) => {
                const cleanedLine = line.replace(/^[•\s*-]+/, '').trim();
                if (!cleanedLine) return null;
                return (
                  <View key={i} style={tw`flex-row items-start mb-2`}>
                    <View style={tw`w-1 h-1 rounded-full bg-[#52B788] mt-2 mr-3`} />
                    <Text style={tw`text-xs text-slate-600 font-medium leading-relaxed flex-1`}>{cleanedLine}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageAnalyzer;
