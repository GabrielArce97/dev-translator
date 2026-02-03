import { cn } from "../lib/utils";

export default function Header() {
  return (
    <div className={cn("mb-16 space-y-6 text-center")}>
      {/* Badge / Pill */}
      <div
        className={cn(
          "mb-2 inline-flex items-center justify-center px-3 py-1", // Layout
          "rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm", // Apariencia
          "text-xs font-medium text-blue-400", // Tipografía
        )}
      >
        <span className="relative mr-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
        </span>
        Gemini 2.5 AI Powered
      </div>

      {/* Main Title */}
      <h1
        className={cn(
          "text-5xl font-bold tracking-tighter text-white",
          "md:text-7xl", // Responsive
        )}
      >
        Dev
        <span
          className={cn(
            "bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent",
          )}
        >
          Translator
        </span>
        <span className="text-blue-500">.</span>
      </h1>

      {/* Description */}
      <p
        className={cn(
          "mx-auto max-w-xl text-lg leading-relaxed text-neutral-400",
          "md:text-xl",
        )}
      >
        Seamlessly convert code between languages with{" "}
        <span className="font-medium text-neutral-200">
          intelligent context preservation
        </span>
        .
      </p>
    </div>
  );
}
