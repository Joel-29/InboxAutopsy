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
  Users,
  MailX,
  ArrowLeft,
  TrendingDown,
  AlertTriangle
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardViewProps {
  report: InboxHealthReport;
}

export default function DashboardView({ report }: DashboardViewProps) {
  const router = useRouter();

  // Determine health color
  const getHealthColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 70) return "bg-green-50 border-green-200";
    if (score >= 40) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 70) return "Healthy";
    if (score >= 40) return "Needs Attention";
    return "Critical";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Inbox Health Report
            </h1>
            <p className="text-slate-600">
              Your personalized email wellness diagnosis
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>
        </div>

        {/* Health Score Section */}
        <Card className={`mb-8 border-2 ${getHealthBgColor(report.healthScore)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Overall Inbox Health
                </CardTitle>
                <CardDescription>
                  Based on 200 emails analyzed
                </CardDescription>
              </div>
              <Badge
                variant={report.healthScore >= 70 ? "default" : "destructive"}
                className="text-lg px-4 py-2"
              >
                {getHealthLabel(report.healthScore)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className={`text-7xl font-bold ${getHealthColor(report.healthScore)}`}>
                  {report.healthScore}
                </div>
                <div className="text-sm text-slate-500 text-center mt-1">
                  out of 100
                </div>
              </div>
              <div className="flex-1">
                <Progress
                  value={report.healthScore}
                  className="h-4 mb-2"
                />
                <p className="text-sm text-slate-600">
                  {report.healthScore >= 70 && "Your inbox is in good shape! Keep up the healthy habits."}
                  {report.healthScore >= 40 && report.healthScore < 70 && "Your inbox could use some attention. Follow the prescription below."}
                  {report.healthScore < 40 && "Your inbox needs urgent care. Time to take action!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The 1-Click Prescription */}
        <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-purple-900">
              <Zap className="w-6 h-6" />
              The 1-Click Prescription
            </CardTitle>
            <CardDescription className="text-purple-700">
              Your most impactful action right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {report.prescription.title}
              </h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                {report.prescription.description}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {report.prescription.action}
                </Button>
                <span className="text-sm text-slate-500">
                  Recommended action
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Attention Vampires */}
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <Users className="w-5 h-5" />
                Attention Vampires
              </CardTitle>
              <CardDescription>
                Top senders consuming your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.attentionVampires.map((vampire, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`
                          flex items-center justify-center w-8 h-8 rounded-full
                          ${index === 0 ? 'bg-red-600 text-white' :
                            index === 1 ? 'bg-red-500 text-white' :
                            'bg-red-400 text-white'}
                          font-bold text-sm
                        `}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm">
                            {vampire.sender}
                          </div>
                          <div className="text-xs text-slate-500">
                            {vampire.count} emails
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {vampire.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={vampire.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Graveyard */}
          <Card className="border-2 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <MailX className="w-5 h-5" />
                Newsletter Graveyard
              </CardTitle>
              <CardDescription>
                Subscriptions you never open
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.newsletterGraveyard.map((newsletter, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-amber-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm mb-1">
                          {newsletter.sender}
                        </div>
                        <div className="text-xs text-slate-600">
                          {newsletter.unopenedCount} of {newsletter.totalReceived} unread
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-700">
                        <TrendingDown className="w-4 h-4" />
                        <span className="font-bold text-sm">
                          {newsletter.unopenedPercentage}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={newsletter.unopenedPercentage}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Ready to take action?
                  </h3>
                  <p className="text-sm text-slate-600">
                    Start with the prescription above and watch your inbox health improve
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Re-analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Anthropic Claude AI • Privacy-first email analysis</p>
        </div>
      </div>
    </main>
  );
}
