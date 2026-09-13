import React, { useState } from 'react';
import { Shield, ArrowRight, ArrowLeft, RotateCcw, Award, CheckCircle2, Lock, AlertTriangle, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: { text: string; score: number; flag?: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Does your family know which banks hold your accounts?",
    subtitle: "Bank Savings, Fixed Deposits, Mutual Funds, Demat holdings",
    options: [
      { text: "Yes, my spouse or children know all the bank names", score: 15 },
      { text: "Yes, but only I know where all the accounts are kept", score: 5, flag: "Risk: Family does not know complete bank list" },
      { text: "No or Not sure", score: 0 }
    ]
  },
  {
    id: 2,
    title: "Have you added Nominees to your bank accounts & LIC policies?",
    subtitle: "Nominees allow your family to claim money directly without court papers",
    options: [
      { text: "Yes, 100% of accounts have updated nominee names", score: 15 },
      { text: "Partial: Some bank accounts have nominees, EPF or demat pending", score: 8, flag: "Pending Nominee: EPF e-Nomination or Demat nominee unassigned" },
      { text: "No nominees assigned or I don't know", score: 2, flag: "High Risk: Without nominee, claims require Court Succession Certificate" }
    ]
  },
  {
    id: 3,
    title: "Does your family know where physical papers live in your home?",
    subtitle: "Original LIC policy bonds, FD receipts, property papers, gold locker keys",
    options: [
      { text: "Yes, all stored in one clear folder known to family", score: 15 },
      { text: "Scattered in different drawers around the house", score: 6, flag: "Scattered records: Hard for family to find physical papers" },
      { text: "No physical paper folder exists", score: 0 }
    ]
  },
  {
    id: 4,
    title: "Have you updated your EPF e-Nomination online?",
    subtitle: "EPFO e-Nomination ensures fast transfer of PF savings and EDLI life insurance",
    options: [
      { text: "Yes, e-Nomination completed on EPFO Member portal", score: 15 },
      { text: "I have a UAN, but haven't updated family nomination online", score: 5, flag: "EPFO e-Nomination missing: Delays PF and EDLI insurance benefit claim" },
      { text: "Not applicable or Don't hold EPF", score: 12 }
    ]
  },
  {
    id: 5,
    title: "Can your family access your mobile phone for Bank SMS & OTPs?",
    subtitle: "Bank claims, UPI transfers, and OTP verifications require primary mobile access",
    options: [
      { text: "Yes, family knows phone passcode or emergency unlock procedure", score: 10 },
      { text: "Phone passcode is private, family cannot unlock my phone", score: 3, flag: "Phone PIN Lockout: Family cannot access mobile OTPs for bank claims" },
      { text: "Not sure", score: 0 }
    ]
  },
  {
    id: 6,
    title: "Are your Joint Bank Accounts set to 'Either or Survivor'?",
    subtitle: "'Either or Survivor' allows surviving spouse to operate account immediately",
    options: [
      { text: "Yes, joint bank accounts have Either or Survivor clause", score: 10 },
      { text: "Single account mode or Joint with 'Former or Survivor'", score: 4, flag: "Single Account Block: Requires formal bank death claim procedure" },
      { text: "Don't have joint accounts", score: 8 }
    ]
  },
  {
    id: 7,
    title: "Does your family know your Health Insurance (Mediclaim) TPA Card?",
    subtitle: "Emergency cashless hospitalization requires TPA card & policy ID within 24 hours",
    options: [
      { text: "Yes, cashless TPA card & policy paper is in emergency folder", score: 10 },
      { text: "I have health insurance, but family doesn't know policy ID or TPA contact", score: 3, flag: "Hospitalization Risk: Family might pay cash out of pocket in emergency" },
      { text: "No health insurance", score: 0 }
    ]
  },
  {
    id: 8,
    title: "Do you have a Registered Will or written Legal Heir document?",
    subtitle: "Clear written Will prevents family disputes and speeds up real estate transfers",
    options: [
      { text: "Yes, registered Will or clear family legal agreement prepared", score: 10 },
      { text: "Verbal understanding only, no written Will or formal paper", score: 4, flag: "Intestate Risk: Asset distribution requires Civil Court Succession Certificate" },
      { text: "Not prepared yet", score: 2 }
    ]
  }
];

export const ReadinessTest: React.FC = () => {
  const { setReadinessScore, setActiveTab, setShowVoiceSecurityModal } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { score: number; text: string; flag?: string }>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectOption = (qId: number, option: { text: string; score: number; flag?: string }, idx: number) => {
    if (isSelecting) return;
    setIsSelecting(true);
    setSelectedIdx(idx);

    // Remove lingering focus from tap/click
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setTimeout(() => {
      const nextAnswers = { ...answers, [qId]: option };
      setAnswers(nextAnswers);
      setSelectedIdx(null);
      setIsSelecting(false);

      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        const rawTotal = Object.values(nextAnswers).reduce((sum, item) => sum + item.score, 0);
        // Normalized score out of 100
        const total = Math.min(100, Math.round((rawTotal / 100) * 100));
        setReadinessScore(total);
        setIsCompleted(true);
        
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 220);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0 && !isSelecting) {
      setSelectedIdx(null);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSelectedIdx(null);
    setIsSelecting(false);
    setIsCompleted(false);
  };

  const rawTotal = Object.values(answers).reduce((sum, item) => sum + item.score, 0);
  const totalScore = Math.min(100, Math.round(rawTotal));
  const flags = Object.values(answers).filter(a => a.flag).map(a => a.flag!);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8 pb-28 space-y-6">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-300 bg-emerald-100 px-4 py-1 text-xs sm:text-sm font-extrabold text-emerald-900">
          <Shield className="h-4 w-4 text-emerald-700" /> Complete Family Safety Quiz (8 Questions)
        </div>
        <h1 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">
          Check Family Safety Score
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-stone-700 max-w-md mx-auto">
          Answer 8 essential safety questions to evaluate your family's financial preparedness.
        </p>
      </div>

      {!isCompleted ? (
        <div className="rounded-3xl border-2 border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Progress & Back */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-stone-600">
            {currentStep > 0 ? (
              <button
                onClick={handlePreviousStep}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
            ) : (
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            )}
            {currentStep > 0 && <span>Question {currentStep + 1} of {QUESTIONS.length}</span>}
            <span className="text-emerald-800 font-mono">{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-1.5 pt-2">
            <h2 className="text-lg font-extrabold text-stone-900 sm:text-xl leading-snug">
              {QUESTIONS[currentStep].title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 font-bold">
              {QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {QUESTIONS[currentStep].options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={`q-${QUESTIONS[currentStep].id}-step-${currentStep}-opt-${idx}`}
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt, idx)}
                  disabled={isSelecting}
                  className={`group w-full flex items-center justify-between rounded-2xl border-2 p-4 sm:p-5 text-left transition-all active:scale-98 shadow-sm ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500/30'
                      : 'border-stone-200 bg-stone-50/80 text-stone-800 hover:border-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-extrabold leading-snug ${
                    isSelected ? 'text-emerald-950' : 'text-stone-800 group-hover:text-emerald-900'
                  }`}>
                    {opt.text}
                  </span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-stone-300 bg-white group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                  }`}>
                    {isSelected ? <CheckCircle2 className="h-4 w-4 text-white" /> : <ArrowRight className="h-4 w-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-500 pt-2">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span>100% confidential: Zero passwords or account numbers requested.</span>
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="rounded-3xl border-2 border-emerald-300 bg-white p-6 sm:p-8 shadow-md space-y-6 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-800 shadow-sm">
              <Award className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">Your Family Safety Score</span>
              <div className="mt-1 font-display text-5xl font-extrabold text-emerald-800">
                {totalScore}<span className="text-2xl text-stone-400">/100</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-stone-700 max-w-md mx-auto leading-relaxed">
              {totalScore >= 85
                ? 'Great score! Your family has a clear financial map, nominee safeguards, and emergency phone access.'
                : totalScore >= 50
                ? 'Moderate Safety. Some accounts have nominees, but crucial gaps exist.'
                : 'Action Recommended. Without mapped institutions, nominees, and phone access, asset recovery will be complex.'}
            </p>
          </div>

          {/* Risk Flags */}
          {flags.length > 0 && (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 space-y-2">
              <h3 className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-900">
                <AlertTriangle className="h-5 w-5 text-amber-700" /> Action Items For Your Family ({flags.length})
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-stone-800">
                {flags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('asset_mapper')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 transition"
            >
              <CheckCircle2 className="h-5 w-5" /> Build My Asset Map Now
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-stone-200 bg-white px-6 py-3.5 text-sm font-bold text-stone-700 hover:bg-stone-50"
            >
              <RotateCcw className="h-4 w-4" /> Retake Quiz
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
