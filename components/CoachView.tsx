import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AssessmentResult, UserProfile } from '../types';
import { chatWithCoach } from '../services/geminiService';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input;
    if (!textToSend.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsTyping(true);

    try {
      const response = await chatWithCoach(messages, textToSend);
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
    <div className="flex flex-col h-[75vh]">
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-4 px-1 pb-4"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-[20px] text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-[#52B788] text-white rounded-tr-none' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none soft-shadow'
            }`}>
              <div className="whitespace-pre-line">{m.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-5 py-4 rounded-[20px] rounded-tl-none soft-shadow flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#52B788] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#52B788] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-[#52B788] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="py-4 space-y-4">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {quickPrompts.map((p, i) => (
            <button 
              key={i}
              onClick={() => handleSend(p)}
              className="flex-shrink-0 bg-white border border-slate-100 px-4 py-2 rounded-full text-xs font-medium text-slate-500 hover:bg-[#F8FAF9] hover:text-[#52B788] transition-colors soft-shadow"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Talk to your coach..."
            className="flex-1 px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#52B788]/20 text-sm"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() && !isTyping}
            className="w-14 h-14 bg-[#52B788] text-white rounded-2xl flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95 shadow-md"
          >
            <i className={`fa-solid ${isTyping ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-lg`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachView;