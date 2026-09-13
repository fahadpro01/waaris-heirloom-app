import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle2, Share2, MoreVertical, Shield, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DownloadAppModal: React.FC = () => {
  const { showDownloadAppModal, setShowDownloadAppModal, assets, userPhone } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [activeOs, setActiveOs] = useState<'android' | 'ios'>('android');
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect iOS
    const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIos) {
      setActiveOs('ios');
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!showDownloadAppModal) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      setInstalledSuccess(true);
    }
  };

  const handleDownloadBackupData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `waaris_family_assets_${userPhone || 'backup'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border-3 border-emerald-400 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setShowDownloadAppModal(false)}
          className="absolute right-4 top-4 rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b-2 border-stone-100 pb-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
            <Smartphone className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">
              Add To Phone Taskbar
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800">
              Pin Waaris directly to your phone taskbar & home screen dock
            </p>
          </div>
        </div>

        {installedSuccess && (
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-900 font-extrabold text-xs sm:text-sm">
            <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0" />
            <div>
              <span>App pinned! Look for the Waaris 🛡️ icon in your phone taskbar / home screen.</span>
            </div>
          </div>
        )}

        {/* 1-TAP INSTALL ACTION BUTTON */}
        <div className="space-y-3">
          <button
            onClick={handleNativeInstall}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 py-4 text-sm sm:text-base font-extrabold text-white shadow-lg hover:bg-emerald-700 active:scale-98 transition"
          >
            <Download className="h-6 w-6" />
            <span>Pin App To Phone Taskbar / Home Screen</span>
          </button>

          <p className="text-center text-xs font-bold text-stone-500">
            Works offline on Android & iPhone. Zero storage overhead (&lt; 2 MB).
          </p>
        </div>

        {/* EASY WALKTHROUGH TABS */}
        <div className="space-y-4 rounded-3xl border-2 border-amber-200 bg-amber-50/70 p-5">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
              <Shield className="h-5 w-5 text-amber-700" /> Easy Mobile Install Walkthrough
            </span>

            {/* OS Selector */}
            <div className="flex rounded-xl bg-amber-200/80 p-1 text-xs font-bold">
              <button
                onClick={() => setActiveOs('android')}
                className={`rounded-lg px-3 py-1 transition ${activeOs === 'android' ? 'bg-white text-emerald-900 shadow' : 'text-stone-700'}`}
              >
                Android
              </button>
              <button
                onClick={() => setActiveOs('ios')}
                className={`rounded-lg px-3 py-1 transition ${activeOs === 'ios' ? 'bg-white text-emerald-900 shadow' : 'text-stone-700'}`}
              >
                iPhone (iOS)
              </button>
            </div>
          </div>

          {/* Android Steps */}
          {activeOs === 'android' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-extrabold text-white">1</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Open Chrome Menu</strong>
                  <p className="text-stone-600 font-medium">Tap the 3 dots icon (<MoreVertical className="inline h-4 w-4 text-stone-700" />) at the top right corner of Chrome.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-extrabold text-white">2</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Select "Install App"</strong>
                  <p className="text-stone-600 font-medium">Tap <strong className="text-emerald-800 font-bold">"Install app"</strong> or <strong>"Add to Home screen"</strong> from the dropdown menu.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-extrabold text-white">3</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Launch Native App</strong>
                  <p className="text-stone-600 font-medium">The Waaris icon will appear on your phone screen to open anytime, even offline!</p>
                </div>
              </div>
            </div>
          )}

          {/* iOS Steps */}
          {activeOs === 'ios' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-extrabold text-white">1</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Tap Safari Share Button</strong>
                  <p className="text-stone-600 font-medium">Tap the Share icon (<Share2 className="inline h-4 w-4 text-amber-700" />) at the bottom toolbar of Safari.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-extrabold text-white">2</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Select "Add to Home Screen"</strong>
                  <p className="text-stone-600 font-medium">Scroll down the menu list and tap <strong className="text-amber-800 font-bold">"Add to Home Screen"</strong>.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-xs border border-amber-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-extrabold text-white">3</span>
                <div>
                  <strong className="font-extrabold text-stone-900 block">Tap "Add" at Top Right</strong>
                  <p className="text-stone-600 font-medium">Tap Add in the top right corner. The Waaris app icon will now sit on your iPhone home screen!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EXTRA: OFFLINE BACKUP DATA DOWNLOAD */}
        <div className="border-t-2 border-stone-100 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700">
            <span>Need Offline Data Backup?</span>
            <span className="text-emerald-700 font-extrabold">{assets.length} assets mapped</span>
          </div>

          <button
            onClick={handleDownloadBackupData}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-stone-200 bg-stone-50 py-3 text-xs sm:text-sm font-extrabold text-stone-800 hover:bg-stone-100 transition shadow-xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
            <span>Download Family Vault Backup (.JSON)</span>
          </button>
        </div>

        {/* Close Button Footer */}
        <button
          onClick={() => setShowDownloadAppModal(false)}
          className="w-full rounded-2xl bg-stone-900 py-3 text-sm font-extrabold text-white hover:bg-stone-800 transition shadow"
        >
          Close Walkthrough
        </button>

      </div>
    </div>
  );
};
