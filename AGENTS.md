CRITICAL RULES

- NEVER use axios directly
- ALWAYS use request wrapper methods
- NEVER use useQuery/useMutation directly
- ALWAYS use useFetchData/useMutationHandler
- app/ routes must stay thin wrappers only
- Business logic belongs in features/
- Prefer Server Components unless interactivity is required
- Add "use client" only when hooks/browser APIs/event handlers are used
- NEVER use "any"
- NEVER create inline query keys
- ALWAYS define query key constants
- ALWAYS use makeEndpoint() for query params
- NEVER place API calls directly inside components

---

STACK

- Next.js 15+ App Router
- TypeScript ("@/" -> "src/")
- Tailwind CSS v4
- shadcn/ui + Radix UI
- TanStack React Query v5
- TanStack Form v1
- Zod
- Axios request wrapper
- Sonner
- jose JWT auth
- TanStack React Table v8

---

ARCHITECTURE PHILOSOPHY

- app/ = routing only
- features/ = business logic
- shared components = reusable UI
- queries/ = data fetching + mutations
- schemas/ = zod validation
- actions/ = server actions
- Keep components small and composable

---

API CLIENTS

apiClient -> authenticated client-side
apiServer -> authenticated server-side
publicApiClient -> unauthenticated

Rules:

- NEVER call axios directly
- ALWAYS use request wrapper

Allowed methods:

request.get()
request.post()
request.put()
request.patch()
request.delete()
request.postFormData()

Query params:

makeEndpoint("/blogs/", params)

Behavior:

- apiClient auto attaches Bearer token
- 401 automatically destroys session

---

DATA FETCHING

NEVER:

useQuery(...)

ALWAYS:

useFetchData<T>({
  url,
  querykey,
  options,
})

Query key pattern:

export const BLOG_DETAILS_QUERY_KEY = "blog-details"

[BLOG_DETAILS_QUERY_KEY, params]

Rules:

- First key item = constant
- Second key item = params object
- NEVER inline query keys

Default query behavior:

staleTime = 60s
gcTime = 10m
no refetch on focus/reconnect
no retry on 400/401/403/404

---

MUTATIONS

NEVER:

useMutation(...)

ALWAYS:

useMutationHandler({
  mutationFn,
  invalidateKeys,
  successMessage,
  debugLabel,
})

Rules:

- debugLabel required
- invalidateKeys required when applicable
- success toast uses ✅
- error toast uses ❌
- invalidate queries after success

Examples:

useMutationHandler({
  mutationFn: (data) => request.post("/blogs/", data),
  invalidateKeys: [[BLOGS_QUERY_KEY]],
  successMessage: "Blog created",
  debugLabel: "create-blog",
})

File upload:

request.postFormData("/upload/", formData)

---

TABLE PATTERN

Use:

<DataTable />
<Pagination />

Rules:

- Columns live in separate "*-column.tsx"
- Use "ColumnDef<T>[]"
- Search/filter state stays in table component
- Pass params into query hook

Pattern:

<DataTable
  data={data}
  columns={columns}
  loading={loading}
  error={error}
/>

---

FORM PATTERN

Preferred:

TanStack Form + Zod

Use:

useZodTanstackForm({
  defaultValues,
  schema,
  mutation,
  fieldLabels,
})

Field pattern:

<form.Field name="title">
  {(field) => (
    <FormFieldWrapper field={field} label="Title">
      {(p) => <Input {...p.inputProps} />}
    </FormFieldWrapper>
  )}
</form.Field>

Rules:

- Schemas live in "schemas/"
- Export schema + inferred type
- Use SubmitErrorSummary
- Use SubmitButton

Auth pages only:

useActionState + Server Actions

---

FILE STRUCTURE

src/
├── app/
├── features/
├── components/
├── hooks/
├── lib/http/
├── providers/
├── services/
├── types/
└── utils/

Feature structure:

features/[feature]/
├── pages/
├── types/
├── utils/

Page structure:

pages/[page]/
├── actions/
├── components/
├── queries/
├── schemas/
└── index.tsx

---

APP ROUTE RULE

Page wrappers must stay thin:

import BlogIndex from "@/features/blog/pages/blog"

export default function Page() {
  return <BlogIndex />
}

---

NAMING CONVENTIONS

Files/Folders -> kebab-case
Components -> PascalCase
Hooks -> camelCase with use prefix
Query Keys -> SCREAMING_SNAKE_CASE
Schemas -> PascalCase + Schema
Server Actions -> PascalCase + Action

Examples:

use-fetch-data.ts
BlogTable.tsx
BLOGS_QUERY_KEY
BlogSchema
SignInAction

---

NEW PAGE CHECKLIST

1. Create feature page structure
2. Add queries/
3. Add schemas/
4. Add components/
5. Add query key constant
6. Add DataTable
7. Add Pagination
8. Add thin app/ wrapper
9. Add sidebar nav item

---

API PATTERNS

GET:

useFetchData<Response>({
  url: makeEndpoint("/path/", params),
  querykey: [KEY, params],
})

POST:

useMutationHandler({
  mutationFn: (data) => request.post("/path/", data),
  invalidateKeys: [[KEY]],
  debugLabel: "create-item",
})

DELETE:

useMutationHandler({
  mutationFn: () => request.delete("/path/id/"),
  invalidateKeys: [[KEY]],
  debugLabel: "delete-item",
})

---

DO NOT

- Do not use axios directly
- Do not use useQuery/useMutation directly
- Do not place business logic in app/
- Do not fetch directly inside UI components
- Do not use inline query keys
- Do not use "any"
- Do not mix server/client patterns
- Do not skip query invalidation
- Do not create giant components
- Do not duplicate API logic
