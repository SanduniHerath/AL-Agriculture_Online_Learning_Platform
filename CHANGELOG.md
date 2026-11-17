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
