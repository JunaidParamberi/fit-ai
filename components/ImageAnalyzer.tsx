
import React, { useState } from 'react';
import { analyzeHealthImage } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalysis(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsLoading(true);
    try {
      const base64 = await toBase64(file);
      const data = base64.split(',')[1];
      const result = await analyzeHealthImage(data, file.type);
      setAnalysis(result);
    } catch (err) {
      setAnalysis("We couldn't process the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="soft-card p-6 overflow-hidden group/analyzer">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Photo Log</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Analyze meals or form</p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-colors ${
          isLoading ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'
        }`}>
          {isLoading ? 'Processing...' : 'Ready'}
        </div>
      </div>

      <div className="space-y-6">
        <label 
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          className={`relative flex flex-col items-center justify-center w-full h-64 bg-slate-50 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer transition-all overflow-hidden ${
            isPressed ? 'scale-[0.98]' : 'hover:border-[#52B788]/30'
          }`}
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-40' : 'opacity-100'}`} />
              
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 border-4 border-[#52B788]/20 border-t-[#52B788] rounded-full animate-spin"></div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-widest mt-4">Analyzing Details</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8 transition-transform group-hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-slate-50 mb-4 mx-auto group-hover:border-[#52B788]/30 soft-shadow transition-all">
                <i className="fa-solid fa-camera text-xl text-slate-300 group-hover:text-[#52B788] transition-colors"></i>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tap to upload photo</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
        </label>

        {analysis && (
          <div className="p-6 bg-[#F8FAF9] rounded-2xl border border-slate-100 space-y-4 animate-soft-fade-in">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-sparkles text-[#52B788] text-xs"></i>
              <span className="text-[10px] font-bold text-[#52B788] uppercase tracking-widest">Coach's Observation</span>
            </div>
            
            <div className="space-y-3">
              {analysis.split('\n').map((line, i) => {
                const cleanedLine = line.replace(/^[•\s*-]+/, '').trim();
                if (!cleanedLine) return null;
                return (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-full bg-[#52B788] mt-1.5 mr-3 flex-shrink-0"></div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{cleanedLine}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalyzer;
