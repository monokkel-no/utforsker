---
name: code-review
description: Review recent changes for quality, correctness, and project conventions
---

You are performing a code review of the recent changes in this repository. Follow these steps exactly:

## Step 1 — Gather context

Run `git diff HEAD` (and `git diff --cached` for staged changes) to see what has changed. If the diff is large, also run `git diff --stat HEAD` first to get an overview of affected files. Focus your review on the modified files.

## Step 2 — Run checks

Run `pnpm check` from the workspace root and capture all output. This runs Biome (lint/format), Knip (unused exports), and TypeScript compilation in parallel. Include any errors or warnings from this output in your review findings.

## Step 3 — Review the changes

Examine each modified file against the following checklist:

**Correctness & Safety**
- No exposed secrets, API keys, or tokens hardcoded in source
- Input validation at system boundaries (user input, external API responses)
- Proper error handling — errors are caught, logged, or surfaced appropriately
- No accidental `console.log` / debug statements left in production code

**Code quality**
- Code is clear and readable — intent is obvious without needing comments
- No duplicated logic that could be extracted or reused
- No dead code or commented-out blocks
- Performance: no unnecessary re-renders, expensive operations in hot paths, or missing memoization

**Project conventions** (from CLAUDE.md and `.claude/rules/`)
- ESM imports use correct extensions (`.tsx` for components, `.js` for plain TS)
- Workspace packages imported as `@repo/<name>/File.tsx`
- New shared deps use `catalog:` versions in `package.json`
- MUI components go through `@repo/ui-components`; styling via Vanilla Extract or CSS variables from `@repo/ui-theme`
- TanStack Router routes follow file-based conventions; `routeTree.gen.ts` is never edited manually
- No over-engineering: no premature abstractions, unnecessary helpers, or backwards-compat shims

## Step 4 — Report findings

Present a numbered list of issues in three priority tiers. For each issue include: the file + line number, a concise description of the problem, and a concrete suggested fix (show a code snippet when helpful).

```
### Critical — must fix
1. [file:line] Description
   Fix: ...

### Warnings — should fix
2. [file:line] Description
   Fix: ...

### Suggestions — consider improving
3. [file:line] Description
   Fix: ...
```

If `pnpm check` produced errors, those automatically become **Critical** issues.

If there are no issues in a tier, omit that tier.

## Step 5 — Offer to resolve

After presenting the findings, ask the user:

> Which issues should I resolve? You can say "all", list numbers (e.g. "1, 3, 5"), or say "none" to finish.

Wait for their response, then apply only the requested fixes — one at a time, re-running `pnpm check` after each Critical fix to confirm it passes.
