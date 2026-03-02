---
paths:
  - "**/*.tsx"
---

# React Code Style

## Components

- Use implicit returns for simple components: `const Foo = () => <div />`
- Keep components focused on a single responsibility; extract logic to custom hooks
- Add `tabIndex`, `aria-label`, and `role` for interactive or non-semantic elements
- Prefer semantic HTML over generic `div`/`span`
- Use `React.memo()` for components that re-render frequently with unchanged props
- Use `useCallback` and `useMemo` with correct dependency arrays
- Use `useId()` for generating stable unique IDs, not `Math.random()`

## Imports

- Use destructured imports: `import { useState } from "react"` not `React.useState()`
