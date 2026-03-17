"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InboxHealthReport } from "@/lib/types";
import LoadingState from "@/components/loading-state";
import DashboardView from "@/components/dashboard-view";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [report, setReport] = useState<InboxHealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  useEffect(() => {
    // Redirect to home if not authenticated (unless in mock mode)
    if (!isMockMode && status === "unauthenticated") {
      router.push("/");
      return;
    }

    // Only proceed if authenticated or in mock mode
    if (isMockMode || status === "authenticated") {
      fetchAndAnalyze();
    }
  }, [status, isMockMode]);

  const fetchAndAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Fetch emails
      const emailsResponse = await fetch("/api/emails");
      if (!emailsResponse.ok) {
        throw new Error("Failed to fetch emails");
      }

      const emailsData = await emailsResponse.json();
      console.log(`📧 Fetched ${emailsData.count} emails`);

      // Step 2: Analyze with AI
      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: emailsData.emails }),
      });

      if (!analyzeResponse.ok) {
        throw new Error("Failed to analyze emails");
      }

      const analyzeData = await analyzeResponse.json();
      setReport(analyzeData.report);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-slate-700 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return <DashboardView report={report} />;
}
