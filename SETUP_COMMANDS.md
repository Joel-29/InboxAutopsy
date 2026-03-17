# InboxAutopsy - Setup Commands

## Step 1: Initialize Next.js Project

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Install core dependencies
npm install next-auth@4.24.5
npm install @anthropic-ai/sdk
npm install lucide-react class-variance-authority clsx tailwind-merge

# Install Shadcn UI CLI and components
npx shadcn@latest init -d

# Add Shadcn components
npx shadcn@latest add button card progress badge separator

# Install additional utilities
npm install date-fns
```

## Step 2: Environment Variables

Create a `.env.local` file in the root directory with the following structure:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-generate-with-openssl

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Provider (Anthropic Claude)
ANTHROPIC_API_KEY=your-anthropic-api-key

# Alternative: OpenAI (if using OpenAI instead)
# OPENAI_API_KEY=your-openai-api-key

# Mock Mode Toggle (set to "true" for demo without OAuth)
NEXT_PUBLIC_MOCK_MODE=false
```

## Step 3: Generate NextAuth Secret

```bash
# Generate a secure secret for NextAuth
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` value.

## Google Cloud Console Setup (for production)

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

## Start Development Server

```bash
npm run dev
```

Open http://localhost:3000
