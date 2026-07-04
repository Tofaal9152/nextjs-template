# Next.js Template (App Router + Turbopack)

A production-ready **Next.js 15+ App Router** starter with a **feature-based modular architecture**.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript — path alias `@/` → `src/` |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Data Fetching | TanStack React Query v5 |
| Forms | TanStack Form v1 + Zod |
| HTTP | Axios via typed `request` wrapper |
| Toasts | Sonner |
| Auth/Session | `jose` (JWT in encrypted cookies) |
| Table | TanStack React Table v8 |

---

## Prerequisites

- **Node.js** LTS
- **npm**

---

## Setup

### 1. Install dependencies

```bash
npm i
```

### 2. Create `.env`

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

```env
NODE_ENV=development # only in development mode
BACKEND_URL=http://localhost:8000
SESSION_SECRET_KEY=your-secret-key
SESSION_COOKIE_NAME=session
SESSION_MAX_AGE_DAYS=7
PORT=3000
```

### 3. Run

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

### Other commands

```bash
npm run lint
npm run typecheck
npm run typecheck:watch
```

---

## Docker

```bash
# Build & start
docker compose up --build -d

# Stop
docker compose down

# Logs
docker compose logs -f

# See running containers
docker ps
```

Image name and container name are set in `docker-compose.yml` under `image:` and `container_name:`.

---

## Project Structure

```
src/
├── app/                        # Thin route wrappers only — no logic here
│   ├── (auth)/                 # Unauthenticated routes (signin, forgot-password)
│   ├── (marketing)/            # Public routes
│   └── (protected)/            # Authenticated routes (dashboard)
│
├── features/                   # ALL business logic lives here
│   └── [feature]/
│       ├── components/         # Shared UI for this feature
│       ├── pages/
│       │   └── [page]/
│       │       ├── actions/    # Server Actions (auth pages only)
│       │       ├── components/ # Page-specific components
│       │       ├── queries/    # useFetchData + useMutationHandler hooks
│       │       ├── schemas/    # Zod schemas
│       │       └── index.tsx   # Page entry point
│       ├── types/
│       └── utils/
│
├── components/
│   ├── layout/                 # footer/, navbar/, sidebar/
│   ├── shared/                 # DataTable, Pagination, DeleteMutation, AsyncStateWrapper, form-related/
│   └── ui/                     # shadcn/ui — DO NOT MODIFY
│
├── hooks/                      # use-fetch-data, use-mutation-handler, use-zod-tanstack-form, use-search, use-debounced-callback
├── lib/http/                   # api-client, api-server, public-api-client, request, make-endpoint
├── providers/                  # app-providers, query-provider, theme-provider
├── types/                      # crud.type, dynamic-route-id-params.type, query.type
├── utils/                      # validate-form, error-handle, form-errors, date-format, get-error-message
└── services/                   # upload-file.service
```

**Rule:** `app/` page files are single-line wrappers only:

```tsx
import XIndex from "@/features/x/pages/x-list";
export default () => <XIndex />;
```

---

## Coding Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Files & folders | kebab-case | `use-fetch-data.ts`, `blog-table.tsx` |
| Components | PascalCase | `function BlogForm()` |
| Hooks | camelCase + `use` prefix | `useFetchData` |
| Query key constants | SCREAMING_SNAKE_CASE | `BLOG_LIST_QUERY_KEY` |
| Types/Interfaces | PascalCase | `type BlogData` |
| Server Actions | PascalCase + `Action` suffix | `SignInAction` |
| Zod schemas | PascalCase + `Schema` suffix | `BlogSchema` |
| Next.js special files | unchanged | `page.tsx`, `layout.tsx` |

- Add `"use client"` to any file using hooks, browser APIs, or event handlers
- Omit `"use client"` on server components and layouts that only fetch session

---

## API Clients

| Client | File | When to use |
|--------|------|-------------|
| `apiClient` | `lib/http/api-client.ts` | Client-side authenticated requests |
| `apiServer` | `lib/http/api-server.ts` | Server-side authenticated (RSC, Server Actions) |
| `publicApiClient` | `lib/http/public-api-client.ts` | Unauthenticated requests |

- **Never call Axios directly** — always use `request.get / post / put / patch / delete / postFormData`
- `apiClient` auto-attaches `Authorization: Bearer <token>` from session
- `apiClient` auto-calls `destroySession()` on 401 response
- Build query strings with `makeEndpoint(baseUrl, paramsObj)` — skips `null` / `undefined` / `""` automatically

---

## Data Fetching

Always use `useFetchData` — never call `useQuery` directly:

```ts
// queries/use-blog-list.ts
export const BLOG_LIST_QUERY_KEY = "blog-list";

export function useBlogList(params: BlogListParams) {
  return useFetchData<BlogListResponse>({
    url: makeEndpoint("/api/blogs/", params),
    querykey: [BLOG_LIST_QUERY_KEY, params],
  });
}
```

**Query defaults** (set in `providers/query-provider.tsx`):
- `staleTime`: 60s
- `gcTime`: 10m
- No refetch on window focus or reconnect
- No retry on 400 / 401 / 403 / 404

---

## Mutations

Always use `useMutationHandler` — never call `useMutation` directly:

```ts
// queries/use-create-blog.ts
export function useCreateBlog() {
  return useMutationHandler({
    mutationFn: (data: CreateBlogData) => request.post("/api/blogs/", data),
    invalidateKeys: [[BLOG_LIST_QUERY_KEY]],
    successMessage: "Blog created successfully",
    debugLabel: "create-blog",
  });
}
```

- Success: `toast()` with `icon: "✅"` at `top-center`
- Error: `toast.error()` with `icon: "❌"` at `top-center`
- `invalidateKeys` triggers automatic refetch after success

---

## Table Pattern

Columns go in a separate file, table component manages state:

```
components/
├── blog-column.tsx      # ColumnDef<BlogData>[]
└── blog-table.tsx       # state + DataTable + Pagination
```

```tsx
// blog-table.tsx
<DataTable data={data} columns={columns} loading={isLoading} error={error} />
<Pagination page={page} total={data?.count} onPageChange={setPage} />
```

- `total` is the raw item count — `Pagination` divides by 10 internally
- Search/filter state lives as `useState` inside the table component, passed into the query params

---

## Form Pattern

### Pattern A — TanStack Form + Zod (all mutation forms)

```tsx
// schemas/create-blog.schema.ts
export const CreateBlogSchema = z.object({ title: z.string().min(1) });
export type CreateBlogData = z.infer<typeof CreateBlogSchema>;

// components/create-blog-form.tsx
const { form, submitErrors } = useZodTanstackForm({
  defaultValues: { title: "" },
  schema: CreateBlogSchema,
  mutation: createBlogMutation,
  fieldLabels: { title: "Title" },
});

<form.Field name="title">
  {(field) => (
    <FormFieldWrapper field={field} label="Title">
      {(p) => <Input {...p.inputProps} />}
    </FormFieldWrapper>
  )}
</form.Field>
<SubmitErrorSummary errors={submitErrors} />
<SubmitButton isLoading={createBlogMutation.isPending}>Create</SubmitButton>
```

- Use `p.onChangeValue(val)` for non-native inputs (Select, Checkbox, etc.)

### Pattern B — Server Actions + `useActionState` (auth pages only)

Used only for signin, forgot-password, reset-password. The server action:
1. Validates with `validateForm(Schema, formData)`
2. Calls API via `apiServer`
3. Calls `CreateSession()` on success
4. Returns `{ success, errors }`

---

## Adding a New Page (checklist)

1. Create `src/features/[domain]/pages/[page]/` with subfolders: `components/`, `queries/`, `schemas/`
2. `queries/use-[resource].ts` — export `QUERY_KEY` constant + `useFetchData` hook
3. `components/[resource]-column.tsx` — export `ColumnDef<T>[]`
4. `components/[resource]-table.tsx` — manage `page`/`search` state, render `<DataTable>` + `<Pagination>`
5. `index.tsx` — page entry point
6. `app/(protected)/dashboard/.../page.tsx` — single-line wrapper
7. Add nav item to `[role]-sidebar-nav-items.ts`

---

## Adding a New API Call

```ts
// GET
useFetchData<ResponseType>({ url: makeEndpoint("/path/", params), querykey: [KEY, params] })

// POST / PUT / PATCH
useMutationHandler({ mutationFn: (data) => request.post("/path/", data), invalidateKeys: [[KEY]], successMessage, debugLabel })

// DELETE
useMutationHandler({ mutationFn: () => request.delete("/path/id/"), invalidateKeys: [[KEY]], successMessage, debugLabel })

// File upload
useMutationHandler({ mutationFn: (formData) => request.postFormData("/path/", formData), ... })

// Server Action (auth only)
// validateForm → apiServer call → CreateSession → return { success, errors }
```
OPENAI_API_KEY=sk-proj-YWNIuP0_afgvTOFAALMV0T1PH-MXiM8TFwnI3z0ARR0hGdGbJMXZIap1kub2v4JSvGvAVEcYqybEYs-YT3BlbkFJ298g0d7X0-uTGOOKjgS0lc5mkXp7nmREtbhxgmRWls7pW8uSDIXp7lYGCAlgkdkyJuEWeQwPIA
