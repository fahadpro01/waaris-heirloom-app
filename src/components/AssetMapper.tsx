import React, { useState } from 'react';
import { Shield, Plus, Trash2, FileText, Download, CheckCircle2, Sparkles, Building2, Wallet, Landmark, Home, Award, AlertCircle, ShieldCheck, IndianRupee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AssetItem, AssetCategory } from '../types';
import { SmsService } from '../services/smsService';

export const AssetMapper: React.FC = () => {
  const { assets, addAsset, deleteAsset, setActiveTab, setSelectedAssetForLetter, setShowDigiLockerModal, isDigiLockerConnected, userPhone } = useApp();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<Omit<AssetItem, 'id'>>({
    name: '',
    category: 'bank_fd',
    institution: '',
    referenceNo: '',
    documentLocation: '',
    nomineeStatus: 'confirmed',
    nomineeName: '',
    estimatedValue: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.institution || !formData.documentLocation) return;

    addAsset(formData);
    if (userPhone) {
      SmsService.getInstance().sendNotificationSms(
        userPhone,
        'Waaris Asset Saved',
        `Asset "${formData.name}" (${formData.institution}) valued at ${formData.estimatedValue || 'Rs 0'} has been saved to your family map.`
      );
    }
    setShowModal(false);
    setFormData({
      name: '',
      category: 'bank_fd',
      institution: '',
      referenceNo: '',
      documentLocation: '',
      nomineeStatus: 'confirmed',
      nomineeName: '',
      estimatedValue: '',
      notes: ''
    });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Waaris_Family_Financial_Map_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getCategoryIcon = (category: AssetCategory) => {
    switch (category) {
      case 'bank_fd': return <Landmark className="h-6 w-6 text-amber-700" />;
      case 'insurance': return <Shield className="h-6 w-6 text-emerald-700" />;
      case 'epf_ppf': return <Building2 className="h-6 w-6 text-blue-700" />;
      case 'mutual_fund': return <Wallet className="h-6 w-6 text-purple-700" />;
      case 'real_estate': return <Home className="h-6 w-6 text-orange-700" />;
      case 'gold_vault': return <Award className="h-6 w-6 text-amber-600" />;
      default: return <FileText className="h-6 w-6 text-stone-600" />;
    }
  };

  const unnominatedCount = assets.filter(a => a.nomineeStatus === 'unassigned').length;

  const [searchQuery, setSearchQuery] = useState('');

  const totalValueSum = assets.reduce((acc, asset) => {
    if (!asset.estimatedValue) return acc;
    const cleanNum = parseInt(asset.estimatedValue.replace(/\D/g, ''), 10);
    return acc + (isNaN(cleanNum) ? 0 : cleanNum);
  }, 0);

  const formattedTotalValue = totalValueSum > 0 
    ? 'Rs ' + totalValueSum.toLocaleString('en-IN')
    : 'Rs 29,70,000';

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.referenceNo || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 pb-28 space-y-6">
      
      {/* Top Total Portfolio Summary Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-amber-50 p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center justify-center sm:justify-start gap-1">
            <IndianRupee className="h-4 w-4 text-emerald-700" /> Total Mapped Asset Value
          </span>
          <div className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-800">
            {formattedTotalValue}
          </div>
          <p className="text-xs text-stone-600 font-semibold">Total financial value recorded across {assets.length} bank accounts, LIC policies & EPF.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowDigiLockerModal(true)}
            className="flex items-center gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-700 shadow-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isDigiLockerConnected ? 'DigiLocker Linked' : 'Sync DigiLocker Docs'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 rounded-2xl border-2 border-stone-200 bg-white px-4 py-2.5 text-xs font-extrabold text-stone-800 hover:bg-stone-50 shadow-sm"
          >
            <Download className="h-4 w-4 text-amber-700" /> Backup
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow hover:bg-amber-700 transition"
          >
            <Plus className="h-5 w-5" /> Add Record
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search bank name, policy no, or account..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-2xl border-2 border-stone-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none shadow-xs"
        />
        <span className="text-xs font-bold text-stone-500 shrink-0">{filteredAssets.length} Records</span>
      </div>

      {/* Unnominated Alert */}
      {unnominatedCount > 0 && (
        <div className="flex items-center gap-3 rounded-3xl border-2 border-rose-300 bg-rose-50 p-4 sm:p-5">
          <AlertCircle className="h-6 w-6 text-rose-700 shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong className="text-rose-900 block font-extrabold text-base">Nominee Warning ({unnominatedCount} Account)</strong>
            <span className="text-rose-800 font-medium">Accounts without nominees require court certificates. Visit your bank to add nominee names.</span>
          </div>
        </div>
      )}

      {/* Assets List Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="flex flex-col justify-between rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-sm space-y-4 hover:border-emerald-400 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 border border-stone-200">
                    {getCategoryIcon(asset.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-stone-900 leading-snug">{asset.name}</h3>
                      {asset.isDigiLockerVerified && (
                        <span className="inline-flex items-center rounded-md bg-emerald-100 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-800 border border-emerald-300" title="Verified by DigiLocker MeitY">
                          <ShieldCheck className="h-3 w-3 mr-0.5 text-emerald-700" /> Govt Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-emerald-800">{asset.institution}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteAsset(asset.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5"
                  title="Delete record"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              {/* Asset Value Highlight Banner */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-900 uppercase">Estimated Asset Value:</span>
                <span className="text-base font-extrabold text-emerald-800 font-mono">
                  {asset.estimatedValue || 'Rs 5,00,000'}
                </span>
              </div>

              <div className="space-y-2 rounded-2xl border border-stone-200 bg-stone-50/80 p-4 text-xs sm:text-sm font-semibold">
                <div className="flex justify-between text-stone-700">
                  <span>Account or Ref No:</span>
                  <span className="font-mono text-stone-900 font-bold">{asset.referenceNo || 'Not Specified'}</span>
                </div>

                <div className="flex justify-between text-stone-700">
                  <span>Paper Location in Home:</span>
                  <span className="font-bold text-amber-900 text-right">{asset.documentLocation}</span>
                </div>

                <div className="flex justify-between items-center text-stone-700 pt-1.5 border-t border-stone-200">
                  <span>Nominee Status:</span>
                  {asset.nomineeStatus === 'confirmed' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {asset.nomineeName || 'Confirmed'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-rose-700 text-xs">
                      <AlertCircle className="h-4 w-4 text-rose-600" /> Missing Nominee
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-100 pt-3">
              <span className="text-xs text-stone-500 font-medium italic truncate max-w-[160px]">{asset.notes || 'No extra notes'}</span>

              <button
                onClick={() => {
                  setSelectedAssetForLetter(asset);
                  setActiveTab('letter_generator');
                }}
                className="flex items-center gap-1.5 rounded-2xl bg-amber-100 border border-amber-300 px-3 py-1.5 text-xs font-extrabold text-amber-900 hover:bg-amber-200 transition"
              >
                <Sparkles className="h-4 w-4 text-amber-700" /> Write Claim Letter
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border-2 border-stone-300 bg-white p-6 sm:p-7 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">Add New Financial Record</h3>
              <p className="text-xs font-semibold text-stone-600">Enter simple details so your family can find your papers.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-extrabold text-stone-800">Record Title (e.g. SBI Savings & FD)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SBI Savings Account & Fixed Deposit"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-stone-800">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as AssetCategory })}
                    className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="bank_fd">Bank Savings / FD</option>
                    <option value="insurance">LIC / Life Insurance</option>
                    <option value="epf_ppf">EPF / PPF / Pension</option>
                    <option value="mutual_fund">Stocks / Mutual Funds</option>
                    <option value="real_estate">Real Estate Deed</option>
                    <option value="gold_vault">Physical Gold / Locker</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-stone-800">Bank / Institution Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Bank of India"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-stone-800">Where are papers kept in home?</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bedroom Almirah, Top Shelf Green File"
                  value={formData.documentLocation}
                  onChange={(e) => setFormData({ ...formData, documentLocation: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-extrabold text-stone-800">Estimated Financial Value (Rs)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rs 5,00,000"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-stone-800">Nominee Assigned?</label>
                  <select
                    value={formData.nomineeStatus}
                    onChange={(e) => setFormData({ ...formData, nomineeStatus: e.target.value as any })}
                    className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-3 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="confirmed">Nominee Confirmed</option>
                    <option value="unassigned">Missing / Unassigned</option>
                  </select>
                </div>

                <div>
                  <label className="block font-extrabold text-stone-800">Nominee Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Lakshmi (Spouse)"
                    value={formData.nomineeName}
                    onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                    className="mt-1 w-full rounded-2xl border-2 border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 font-semibold focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-2xl bg-stone-200 px-5 py-2.5 font-bold text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-600 px-5 py-2.5 font-extrabold text-white hover:bg-emerald-700"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
