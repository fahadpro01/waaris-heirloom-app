import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, RefreshCw, Smartphone, Lock, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PhoneDiscoveryService, DiscoveredAccount } from '../services/phoneDiscovery';
import { SmsService } from '../services/smsService';
import { INDIAN_BANKS_LIST } from '../data/claimTemplates';

export const AuthGate: React.FC = () => {
  const { generateRealOtp, verifyRealOtp, generatedOtp, addAsset, setActiveTab, resetApp } = useApp();
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp' | 'discovery'>('mobile');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Connecting to Mobile Gateway...');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [showOtpHelper, setShowOtpHelper] = useState(false);
  const [discoveredList, setDiscoveredList] = useState<DiscoveredAccount[]>([]);
  const [imported, setImported] = useState(false);
  const discoveryService = PhoneDiscoveryService.getInstance();
  const smsService = SmsService.getInstance();

  const [showSmsConfig, setShowSmsConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(smsService.getApiKey());
  const [providerInput, setProviderInput] = useState<'fast2sms' | '2factor'>('fast2sms');

  const handleSaveSmsConfig = () => {
    smsService.setApiKey(apiKeyInput, providerInput);
    setShowSmsConfig(false);
    setInfoMsg(`SMS Gateway updated: ${providerInput.toUpperCase()}`);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) return;
    setLoading(true);
    setErrorMsg('');
    setShowOtpHelper(false);
    setOtp('');

    // Step 1 Loading: Telecom network lookup
    setLoadingText('Connecting to Telecom SMS Gateway (+91)...');
    await new Promise((r) => setTimeout(r, 600));

    // Step 2 Loading: Generating Security 6-digit SMS OTP
    setLoadingText('Generating Security 6-Digit SMS OTP...');
    const newOtp = generateRealOtp(mobileNumber);
    const res = await smsService.sendOtpSms(mobileNumber, newOtp);

    // Step 3 Loading: Dispatching SMS
    setLoadingText(`Dispatched SMS Security Code to +91 ${mobileNumber}...`);
    await new Promise((r) => setTimeout(r, 700));

    setInfoMsg(res.message);
    setLoading(false);
    setStep('otp');
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setErrorMsg('');
    setOtp('');
    const newOtp = generateRealOtp(mobileNumber);
    const res = await smsService.sendOtpSms(mobileNumber, newOtp);
    setInfoMsg(`Resent! ${res.message}`);
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const success = verifyRealOtp(otp);
    if (success) {
      // Auto-run Jupiter/Fi style asset discovery for phone
      const results = await discoveryService.discoverAssetsByPhone(mobileNumber);
      setDiscoveredList(results);
      setLoading(false);
      setStep('discovery');
    } else {
      setLoading(false);
      setErrorMsg(`Incorrect OTP entered. You must enter the exact 6-digit OTP sent via SMS.`);
    }
  };

  const handleFinishOnboarding = () => {
    discoveredList.forEach((item) => {
      addAsset({
        name: item.name,
        category: item.category,
        institution: item.institution,
        referenceNo: item.accountNumberMasked,
        documentLocation: item.suggestedLocation,
        nomineeStatus: item.nomineeStatus,
        nomineeName: item.nomineeName,
        estimatedValue: item.estimatedValue,
        notes: `Auto-discovered for +91 ${mobileNumber}`
      });
    });
    setImported(true);
    setTimeout(() => {
      setActiveTab('asset_mapper');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-10 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-md space-y-6">
        
        {/* App Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg">
            <Shield className="h-9 w-9" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-display text-3xl font-extrabold text-stone-900">Waaris</h1>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
              वारिस
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-stone-600">
            Family Financial Security & Asset Recovery Map
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl border-2 border-stone-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* STEP 1: MOBILE NUMBER INPUT */}
          {step === 'mobile' && (
            <form onSubmit={handleSendOtp} className="space-y-5 text-xs sm:text-sm">
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 space-y-1">
                <strong className="text-emerald-900 block font-extrabold text-sm flex items-center gap-1.5">
                  <Smartphone className="h-5 w-5 text-emerald-700" /> Phone Number Login / Registration
                </strong>
                <p className="text-stone-700 font-medium leading-relaxed">
                  Enter your mobile number to receive a 6-digit SMS OTP and discover your bank accounts automatically.
                </p>
              </div>

              <div>
                <label className="block font-extrabold text-stone-800">10-Digit Mobile Number</label>
                <div className="flex gap-2 mt-1.5">
                  <span className="flex items-center rounded-2xl border-2 border-stone-200 bg-stone-100 px-4 font-bold text-stone-700">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-3 font-mono text-base font-extrabold text-stone-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || mobileNumber.length < 10}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                {loading ? (
                  <span className="flex items-center gap-2 text-xs sm:text-sm">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>{loadingText}</span>
                  </span>
                ) : (
                  <><span>Send SMS OTP To Mobile</span> <ArrowRight className="h-5 w-5" /></>
                )}
              </button>

            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-xs sm:text-sm">
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 space-y-1">
                <strong className="text-emerald-900 block font-extrabold text-sm flex items-center gap-1.5">
                  <Smartphone className="h-5 w-5 text-emerald-700" /> SMS OTP Sent to Mobile
                </strong>
                <p className="text-stone-700 font-medium leading-relaxed text-xs">
                  An SMS with your 6-digit security code has been sent to <strong className="text-stone-900 font-bold">+91 {mobileNumber}</strong>. Check your phone's SMS inbox and enter the code below.
                </p>
                {infoMsg && <p className="text-[11px] font-bold text-emerald-800 pt-1">{infoMsg}</p>}
              </div>

              {errorMsg && (
                <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-red-800 font-extrabold text-xs">
                  {errorMsg}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <label className="block font-extrabold text-stone-800">6-Digit SMS Security OTP</label>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Resend SMS OTP
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit SMS OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-3 font-mono text-xl tracking-widest font-extrabold text-stone-900 focus:border-emerald-600 focus:outline-none text-center"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" /> Verifying OTP & Scanning Accounts...
                  </>
                ) : (
                  <>
                    <span>Verify OTP & Discover Accounts</span> <CheckCircle2 className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: JUPITER & FI STYLE ASSET AUTO-DISCOVERY RESULTS */}
          {step === 'discovery' && (
            <div className="space-y-5 text-xs sm:text-sm animate-fadeIn">
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-900">Total Discovered Value</span>
                  <div className="text-2xl font-extrabold text-emerald-800 font-mono">Rs 29,70,000</div>
                  <p className="text-xs text-stone-600 font-semibold">{discoveredList.length} accounts found for +91 {mobileNumber}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-emerald-700" />
              </div>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {discoveredList.map((item) => (
                  <div key={item.id} className="rounded-2xl border-2 border-stone-200 bg-stone-50/80 p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-stone-900 font-extrabold text-sm">{item.name}</strong>
                      <span className="font-extrabold text-emerald-700 font-mono text-xs">{item.estimatedValue}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-800">{item.institution} ({item.accountNumberMasked})</div>
                    <div className="text-[11px] text-stone-500 font-semibold">Suggested Location: {item.suggestedLocation}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinishOnboarding}
                disabled={imported}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:bg-emerald-300 transition"
              >
                {imported ? <><Check className="h-5 w-5" /> Opening My Family Map...</> : <><span>Import Discovered Assets To My Map</span> <ArrowRight className="h-5 w-5" /></>}
              </button>
            </div>
          )}

        </div>

        {/* Supported Banks Ticker */}
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-stone-500">Auto-Discovers Linked Accounts Across Top Indian Banks:</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-bold text-stone-700">
            {INDIAN_BANKS_LIST.slice(0, 6).map((b, i) => (
              <span key={i} className="rounded-lg border border-stone-200 bg-white px-2 py-0.5 shadow-xs">
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
