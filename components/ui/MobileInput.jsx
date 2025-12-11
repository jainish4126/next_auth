"use client";

import { useState } from "react";

export function MobileInput({ label, value, onChange, error, ...props }) {
  const [countryCode, setCountryCode] = useState("+91");
  
  const isValid = value && value.length === 10 && /^\d{10}$/.test(value);

  return (
    <div className="w-full">
      <label className="block text-[11px] lg:text-[12px] font-normal text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative flex w-full border border-gray-200 rounded-xl bg-white focus-within:border-black transition-colors overflow-hidden">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="pl-3 pr-2 py-2.5 lg:py-3 text-[13px] lg:text-[14px] bg-white focus:outline-none"
        >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+86">+86</option>
        </select>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          className="flex-1 px-3 lg:px-3.5 py-2.5 lg:py-3 text-[13px] lg:text-[14px] bg-white focus:outline-none pr-10"
          placeholder="1762345678"
          {...props}
        />
        {isValid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-black rounded-full p-0.3">
            <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[11px] lg:text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}
