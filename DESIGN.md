# ScholarCore ERP — Design Reference (ScholarSync)

Source of truth: Stitch project `12430849347074200927` ("ScholarCore ERP MVP"),
design system **ScholarSync**. Raw exports live in [`docs/stitch/`](docs/stitch/)
(`project.json`, `index.json`, `design-systems.json`, `screens/<id>.{html,png,json}`).

The web app is **token-first**: components consume semantic tokens (defined in
[`src/app/globals.css`](src/app/globals.css)) rather than raw hex values.

## Brand

- Product: **ScholarSync** — Academic Administration Portal.
- Personality: authoritative, precise, content-first. Inspired by Linear/Stripe-grade
  productivity tooling for school administrators.
- Logo mark: Material Symbol `school` in `primary-container`, wordmark in `primary`.

## Color tokens (light)

Material-style tonal system. Primary is a confident blue.

| Token | Hex | Usage |
| --- | --- | --- |
| `primary` | `#004ac6` | Primary actions, active nav, links, key numbers |
| `primary-container` | `#2563eb` | Filled brand surfaces, logo chip, hover of primary |
| `on-primary` | `#ffffff` | Text/icon on primary |
| `on-primary-container` | `#eeefff` | Text on primary-container |
| `primary-fixed` | `#dbe1ff` | Soft brand tints (icon backgrounds) |
| `surface-tint` | `#0053db` | Primary button hover |
| `secondary` | `#505f76` | Secondary text, inactive nav, metadata |
| `secondary-container` | `#d0e1fb` | Active nav background, soft chips |
| `on-secondary-container` | `#54647a` | Text on secondary-container |
| `tertiary` | `#943700` | Accent (rare) |
| `tertiary-container` | `#bc4800` | Accent fill |
| `background` / `surface` | `#faf8ff` | App background |
| `surface-container-lowest` | `#ffffff` | Cards, tables, panels (Level 1) |
| `surface-container-low` | `#f3f3fe` | Row hover, login background |
| `surface-container` | `#ededf9` | Search field, soft chips, icon wells |
| `surface-container-high` | `#e7e7f3` | Toggle wells, code chips |
| `surface-container-highest` / `surface-variant` | `#e1e2ed` | Elevated tints |
| `surface-dim` | `#d9d9e5` | Dim surface |
| `on-surface` | `#191b23` | Primary text |
| `on-surface-variant` | `#434655` | Secondary text |
| `outline` | `#737686` | Strong borders, input borders |
| `outline-variant` | `#c3c6d7` | Hairline borders, dividers |
| `error` | `#ba1a1a` | Errors, logout, alerts |
| `error-container` | `#ffdad6` | Error tint background |
| `on-error-container` | `#93000a` | Text on error tint |
| `inverse-surface` | `#2e3039` | Dark sidebar (dark mode) |
| `inverse-primary` | `#b4c5ff` | Brand on dark |

Status chips in tables use plain Tailwind palettes in the design (`green` = Active,
`red` = At Capacity); we mirror these via `success`/`error` token aliases.

Dark mode: `colorMode` is LIGHT in the source. We keep a dark scaffold via the
`.dark` class (surfaces shift to navy-slate) but the product ships light-first.

## Typography

- **Geist** — headlines/display (`display-lg`, `headline-lg`, `headline-md`, `title-md`, `code`).
- **Inter** — body/labels (`body-lg`, `body-md`, `label-md`).

| Style | Family | Size / line-height | Weight | Notes |
| --- | --- | --- | --- | --- |
| `display-lg` | Geist | 48 / 56, -0.02em | 700 | |
| `headline-lg` | Geist | 32 / 40, -0.01em | 600 | Page titles |
| `headline-md` | Geist | 24 / 32 | 600 | Section/page titles |
| `title-md` | Inter | 18 / 28 | 600 | Card titles |
| `body-lg` | Inter | 16 / 24 | 400 | |
| `body-md` | Inter | 14 / 20 | 400 | Default body / table cells |
| `label-md` | Inter | 12 / 16, 0.01em | 500 | Labels, nav, buttons |
| `code` | Geist | 13 / 18 | 400 | Monospace-style IDs |

Fonts are loaded via `next/font/google` and exposed as `--font-geist` / `--font-inter`.
Icons: **Google Material Symbols Outlined** (loaded via `<link>` in the root layout),
rendered through the shared `<Icon>` component.

## Spacing, radius, elevation

- Spacing scale (8px base): `xs 4`, `sm 8`, `md 16`, `lg/gutter 24`, `xl 32`;
  page margins `margin_mobile 16`, `margin_desktop 40`; `sidebar_width 280`.
- Radius: default `0.25rem`, `lg 0.5rem`, `xl 0.75rem` (cards/panels/buttons use `xl`),
  `2xl 1rem` (avatars), `full` (chips/badges/pills).
- Elevation: Level 1 cards = `surface-container-lowest` + `1px outline-variant` border
  + soft `shadow-sm`; hover lifts to `shadow-md` and/or `border-primary`.

## App shell

Persistent on dashboard routes; absent on Login and Onboarding.

- **Sidebar** (`hidden lg:flex`, fixed left, `w-[280px]`): brand header → nav list →
  user block + Logout pinned to bottom. Active item: `secondary-container` bg with a
  `border-l-4 border-primary` accent; inactive: `secondary` text, hover `surface-container-high`.
- **Top app bar** (`sticky`, `h-16`): mobile hamburger, search field (`surface-container`,
  rounded-xl), right cluster = `Create` primary button, notifications (with dot), help.
- **Mobile bottom nav** (`lg:hidden`, fixed bottom): Home, Classes, Students, Profile.
- Main content: `lg:ml-[280px]`, padded `p-margin_mobile md:p-margin_desktop`.

Primary navigation: Dashboard, Classes, Teachers, Students, Parents, Principals, Settings.

## Screen inventory → routes

| Screen | Route | Notes |
| --- | --- | --- |
| Login | `/login` | Standalone, centered glass card, ambient glow bg, role auto-detect note |
| Onboarding: School Info | `/onboarding` | Standalone, 6-step horizontal stepper (School Info → Infrastructure → Staff Setup → Curriculum → Finance → Go Live), School Profile form |
| Admin Dashboard | `/` | 5 KPI bento cards, Enrollment Growth chart, Recent Activity, Quick Actions, Schedule timeline |
| Manage Classes | `/classes` | Filters (Session/Status/Grade), list/grid toggle, classes table, pagination |
| Add New Student | `/students/new` | 3-step stepper (Student Details → Parental Info → Review); Personal, Academic, Contact, Parent Connection sections |
| Student Profile | `/students/[id]` | Header card (avatar, status, GPA/Attendance/Major/Credits), tabs (Overview, Parents & Guardians, Documents, Attendance·soon, Fees·soon), Personal Info, Recent Activity, Health & Safety Alerts |
| Students (index) | `/students` | Directory landing (links to profile + new admission) |
| Teachers / Parents / Principals / Settings | `/teachers` … | Nav targets without dedicated designs → shared empty/"coming soon" state |

Each designed screen has DESKTOP, TABLET and MOBILE variants in `docs/stitch/` — build
responsively from the desktop variant, collapsing to the mobile patterns (bottom nav,
single column, segmented controls become stacked).

## Component / feature map

Feature-based (`src/features/<feature>/{api,components,hooks,types}`), data flow
`Component → feature hook (TanStack Query) → typed API client`; UI state in Zustand;
forms with React Hook Form + Zod; tables with TanStack Table; charts with Recharts.

- `features/auth` — login form (RHF + Zod).
- `features/onboarding` — school-info stepper + School Profile form.
- `features/dashboard` — KPI stat cards, enrollment chart (Recharts), recent activity, quick actions, schedule.
- `features/classes` — class table (TanStack Table), filter bar, status badges, pagination.
- `features/students` — student profile (header, tabs, overview panels, health alert) and add-student wizard.

Shared UI primitives (shadcn/ui, new-york): button, input, label, textarea, select,
checkbox, card, badge, avatar, table, tabs, separator, dropdown-menu, sheet, tooltip,
skeleton, progress, form. Shared composite components: `Icon` (Material Symbols),
`BrandLogo`, `AppSidebar`, `AppHeader`, `MobileBottomNav`, `PageHeader`, `StatCard`,
`EmptyState`.
