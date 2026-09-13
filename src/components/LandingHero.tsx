import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, HeartHandshake, Cpu, Smartphone, Sparkles, Landmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PhoneDiscoveryModal } from './PhoneDiscoveryModal';
import { INDIAN_BANKS_LIST } from '../data/claimTemplates';

export const LandingHero: React.FC = () => {
  const { setActiveTab, userPhone, setShowAITutorialModal } = useApp();
  const [showPhoneDiscovery, setShowPhoneDiscovery] = useState(false);

  return (
    <div className="py-6 sm:py-10 pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
        
        {/* Bright Friendly Banner */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 shadow-sm">
            <Shield className="h-4 w-4 text-emerald-700" />
            <span>100% Safe: No passwords required</span>
          </div>

          <button
            onClick={() => setShowAITutorialModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-300 bg-amber-100 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-amber-900 shadow-sm hover:bg-amber-200 transition"
          >
            <Sparkles className="h-4 w-4 text-amber-700" />
            <span>Interactive AI Tutorial</span>
          </button>
        </div>

        {/* Hero Text */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl font-extrabold text-stone-900 sm:text-5xl leading-tight">
            Your family needs a map, <br />
            <span className="text-emerald-700">not your passwords.</span>
          </h1>

          <p className="text-base text-stone-700 leading-relaxed font-semibold">
            Discover bank savings, FDs, LIC policies, and mutual funds by phone number, like Jupiter or Fi Money.
          </p>
        </div>

        {/* Jupiter & Fi Style Phone Number Auto-Discovery Card */}
        <div className="rounded-3xl border-3 border-emerald-400 bg-gradient-to-r from-emerald-50 via-white to-amber-50 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-emerald-200 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white shadow">
                <Smartphone className="h-4 w-4" /> Jupiter & Fi Style Auto-Fetch
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                Discover Linked Bank Accounts & Net Worth
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 font-semibold">
                Auto-fetch linked accounts across SBI, HDFC, ICICI, Axis, LIC, and EPFO.
              </p>
            </div>

            <button
              onClick={() => setShowPhoneDiscovery(true)}
              className="shrink-0 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-emerald-700 transition"
            >
              <span>Instant Auto-Discover</span> <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bank Logos Ticker */}
          <div className="pt-2">
            <span className="text-xs font-extrabold text-stone-500 block mb-2">Supported Banks & Financial Institutions:</span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-stone-800">
              {INDIAN_BANKS_LIST.slice(0, 8).map((bank, i) => (
                <span key={i} className="rounded-xl border border-stone-200 bg-white px-2.5 py-1 shadow-xs flex items-center gap-1">
                  <Landmark className="h-3.5 w-3.5 text-emerald-700" /> {bank}
                </span>
              ))}
              <span className="text-xs text-stone-500 font-bold">+ More</span>
            </div>
          </div>
        </div>

        {/* 2 Giant Super-Simple Flow Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Card 1: Write Down My Financial Map */}
          <div 
            onClick={() => setActiveTab('asset_mapper')}
            className="group relative flex flex-col justify-between rounded-3xl border-2 border-emerald-300 bg-white p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer active:scale-98"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold text-emerald-900 border border-emerald-200">
                <Shield className="h-4 w-4 text-emerald-700" /> STEP 1 FOR YOU
              </div>

              <h2 className="font-display text-2xl font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                Write Down My Family Map
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed font-medium">
                Record which banks hold your accounts, where original LIC policy papers are kept in your home almirah, and nominee names.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> Never asks for passwords or OTPs
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> Easy 2 minute setup for your family
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-emerald-100 pt-5">
              <span className="text-sm font-extrabold text-emerald-800">Start My Map Now</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white group-hover:bg-emerald-700 transition-colors shadow">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Card 2: Help My Family Claim Bank Money */}
          <div 
            onClick={() => setActiveTab('recover_dashboard')}
            className="group relative flex flex-col justify-between rounded-3xl border-2 border-amber-300 bg-white p-7 shadow-md hover:shadow-2xl transition-all cursor-pointer active:scale-98"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-extrabold text-amber-900 border border-amber-200">
                <HeartHandshake className="h-4 w-4 text-amber-700" /> STEP 2 FOR FAMILY
              </div>

              <h2 className="font-display text-2xl font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                Help Family Claim Money
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed font-medium">
                If a loved one passed away, this guides your family step-by-step to claim SBI, LIC, and EPF money through official bank forms.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" /> State legal rules for all 28 States
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" /> Automatic bank claim letter writer
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-amber-100 pt-5">
              <span className="text-sm font-extrabold text-amber-800">Open Claim Guide</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white group-hover:bg-amber-700 transition-colors shadow">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>

        </div>

      </div>

      <PhoneDiscoveryModal isOpen={showPhoneDiscovery} onClose={() => setShowPhoneDiscovery(false)} />
    </div>
  );
};
