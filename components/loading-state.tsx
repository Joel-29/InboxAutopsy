"use client";

import { Loader2, Brain, Activity } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            {/* Outer spinning ring */}
            <div className="absolute w-32 h-32 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>

            {/* Middle spinning ring (opposite direction effect) */}
            <div className="absolute w-24 h-24 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" style={{ animationDuration: '1.5s' }}></div>

            {/* Inner icon */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl">
              <Brain className="w-10 h-10 text-blue-600 animate-pulse" />
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
        <div className="space-y-3 text-left bg-white rounded-xl p-6 shadow-xl border border-slate-200">
          <LoadingStep text="Fetching email metadata" />
          <LoadingStep text="Analyzing sender patterns" delay={400} />
          <LoadingStep text="Calculating health score" delay={800} />
          <LoadingStep text="Identifying attention vampires" delay={1200} />
          <LoadingStep text="Generating prescription" delay={1600} />
        </div>

        <p className="text-sm text-slate-500 mt-6 flex items-center justify-center gap-2">
          <Activity className="w-4 h-4 animate-pulse" />
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
      <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
}
