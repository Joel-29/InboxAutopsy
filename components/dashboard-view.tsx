"use client";

import { InboxHealthReport } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Zap,
  Mail,
  Ghost,
  ArrowLeft,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Target,
  RotateCw
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardViewProps {
  report: InboxHealthReport;
}

export default function DashboardView({ report }: DashboardViewProps) {
  const router = useRouter();

  const getHealthColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 70) return "bg-gradient-to-br from-green-50 to-emerald-100";
    if (score >= 40) return "bg-gradient-to-br from-amber-50 to-yellow-100";
    return "bg-gradient-to-br from-red-50 to-rose-100";
  };

  const getHealthBorder = (score: number) => {
    if (score >= 70) return "border-green-300";
    if (score >= 40) return "border-amber-300";
    return "border-red-300";
  };

  const getHealthStatus = (score: number) => {
    if (score >= 70) return "Healthy";
    if (score >= 40) return "Needs Attention";
    return "Critical";
  };

  const getHealthIcon = (score: number) => {
    if (score >= 70) return <CheckCircle2 className="w-8 h-8 text-green-600" />;
    if (score >= 40) return <AlertTriangle className="w-8 h-8 text-amber-600" />;
    return <AlertTriangle className="w-8 h-8 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <Mail className="w-10 h-10 text-blue-600" />
              Inbox Health Report
            </h1>
            <p className="text-slate-600">Your personalized email wellness diagnosis</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <RotateCw className="w-4 h-4" />
              Re-analyze
            </Button>
          </div>
        </div>

        {/* Health Score Card */}
        <Card className={`mb-8 border-2 ${getHealthBorder(report.healthScore)} shadow-xl`}>
          <CardContent className={`pt-8 ${getHealthBgColor(report.healthScore)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white rounded-full shadow-lg">
                  {getHealthIcon(report.healthScore)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    Overall Health Score
                  </h3>
                  <p className={`text-lg font-semibold ${getHealthColor(report.healthScore)}`}>
                    {getHealthStatus(report.healthScore)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-7xl font-bold ${getHealthColor(report.healthScore)}`}>
                  {report.healthScore}
                </div>
                <p className="text-slate-600 font-medium">out of 100</p>
              </div>
            </div>
            <div className="mt-6">
              <Progress
                value={report.healthScore}
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* The 1-Click Prescription */}
        <Card className="mb-8 bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-2xl border-0">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <CardTitle className="text-3xl">Your 1-Click Prescription</CardTitle>
            </div>
            <CardDescription className="text-purple-100 text-lg">
              The single most impactful action you can take right now
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-bold mb-3">
              {report.prescription.title}
            </h3>
            <p className="text-purple-50 text-lg leading-relaxed">
              {report.prescription.description}
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 font-semibold text-lg px-8 py-6 shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                {report.prescription.action}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Attention Vampires */}
          <Card className="shadow-xl border-2 border-red-200 hover:shadow-2xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-900">Attention Vampires</CardTitle>
                  <CardDescription className="text-red-700">
                    Top senders consuming your inbox
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {report.attentionVampires.map((vampire, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="destructive"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-base font-bold"
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-semibold text-slate-900 truncate max-w-xs">
                            {vampire.sender}
                          </p>
                          <p className="text-sm text-slate-600">
                            {vampire.count} emails · {vampire.percentage.toFixed(1)}% of inbox
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={vampire.percentage}
                      className="h-2 bg-red-100"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Graveyard */}
          <Card className="shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Ghost className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-amber-900">Newsletter Graveyard</CardTitle>
                  <CardDescription className="text-amber-700">
                    Subscriptions you never open
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {report.newsletterGraveyard.length > 0 ? (
                  report.newsletterGraveyard.map((newsletter, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge
                            className="w-8 h-8 rounded-full flex items-center justify-center text-base font-bold bg-amber-500"
                          >
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="font-semibold text-slate-900 truncate max-w-xs">
                              {newsletter.sender}
                            </p>
                            <p className="text-sm text-slate-600">
                              {newsletter.unopenedCount} of {newsletter.totalReceived} unread
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-amber-400 text-amber-700 font-bold">
                          {newsletter.unopenedPercentage}%
                        </Badge>
                      </div>
                      <Progress
                        value={newsletter.unopenedPercentage}
                        className="h-2 bg-amber-100"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Ghost className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No newsletter graveyard found!</p>
                    <p className="text-sm">You're reading your subscriptions.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        <Card className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <p className="text-3xl font-bold">{report.attentionVampires.reduce((acc, v) => acc + v.count, 0)}</p>
                <p className="text-slate-400 text-sm">Total from top senders</p>
              </div>
              <Separator orientation="vertical" className="h-16 bg-slate-700" />
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-3xl font-bold">
                  {report.newsletterGraveyard.reduce((acc, n) => acc + n.totalReceived, 0)}
                </p>
                <p className="text-slate-400 text-sm">Newsletter emails</p>
              </div>
              <Separator orientation="vertical" className="h-16 bg-slate-700" />
              <div className="text-center">
                <TrendingDown className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-3xl font-bold">
                  {report.newsletterGraveyard.reduce((acc, n) => acc + n.unopenedCount, 0)}
                </p>
                <p className="text-slate-400 text-sm">Unread newsletters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>🔒 Privacy-First: Only metadata analyzed • No email bodies read • No data stored</p>
        </div>
      </div>
    </div>
  );
}
