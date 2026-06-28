---
name: code-quality-review
description: Review TypeScript, Next.js, and React changes against the project's code-quality standards and report violations with fixes. Use when the user asks to review code, a diff, a pull request, or check changes for quality before committing.
---

# Code Quality Review

Reviews changes against the always-applied standards in `.cursor/rules/web-code-quality.mdc` (plus `web-stack`, `web-architecture`, `web-state-zustand`, `web-testing`). The rule defines the standards; this skill is the on-demand review workflow.

## Workflow

1. Determine scope:
   - Uncommitted work: `git diff` (and `git diff --staged`).
   - Branch vs main: `git diff main...HEAD`.
   - Specific files/PR: review only those.
2. For each changed `.ts`/`.tsx` file, check against the checklist below. Read surrounding code when the diff lacks context.
3. Report findings grouped by file using the format below. If there are no issues, say so explicitly.

## Checklist

TypeScript
- [ ] No `any` and no `unknown`; precise types/generics used (untyped input validated, e.g. via Zod, into a typed value).
- [ ] `type` for unions/intersections, `interface` for object shapes; exported boundaries annotated.
- [ ] Variants use discriminated unions; no non-null `!` assertions; `import type` for type-only imports.

React
- [ ] Function components, small and single-purpose; rules of hooks followed.
- [ ] List keys come from data, never the array index.
- [ ] State derived rather than duplicated; memoization only where it fixes a real problem.

Next.js
- [ ] Server Components by default; `'use client'` only when state/effects/browser APIs are needed.
- [ ] Data fetched server-side; no secrets in client components.
- [ ] `next/link` and `next/image` used appropriately.

Architecture & stack
- [ ] Data flow goes Component -> feature hook (TanStack Query) -> typed API client; no direct `fetch` in components.
- [ ] Server data in TanStack Query, UI-only state in Zustand; no approved-library substitutions.
- [ ] Server query keys include `schoolId` (multi-tenant scoping).

General
- [ ] Clear names; no dead/commented-out code; comments explain intent, not mechanics.
- [ ] Async errors handled, never swallowed.

## Report format

Group by file; one bullet per finding with a severity, a `path:line` reference, and a concrete fix.

```markdown
### path/to/File.tsx
- [Critical] L42 `any` on `parse` param — define an `Input` type and validate with the feature's Zod schema.
- [Suggestion] L88 list key uses index — key by `item.id`.

### path/to/Other.tsx
- No issues found.
```

Severities: `Critical` (must fix — type safety, tenant scoping, swallowed errors, architecture violations), `Suggestion` (should fix — readability, deliberate memoization), `Nice to have` (optional).
