# Next.js Template (App Router + Turbopack)

A production-ready **Next.js App Router** starter with a **feature-based modular architecture**.  
Uses **Turbopack** for fast dev/build and supports running on a custom **`PORT` from `.env`** — **no `next.config.js` changes needed**.

---

## Tech Stack

- **Next.js** (App Router)
- **Turbopack** (dev/build)
- **TypeScript**
- **ESLint**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack React Form**
- **TanStack Query**

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** (or **pnpm**)

---

## Environment Setup

### 1) Create `.env`

Create a `.env` file in the project root (same level as `package.json`):

```env
PORT=5001
```

> Use `.env.example` for sample variables and keep real secrets out of Git.

---

## Installation

```bash
npm i
```


### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Start (Production)

```bash
npm run start
```

✅ The server will start using the port from `.env` (example: `http://localhost:5001`).

---

## Helpful Commands

- **Lint**
  ```bash
  npm run lint
  ```
- **Typecheck**
  ```bash
  npm run typecheck
  ```
- **Typecheck (watch)**
  ```bash
  npm run typecheck:watch
  ```

---

## Project Structure

```txt
.
├── public/
│   └── images/                # Static assets (images, icons, etc.)
│
└── src/
    ├── app/                   # Next.js App Router
    │   ├── (marketing)/       # Public marketing routes
    │   │   ├── (home)/        # Home page group
    │   │   └── blog/
    │   │       └── [slugId]/  # Dynamic blog details page
    │   │
    │   ├── (protected)/       # Protected routes (requires auth)
    │   │   ├── dashboard/
    │   │   │   ├── admin/     # Admin dashboard
    │   │   │   └── student/   # Student dashboard
    │   │   └── profile/       # User profile
    │   │
    │   ├── api/               # API route handlers
    │   │   └── create-session/
    │   │
    │   └── auth/              # Authentication routes
    │       ├── (confirm-email)/
    │       ├── (reset-password)/
    │       ├── forget-password/
    │       ├── signin/
    │       └── verify-email/
    │
    ├── components/            # Reusable UI & layout components
    │   ├── layout/
    │   │   ├── dashboard/
    │   │   │   └── AppSidebar/
    │   │   ├── Footer/
    │   │   └── Navbar/
    │   ├── shared/
    │   │   └── form-related/  # Shared form components
    │   └── ui/                # Base UI components (buttons, inputs, etc.)
    │
    ├── config/                # env config files
    ├── constants/             # Global constants (e.g., imagePath)
    │
    ├── features/              # Feature-based modular architecture
    │   ├── auth/
    │   │   ├── _components/
    │   │   ├── _pages/
    │   │   ├── _schemas/
    │   │   ├── _services/
    │   │   └── _types/
    │   │
    │   ├── marketting/
    │   │   ├── _components/
    │   │   ├── _pages/
    │   │   ├── _schemas/
    │   │   └── _services/
    │   │
    │   └── protected/
    │       ├── _components/
    │       ├── _pages/
    │       │   ├── dashboard/
    │       │   │   ├── admin/
    │       │   │   └── student/
    │       │   ├── profile/
    │       ├── _schemas/
    │       └── _services/
    │
    ├── hooks/                 # Custom React hooks
    ├── lib/                   # Library setups (axios, auth, etc.)
    ├── providers/             # Context providers (Theme, Auth, etc.)
    ├── services/              # Global services (API calls)
    ├── types/                 # Global TypeScript types
    └── utils/                 # Utility/helper functions
    │
    ├── .env.example           # Example env vars (committed)
    └── .env                   # Local env vars (ignored)
```


