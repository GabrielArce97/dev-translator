"use client";

import { cn } from "../lib/utils";

interface Props {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function CodeInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: Props) {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div className="group relative flex-1">
        <div
          className={cn(
            "absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-neutral-700 to-neutral-900 opacity-20 blur transition duration-500",
            "group-hover:opacity-40",
          )}
        />
        <textarea
          className={cn(
            "relative h-full min-h-[500px] w-full resize-none rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 font-mono text-sm text-neutral-100 placeholder-neutral-600 shadow-xl backdrop-blur-sm transition-all",
            "focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          )}
          value={input}
          onChange={handleInputChange}
          placeholder="// Paste your source code here..."
          spellCheck={false}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !input}
        className={cn(
          "group flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/80 px-6 py-4 font-medium text-neutral-300 backdrop-blur-sm transition-all",
          "hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400",
          "active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isLoading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin text-blue-500"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
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
              className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-blue-500"
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
  );
}
