import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { ChatMessage, AssessmentResult, UserProfile } from '../types';
import { chatWithCoach } from '../services/geminiService';
import tw from 'twrnc';
import { FontAwesome6 } from '@expo/vector-icons';

interface Props {
  profile: UserProfile;
  assessment: AssessmentResult;
}

const CoachView: React.FC<Props> = ({ profile, assessment }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your wellness coach. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim()) return;

    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await chatWithCoach(newMessages, textToSend);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm having a little trouble connecting. Let's try chatting again in a second!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    "What should I eat?",
    "Need motivation",
    "Stretches for today",
    "Feeling tired"
  ];

  return (
    <View style={tw`flex-1 h-[70vh]`}>
      <ScrollView
        ref={scrollRef} 
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        style={tw`flex-1 px-1 mb-4`}
      >
        {messages.map((m, i) => (
          <View key={i} style={tw`mb-4 flex-row ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <View style={[
              tw`max-w-[85%] px-5 py-3 rounded-[20px] shadow-sm`,
              m.role === 'user' 
              ? tw`bg-[#52B788] rounded-tr-none`
              : tw`bg-white border border-slate-100 rounded-tl-none`
            ]}>
              <Text style={[tw`text-sm leading-relaxed`, m.role === 'user' ? tw`text-white` : tw`text-slate-700`]}>
                {m.content}
              </Text>
            </View>
          </View>
        ))}
        {isTyping && (
          <View style={tw`flex-row justify-start mb-4`}>
            <View style={tw`bg-white border border-slate-100 px-5 py-4 rounded-[20px] rounded-tl-none shadow-sm flex-row space-x-1`}>
               <ActivityIndicator size="small" color="#52B788" />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={tw`py-4`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row mb-4`}>
          {quickPrompts.map((p, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleSend(p)}
              style={tw`bg-white border border-slate-100 px-4 py-2 rounded-full mr-2 shadow-sm`}
            >
              <Text style={tw`text-xs font-medium text-slate-500`}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={tw`flex-row items-center space-x-2`}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Talk to your coach..."
            style={tw`flex-1 px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm mr-2`}
          />
          <TouchableOpacity
            onPress={() => handleSend()}
            disabled={!input.trim() && !isTyping}
            style={[tw`w-14 h-14 bg-[#52B788] rounded-2xl items-center justify-center shadow-md`, (!input.trim() && !isTyping) ? tw`opacity-50` : null]}
          >
            {isTyping ? (
               <ActivityIndicator color="white" />
            ) : (
               <FontAwesome6 name="paper-plane" size={18} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CoachView;
