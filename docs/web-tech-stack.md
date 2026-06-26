# Web Tech Stack

The technology choices for the **web app** - the admin/management/teacher dashboard. This is the client-only stack; the shared backend, database, auth, storage, payments, real-time, and hosting live in [product-tech-stack.md](product-tech-stack.md). For how these pieces are organized, see [web-architecture.md](web-architecture.md).

## Core

- **React** - component model.
- **Next.js** - routing, server rendering, SEO-friendly public site, excellent admin dashboard experience.
- **TypeScript** - type safety, shared in spirit with the backend DTOs.
- **Tailwind CSS** - fast, consistent styling across many screens.
- **shadcn/ui** - accessible component primitives you own and customize.

**Benefits:**

- Fast development with a huge ecosystem.
- SEO-friendly website.
- Polished, consistent UI for a large, form-heavy dashboard.

## State and data

- **TanStack Query** - server state: fetching, caching, refetching (student lists, fees, results).
- **Zustand** - client/UI state: open modals, selected filters, theme.

> Why: reads from the server are TanStack Query's job; only pure UI state belongs in a store.

## Forms and validation

- **React Hook Form** - performant forms with minimal re-renders.
- **Zod** - schema validation, reused for form rules and API response typing.

> Why: the admin is form-heavy (admissions, marks entry, fee structure setup); this pairing keeps validation declarative and type-safe.

## Tables and data display

- **TanStack Table** - headless tables with sorting, filtering, pagination.

> Why: student, fee, and attendance lists are large and need fast, flexible grids.

## Charts and reporting

- **Recharts** - charts for the reports and analytics module.
- **SheetJS (xlsx)** - Excel export.
- **PDF generation** - report cards and financial reports via a PDF library (e.g. `@react-pdf/renderer`) or a server-rendered PDF endpoint.

> Why: schools expect Excel/PDF exports and visual dashboards for fees, attendance, and performance.

## Internationalization

- **next-intl** - multi-language UI.

> Why: multi-language support is a listed product requirement.

## Real-time client

- **socket.io-client** - consumes the backend Socket.IO server for live announcements and bus-tracking views.

## Utilities

- **day.js** (or **date-fns**) - lightweight date handling (timetables, attendance dates).
- **Intl.NumberFormat** - currency/number formatting for fees.

## Quality and tooling

- **pnpm** - fast, disk-efficient package manager.
- **ESLint** + **Prettier** - linting and formatting.
- **Husky** + **lint-staged** - pre-commit checks.

## Testing

- **Vitest** + **Testing Library** - unit and component tests.
- **Playwright** - end-to-end tests for critical journeys (login, admission, fee payment, results).

## Monitoring

- **Sentry** - error and performance monitoring in production.

## Deployment

- **Vercel** for the simplest Next.js hosting, or self-host via **Docker/Node** alongside the backend.

> See the shared [Hosting section in product-tech-stack.md](product-tech-stack.md) for budget vs enterprise options.

## Summary

| Area | Choice |
| --- | --- |
| **Framework** | Next.js, React, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Server state** | TanStack Query |
| **Client state** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Tables** | TanStack Table |
| **Charts/Export** | Recharts, SheetJS, PDF renderer |
| **i18n** | next-intl |
| **Real-time** | socket.io-client |
| **Testing** | Vitest, Testing Library, Playwright |
| **Monitoring** | Sentry |
| **Tooling** | pnpm, ESLint, Prettier, Husky |

For the mobile stack see [mobile-tech-stack.md](mobile-tech-stack.md); for the combined overview and shared backend/infra see [product-tech-stack.md](product-tech-stack.md).
