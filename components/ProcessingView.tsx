import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import tw from 'twrnc';

const MESSAGES = [
  "Creating your personal routine...",
  "Looking at your nutrition goals...",
  "Setting up your wellness plan...",
  "Finding the best routine for you...",
  "Almost ready..."
];

const ProcessingView: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [progressAnim]);

  const translateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 200]
  });

  return (
    <View style={[StyleSheet.absoluteFill, tw`z-50 items-center justify-center p-6`, { backgroundColor: 'rgba(248, 250, 249, 0.95)' }]}>
      <View style={tw`relative mb-12`}>
        <View style={tw`w-24 h-24 rounded-full bg-[#52B7881A] items-center justify-center`}>
          <View style={tw`w-16 h-16 rounded-full bg-[#52B78833] items-center justify-center`}>
            <FontAwesome6 name="seedling" size={30} color="#52B788" />
          </View>
        </View>
      </View>
      
      <View style={tw`items-center`}>
        <Text style={tw`text-xl font-bold text-slate-800`}>
          Just a moment
        </Text>
        <Text style={tw`text-slate-500 font-medium text-center mt-3`}>
          {MESSAGES[msgIdx]}
        </Text>
      </View>

      <View style={tw`absolute bottom-12 w-32 h-1 bg-slate-100 rounded-full overflow-hidden`}>
        <Animated.View
          style={[
            tw`h-full bg-[#52B788] w-1/3`,
            { transform: [{ translateX }] }
          ]}
        />
      </View>
    </View>
  );
};

export default ProcessingView;
