import React, { useState } from 'react';
import { X, Sparkles, Smartphone, Shield, Landmark, FileText, CheckCircle2, ArrowRight, ArrowLeft, Play, Volume2, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AITutorialModal: React.FC = () => {
  const { showAITutorialModal, setShowAITutorialModal, setActiveTab, setShowDigiLockerModal } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!showAITutorialModal) return null;

  const tutorialSteps = [
    {
      title: "1. Phone Number Auto-Discovery",
      subtitle: "Discover Bank Accounts & LIC Policies Automatically",
      icon: <Smartphone className="h-8 w-8 text-emerald-600" />,
      color: "border-emerald-300 bg-emerald-50",
      description: "Just like Jupiter or Fi Money, entering your mobile number auto-scans linked savings accounts, fixed deposits, LIC policies, and EPF balances across SBI, HDFC, ICICI, and EPFO.",
      tip: "Senior Tip: No net banking passwords or PINs are ever asked or stored.",
      actionText: "Try Auto-Discovery",
      onAction: () => {
        setShowAITutorialModal(false);
        setActiveTab('landing');
      }
    },
    {
      title: "2. Build Your Family Financial Map",
      subtitle: "Keep Paper Locations & Nominee Names Safe",
      icon: <Shield className="h-8 w-8 text-amber-600" />,
      color: "border-amber-300 bg-amber-50",
      description: "Record which almirah drawer holds your original LIC policy bonds, where fixed deposit receipts are stored, and confirm your nominee details so your family isn't left guessing.",
      tip: "Senior Tip: Your data is saved strictly on your mobile device.",
      actionText: "Open My Asset Map",
      onAction: () => {
        setShowAITutorialModal(false);
        setActiveTab('asset_mapper');
      }
    },
    {
      title: "3. Government DigiLocker Integration",
      subtitle: "MeitY Govt of India Verified Document Vault",
      icon: <Landmark className="h-8 w-8 text-blue-600" />,
      color: "border-blue-300 bg-blue-50",
      description: "Link your Aadhaar-connected DigiLocker account with 1 tap to import verified insurance policy bonds, EPF UAN certificates, and PAN cards directly into your family map.",
      tip: "Senior Tip: Official government green verified badges protect your claims.",
      actionText: "Link DigiLocker Vault",
      onAction: () => {
        setShowAITutorialModal(false);
        setShowDigiLockerModal(true);
      }
    },
    {
      title: "4. On-Device AI Bank Claim Letter Writer",
      subtitle: "Draft Official Legal Claim Notices in Seconds",
      icon: <FileText className="h-8 w-8 text-emerald-700" />,
      color: "border-emerald-300 bg-emerald-50",
      description: "If a loved one passes away, our on-device AI automatically writes official claim letters for SBI, LIC, and EPFO (Form 20/10D/5IF) without expensive lawyer fees.",
      tip: "Senior Tip: Runs 100% locally on your phone with 0 cloud data leaks.",
      actionText: "Write Bank Claim Letter",
      onAction: () => {
        setShowAITutorialModal(false);
        setActiveTab('letter_generator');
      }
    },
    {
      title: "5. 8-Question Family Safety Quiz",
      subtitle: "Evaluate Your Family Financial Preparedness",
      icon: <CheckCircle2 className="h-8 w-8 text-amber-700" />,
      color: "border-amber-300 bg-amber-50",
      description: "Take the 8-question financial audit to check nominee registrations, joint account statuses, legal wills, and emergency phone passcode access.",
      tip: "Senior Tip: Takes only 2 minutes and provides actionable recommendations.",
      actionText: "Start Safety Quiz",
      onAction: () => {
        setShowAITutorialModal(false);
        setActiveTab('protect_test');
      }
    }
  ];

  const step = tutorialSteps[currentStep];

  const handleSimulatedAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-emerald-300 bg-white p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white font-extrabold shadow">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">AI Guided Tutorial</h3>
              <p className="text-xs text-stone-600 font-semibold">Step {currentStep + 1} of {tutorialSteps.length}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAITutorialModal(false)}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5">
          {tutorialSteps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i === currentStep ? 'bg-emerald-600' : i < currentStep ? 'bg-emerald-300' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Active Step Card */}
        <div className={`rounded-3xl border-2 p-5 space-y-3 shadow-xs ${step.color}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-stone-200">
              {step.icon}
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-lg leading-tight">{step.title}</h4>
              <p className="text-xs font-bold text-stone-600">{step.subtitle}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed">
            {step.description}
          </p>

          <div className="rounded-2xl border border-stone-300 bg-white/80 p-3 flex items-center justify-between text-xs font-bold text-emerald-900">
            <span>{step.tip}</span>
            <button
              onClick={handleSimulatedAudio}
              className="shrink-0 ml-2 flex items-center gap-1 rounded-xl bg-emerald-100 px-2.5 py-1 text-[11px] text-emerald-800 hover:bg-emerald-200"
            >
              <Volume2 className={`h-3.5 w-3.5 ${isPlayingAudio ? 'animate-bounce text-emerald-600' : ''}`} />
              <span>{isPlayingAudio ? 'Speaking...' : 'Listen'}</span>
            </button>
          </div>
        </div>

        {/* Action Button for Step */}
        <button
          onClick={step.onAction}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs sm:text-sm font-extrabold text-white shadow hover:bg-emerald-700 transition"
        >
          <span>{step.actionText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-stone-200 pt-3">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 text-xs font-extrabold text-stone-600 hover:text-stone-900 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          <span className="text-xs font-bold text-stone-500">
            {currentStep + 1} / {tutorialSteps.length}
          </span>

          {currentStep < tutorialSteps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(tutorialSteps.length - 1, prev + 1))}
              className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-900"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowAITutorialModal(false)}
              className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900"
            >
              Finish Tutorial
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
