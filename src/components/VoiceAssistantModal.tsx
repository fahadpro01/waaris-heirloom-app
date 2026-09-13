import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, X, Sparkles, Navigation, Shield, HeartHandshake, FileText, CheckCircle, Bot, ArrowRight, CornerDownRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VoiceAssistantModal: React.FC = () => {
  const { showVoiceAssistantModal, setShowVoiceAssistantModal, setActiveTab, userPhone } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [aiSpeechText, setAiSpeechText] = useState('Namaste! Where would you like to go? Speak any command or tap below.');
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(10).fill(15));
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Setup browser SpeechRecognition API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN';

      rec.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscribedText(currentTranscript);
        processVoiceCommand(currentTranscript);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (isListening) {
      timer = setInterval(() => {
        setAudioLevel(prev => prev.map(() => Math.floor(Math.random() * 65 + 20)));
      }, 100);
    } else {
      setAudioLevel(new Array(10).fill(15));
    }
    return () => clearInterval(timer);
  }, [isListening]);

  if (!showVoiceAssistantModal) return null;

  const speakAudio = (text: string) => {
    setAiSpeechText(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceListening = () => {
    setTranscribedText('');
    setIsListening(true);
    speakAudio("Listening to your voice command... Speak where you want to go.");

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  const stopVoiceListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const processVoiceCommand = (rawText: string) => {
    const text = rawText.toLowerCase();

    if (text.includes('map') || text.includes('account') || text.includes('bank') || text.includes('assets') || text.includes('fd')) {
      handleNavigate('asset_mapper', "Navigating to your family financial map and bank accounts...");
    } else if (text.includes('claim') || text.includes('money') || text.includes('recover') || text.includes('death')) {
      handleNavigate('recover_dashboard', "Opening bank claim forms and legal heir guidance...");
    } else if (text.includes('quiz') || text.includes('safety') || text.includes('readiness') || text.includes('score')) {
      handleNavigate('protect_test', "Opening your family safety quiz scorecard...");
    } else if (text.includes('letter') || text.includes('form') || text.includes('paper')) {
      handleNavigate('letter_generator', "Opening legal claim letter generator...");
    } else if (text.includes('ai') || text.includes('ask') || text.includes('chat') || text.includes('question')) {
      handleNavigate('local_ai_chat', "Opening AI Bank & Legal Assistant...");
    } else if (text.includes('home') || text.includes('start')) {
      handleNavigate('landing', "Going back to home screen...");
    }
  };

  const handleNavigate = (tab: any, speech: string) => {
    stopVoiceListening();
    speakAudio(speech);
    setTimeout(() => {
      setActiveTab(tab);
      setShowVoiceAssistantModal(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border-3 border-emerald-400 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            stopVoiceListening();
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setShowVoiceAssistantModal(false);
          }}
          className="absolute right-4 top-4 rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
            <Mic className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">
              Voice Navigation Assistant
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800">
              Speak to navigate to any section hands-free
            </p>
          </div>
        </div>

        {/* AI Voice Guidance Display */}
        <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/80 p-5 space-y-3 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
            <Volume2 className="h-4 w-4 text-emerald-700 animate-bounce" /> AI Audio Guide Speech
          </div>

          <p className="text-sm sm:text-base font-extrabold text-stone-900 leading-relaxed font-sans">
            "{aiSpeechText}"
          </p>

          {/* Equalizer Bars */}
          <div className="flex items-end justify-center gap-1.5 h-10 w-full pt-2">
            {audioLevel.map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}%` }}
                className={`w-3 rounded-full transition-all duration-100 ${
                  isListening ? 'bg-emerald-600 shadow-xs' : 'bg-emerald-300'
                }`}
              />
            ))}
          </div>

          {/* Recognized Voice Transcript */}
          {transcribedText && (
            <div className="rounded-2xl bg-white p-3 border border-emerald-200 text-xs sm:text-sm font-mono font-extrabold text-emerald-900">
              Heard: "{transcribedText}"
            </div>
          )}
        </div>

        {/* VOICE COMMAND MIC BUTTON */}
        <div className="space-y-3">
          {!isListening ? (
            <button
              onClick={startVoiceListening}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 py-4 text-base font-extrabold text-white shadow-lg hover:bg-emerald-700 active:scale-98 transition"
            >
              <Mic className="h-6 w-6" />
              <span>Tap & Speak Voice Command</span>
            </button>
          ) : (
            <button
              onClick={stopVoiceListening}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-amber-600 py-4 text-base font-extrabold text-white shadow-lg hover:bg-amber-700 transition animate-pulse"
            >
              <Mic className="h-6 w-6 animate-spin" />
              <span>Listening... Tap To Stop</span>
            </button>
          )}
        </div>

        {/* 1-TAP QUICK VOICE JUMP MENU */}
        <div className="space-y-3 border-t-2 border-stone-100 pt-4">
          <span className="text-xs font-extrabold text-stone-600 uppercase tracking-wider block">
            Or Tap Any Destination Below:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleNavigate('asset_mapper', "Opening your family financial map...")}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 hover:bg-emerald-50 hover:border-emerald-300 transition text-stone-900"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-700" /> My Financial Map
              </span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>

            <button
              onClick={() => handleNavigate('recover_dashboard', "Opening bank claims and legal guide...")}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 hover:bg-amber-50 hover:border-amber-300 transition text-stone-900"
            >
              <span className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-amber-700" /> Bank Claims Guide
              </span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>

            <button
              onClick={() => handleNavigate('protect_test', "Opening family safety quiz...")}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 hover:bg-emerald-50 hover:border-emerald-300 transition text-stone-900"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-700" /> Family Safety Quiz
              </span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>

            <button
              onClick={() => handleNavigate('local_ai_chat', "Opening AI Legal Assistant...")}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 hover:bg-emerald-50 hover:border-emerald-300 transition text-stone-900"
            >
              <span className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-emerald-700" /> Ask AI Assistant
              </span>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Footer Close */}
        <button
          onClick={() => {
            stopVoiceListening();
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setShowVoiceAssistantModal(false);
          }}
          className="w-full rounded-2xl bg-stone-900 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-stone-800 transition shadow"
        >
          Close Voice Navigation
        </button>

      </div>
    </div>
  );
};
