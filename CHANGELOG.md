# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added

- Monorepo scaffold: pnpm workspaces with `apps/web` (Next.js), `apps/api` (Express) and `packages/shared`.
- Tooling: TypeScript strict, ESLint, Prettier, Husky + lint-staged, commitlint (Conventional Commits).
- CI: GitHub Actions (lint, typecheck, test, build) and gitleaks secret scanning.
- Local MySQL 8 + Adminer via docker-compose.
- `design-reference/` with the approved Figma Make wireframe export.
- Project docs: brief, decisions log, syllabus unit list, local setup guide.
- Design system (Phase 1): colour, radius, shadow and type tokens in Tailwind v4 (light + dark),
  self-hosted fonts (Poppins, Inter, Noto Sans Sinhala, Abhaya Libre), ported UI components,
  site header, mobile bottom navigation, footer and localised 404 page.
- Bilingual routing with next-intl: `/si` (default) and `/en`, language switch that keeps the
  current page and is remembered for a year; Sinhala and English message files (349 strings).
- Shared formatters: LKR prices, DD/MM/YYYY dates and times in Asia/Colombo, video durations;
  list of the 25 districts.
- Development-only UI gallery at `/[locale]/dev/ui`.
- Database (Phase 2): Prisma 7 schema for accounts, sessions, OTP, teacher profile, settings,
  units, sub-parts, free resources, videos, past papers and files, products, orders, payment
  events, access grants, progress, announcements and audit log; first migration with CHECK
  constraints; re-runnable seed (19 NIE units, prices, 30 past-paper years, admin, sample content).
- API structure: routes → controller → service → repository; public `GET /api/units` and
  `GET /api/units/:number`; `GET /api/health/ready` database check; database errors mapped to
  the standard error format; Swagger UI at `/api/docs` and `/api/openapi.json`.
- Shared site-setting schemas and defaults (access duration, device limit, contact details)
  with the access-expiry calculation; Argon2id password hashing.
- API integration tests against a dedicated `al_agri_test` database, also in CI.

### Changed

- CI runs on pull requests and on pushes to `main`/`develop` only (no duplicate checks on PRs).
- Local MySQL now listens on port 3307 and stores times in UTC.
