'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <div className="flex items-start gap-2.5 mt-2">
      <label className="group relative flex items-center justify-center cursor-pointer mt-0.5 select-none">
        {/* InputCheckbox Tersembunyi */}
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />

        {/* Box Checkbox Custom */}
        <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-100 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/50 transition-all flex items-center justify-center shadow-sm">
          {/* Ikon Check: Menggunakan peer-checked pada parent div/label */}
          <Check
            className={`w-3 h-3 text-white transition-opacity duration-150 ${
              checked ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            strokeWidth={3}
          />
        </div>
      </label>

      {/* Label Teks & Link */}
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-tight">
        By signing up, I agree to the{' '}
        <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}