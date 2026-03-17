# InboxAutopsy

> **Diagnose why your email inbox is overwhelming you.**

InboxAutopsy is a digital wellbeing tool that connects to your Gmail, analyzes email metadata (NOT the content), and uses AI to provide actionable insights about your inbox habits. Built for the Hacknight Hackathon.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

##  What It Does

InboxAutopsy acts as an "Email Therapist" that:
-  Connects to your Gmail account securely
-  Fetches metadata from your last 500 emails (sender, subject, date, read/unread status)
-  **Does NOT read email bodies** - Privacy First
-  Uses AI (Anthropic Claude) to analyze your email patterns
-  Generates an "Inbox Health Report" with ONE actionable fix
-  Shows "Attention Vampires" (top senders consuming your time)
-  Reveals your "Newsletter Graveyard" (subscriptions you never read)

##  Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React
- **Authentication:** NextAuth.js v4 with Google OAuth
- **Gmail API:** `gmail.readonly` scope
- **AI:** Anthropic Claude API
- **Date Utilities:** date-fns

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account (for production)
- Anthropic API key (get one at https://console.anthropic.com)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
# Copy the example file
cp .env.local.example .env.local
```

3. **Edit `.env.local` with your credentials:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ANTHROPIC_API_KEY=your-anthropic-api-key
NEXT_PUBLIC_MOCK_MODE=false
```

4. **Generate a NextAuth secret:**
```bash
openssl rand -base64 32
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Gmail API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application** as the application type
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret** to your `.env.local` file

## 📁 Project Structure

```
inboxautopsy/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth configuration
│   │   ├── emails/                  # Gmail metadata fetching
│   │   └── analyze/                 # AI analysis endpoint
│   ├── dashboard/                   # Main dashboard page
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
├── components/
│   └── ui/                          # Shadcn UI components
├── lib/
│   ├── utils.ts                     # Utility functions
│   └── types.ts                     # TypeScript types
├── data/
│   └── dummy_emails.json            # Mock data for demo mode
└── public/                          # Static assets
```

##  Features

### Landing Page
- Clean, minimalist clinical design
- Clear value proposition
- "Sign in with Google" CTA

### Loading State
- Beautiful loading animation
- "Running diagnostics on your inbox habits..." message

### Dashboard
- **Health Score:** Overall inbox wellness score (0-100)
- **1-Click Prescription:** The most important action to take right now
- **Attention Vampires:** Top 3 senders taking up the most volume
- **Newsletter Graveyard:** Subscriptions you receive but never open

##  Privacy & Security

-  Only reads email **metadata** (no email bodies)
-  Uses `gmail.readonly` scope (cannot send or delete emails)
-  Secure OAuth 2.0 authentication
-  No data stored permanently (session-based)
-  Open source - verify the code yourself

##  Development

### Build for production:
```bash
npm run build
npm run start
```

### Lint code:
```bash
npm run lint
```

##  Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Your app URL (http://localhost:3000) | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth sessions | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes (unless Mock Mode) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes (unless Mock Mode) |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | Yes |
| `NEXT_PUBLIC_MOCK_MODE` | Enable demo mode (true/false) | No (default: false) |

##  License

MIT License - feel free to use this project for your own hackathons or learning!

##  Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- AI powered by [Anthropic Claude](https://www.anthropic.com)
- Icons from [Lucide](https://lucide.dev)

##  Troubleshooting

### "Error: Invalid redirect_uri"
Make sure your Google Cloud Console redirect URI exactly matches: `http://localhost:3000/api/auth/callback/google`

### "NEXTAUTH_SECRET not set"
Run `openssl rand -base64 32` and add the output to your `.env.local` file

### Mock Mode not working
Ensure `NEXT_PUBLIC_MOCK_MODE=true` is set in `.env.local` and restart the dev server

---
