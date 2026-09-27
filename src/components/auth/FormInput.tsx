// src/components/auth/FormInput.tsx
'use client';

import React, { useState } from 'react';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  isPasswordToggle?: boolean;
}

export default function FormInput({
  label,
  icon: Icon,
  isPasswordToggle = false,
  type = 'text',
  className = '',
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        )}
        <input
          type={inputType}
          className={`w-full bg-white border border-slate-300 rounded-xl py-2.5 ${
            Icon ? 'pl-10' : 'pl-4'
          } ${
            isPasswordToggle ? 'pr-10' : 'pr-4'
          } text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium ${className}`}
          {...props}
        />
        {isPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}