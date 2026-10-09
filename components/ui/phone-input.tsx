"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountryInfo {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  placeholder: string;
  minLength: number;
  maxLength: number;
}

export const COUNTRIES: CountryInfo[] = [
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰", placeholder: "300 1234567", minLength: 9, maxLength: 11 },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧", placeholder: "7911 123456", minLength: 9, maxLength: 11 },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸", placeholder: "(555) 000-0000", minLength: 10, maxLength: 10 },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪", placeholder: "50 123 4567", minLength: 9, maxLength: 9 },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦", placeholder: "50 123 4567", minLength: 9, maxLength: 9 },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺", placeholder: "412 345 678", minLength: 9, maxLength: 9 },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", placeholder: "(555) 000-0000", minLength: 10, maxLength: 10 },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦", placeholder: "3312 3456", minLength: 8, maxLength: 8 },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼", placeholder: "9123 4567", minLength: 8, maxLength: 8 },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲", placeholder: "9123 4567", minLength: 8, maxLength: 8 },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭", placeholder: "3912 3456", minLength: 8, maxLength: 8 },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬", placeholder: "8123 4567", minLength: 8, maxLength: 8 },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾", placeholder: "12 345 6789", minLength: 9, maxLength: 10 },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", placeholder: "151 23456789", minLength: 10, maxLength: 11 },
  { name: "Other / International", code: "INT", dialCode: "+", flag: "🌐", placeholder: "Country code + number", minLength: 7, maxLength: 15 },
];

export interface PhoneInputProps {
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * Standard phone validation helper.
 * Rejects numbers shorter than 7 digits or invalid international formats.
 */
export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string } {
  const cleaned = phone.replace(/[^0-9]/g, "");
  if (!cleaned) {
    return { isValid: false, error: "Phone number is required." };
  }
  if (cleaned.length < 7) {
    return { isValid: false, error: "Phone number is too short (must be at least 7 to 15 digits)." };
  }
  if (cleaned.length > 15) {
    return { isValid: false, error: "Phone number is too long (maximum 15 digits)." };
  }
  return { isValid: true };
}

export function PhoneInput({
  value = "",
  onChange,
  error,
  name = "phone",
  id = "phone",
  disabled = false,
  required = false,
  className,
}: PhoneInputProps) {
  // Extract dial code and number from value
  const initialCountry = COUNTRIES.find((c) => value.startsWith(c.dialCode)) || COUNTRIES[0];
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(initialCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [nationalNumber, setNationalNumber] = useState(() => {
    if (value.startsWith(initialCountry.dialCode)) {
      return value.slice(initialCountry.dialCode.length).trim();
    }
    return value.replace(/^\+\d+\s*/, "");
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsOpen(false);
    const fullPhone = nationalNumber ? `${country.dialCode} ${nationalNumber}` : country.dialCode;
    onChange?.(fullPhone);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow digits and spaces/dashes
    const sanitized = raw.replace(/[^\d\s-]/g, "");
    setNationalNumber(sanitized);
    const fullPhone = sanitized ? `${selectedCountry.dialCode} ${sanitized.trim()}` : "";
    onChange?.(fullPhone);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex rounded-xl border border-slate-border bg-white shadow-xs focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light">
        {/* Country Selector Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-full items-center gap-1.5 rounded-l-xl border-r border-slate-border/80 bg-cream-muted/50 px-3 py-2.5 text-xs font-semibold text-navy hover:bg-cream-muted transition-colors dark:bg-navy/80 dark:border-navy-light dark:text-cream"
            aria-label="Select country code"
            aria-expanded={isOpen}
          >
            <span className="text-base" role="img" aria-label={selectedCountry.name}>
              {selectedCountry.flag}
            </span>
            <span className="font-mono text-xs">{selectedCountry.dialCode}</span>
            <ChevronDown className="h-3 w-3 text-slate opacity-70" />
          </button>

          {/* Country Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-64 overflow-y-auto rounded-xl border border-slate-border bg-white p-1 shadow-xl backdrop-blur-md dark:bg-navy dark:border-navy-light">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors hover:bg-cream-muted dark:hover:bg-navy-light/60",
                    selectedCountry.code === country.code
                      ? "bg-copper/10 text-copper font-bold"
                      : "text-navy dark:text-cream"
                  )}
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="flex-1 truncate">{country.name}</span>
                  <span className="font-mono text-slate dark:text-slate-light text-[11px]">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          value={nationalNumber}
          onChange={handleNumberChange}
          placeholder={selectedCountry.placeholder}
          className="w-full flex-1 rounded-r-xl bg-transparent px-3.5 py-2.5 text-sm text-navy placeholder:text-slate/60 focus:outline-none dark:text-cream"
        />
      </div>

      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
