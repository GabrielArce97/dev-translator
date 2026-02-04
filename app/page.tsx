"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import CodeInput from "./components/CodeInput";
import CodeOutput from "./components/CodeOutput";
import { cn } from "./lib/utils";

export default function Home() {
  const [targetLang, setTargetLang] = useState("Python");

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/translate",
      body: { languageTo: targetLang },
      onError: (err) => {
        console.error("Chat error:", err);
      },
    });

  const latestResponse =
    messages.filter((m) => m.role === "assistant").pop()?.content || "";

  return (
    <main
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden",
        "bg-neutral-950 font-sans text-neutral-200 selection:bg-blue-500/30",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 -translate-x-1/2",
          "h-[400px] w-[800px] rounded-full",
          "bg-blue-500/20 blur-[120px]",
        )}
      />

      <div
        className={cn(
          "relative z-10 flex w-full flex-1 flex-col",
          "mx-auto max-w-7xl px-6 py-16",
        )}
      >
        <Header />

        <LanguageSelector
          targetLang={targetLang}
          setTargetLang={setTargetLang}
        />

        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <CodeInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <CodeOutput output={latestResponse} targetLang={targetLang} />
        </div>
      </div>
    </main>
  );
}
