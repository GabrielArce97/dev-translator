'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSwift,
  SiGo,
  SiRust,
} from 'react-icons/si';

export default function Home() {
  const [targetLang, setTargetLang] = useState('Python');
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      name: 'Python',
      icon: <SiPython className="text-[#3776AB]" />,
      color: '#3776AB',
    },
    {
      name: 'JavaScript',
      icon: <SiJavascript className="text-[#F7DF1E]" />,
      color: '#F7DF1E',
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript className="text-[#3178C6]" />,
      color: '#3178C6',
    },
    {
      name: 'Swift',
      icon: <SiSwift className="text-[#F05138]" />,
      color: '#F05138',
    },
    { name: 'Go', icon: <SiGo className="text-[#00ADD8]" />, color: '#00ADD8' },
    {
      name: 'Rust',
      icon: <SiRust className="text-[#DEA584]" />,
      color: '#DEA584',
    },
  ];

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/translate',
      body: { languageTo: targetLang },
      onError: (err) => {
        console.error('Chat error:', err);
      },
    });

  const latestResponse =
    messages.filter((m) => m.role === 'assistant').pop()?.content || '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanCode = (code: string) => {
    return code.replace(/```\w*\n?|```/g, '').trim();
  };

  const handleCopy = async () => {
    if (!latestResponse) return;
    const textToCopy = cleanCode(latestResponse);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentLang = languages.find((l) => l.name === targetLang);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full flex-1 flex flex-col">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium backdrop-blur-sm mb-2">
            <span className="flex h-2 w-2 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Gemini 2.5 AI Powered
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Dev
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Translator
            </span>
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Seamlessly convert code between languages with{' '}
            <span className="text-neutral-200 font-medium">
              intelligent context preservation
            </span>
            .
          </p>
        </div>

        <div className="flex justify-center mb-12 relative z-50">
          <div className="relative w-64" ref={dropdownRef}>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 text-center">
              Translate to
            </label>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between bg-neutral-900 border ${isDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-neutral-800 hover:border-neutral-600'} text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{currentLang?.icon}</span>
                {targetLang}
              </span>
              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="py-1 max-h-60 overflow-y-auto custom-scrollbar">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => {
                        setTargetLang(lang.name);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-colors ${
                        targetLang === lang.name
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                          {lang.icon}
                        </span>
                        {lang.name}
                      </span>
                      {targetLang === lang.name && (
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 flex-1">
          <div className="flex flex-col space-y-3 h-full">
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <textarea
                className="relative w-full h-full min-h-[500px] p-6 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl font-mono text-sm text-neutral-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder-neutral-600 shadow-xl"
                value={input}
                onChange={handleInputChange}
                placeholder="// Paste your source code here..."
                spellCheck={false}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !input}
              className="w-full py-4 px-6 rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-neutral-900/80 border border-neutral-800 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 text-neutral-300 group backdrop-blur-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5 text-neutral-400 group-hover:text-blue-500 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                  <span>Translate Code</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col space-y-3 h-full">
            <div className="flex-1 w-full bg-[#1e1e1e] rounded-2xl border border-neutral-800 overflow-hidden relative shadow-2xl group ring-1 ring-white/5 min-h-[500px]">
              <div className="absolute top-0 left-0 right-0 h-10 bg-[#1e1e1e]/90 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 z-10">
                <span className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  {currentLang?.icon}
                  {targetLang} Output
                </span>
                {latestResponse && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-emerald-500 font-medium">
                      Live
                    </span>
                  </div>
                )}
              </div>

              {latestResponse && (
                <button
                  onClick={handleCopy}
                  className="absolute top-12 right-4 z-20 p-2 bg-neutral-800/60 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              )}

              {latestResponse ? (
                <SyntaxHighlighter
                  language={targetLang.toLowerCase()}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    paddingTop: '3.5rem',
                    height: '100%',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    background: 'transparent',
                  }}
                  wrapLines={true}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: '#52525b',
                    textAlign: 'right',
                  }}
                >
                  {cleanCode(latestResponse)}
                </SyntaxHighlighter>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-600 gap-6">
                  <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/30 transition-colors">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-4xl opacity-30 grayscale group-hover:grayscale-0 transition-all">
                      {currentLang?.icon}
                    </span>
                  </div>
                  <p className="text-sm font-medium opacity-50">
                    Select a language & paste code
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
