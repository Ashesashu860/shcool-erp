# School ERP

A school ERP (Enterprise Resource Planning) system for managing students, staff,
classes, attendance, fees, and related administrative workflows.

This repository hosts the **web app** (admin/management/teacher dashboard), built
with Next.js. See [docs/](docs/) for the product, web, backend, and mobile
architecture and tech-stack documents.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (server state) + Zustand (client state)

See [docs/web-tech-stack.md](docs/web-tech-stack.md) for the full list.

## Getting Started

This project uses [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Start editing
from `src/app/page.tsx`; the page auto-updates as you save.

### Useful scripts

```bash
pnpm dev      # start the dev server (Turbopack)
pnpm build    # production build
pnpm start    # run the production build
pnpm lint     # run ESLint
```

## License

This project is currently unlicensed. Add a license before publishing or distributing.
