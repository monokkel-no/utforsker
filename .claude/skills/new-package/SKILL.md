---
name: new-package
description: Scaffold a new workspace package following monorepo conventions
disable-model-invocation: true
---

Create a new pnpm workspace package under `packages/<name>/` with:

1. `package.json` — name `@repo/<name>`, `type: "module"`, `"exports": { "./*": "./src/*" }`, devDeps using `catalog:` versions
2. `tsconfig.json` — extends `@repo/typescript-config/react-library.json` (or base.json for non-React)
3. `src/index.ts` — placeholder named export
4. Add `"@repo/<name>": "workspace:*"` to any consumer's package.json

Ask the user for: package name, whether it uses React, and which existing packages consume it.
