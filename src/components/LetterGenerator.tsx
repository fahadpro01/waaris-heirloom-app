import React, { useState, useEffect } from 'react';
import { Cpu, FileText, Copy, Check, Printer, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LocalLLMEngine } from '../services/localLLM';

export const LetterGenerator: React.FC = () => {
  const { selectedAssetForLetter, deceasedProfile, localLLMMetrics, isLocalLLMReady, initLocalLLM } = useApp();

  const [letterType, setLetterType] = useState<'sbi_bank' | 'lic_claim' | 'epf_claim' | 'indemnity_affidavit'>('sbi_bank');
  
  const [params, setParams] = useState({
    deceasedName: deceasedProfile.fullName || 'Ravi Kumar',
    applicantName: deceasedProfile.applicantName || 'Lakshmi Kumar',
    applicantRelation: deceasedProfile.applicantRelation || 'Spouse',
    state: deceasedProfile.state || 'Tamil Nadu',
    institutionName: selectedAssetForLetter?.institution || 'State Bank of India',
    accountOrPolicyNo: selectedAssetForLetter?.referenceNo || '3098XXXX123',
    dateOfPassing: deceasedProfile.dateOfPassing || '2026-08-12'
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const engine = LocalLLMEngine.getInstance();

  useEffect(() => {
    if (selectedAssetForLetter) {
      if (selectedAssetForLetter.category === 'insurance') setLetterType('lic_claim');
      else if (selectedAssetForLetter.category === 'epf_ppf') setLetterType('epf_claim');
      else setLetterType('sbi_bank');

      setParams(prev => ({
        ...prev,
        institutionName: selectedAssetForLetter.institution,
        accountOrPolicyNo: selectedAssetForLetter.referenceNo || 'Ref 1234'
      }));
    }
  }, [selectedAssetForLetter]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedLetter('');

    if (!isLocalLLMReady) {
      await initLocalLLM();
    }

    await engine.streamGenerateLetter(
      letterType,
      params,
      (chunkText) => {
        setGeneratedLetter(chunkText);
      }
    );

    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Claim Letter: ${params.deceasedName}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 30px; line-height: 1.6; font-size: 14pt; color: #111; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${generatedLetter}</pre>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 pb-28 space-y-6">
      
      {/* Header */}
      <div className="border-b-2 border-stone-200 pb-4">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900">Write Bank Claim Letter For Me</h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 font-semibold">
          Draft official bank claim letters locally on your device in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-4 rounded-3xl border-2 border-stone-200 bg-white p-6 text-xs sm:text-sm shadow-sm">
          <h3 className="font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2 text-sm">
            <FileText className="h-5 w-5 text-amber-700" /> Letter Details
          </h3>

          <div>
            <label className="block font-extrabold text-stone-800">Select Letter Type</label>
            <select
              value={letterType}
              onChange={(e) => setLetterType(e.target.value as any)}
              className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3 py-2.5 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
            >
              <option value="sbi_bank">Bank Claim Letter (SBI, HDFC, ICICI)</option>
              <option value="lic_claim">Life Insurance Claim Letter (LIC)</option>
              <option value="epf_claim">EPFO Death Claim Form 20 Letter</option>
              <option value="indemnity_affidavit">Legal Heir Indemnity Affidavit</option>
            </select>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <label className="block font-extrabold text-stone-800">Deceased Relative Name</label>
              <input
                type="text"
                value={params.deceasedName}
                onChange={(e) => setParams({ ...params, deceasedName: e.target.value })}
                className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-stone-800">Applicant Name</label>
                <input
                  type="text"
                  value={params.applicantName}
                  onChange={(e) => setParams({ ...params, applicantName: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-extrabold text-stone-800">Relationship</label>
                <input
                  type="text"
                  value={params.applicantRelation}
                  onChange={(e) => setParams({ ...params, applicantRelation: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-extrabold text-stone-800">Bank / Institution Name</label>
              <input
                type="text"
                value={params.institutionName}
                onChange={(e) => setParams({ ...params, institutionName: e.target.value })}
                className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-stone-800">Account / Policy No.</label>
                <input
                  type="text"
                  value={params.accountOrPolicyNo}
                  onChange={(e) => setParams({ ...params, accountOrPolicyNo: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-extrabold text-stone-800">State</label>
                <input
                  type="text"
                  value={params.state}
                  onChange={(e) => setParams({ ...params, state: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3.5 py-2 font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-600 py-3.5 text-sm font-extrabold text-white shadow hover:bg-amber-700 transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" /> Writing Letter...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 text-amber-200" /> Write Bank Claim Letter
              </>
            )}
          </button>
        </div>

        {/* Generated Preview */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm min-h-[480px]">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-stone-100 pb-3">
              <span className="text-sm font-extrabold text-stone-900">Generated Letter Preview</span>

              {generatedLetter && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-2xl border-2 border-stone-200 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-800 hover:bg-stone-50"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-700" /> : <Copy className="h-4 w-4 text-stone-600" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 rounded-2xl bg-amber-100 border-2 border-amber-300 px-3.5 py-1.5 text-xs font-extrabold text-amber-900 hover:bg-amber-200"
                  >
                    <Printer className="h-4 w-4" /> Print Letter
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50/50 p-6 font-serif text-sm text-stone-900 leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre-wrap font-medium">
              {generatedLetter ? (
                generatedLetter
              ) : (
                <div className="py-20 text-center text-stone-400">
                  <FileText className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-xs sm:text-sm font-semibold text-stone-600">Tap "Write Bank Claim Letter" button to generate letter on your device.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-stone-100 pt-3 flex items-center justify-between text-xs text-stone-600 font-bold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-700" /> 100% Private on your device
            </span>
            <span className="font-mono text-stone-800">{localLLMMetrics.tokensPerSec} tok/s</span>
          </div>

        </div>

      </div>

    </div>
  );
};
