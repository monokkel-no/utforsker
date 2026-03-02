---
paths:
  - "apps/web/src/routes/**/*.ts"
  - "apps/web/src/routes/**/*.tsx"
---

# TanStack Router & Server Functions

## File-based routing

- Filename = URL segment. `$paramName.tsx` → dynamic param; `courses.$.tsx` → splat route
- Every route file must have a default export (the route component)
- `routeTree.gen.ts` is auto-generated on every Vite save — never edit it manually
- The `-api/` directory prefix hides files from the router; use it for server functions only

## Route files

Create the route object at the top of the file:
```tsx
export const Route = createFileRoute("/$userRole/courses/$")({
  component: MyPage,
  loader: async ({ params }) => fetchSomething(params._splat),
});
```

- Access loader data: `const data = Route.useLoaderData()`
- Access params: `const { _splat } = Route.useParams()` (splat param is always `_splat`)
- Access dynamic segments: `const { userRole } = Route.useParams()`

## Server functions

Defined in `-api/*.ts` with `createServerFn`:
```typescript
export interface MyFnOptions { field: string }

export const myFn = createServerFn({ method: "POST" })
  .inputValidator((data: MyFnOptions) => data)
  .handler(async ({ data }) => {
    // runs server-side only: fs, process.env, AI calls
    return result;
  });
```

Call from the client:
```typescript
const result = await myFn({ data: { field: "value" } as never });
```

- `GET` functions take no input; omit `.inputValidator()`
- Always export an interface for the input type
- Path traversal and other security checks go inside `.handler()` — `inputValidator` only types the input
