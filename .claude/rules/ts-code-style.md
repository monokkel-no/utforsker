---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Code Style

Formatting is handled by Biome: 2-space indentation, 120-char line width, double quotes.

## Types

- Use `interface` for object shapes that may be extended; `type` for unions, intersections, and mapped types
- Avoid `any` — use `unknown` and narrow with type guards
- Avoid type assertions (`as Foo`) except at system boundaries (e.g. parsing external JSON); prefer type guards
- Avoid non-null assertions (`!`) — use guard clauses instead
- Use `satisfies` to validate a value against a type without widening it
- Avoid `enum` — use `as const` objects or string union literals instead:
  ```ts
  const Direction = { Up: "up", Down: "down" } as const;
  type Direction = (typeof Direction)[keyof typeof Direction];
  ```
- Use `as const` for readonly literal values
- Use discriminated unions for exhaustive pattern matching

## Naming

- `PascalCase` for types, interfaces, and React components
- `camelCase` for variables, functions, and methods
- Avoid `UPPER_SNAKE_CASE` for constants
- Boolean vars: `is*`, `has*`, `can*`, `should*`
- Event handlers: `handle*` (e.g. `handleSubmit`, `handleKeyDown`)
- No abbreviations — `event` not `e`, `index` not `idx`, `message` not `msg`

## Functions

- Prefer `const` arrow functions over `function` declarations
- Let TypeScript infer return types; only annotate for public APIs or when inference is wrong
- Use guard clauses and early returns to reduce nesting:
  ```ts
  // ✅
  const process = (value: string | null) => {
    if (!value) return null;
    return value.trim();
  };
  ```
- Keep functions under 20 lines; extract complex logic to separate functions

## Imports & Exports

- Prefer named exports over default exports — easier to rename and grep
- Exception: route files in `apps/web/src/routes/` require a default export per framework convention
- Group imports and sort alphabetically within groups: built-ins → third-party → `@repo/*` → relative

## Modern JavaScript

- Use `?.` and `??` over `&&` / `||` guards for null/undefined checks
- Use destructuring for function parameters and object properties
- Prefer array methods (`map`, `filter`, `find`, `reduce`) over `for` loops
- Use `structuredClone` to copy objects/arrays, not `JSON.parse(JSON.stringify(...))`
- Use template literals over string concatenation

## Comments

- Avoid comments unless explaining non-obvious business logic
- No JSDoc comments
- Remove commented-out code

## Testing

- Use `data-testid` for elements targeted in tests
- Test behavior and user interactions, not implementation details
