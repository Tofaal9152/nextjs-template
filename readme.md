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
NEXTJS-TEMPLATE/
├── public/
│   ├── images/
│   └── icons/
│
├── middleware.ts                 # (optional) auth/protected gating
├── next.config.js
├── package.json
├── tsconfig.json
├── .env.example
└── src/
   ├── app/                       # App Router (routing only)
   │  ├── (marketing)/
   │  │  ├── layout.tsx
   │  │  ├── page.tsx             # home (or (home)/page.tsx if you prefer)
   │  │  └── blog/
   │  │     ├── page.tsx          # /blog
   │  │     └── [slugId]/
   │  │        ├── page.tsx       # /blog/[slugId]
   │  │        ├── loading.tsx
   │  │        └── not-found.tsx
   │  │
   │  ├── (auth)/
   │  │  ├── layout.tsx
   │  │  ├── signin/page.tsx
   │  │  ├── forget-password/page.tsx
   │  │  ├── verify-email/page.tsx
   │  │  ├── email/confirm/[token]/page.tsx
   │  │  └── password/reset/confirm/[uid]/[token]/page.tsx
   │  │
   │  ├── (protected)/
   │  │  ├── layout.tsx           # sidebar/topbar shell
   │  │  ├── dashboard/
   │  │  │  ├── admin/page.tsx
   │  │  │  └── student/page.tsx
   │  │  └── profile/page.tsx
   │  │
   │  ├── api/
   │  │  └── create-session/
   │  │     └── route.ts
   │  │
   │  ├── layout.tsx
   │  ├── globals.css
   │  └── not-found.tsx
   │
   ├── components/                # reusable shared components
   │  ├── ui/                      # design system components
   │  ├── layout/
   │  │  ├── Navbar/
   │  │  ├── Footer/
   │  │  └── dashboard/
   │  │     └── AppSidebar/
   │  └── shared/
   │     └── form-related/
   │
   ├── features/                  # business modules (main maintainable layer)
   │  ├── blog/
   │  │  ├── ui/
   │  │  │  ├── BlogIndexRoute.tsx     # for /blog
   │  │  │  └── BlogSlugRoute.tsx      # for /blog/[slugId]
   │  │  ├
   │  │  │  
   │  │  ├── services/
   │  │  │  └── blog.service.ts
   │  │  ├── schemas/
   │  │  │  └── blog.schema.ts
   │  │  ├── types.ts
   │  │  └── index.ts
   │  │
   │  ├── auth/
   │  │  ├── ui/
   │  │  │  ├── SignInRoute.tsx
   │  │  │  ├── ForgetPasswordRoute.tsx
   │  │  │  └── ResetPasswordRoute.tsx
   │  │  ├
   │  │  │  
   │  │  ├── services/
   │  │  │  └── auth.service.ts
   │  │  ├── schemas/
   │  │  │  ├── signin.schema.ts
   │  │  │  ├── forget-password.schema.ts
   │  │  │  └── reset-password.schema.ts
   │  │  ├── types.ts
   │  │  └── index.ts
   │  │
   │  └── protected/
   │     ├── dashboard/
   │     │  ├── admin/
   │     │  │  ├── ui/AdminDashboardRoute.tsx
   │     │  │  ├
   │     │  │  └
   │     │  └── student/
   │     │     ├── ui/StudentDashboardRoute.tsx
   │     │     ├
   │     │     └── services/student.service.ts
   │     └── profile/
   │        ├── ui/ProfileRoute.tsx
   │        ├
   │        └── services/profile.service.ts
   │
   ├── lib/
   │  ├── http/
   │  │  ├── apiClient.ts            # fetch/axios wrapper, interceptors
   │  │  ├── apiServer.ts            # fetch/axios wrapper, interceptors
   │  │  ├── publicServer.ts         
   │  │  ├── request.ts             
   │  │  ├── errors.ts
   │  │  
   │  ├── env.ts                  # zod env validation (optional)
   │  └── utils.ts
   │
   ├── hooks/
   ├── providers/
   ├── constants/
   ├── store/                     # if redux/zustand needed
   ├── types/                     # ONLY truly global cross-feature types
   └── utils/
```


