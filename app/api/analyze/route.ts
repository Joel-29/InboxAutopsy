import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { EmailMetadata, InboxHealthReport } from "@/lib/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// The Email Therapist System Prompt
const EMAIL_THERAPIST_PROMPT = `You are an "Email Therapist" - a digital wellbeing expert who diagnoses inbox overwhelm.

You will receive a JSON array of email metadata (NOT the email bodies - privacy first). Each email contains: sender, subject, date, and read/unread status.

Your task is to analyze the user's email patterns and generate an "Inbox Health Report" with:

1. **Health Score (0-100)**: Based on:
   - Unread email ratio (lower is better)
   - Inbox diversity (too many repeated senders = lower score)
   - Newsletter engagement (receiving but not reading = lower score)
   - Recent activity patterns

2. **The 1-Click Prescription**: Identify THE SINGLE MOST IMPACTFUL action they should take RIGHT NOW.
   - Must be specific (e.g., "You ignored 14 emails from Swiggy this week")
   - Must be actionable (e.g., "Unsubscribe from Swiggy notifications")
   - Focus on the biggest pain point

3. **Attention Vampires**: Top 3 senders consuming the most inbox volume
   - Show sender name/domain
   - Show email count
   - Show percentage of total inbox

4. **Newsletter Graveyard**: Top 3 subscriptions they receive but NEVER open
   - Must have at least 5 emails from same sender
   - Must have 80%+ unread rate
   - Show total received vs unopened count

CRITICAL RULES:
- Be empathetic but direct (like a therapist)
- Use casual, friendly language (avoid corporate jargon)
- Focus on ONE actionable fix, not a dozen suggestions
- Base insights on DATA, not assumptions
- If the inbox looks healthy, say so! Don't invent problems.

Return ONLY valid JSON in this exact format:
{
  "healthScore": 45,
  "prescription": {
    "title": "You're drowning in food delivery spam",
    "description": "You received 23 emails from Swiggy and Zomato this week but only opened 2 of them. These promotional emails are cluttering your inbox without providing value.",
    "action": "Unsubscribe from Swiggy and Zomato marketing emails",
    "actionUrl": ""
  },
  "attentionVampires": [
    { "sender": "noreply@swiggy.com", "count": 14, "percentage": 7.0 },
    { "sender": "updates@zomato.com", "count": 12, "percentage": 6.0 },
    { "sender": "noreply@linkedin.com", "count": 8, "percentage": 4.0 }
  ],
  "newsletterGraveyard": [
    { "sender": "newsletter@medium.com", "totalReceived": 15, "unopenedCount": 15, "unopenedPercentage": 100 },
    { "sender": "newsletter@hackernews.com", "totalReceived": 12, "unopenedCount": 11, "unopenedPercentage": 92 },
    { "sender": "deals@amazon.in", "totalReceived": 18, "unopenedCount": 16, "unopenedPercentage": 89 }
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const emails: EmailMetadata[] = body.emails;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No emails provided" },
        { status: 400 }
      );
    }

    console.log(`🤖 Analyzing ${emails.length} emails with Claude...`);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: `${EMAIL_THERAPIST_PROMPT}\n\nHere is the email metadata to analyze:\n\n${JSON.stringify(emails, null, 2)}`,
        },
      ],
    });

    // Extract the response
    const responseText = message.content[0].type === "text"
      ? message.content[0].text
      : "";

    // Parse JSON response
    let report: InboxHealthReport;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      report = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", responseText);
      throw new Error("Invalid JSON response from AI");
    }

    console.log("✅ Analysis complete. Health Score:", report.healthScore);

    return NextResponse.json({
      success: true,
      report: report,
    });
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze emails",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
