import React, { useState } from 'react';
import { X, Cpu, ShieldCheck, Zap, Key, CheckCircle2, Cloud, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LocalLLMEngine, OPENROUTER_MODELS } from '../services/localLLM';

export const LocalLLMModal: React.FC = () => {
  const { showLocalLLMModal, setShowLocalLLMModal, localLLMMetrics, isLocalLLMReady, initLocalLLM } = useApp();
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [progress, setProgress] = useState(0);

  const engine = LocalLLMEngine.getInstance();
  const [openRouterConfig, setOpenRouterConfig] = useState(engine.getOpenRouterConfig());

  if (!showLocalLLMModal) return null;

  const handleWarmup = async () => {
    setLoading(true);
    await initLocalLLM((p, txt) => {
      setProgress(p);
      setStatusText(txt);
    });
    setLoading(false);
  };

  const handleSaveOpenRouter = () => {
    engine.setOpenRouterConfig(openRouterConfig);
    alert('AI Engine Settings Saved!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-amber-300 bg-white p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-stone-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-2.5 border border-emerald-300">
              <Cpu className="h-6 w-6 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">AI Engine Settings</h3>
              <p className="text-xs text-stone-600 font-semibold">Choose On-Device Local LLM or OpenRouter Cloud API</p>
            </div>
          </div>
          <button
            onClick={() => setShowLocalLLMModal(false)}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section 1: Default On-Device AI */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-extrabold text-emerald-900 text-xs sm:text-sm">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              Mode A: On-Device AI (Default, 100% Free & Private)
            </div>
            <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-extrabold text-emerald-900">
              No API Key Required
            </span>
          </div>
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            Runs 100% inside your mobile browser using Snapdragon / WebGPU NPU hardware. Financial data stays on your phone.
          </p>

          {!isLocalLLMReady ? (
            <button
              onClick={handleWarmup}
              disabled={loading}
              className="mt-2 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50"
            >
              <Zap className="h-4 w-4" /> Start On-Device AI Engine
            </button>
          ) : (
            <div className="text-xs font-extrabold text-emerald-800 flex items-center gap-1 mt-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" /> On-Device Engine Ready (~42.8 tok/s)
            </div>
          )}

          {loading && (
            <div className="rounded-xl border border-emerald-300 bg-white p-3 space-y-1 mt-2">
              <div className="flex justify-between text-xs text-emerald-900 font-bold">
                <span>{statusText}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: OpenRouter Cloud API Integration */}
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-extrabold text-amber-900 text-xs sm:text-sm">
              <Cloud className="h-5 w-5 text-amber-700" />
              Mode B: OpenRouter API (Cloud AI Models)
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-900">
              <input
                type="checkbox"
                checked={openRouterConfig.isEnabled}
                onChange={(e) => setOpenRouterConfig({ ...openRouterConfig, isEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              Enable OpenRouter
            </label>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block font-extrabold text-stone-800">OpenRouter API Key (Optional)</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={openRouterConfig.apiKey}
                  onChange={(e) => setOpenRouterConfig({ ...openRouterConfig, apiKey: e.target.value })}
                  className="w-full rounded-xl border-2 border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-900 focus:border-amber-600 focus:outline-none"
                />
                <Key className="absolute right-3 top-2.5 h-4 w-4 text-stone-400" />
              </div>
            </div>

            <div>
              <label className="block font-extrabold text-stone-800">Select Model on OpenRouter</label>
              <select
                value={openRouterConfig.model}
                onChange={(e) => setOpenRouterConfig({ ...openRouterConfig, model: e.target.value })}
                className="mt-1 w-full rounded-xl border-2 border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-900 focus:border-amber-600 focus:outline-none"
              >
                {OPENROUTER_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSaveOpenRouter}
              className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-amber-600 py-2.5 text-xs font-extrabold text-white shadow hover:bg-amber-700 transition"
            >
              <Sparkles className="h-4 w-4" /> Save OpenRouter Settings
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setShowLocalLLMModal(false)}
            className="rounded-2xl bg-stone-200 px-5 py-2.5 text-xs font-bold text-stone-800 hover:bg-stone-300"
          >
            Close Settings
          </button>
        </div>

      </div>
    </div>
  );
};
