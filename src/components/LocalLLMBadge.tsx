import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocalLLMBadge: React.FC = () => {
  const { isLocalLLMReady, setShowLocalLLMModal, localLLMMetrics } = useApp();

  return (
    <button
      onClick={() => setShowLocalLLMModal(true)}
      className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 shadow-sm transition hover:bg-amber-100 active:scale-95"
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isLocalLLMReady ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
        <span className={`relative inline-flex h-2 w-2 rounded-full ${isLocalLLMReady ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
      </span>

      <Cpu className="h-3.5 w-3.5 text-amber-700" />
      
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="font-semibold text-amber-900">Private On-Device AI</span>
        <span className="text-amber-400">|</span>
        <span className="font-mono text-amber-800">
          {isLocalLLMReady ? `${localLLMMetrics.tokensPerSec} tok/s` : 'WebGPU'}
        </span>
      </div>

      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 ml-0.5" />
    </button>
  );
};
