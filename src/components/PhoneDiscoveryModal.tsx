import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, Landmark, Building2, Wallet, Shield, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PhoneDiscoveryService, DiscoveredAccount } from '../services/phoneDiscovery';

export const PhoneDiscoveryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addAsset, setActiveTab, userPhone } = useApp();
  
  const [mobileNumber, setMobileNumber] = useState(userPhone || '');
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState<'input' | 'scanning' | 'results'>('input');
  const [discoveredList, setDiscoveredList] = useState<DiscoveredAccount[]>([]);
  const [importedAll, setImportedAll] = useState(false);

  if (!isOpen) return null;

  const discoveryService = PhoneDiscoveryService.getInstance();

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneToUse = mobileNumber || userPhone || '9876543210';

    setStep('scanning');
    setIsScanning(true);

    const results = await discoveryService.discoverAssetsByPhone(phoneToUse);
    setDiscoveredList(results);
    setIsScanning(false);
    setStep('results');
  };

  const handleImportAll = () => {
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
        notes: `Auto-discovered via phone number +91 ${mobileNumber} linkage`
      });
    });
    setImportedAll(true);
    setTimeout(() => {
      onClose();
      setActiveTab('asset_mapper');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-emerald-300 bg-white p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-extrabold shadow">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-stone-900">Phone Asset Auto-Discovery</h3>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-900 border border-emerald-300">
                  Jupiter & Fi Style
                </span>
              </div>
              <p className="text-xs font-bold text-stone-600">Scan linked bank accounts & LIC policies by phone number</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Input Mobile Number */}
        {step === 'input' && (
          <form onSubmit={handleStartScan} className="space-y-4 text-xs sm:text-sm">
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 space-y-1">
              <strong className="text-emerald-900 block font-extrabold text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-700" /> Instant Bank Auto-Discovery
              </strong>
              <p className="text-stone-700 font-medium leading-relaxed">
                Enter your mobile number to discover all linked accounts across SBI, HDFC, ICICI, Axis, LIC, and EPFO.
              </p>
            </div>

            <div>
              <label className="block font-extrabold text-stone-800">Your Registered Mobile Number</label>
              <div className="flex gap-2 mt-1">
                <span className="flex items-center rounded-2xl border-2 border-stone-200 bg-stone-100 px-3.5 font-bold text-stone-700">+91</span>
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
              disabled={mobileNumber.length < 10}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              <span>Scan & Discover My Bank Assets</span> <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* Step 2: Animated Scanning */}
        {step === 'scanning' && (
          <div className="py-12 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-stone-900">Scanning Bank & Depository Networks...</h4>
              <p className="text-xs font-semibold text-stone-600">Connecting via mobile number +91 {mobileNumber} to SBI, HDFC, ICICI, LIC & EPFO...</p>
            </div>
          </div>
        )}

        {/* Step 3: Discovered Results View */}
        {step === 'results' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase text-emerald-900">Discovered Portfolio</span>
                <div className="text-xl font-extrabold text-emerald-800 font-mono">Rs 29,70,000</div>
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
                  <div className="text-[11px] text-stone-500 font-semibold">Location: {item.suggestedLocation}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleImportAll}
              disabled={importedAll}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-emerald-700 disabled:bg-emerald-300 transition"
            >
              {importedAll ? <><Check className="h-5 w-5" /> Imported All To My Map!</> : <><span>Import All Discovered Assets To My Map</span> <CheckCircle2 className="h-5 w-5" /></>}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
