"use client";

import { Loader2, Mail, Brain } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="absolute w-32 h-32 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>

            {/* Inner icon */}
            <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg">
              <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Running diagnostics...
        </h2>

        <p className="text-lg text-slate-600 mb-8">
          Analyzing your inbox habits and email patterns
        </p>

        {/* Progress Steps */}
        <div className="space-y-3 text-left bg-white rounded-lg p-6 shadow-md">
          <LoadingStep text="Fetching email metadata" />
          <LoadingStep text="Analyzing sender patterns" delay={500} />
          <LoadingStep text="Calculating health score" delay={1000} />
          <LoadingStep text="Identifying attention vampires" delay={1500} />
          <LoadingStep text="Generating prescription" delay={2000} />
        </div>

        <p className="text-sm text-slate-400 mt-6">
          This may take 10-15 seconds...
        </p>
      </div>
    </div>
  );
}

function LoadingStep({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div
      className="flex items-center gap-3 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
}
