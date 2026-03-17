import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchEmailMetadata } from "@/lib/gmail";

export async function GET() {
  try {
    // Check if Mock Mode is enabled
    const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

    if (isMockMode) {
      // Return mock data directly
      const mockEmails = await fetchEmailMetadata();
      return NextResponse.json({
        success: true,
        count: mockEmails.length,
        emails: mockEmails,
        mockMode: true,
      });
    }

    // Get session for real Gmail access
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in with Google" },
        { status: 401 }
      );
    }

    // Fetch emails from Gmail
    const emails = await fetchEmailMetadata(session.accessToken, 500);

    return NextResponse.json({
      success: true,
      count: emails.length,
      emails: emails,
      mockMode: false,
    });
  } catch (error) {
    console.error("Error in /api/emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails", details: String(error) },
      { status: 500 }
    );
  }
}
