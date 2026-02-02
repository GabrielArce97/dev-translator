'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Home() {
  const [targetLang, setTargetLang] = useState('Python');

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

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
        Dev<span className="text-blue-500">Translator</span> 🚀
      </h1>

      {/* Language Selector */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg py-3 px-8 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* LEFT COLUMN: Input */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-300 ml-1">Your Code:</label>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <textarea
              className="flex-1 min-h-[400px] w-full p-5 bg-gray-800/50 border border-gray-700 rounded-xl font-mono text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-gray-500"
              value={input}
              onChange={handleInputChange}
              placeholder="// Paste your code here..."
              spellCheck={false}
            />

            <button
              type="submit"
              disabled={isLoading || !input}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Translating...
                </span>
              ) : (
                '✨ Translate Code'
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-300 ml-1">
            Result ({targetLang}):
          </label>
          <div className="flex-1 min-h-[400px] w-full p-5 bg-black rounded-xl border border-gray-800 font-mono text-sm shadow-inner overflow-auto">
            {latestResponse ? (
              // Using text-green-400 to look like "matrix" terminal code
              <pre className="text-green-400 whitespace-pre-wrap font-mono">
                {latestResponse}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 italic">
                The translated code will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
