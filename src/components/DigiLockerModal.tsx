import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight, RefreshCw, FileText, Check, Landmark, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DigiLockerModal: React.FC = () => {
  const { showDigiLockerModal, setShowDigiLockerModal, userPhone, isDigiLockerConnected, connectDigiLocker, disconnectDigiLocker, digiLockerDocs, importDigiLockerDocToAssetMap } = useApp();
  
  const [mobileNumber, setMobileNumber] = useState(userPhone || '');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp' | 'connected'>(userPhone ? 'otp' : 'mobile');
  const [loading, setLoading] = useState(false);
  const [importedMap, setImportedMap] = useState<Record<string, boolean>>({});

  if (!showDigiLockerModal) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneToUse = mobileNumber || userPhone;
    if (phoneToUse.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const phoneToUse = mobileNumber || userPhone;
    const success = await connectDigiLocker(phoneToUse, otp);
    setLoading(false);
    if (success) {
      setStep('connected');
    }
  };

  const handleImport = (doc: any) => {
    importDigiLockerDocToAssetMap(doc);
    setImportedMap(prev => ({ ...prev, [doc.id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-emerald-300 bg-white p-6 shadow-2xl space-y-4">
        
        {/* Header with Govt DigiLocker Branding */}
        <div className="flex items-start justify-between border-b-2 border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-extrabold shadow">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-stone-900">DigiLocker Document Sync</h3>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-900 border border-emerald-300">
                  MeitY Govt of India
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600">Fetch verified Aadhaar, PAN, LIC & EPFO documents</p>
            </div>
          </div>

          <button
            onClick={() => setShowDigiLockerModal(false)}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Mobile Input */}
        {step === 'mobile' && !isDigiLockerConnected && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs sm:text-sm">
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 space-y-1">
              <strong className="text-emerald-900 block font-extrabold text-sm flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-700" /> Secure Government Auth
              </strong>
              <p className="text-stone-700 font-medium leading-relaxed">
                Connect your DigiLocker account using your Aadhaar-linked mobile number. Zero passwords needed.
              </p>
            </div>

            <div>
              <label className="block font-extrabold text-stone-800">Aadhaar Linked Mobile Number</label>
              <div className="flex gap-2 mt-1">
                <span className="flex items-center rounded-2xl border-2 border-stone-200 bg-stone-100 px-3 font-bold text-stone-700">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex-1 rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || mobileNumber.length < 10}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><span>Get DigiLocker OTP</span> <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        )}

        {/* Step 2: OTP Entry */}
        {step === 'otp' && !isDigiLockerConnected && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs sm:text-sm">
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
              <span className="font-extrabold text-amber-900 block text-sm">Enter OTP Sent By DigiLocker</span>
              <p className="text-stone-700 font-medium">OTP sent to +91 {mobileNumber}. Enter 123456 to verify.</p>
            </div>

            <div>
              <label className="block font-extrabold text-stone-800">6 Digit Security OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 font-mono text-base tracking-widest font-extrabold text-stone-900 focus:border-emerald-600 focus:outline-none text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><span>Verify and Connect Vault</span> <CheckCircle2 className="h-4 w-4" /></>}
            </button>
          </form>
        )}

        {/* Step 3: Connected & Fetched Documents */}
        {(step === 'connected' || isDigiLockerConnected) && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <span>DigiLocker Connected (+91 {mobileNumber || '9876543210'})</span>
              </div>
              <button
                onClick={() => {
                  disconnectDigiLocker();
                  setStep('mobile');
                }}
                className="text-xs font-bold text-rose-700 hover:underline"
              >
                Disconnect
              </button>
            </div>

            <div>
              <h4 className="font-extrabold text-stone-900 text-sm mb-2 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-700" /> Government Verified Issued Documents ({digiLockerDocs.length})
              </h4>
              <p className="text-stone-600 font-semibold text-xs mb-3">Tap "Import To Asset Map" to automatically link policy bonds to your family map.</p>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {digiLockerDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-2xl border-2 border-stone-200 bg-stone-50 p-3.5 shadow-sm">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-stone-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-700" /> {doc.name}
                      </div>
                      <div className="text-xs font-semibold text-stone-500">{doc.issuer}</div>
                      <div className="text-[11px] font-mono text-stone-600">{doc.uri}</div>
                    </div>

                    <button
                      onClick={() => handleImport(doc)}
                      disabled={importedMap[doc.id]}
                      className="shrink-0 flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow hover:bg-emerald-700 disabled:bg-emerald-200 disabled:text-emerald-800 transition"
                    >
                      {importedMap[doc.id] ? <><Check className="h-3.5 w-3.5" /> Imported</> : 'Import'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setShowDigiLockerModal(false)}
                className="rounded-2xl bg-stone-200 px-5 py-2.5 text-xs font-extrabold text-stone-800 hover:bg-stone-300"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
