# Project brief

A/L Agriculture Online Learning Platform. The full requirements live in the SRS
(`SRS-ALAGRI-001 v1.0`, not committed - see `docs/srs-summary.md`). This brief captures the
build rules the developer and the AI assistant follow. Where this brief and the SRS differ,
the SRS wins unless a decision in `docs/decisions.md` says otherwise.

## 1. Project

- **Audience:** G.C.E. A/L Agriculture students (Grade 12 & 13) across Sri Lanka, mostly on
  budget Android phones; parents who pay; the teacher (admin).
- **Public:** teacher introduction (video, description, experience, results, testimonials).
- **19 units** (Unit 1 … Unit 19), each split into sub-parts (1.1, 1.2 …).
- **Free & public per unit (no login):** Theory Note PDF; Unit-wise Past Paper Questions PDF (30 years).
- **Paid per unit (one payment unlocks the whole unit):** all sub-part teaching videos + the
  unit's past-paper discussion videos in three sections: MCQ | Structured | Essay.
- **Paid per year:** full A/L past paper + marking scheme, 30 years.
- Account required to buy and watch videos (register with mobile + OTP).
- **Bilingual UI:** Sinhala (default) and English, switchable everywhere, remembered. Easy to add Tamil.
- **Admin panel** for the teacher: units, sub-parts, PDFs, videos, past papers, marking schemes,
  prices, students, payments, site content (EN + SI).
- **Access duration after payment:** admin-configurable setting (default: no expiry), never hard-coded.

## 2. Inputs

- SRS v1.0 (source of truth for requirements).
- Figma Make export in `design-reference/` (approved UI). Reuse components, layouts, tokens and
  translations faithfully; do not redesign; strip wireframe-only elements; replace mock data and
  fake navigation with real data and Next.js routing.

## 3. Tech stack

- Monorepo, pnpm workspaces: `apps/web` (Next.js App Router, TS strict, Tailwind v4, next-intl),
  `apps/api` (Node + Express + TS strict + Prisma + Zod), `packages/shared` (types, schemas, constants).
- MySQL 8 (docker-compose locally; managed MySQL in production).
- Auth: mobile + password (argon2/bcrypt), SMS OTP, httpOnly/Secure/SameSite cookie sessions
  (or short-lived JWT + rotating refresh in httpOnly cookies). Admin 2FA (TOTP).
- Video: provider interface - Bunny Stream (signed, expiring URLs) + local mock.
- Files: S3-compatible interface (R2 / Bunny Storage / S3) + local-disk provider.
- Payments: PayHere (sandbox first) behind a PaymentProvider interface. Access only after the
  verified server-to-server notification (md5sig, amount, currency, order id, status). Idempotent webhooks.
- SMS and email: provider interfaces with console loggers in development.
- SEO: Metadata API, bilingual titles/descriptions, hreflang, OG images, sitemap, robots,
  server-rendered public pages. Locale-prefixed URLs `/si/...` and `/en/...` (default `/si`).
- PWA: manifest, icons, offline shell (no caching of paid content).
- Testing: Vitest, Supertest, Playwright. Quality: ESLint, Prettier, TS strict, Husky + lint-staged,
  commitlint. CI: GitHub Actions + gitleaks.

## 4. Git branching (mandatory)

- `main` - production only; receives merges from `release/*` or `hotfix/*`; every merge tagged (SemVer).
- `develop` - integration; all feature work merges here by pull request.
- `feature/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>` - from `develop`.
- `release/<version>` - from `develop`; final fixes only; merged into `main` and back into `develop`; tagged.
- `hotfix/<name>` - from `main`; merged into `main` and `develop`; tagged.
- Conventional Commits. Small, working commits. Never commit broken builds to `develop`.
- PRs into `develop` with summary, SRS IDs, screenshots for UI, test notes, checklist. Squash merge; delete branch.
- Milestones: `release/x.y.0`, update CHANGELOG, bump versions, merge to `main` with tag, merge back.
- Ask before any force-push, history rewrite, or deleting unmerged branches.

### Security (public repo)

Never commit secrets, keys, `.env` files, real student data, uploads or database dumps. Only
`.env.example` with placeholders. gitleaks in CI and pre-commit.

## 5. Data model (Prisma)

User, Session/RefreshToken, OtpCode, TeacherProfile, Testimonial, SiteSetting, Unit, SubPart,
Resource, Video, PastPaper, Product, Order, PaymentEvent, AccessGrant, VideoProgress,
Announcement, AuditLog - with indexes, unique constraints and foreign keys. Seed: 19 units,
sub-parts, sample videos/resources, 30 past-paper years (1996-2025), prices, admin from env.

## 6. Non-negotiables

- Server-side access control on every protected endpoint and every video/file URL.
- Signed, expiring (≤ 2 h) video URLs; name/mobile watermark overlay.
- Free PDFs fully public and CDN-cacheable; paid PDFs via short-lived signed URLs to owners only.
- Device/session limit (default 2) + "log out all devices".
- Rate limits on auth/OTP/payment; lockout after repeated failures.
- Zod validation on every input; consistent error format; no stack traces in production.
- helmet, CORS restricted to the web origin, CSRF protection for cookie auth; OWASP Top 10.
- PDPA (Sri Lanka, No. 9 of 2022): Privacy, Terms and Refund pages (bilingual placeholders).
- WCAG 2.1 AA; mobile-first from 360 px; Sinhala text never overflows.
- Public pages server-rendered; LCP < 2.5 s on 4G.
- All UI text from `messages/si.json`, `messages/en.json` (ready for `ta.json`).
- LKR prices, DD/MM/YYYY dates, Asia/Colombo timezone.
- pino logging with request ids; audit log for payments, access changes and admin actions.

## 7. Phases (one branch each; stop for approval after each)

| Phase | Branch                     | Scope                                                                      |
| ----- | -------------------------- | -------------------------------------------------------------------------- |
| 0     | `chore/monorepo-setup`     | Workspace, tooling, docker-compose, env examples, CI, gitleaks, docs       |
| 1     | `feature/design-system`    | Tailwind v4 tokens, fonts, ported components, next-intl messages + routing |
| 2     | `feature/db-prisma`        | Prisma schema, migrations, seed, API structure, errors, logging, OpenAPI   |
| 3     | `feature/auth-otp`         | Register, OTP, login/logout(-all), reset, device limit, admin 2FA          |
| 4     | `feature/public-content`   | Home, Units, Unit detail (free PDFs, locked videos), Past papers, SEO      |
| 5     | `feature/admin-content`    | Admin layout, RBAC, CRUD for all content, bilingual inputs, audit log      |
| 6     | `feature/payments-payhere` | Products/pricing, checkout, PayHere, webhooks, grants, receipts            |
| 7     | `feature/video-player`     | Signed playback, watermark, progress, PDF viewer, My Account               |
| 8     | `feature/pwa-a11y-perf`    | PWA, dark mode, states, a11y + perf passes, Sinhala overflow checks        |
| 9     | `release/1.0.0`            | Tests, Playwright E2E, CHANGELOG, deployment guide, tag v1.0.0             |

## 8. Working agreement

- At every checkpoint: branch, what was built, files changed, how to run/test, commands run,
  routes/screens to check, next phase plan.
- Explain important decisions briefly in simple English.
- Clear, commented code over clever code. No placeholder "TODO" logic in security, payment or
  access-control code.
- Unclear or conflicting requirement → ask, then record in `docs/decisions.md`.
