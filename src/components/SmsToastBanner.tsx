import React, { useState, useEffect } from 'react';
import { Smartphone, X, BellRing, CheckCircle } from 'lucide-react';
import { SmsService, SmsNotification } from '../services/smsService';

export const SmsToastBanner: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<SmsNotification | null>(null);

  useEffect(() => {
    const smsService = SmsService.getInstance();
    const unsubscribe = smsService.subscribe((notification) => {
      setActiveNotification(notification);
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 9000);
      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, []);

  if (!activeNotification) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 animate-bounce-short">
      <div className="rounded-3xl border-3 border-emerald-400 bg-stone-900 text-white p-4 shadow-2xl space-y-2">
        
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-extrabold text-stone-200">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white animate-pulse">
              <Smartphone className="h-4 w-4" />
            </span>
            <span className="text-emerald-400 font-bold">SMS Sent to +91 {activeNotification.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-800 px-2 py-0.5 font-mono text-[10px] text-stone-300">
              {activeNotification.timestamp}
            </span>
            <button
              onClick={() => setActiveNotification(null)}
              className="rounded-full p-1 text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* SMS Content Body */}
        <div className="rounded-2xl border border-stone-800 bg-stone-800/90 p-3 space-y-1">
          <strong className="text-xs font-extrabold text-amber-300 block">{activeNotification.title}</strong>
          <p className="text-xs text-stone-200 font-medium leading-relaxed font-mono">
            "{activeNotification.message}"
          </p>
        </div>

      </div>
    </div>
  );
};
