"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LANGUAGES } from "../lib/constants";
import { cn } from "../lib/utils";

interface Props {
  output: string;
  targetLang: string;
}

export default function CodeOutput({ output, targetLang }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const currentLang = LANGUAGES.find((l) => l.name === targetLang);

  const cleanCode = (code: string) => {
    return code.replace(/```\w*\n?|```/g, "").trim();
  };

  const handleCopy = async () => {
    if (!output) return;
    const textToCopy = cleanCode(output);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex h-full flex-col space-y-3">
      <div
        className={cn(
          "group relative min-h-[500px] w-full flex-1 overflow-hidden", // Layout
          "rounded-2xl border border-neutral-800 bg-[#1e1e1e] shadow-2xl ring-1 ring-white/5", // Appearance
        )}
      >
        {/* Header Bar */}
        <div
          className={cn(
            "absolute left-0 right-0 top-0 z-10", // Position
            "flex h-10 items-center justify-between px-4", // Layout
            "border-b border-white/5 bg-[#1e1e1e]/90 backdrop-blur", // Style
          )}
        >
          <span className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            {currentLang?.icon}
            {targetLang} Output
          </span>

          {output && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-emerald-500">Live</span>
            </div>
          )}
        </div>

        {/* Copy Button */}
        {output && (
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className={cn(
              "absolute right-4 top-12 z-20 p-2",
              "rounded-lg border border-neutral-700 bg-neutral-800/60 backdrop-blur-md",
              "text-neutral-400 transition-all",
              "hover:bg-neutral-700 hover:text-white",
              "opacity-0 group-hover:opacity-100",
            )}
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

        {/* Code Content */}
        {output ? (
          <SyntaxHighlighter
            language={targetLang.toLowerCase()}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              paddingTop: "3.5rem",
              height: "100%",
              fontSize: "0.9rem",
              lineHeight: "1.6",
              background: "transparent",
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: "3em",
              paddingRight: "1em",
              color: "#52525b",
              textAlign: "right",
            }}
          >
            {cleanCode(output)}
          </SyntaxHighlighter>
        ) : (
          /* Empty State */
          <div className="flex h-full flex-col items-center justify-center gap-6 text-neutral-600">
            <div
              className={cn(
                "relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full",
                "border border-neutral-800 bg-neutral-900 transition-colors",
                "group-hover:border-blue-500/30",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-blue-500/10 opacity-50 blur-xl transition-opacity",
                  "group-hover:opacity-100",
                )}
              />
              <span
                className={cn(
                  "text-4xl opacity-30 grayscale transition-all",
                  "group-hover:grayscale-0",
                )}
              >
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
  );
}
