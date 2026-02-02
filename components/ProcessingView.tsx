import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Creating your personal routine...",
  "Looking at your nutrition goals...",
  "Setting up your wellness plan...",
  "Finding the best routine for you...",
  "Almost ready..."
];

const ProcessingView: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#F8FAF9]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
      <div className="relative mb-12">
        <div className="w-24 h-24 rounded-full bg-[#52B788]/10 flex items-center justify-center pulse-soft">
          <div className="w-16 h-16 rounded-full bg-[#52B788]/20 flex items-center justify-center">
            <i className="fa-solid fa-seedling text-3xl text-[#52B788]"></i>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-slate-800">
          Just a moment
        </h3>
        <p className="text-slate-500 font-medium transition-all duration-500">
          {MESSAGES[msgIdx]}
        </p>
      </div>

      <div className="absolute bottom-12 w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#52B788] w-1/3 animate-[progress_2s_infinite_ease-in-out]"></div>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingView;