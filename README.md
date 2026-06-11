# Safe PASS — Password Manager

A personal password and card manager built with Next.js. Sign in with Clerk, then store and view saved passwords and payment cards from a single dashboard.

## Features

- **Authentication** — Sign in via Clerk; the home page is protected behind auth
- **Password vault** — Add website credentials with validation; show/hide and copy passwords
- **Card vault** — Store card number, expiry, and CVV with form validation
- **Dark mode** — System-aware theme toggle in the navbar
- **Responsive UI** — Two-column layout on desktop, stacked on mobile

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Framework | Next.js 16, React 19, TypeScript |
| Auth | Clerk (`@clerk/nextjs` v7) |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Lucide icons |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Notifications | react-hot-toast |

## Project Structure

```
Password_Manager/
├── package.json          # Root scripts (delegates to safe-pass)
└── safe-pass/            # Next.js application
    ├── app/              # App Router pages and layout
    ├── actions/          # Server actions (save passwords & cards)
    ├── components/       # UI and feature components
    └── proxy.ts          # Clerk auth proxy (Next.js 16)
```

User data (passwords and cards) is stored in **Clerk private metadata** on the authenticated user.

## Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later
- A [Clerk](https://clerk.com/) application with API keys

## Getting Started

### 1. Install dependencies

From the repository root:

```bash
cd safe-pass
npm install
```

Or install from the root after cloning (scripts forward to `safe-pass`):

```bash
npm install --prefix safe-pass
```

### 2. Configure environment variables

Create `safe-pass/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Get your keys from the [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys).

### 3. Run the development server

From the repository root:

```bash
npm run dev
```

Or from `safe-pass`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be prompted to sign in before accessing the dashboard.

## Scripts

Run these from the **repository root** or use the same commands inside `safe-pass`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

Build and deploy the `safe-pass` app (for example on [Vercel](https://vercel.com)).

**Vercel settings:**

- **Root Directory:** `safe-pass`
- **Package manager:** npm (use `package-lock.json`; do not commit `pnpm-lock.yaml`)
- **Environment variables:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## License

Private project.
