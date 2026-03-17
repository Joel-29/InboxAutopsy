// Email metadata interface
export interface EmailMetadata {
  id: string;
  from: string;
  subject: string;
  date: string;
  isRead: boolean;
}

// Inbox health report from AI
export interface InboxHealthReport {
  healthScore: number;
  prescription: {
    title: string;
    description: string;
    action: string;
    actionUrl?: string;
  };
  attentionVampires: {
    sender: string;
    count: number;
    percentage: number;
  }[];
  newsletterGraveyard: {
    sender: string;
    totalReceived: number;
    unopenedCount: number;
    unopenedPercentage: number;
  }[];
}

// Session user type
export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
