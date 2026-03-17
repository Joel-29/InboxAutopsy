"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ShieldCheck, Brain, Target, AlertCircle } from "lucide-react";

export default function LandingPage() {
  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  const handleSignIn = () => {
    if (isMockMode) {
      // In mock mode, go directly to dashboard
      window.location.href = "/dashboard";
    } else {
      // Real OAuth flow
      signIn("google", { callbackUrl: "/dashboard" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Mock Mode Banner */}
      {isMockMode && (
        <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
          <AlertCircle className="inline-block w-4 h-4 mr-2" />
          Demo Mode Active - Using mock data for demonstration
        </div>
      )}

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            InboxAutopsy
          </h1>

          <p className="text-2xl md:text-3xl text-slate-600 mb-4 font-light">
            Diagnose why your email inbox is overwhelming you
          </p>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
            Get a clinical diagnosis of your inbox habits. We analyze your email metadata
            (not the content) and provide <span className="font-semibold text-slate-700">one actionable fix</span> to
            reclaim your digital wellbeing.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleSignIn}
            size="lg"
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Mail className="mr-2 h-5 w-5" />
            {isMockMode ? "View Demo Dashboard" : "Sign in with Google"}
          </Button>

          <p className="text-sm text-slate-400 mt-4">
            {isMockMode
              ? "Demo mode - no sign-in required"
              : "We only request read-only access to email metadata"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Privacy First
              </h3>
              <p className="text-slate-600">
                We only read email metadata (sender, subject, date). Never the email body.
                Ever.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-slate-600">
                Claude AI acts as your "Email Therapist" to diagnose inbox overwhelm patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-green-300 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                One Actionable Fix
              </h3>
              <p className="text-slate-600">
                No overwhelming lists. Just ONE specific action to improve your inbox health.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Your Inbox Health Report
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Overall Health Score</h3>
                <p className="text-slate-600">A 0-100 score based on unread ratio, inbox diversity, and engagement patterns.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">The 1-Click Prescription</h3>
                <p className="text-slate-600">The single most impactful action you should take right now to improve your inbox.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Attention Vampires</h3>
                <p className="text-slate-600">Top 3 senders consuming the most volume in your inbox.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Newsletter Graveyard</h3>
                <p className="text-slate-600">Subscriptions you constantly receive but never open.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500 text-sm">
          <p>Built for Hacknight Hackathon • Powered by Anthropic Claude</p>
          <p className="mt-2">Read-only access • No data stored • Open source</p>
        </div>
      </div>
    </main>
  );
}
