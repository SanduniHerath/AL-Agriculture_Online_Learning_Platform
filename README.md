# A/L Agriculture Online Learning Platform

A mobile-first, bilingual (Sinhala / English) learning website for G.C.E. A/L Agricultural
Science students in Sri Lanka. Students browse the 19 syllabus units, download free theory
notes and past-paper question PDFs, and buy units to watch teaching and past-paper discussion
videos. Full A/L past papers with marking schemes are sold per exam year. The teacher manages
everything from an admin panel.

[![CI](https://github.com/SanduniHerath/AL-Agriculture_Online_Learning_Platform/actions/workflows/ci.yml/badge.svg)](https://github.com/SanduniHerath/AL-Agriculture_Online_Learning_Platform/actions/workflows/ci.yml)

## Repository layout

```
apps/web            Next.js (App Router) + Tailwind v4 + next-intl - the website
apps/api            Node + Express + Prisma + Zod - the REST API
packages/shared     Types, Zod schemas and constants shared by web and api
design-reference/   Approved Figma Make wireframe export (read-only)
docs/               Project brief, SRS summary, decisions log, setup guide, syllabus units
```

## Quick start

```bash
pnpm install
cp .env.example .env && cp apps/api/.env.example apps/api/.env && cp apps/web/.env.example apps/web/.env.local
pnpm db:up          # MySQL 8 (port 3307) + Adminer in Docker
pnpm db:deploy      # create tables
pnpm db:seed        # 19 units, prices, admin, sample content
pnpm dev            # web on :3000, api on :4000 (docs: /api/docs)
```

Full instructions: [docs/setup.md](docs/setup.md).

## Scripts

| Command           | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `pnpm dev`        | Run web and api in watch mode                              |
| `pnpm lint`       | ESLint across all workspaces                               |
| `pnpm typecheck`  | TypeScript strict checks                                   |
| `pnpm test`       | Vitest unit/integration tests                              |
| `pnpm build`      | Production builds                                          |
| `pnpm format`     | Prettier                                                   |
| `pnpm db:up/down` | Start / stop the local database                            |
| `pnpm db:migrate` | Create + apply a migration after editing the Prisma schema |
| `pnpm db:seed`    | Add starting data (re-runnable)                            |

## Branching

`main` (production, tagged releases) ← `release/*` ← `develop` ← `feature/*`, `fix/*`, `chore/*`,
`docs/*`. Conventional Commits are enforced. See [docs/project-brief.md](docs/project-brief.md).

## Documents

- [Project brief](docs/project-brief.md) - scope, stack, rules, phases
- [SRS summary](docs/srs-summary.md) - condensed requirements (full SRS is not public)
- [Decisions](docs/decisions.md) - why things were decided the way they were
- [Syllabus units](docs/syllabus-units.md) - the 19 units and grades
- [Database](docs/database.md) - tables, rules, commands, seed data
- [Translations](docs/i18n.md) - adding text, Tamil later
- [Changelog](CHANGELOG.md)

## Security

This repository is public. Never commit secrets, `.env` files, student data, uploaded videos/PDFs
or database dumps. Secret scanning (gitleaks) runs in CI and on pre-commit when installed.
