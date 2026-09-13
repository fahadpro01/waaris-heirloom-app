import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-2 border-stone-200 bg-[#F5F0EB] py-8 pb-24 lg:pb-8 text-stone-700 text-xs sm:text-sm font-semibold">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-extrabold text-stone-900">Waaris</span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-extrabold text-emerald-800">
                VARIS
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-700 leading-relaxed font-semibold">
              Helping Indian families record where bank papers live and help legal heirs claim assets safely without passwords.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-stone-200 bg-white p-4">
            <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-stone-900">
              <Cpu className="h-4 w-4 text-emerald-700" /> Private On-Device AI
            </h4>
            <p className="mt-1 text-xs text-stone-700 leading-relaxed font-medium">
              All bank claim letters and succession advice are calculated directly on your phone. Zero cloud data transmission.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-stone-900">Legal Protection Pledge</h4>
            <p className="mt-1 text-xs leading-relaxed text-stone-600 font-medium">
              Waaris never asks for passwords, PINs, or OTPs. We only record institution names and document locations following RBI guidelines.
            </p>
          </div>

        </div>

        <div className="border-t border-stone-300 pt-4 text-center text-xs text-stone-600 font-bold">
          Crafted with care for Indian families.
        </div>

      </div>
    </footer>
  );
};
