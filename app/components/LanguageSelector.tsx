'use client';

import { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '../lib/constants';
import { cn } from '../lib/utils';

interface Props {
  targetLang: string;
  setTargetLang: (lang: string) => void;
}

export default function LanguageSelector({ targetLang, setTargetLang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGES.find((l) => l.name === targetLang);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center mb-12 relative z-50">
      <div className="relative w-64" ref={dropdownRef}>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 text-center">
          Translate to
        </label>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between bg-neutral-900 border text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg",
            "hover:border-neutral-600",
            isOpen 
              ? "border-blue-500 ring-2 ring-blue-500/20" 
              : "border-neutral-800"
          )}
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">{currentLang?.icon}</span>
            {targetLang}
          </span>
          <svg
            className={cn(
              "w-4 h-4 text-neutral-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="py-1 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => {
                    setTargetLang(lang.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 flex items-center justify-between group transition-colors",
                    targetLang === lang.name
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                      {lang.icon}
                    </span>
                    {lang.name}
                  </span>
                  {targetLang === lang.name && (
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}