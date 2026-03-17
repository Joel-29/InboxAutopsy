import { EmailMetadata } from "./types";
import dummyEmails from "@/data/dummy_emails.json";

/**
 * Fetch email metadata from Gmail API or mock data
 * @param accessToken - OAuth access token from NextAuth session
 * @param maxResults - Maximum number of emails to fetch (default: 500)
 * @returns Array of email metadata
 */
export async function fetchEmailMetadata(
  accessToken?: string,
  maxResults: number = 500
): Promise<EmailMetadata[]> {
  // Check if Mock Mode is enabled
  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  if (isMockMode) {
    console.log("📧 Mock Mode enabled - using dummy data");
    return dummyEmails as EmailMetadata[];
  }

  // Real Gmail API fetching
  if (!accessToken) {
    throw new Error("No access token provided and Mock Mode is disabled");
  }

  try {
    // Fetch message IDs
    const listResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!listResponse.ok) {
      throw new Error(`Gmail API error: ${listResponse.statusText}`);
    }

    const listData = await listResponse.json();
    const messageIds = listData.messages || [];

    // Fetch metadata for each message (batch process)
    const emails: EmailMetadata[] = [];

    for (const message of messageIds) {
      try {
        const messageResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!messageResponse.ok) {
          console.error(`Failed to fetch message ${message.id}`);
          continue;
        }

        const messageData = await messageResponse.json();
        const headers = messageData.payload.headers;

        // Extract header values
        const from = headers.find((h: any) => h.name === "From")?.value || "Unknown";
        const subject = headers.find((h: any) => h.name === "Subject")?.value || "(No Subject)";
        const date = headers.find((h: any) => h.name === "Date")?.value || new Date().toISOString();
        const isRead = !messageData.labelIds?.includes("UNREAD");

        emails.push({
          id: messageData.id,
          from: from,
          subject: subject,
          date: date,
          isRead: isRead,
        });
      } catch (error) {
        console.error(`Error fetching message ${message.id}:`, error);
        continue;
      }
    }

    console.log(`✅ Fetched ${emails.length} emails from Gmail API`);
    return emails;
  } catch (error) {
    console.error("Error fetching Gmail metadata:", error);
    throw error;
  }
}

/**
 * Extract sender email address from "Name <email>" format
 */
export function extractSenderEmail(from: string): string {
  const emailMatch = from.match(/<(.+?)>/);
  if (emailMatch) {
    return emailMatch[1];
  }
  return from;
}

/**
 * Extract sender domain from email address
 */
export function extractSenderDomain(email: string): string {
  const domain = email.split("@")[1];
  return domain || email;
}
