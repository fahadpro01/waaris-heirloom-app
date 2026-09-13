import React, { useState } from 'react';
import { HeartHandshake, MapPin, Calendar, User, FileText, CheckCircle2, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES } from '../data/indianStates';
import { INSTITUTION_CLAIM_GUIDES } from '../data/claimTemplates';

export const RecoveryRoadmap: React.FC = () => {
  const { deceasedProfile, setDeceasedProfile, assets, setActiveTab, setSelectedAssetForLetter } = useApp();
  const [activeTabSub, setActiveTabSub] = useState<'assets' | 'legal_state' | 'document_center'>('assets');

  const currentStateInfo = INDIAN_STATES.find(s => s.name === deceasedProfile.state) || INDIAN_STATES[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 pb-28 space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/60 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-extrabold text-amber-900 border border-amber-200">
              <HeartHandshake className="h-4 w-4 text-amber-700" /> Bank Claim Guide For Families
            </div>
            
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-stone-900">
              Recovering assets of <span className="text-amber-800">{deceasedProfile.fullName || 'Family Member'}</span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-stone-700">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-700" /> State: <strong className="text-stone-900">{deceasedProfile.state}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-emerald-700" /> Date: <strong className="text-stone-900">{deceasedProfile.dateOfPassing}</strong>
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-emerald-700" /> Applicant: <strong className="text-stone-900">{deceasedProfile.applicantName} ({deceasedProfile.applicantRelation})</strong>
              </span>
            </div>
          </div>

          {/* Selector */}
          <div className="rounded-2xl border-2 border-stone-200 bg-white p-3.5 text-xs space-y-2 min-w-[240px]">
            <span className="font-extrabold text-stone-800 block">Change State or Relation</span>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={deceasedProfile.state}
                onChange={(e) => setDeceasedProfile({ ...deceasedProfile, state: e.target.value })}
                className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-2.5 py-1.5 font-bold text-stone-900 focus:border-amber-600 focus:outline-none"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s.code} value={s.name}>{s.name}</option>
                ))}
              </select>

              <select
                value={deceasedProfile.applicantRelation}
                onChange={(e) => setDeceasedProfile({ ...deceasedProfile, applicantRelation: e.target.value })}
                className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-2.5 py-1.5 font-bold text-stone-900 focus:border-amber-600 focus:outline-none"
              >
                <option value="Spouse">Spouse</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Parent">Parent</option>
                <option value="Legal Heir">Legal Heir</option>
              </select>
            </div>
          </div>
        </div>

        <p className="border-t border-amber-200 pt-3 text-xs sm:text-sm font-semibold text-stone-700 leading-relaxed">
          Zero Password Guarantee: You do not need any passwords or net banking logins. Every route here is an official claim process that Indian banks accept from a nominee or legal heir under Indian Law.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-stone-200 pb-2 text-xs sm:text-sm font-extrabold">
        <button
          onClick={() => setActiveTabSub('assets')}
          className={`flex items-center gap-2 border-b-4 px-4 py-2 transition ${
            activeTabSub === 'assets'
              ? 'border-amber-600 text-amber-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="h-5 w-5" /> Bank Claim Routes ({assets.length})
        </button>

        <button
          onClick={() => setActiveTabSub('legal_state')}
          className={`flex items-center gap-2 border-b-4 px-4 py-2 transition ${
            activeTabSub === 'legal_state'
              ? 'border-amber-600 text-amber-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <MapPin className="h-5 w-5" /> {deceasedProfile.state} Rules
        </button>

        <button
          onClick={() => setActiveTabSub('document_center')}
          className={`flex items-center gap-2 border-b-4 px-4 py-2 transition ${
            activeTabSub === 'document_center'
              ? 'border-amber-600 text-amber-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-700" /> Mandatory Checklist
        </button>
      </div>

      {/* Tab 1: Claim Guides */}
      {activeTabSub === 'assets' && (
        <div className="space-y-5">
          {assets.map((asset) => {
            const guide = INSTITUTION_CLAIM_GUIDES.find(g => g.institution.toLowerCase().includes(asset.institution.toLowerCase()) || g.category === asset.category) || INSTITUTION_CLAIM_GUIDES[0];

            return (
              <div
                key={asset.id}
                className="rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-stone-900">{asset.name}</h3>
                      <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-900">
                        {asset.institution}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-stone-600 font-semibold">
                      Doc Location: <strong className="text-stone-900">{asset.documentLocation}</strong> | Ref: <span className="font-mono text-stone-900">{asset.referenceNo || 'N/A'}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAssetForLetter(asset);
                      setActiveTab('letter_generator');
                    }}
                    className="flex items-center gap-2 rounded-2xl bg-amber-600 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow hover:bg-amber-700 transition"
                  >
                    <Sparkles className="h-4 w-4 text-amber-200" /> Write Claim Letter
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
                    <h4 className="font-extrabold text-emerald-900 flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700" /> Route A: Nominee Claim ({guide.estimatedDays} Days)
                    </h4>
                    <ol className="space-y-1.5 text-stone-800 font-medium list-decimal list-inside leading-relaxed">
                      {guide.nomineePath.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4 space-y-2">
                    <h4 className="font-extrabold text-amber-900 flex items-center gap-1.5 text-sm">
                      <ShieldAlert className="h-5 w-5 text-amber-700" /> Route B: No Nominee (Legal Heir Route)
                    </h4>
                    <ol className="space-y-1.5 text-stone-800 font-medium list-decimal list-inside leading-relaxed">
                      {guide.nonNomineePath.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: State Legal Rules */}
      {activeTabSub === 'legal_state' && (
        <div className="rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900">{currentStateInfo.name} Legal Heir Certificate Guide</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold">Issuing Authority: {currentStateInfo.legalHeirAuthority}</p>
            </div>
            {currentStateInfo.onlinePortal && (
              <a
                href={currentStateInfo.onlinePortal}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-extrabold text-amber-800 hover:underline"
              >
                Official Portal <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-4 space-y-2">
              <strong className="text-amber-900 block font-extrabold text-sm">Stamp Duty and Affidavit Rules</strong>
              <p className="text-stone-800 font-medium leading-relaxed">{currentStateInfo.stampDutyNote}</p>
              <div className="pt-1 text-stone-600 font-bold">Avg Timeline: <strong className="text-stone-900">{currentStateInfo.avgCertificateDays} Days</strong></div>
            </div>

            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-4 space-y-2">
              <strong className="text-emerald-900 block font-extrabold text-sm">State Succession Rules</strong>
              <ul className="space-y-1.5 text-stone-800 font-medium list-disc list-inside">
                {currentStateInfo.specialRules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Document Checklist */}
      {activeTabSub === 'document_center' && (
        <div className="rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">Mandatory Bank Claim Paperwork Checklist</h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Keep these physical papers ready before going to the bank branch.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {[
              "Original Death Certificate issued by local Municipal Corporation (At least 5 attested copies)",
              "Aadhaar and PAN Card of Nominee or Claimant",
              "Original Bank Passbook, Fixed Deposit Receipts, or LIC Policy Bond",
              "Cancelled Cheque of Claimant's active Savings Account for NEFT transfer",
              "Legal Heir Certificate or Surviving Member Certificate (If account has no nominee)",
              "Form 15G or 15H to avoid TDS tax deduction on accrued interest",
              "Indemnity Bond on Stamp Paper signed by all legal heirs",
              "Two Independent Sureties with identity proof for non-nominee claims above Rs 2 Lakhs"
            ].map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl border-2 border-stone-200 bg-stone-50 p-3.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-stone-800 font-semibold leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
