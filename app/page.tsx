"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ShieldCheck, Brain, Target, Sparkles } from "lucide-react";

export default function LandingPage() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl animate-pulse">
              <Mail className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-900">
            InboxAutopsy
          </h1>

          <p className="text-2xl md:text-3xl text-slate-700 mb-4 font-light">
            Diagnose why your email inbox is overwhelming you
          </p>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Get a clinical diagnosis of your inbox habits. We analyze your email metadata
            (not the content) and provide <span className="font-semibold text-blue-700">one actionable fix</span> to
            reclaim your digital wellbeing.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleSignIn}
            size="lg"
            className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <Mail className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>

          <p className="text-sm text-slate-500 mt-6">
            We only request read-only access to email metadata • No content read
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 mb-5 shadow-md">
                <ShieldCheck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Privacy First
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We only read email metadata (sender, subject, date). Never the email body.
                Ever.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 mb-5 shadow-md">
                <Brain className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI-Powered Analysis
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Claude AI acts as your "Email Therapist" to diagnose inbox overwhelm patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 mb-5 shadow-md">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                One Actionable Fix
              </h3>
              <p className="text-slate-600 leading-relaxed">
                No overwhelming lists. Just ONE specific action to improve your inbox health.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-slate-200">
          <h2 className="text-4xl font-bold text-slate-900 mb-10 text-center">
            Your Inbox Health Report
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group hover:bg-slate-50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Overall Health Score</h3>
                <p className="text-slate-600 leading-relaxed">A 0-100 score based on unread ratio, inbox diversity, and engagement patterns.</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group hover:bg-slate-50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">The 1-Click Prescription</h3>
                <p className="text-slate-600 leading-relaxed">The single most impactful action you should take right now to improve your inbox.</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group hover:bg-slate-50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Attention Vampires</h3>
                <p className="text-slate-600 leading-relaxed">Top 3 senders consuming the most volume in your inbox.</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group hover:bg-slate-50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Newsletter Graveyard</h3>
                <p className="text-slate-600 leading-relaxed">Subscriptions you constantly receive but never open.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-600">
          <p className="font-medium">Built for Hacknight Hackathon • Powered by Anthropic Claude</p>
          <p className="mt-2 text-sm text-slate-500">Read-only access • No data stored • Open source</p>
        </div>
      </div>
    </main>
  );
}
