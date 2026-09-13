import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Download, Shield, Sparkles, Award, CheckCircle2, Lock, Landmark, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PitchDeckModal: React.FC = () => {
  const { showPitchDeckModal, setShowPitchDeckModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "OVERVIEW",
      title: "WARIS (वारिस)",
      subtitle: "Senior-Accessible Family Financial Security & Asset Recovery Protocol",
      bg: "bg-emerald-950 text-white",
      content: (
        <div className="space-y-6 text-center max-w-xl mx-auto py-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/80 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-emerald-200 border border-emerald-600">
            <Shield className="h-4 w-4 text-emerald-300" /> Hackathon Pitch Deck & Defense Protocol
          </div>
          <p className="text-sm sm:text-base text-emerald-100 font-semibold leading-relaxed">
            Eliminating bureaucratic asset recovery hurdles for Indian families through RBI Account Aggregator discovery, MeitY DigiLocker verification, and on-device WebGPU AI.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl bg-emerald-900/60 p-3 border border-emerald-700/50">
              <span className="text-lg sm:text-xl font-extrabold text-amber-400">₹1.5L Cr+</span>
              <p className="text-[11px] text-emerald-200 font-bold">Unclaimed Indian Assets</p>
            </div>
            <div className="rounded-2xl bg-emerald-900/60 p-3 border border-emerald-700/50">
              <span className="text-lg sm:text-xl font-extrabold text-emerald-300">100%</span>
              <p className="text-[11px] text-emerald-200 font-bold">Local Device Privacy</p>
            </div>
            <div className="rounded-2xl bg-emerald-900/60 p-3 border border-emerald-700/50">
              <span className="text-lg sm:text-xl font-extrabold text-amber-400">50+ Age</span>
              <p className="text-[11px] text-emerald-200 font-bold">Senior Accessible UX</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      tag: "THE PROBLEM",
      title: "₹1.5 Lakh Crore ($18B+) Lost Generation Wealth",
      subtitle: "Why millions of Indian families lose hard-earned savings when seniors pass away",
      bg: "bg-[#FDFBF7] text-stone-900",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-3xl border-2 border-stone-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 font-extrabold">01</div>
            <h4 className="font-extrabold text-stone-900 text-base">Forgotten Accounts</h4>
            <p className="text-xs text-stone-600 font-semibold leading-relaxed">
              Seniors accumulate bank accounts, FDs, LIC policies, and EPFO savings over 40+ years without a centralized record.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-stone-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 font-extrabold">02</div>
            <h4 className="font-extrabold text-stone-900 text-base">Unassigned Nominees</h4>
            <p className="text-xs text-stone-600 font-semibold leading-relaxed">
              Over 50% of savings lack updated nominee names, forcing families into civil court succession certificate battles.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-stone-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 font-extrabold">03</div>
            <h4 className="font-extrabold text-stone-900 text-base">Legal Notice Complexity</h4>
            <p className="text-xs text-stone-600 font-semibold leading-relaxed">
              Submitting bank claim forms (Form 20, EPFO 10D/5IF) requires specialized legal wording that seniors can't afford.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      tag: "THE SOLUTION",
      title: "Waaris Unified Asset & Recovery Protocol",
      subtitle: "Four core technological innovations solving financial security for seniors",
      bg: "bg-[#FDFBF7] text-stone-900",
      content: (
        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">1</div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm">1-Tap RBI Account Aggregator Auto-Discovery</h4>
              <p className="text-xs text-stone-700 font-semibold">Auto-scans SBI, HDFC, ICICI, LIC, and EPFO savings using phone number verification (Jupiter/Fi style).</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">2</div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm">MeitY DigiLocker Government Vault</h4>
              <p className="text-xs text-stone-700 font-semibold">Direct Govt of India document integration with green verified badges for policy bonds and UANs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">3</div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm">On-Device WebGPU AI Claim Writer</h4>
              <p className="text-xs text-stone-700 font-semibold">Local LLM execution in browser generating legally binding bank claim notices with 0 cloud data leaks.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">4</div>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm">Senior-First Ergonomics (50+ Age Group)</h4>
              <p className="text-xs text-stone-700 font-semibold">Warm light palette (#FDFBF7), zero dark mode, built-in Voice Assistant, and PWA taskbar installation.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      tag: "TECHNICAL ARCHITECTURE",
      title: "Client-Side Privacy Architecture",
      subtitle: "How Waaris protects user financial data without backend vulnerability",
      bg: "bg-[#FDFBF7] text-stone-900",
      content: (
        <div className="space-y-3 pt-2">
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-700 uppercase">Frontend Framework</span>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-lg">React 18 + Vite + Tailwind</span>
            </div>
            <p className="text-xs text-stone-600 font-semibold">Optimized for high readability, responsive mobile navigation, and PWA manifest taskbar dock installation.</p>
          </div>

          <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-700 uppercase">Local WebGPU LLM Engine</span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg">Wasm / WebGPU Local Execution</span>
            </div>
            <p className="text-xs text-stone-600 font-semibold">Runs Llama 3.3 / DeepSeek directly in client GPU memory. Fallback to encrypted cloud API when needed.</p>
          </div>

          <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-700 uppercase">Auth & Data Isolation</span>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-lg">Per-Phone Storage Encryption</span>
            </div>
            <p className="text-xs text-stone-600 font-semibold">Phone OTP verification isolates user asset vaults under strict localStorage keys ('waaris_assets_phone').</p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      tag: "JUDGE DEFENSE GUIDE",
      title: "Why Waaris is NOT an AI Wrapper",
      subtitle: "Hackathon judge Q&A defense points proving real technical depth",
      bg: "bg-amber-950 text-white",
      content: (
        <div className="space-y-3 pt-2 text-left">
          <div className="rounded-2xl bg-amber-900/60 p-4 border border-amber-700 space-y-1">
            <h4 className="font-extrabold text-amber-300 text-xs sm:text-sm">Q: "Is this just a wrapper around OpenAI / ChatGPT?"</h4>
            <p className="text-xs text-amber-100 font-semibold leading-relaxed">
              <strong>Defense:</strong> No. Waaris includes real financial protocol infrastructure: RBI Account Aggregator auto-discovery pipelines, MeitY DigiLocker OAuth integration, offline state management, and WebGPU local LLMs running 100% on device.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-900/60 p-4 border border-amber-700 space-y-1">
            <h4 className="font-extrabold text-amber-300 text-xs sm:text-sm">Q: "How is senior security guaranteed?"</h4>
            <p className="text-xs text-amber-100 font-semibold leading-relaxed">
              <strong>Defense:</strong> Zero net banking passwords or PINs are collected. Asset records live strictly inside local device memory tied to verified phone OTP sessions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      tag: "LIVE APPLICATION DEMO",
      title: "Waaris (वारिस) is Live",
      subtitle: "Deployed on Vercel temporary edge infrastructure",
      bg: "bg-emerald-900 text-white",
      content: (
        <div className="space-y-5 text-center max-w-lg mx-auto py-4">
          <div className="rounded-3xl bg-white p-6 text-stone-900 shadow-xl border-2 border-emerald-400 space-y-3">
            <span className="text-xs font-extrabold uppercase text-emerald-700">Production Deployment URL</span>
            <div className="font-mono text-sm sm:text-base font-extrabold text-emerald-950 bg-emerald-50 p-3 rounded-2xl border border-emerald-300 break-all select-all">
              https://temporary-agile-orion-nb23bbw.vercel.app
            </div>
            <p className="text-xs text-stone-600 font-bold">
              Fully responsive PWA with offline Service Worker support and mobile taskbar installation.
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showPitchDeckModal) return;
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPitchDeckModal, slides.length]);

  if (!showPitchDeckModal) return null;

  const slide = slides[currentSlide];

  const handleDownloadPptx = () => {
    const link = document.createElement('a');
    link.href = '/Waaris_Pitch_Deck.pptx';
    link.download = 'Waaris_Pitch_Deck.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-3 sm:p-6 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-emerald-400 bg-white shadow-2xl flex flex-col h-[85vh] max-h-[700px]">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-100/90 px-6 py-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
              <Presentation className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">Waaris Hackathon Pitch Deck</h3>
              <p className="text-[11px] font-bold text-stone-500">Slide {currentSlide + 1} of {slides.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Waaris_Pitch_Deck.pptx"
              download="Waaris_Pitch_Deck.pptx"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-emerald-700 shadow transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .PPTX</span>
            </a>

            <button
              onClick={() => setShowPitchDeckModal(false)}
              className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className={`flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 ${slide.bg}`}>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
              {slide.tag}
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-base font-semibold opacity-90">
              {slide.subtitle}
            </p>
          </div>

          <div className="my-auto py-4">
            {slide.content}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between border-t border-stone-200/20 pt-4 shrink-0">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="flex items-center gap-1.5 rounded-xl bg-stone-900/10 px-4 py-2 text-xs font-extrabold disabled:opacity-30 hover:bg-stone-900/20 transition"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-stone-400/40 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white disabled:opacity-30 hover:bg-emerald-700 shadow transition"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
