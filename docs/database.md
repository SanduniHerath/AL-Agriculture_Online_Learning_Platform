# Database

MySQL 8.4 with [Prisma 7](https://www.prisma.io/docs) (schema: `apps/api/prisma/schema.prisma`).

## Everyday commands (run from the repo root)

| Command           | What it does                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| `pnpm db:up`      | Start MySQL (port **3307**) and Adminer (http://localhost:8080) in Docker       |
| `pnpm db:down`    | Stop them (data is kept in the `mysql_data` Docker volume)                      |
| `pnpm db:migrate` | After editing `schema.prisma`: create + apply a new migration (asks for a name) |
| `pnpm db:deploy`  | Apply existing migrations without creating new ones (CI / production)           |
| `pnpm db:seed`    | Add starting data (safe to run again - only adds what is missing)               |
| `pnpm db:studio`  | Browse and edit data in Prisma Studio                                           |

Adminer login: System **MySQL**, Server **mysql**, user **al_agri**, password **al_agri**, database **al_agri**.

### Starting completely fresh

`pnpm db:reset` drops all data, re-applies the migrations and re-seeds. Prisma asks you to
confirm. (When an AI coding assistant runs it, Prisma refuses unless you explicitly agree -
a deliberate safety guard.)

To also reset the Docker volume (e.g. after changing MySQL settings): `docker compose down -v`,
then `pnpm db:up`, `pnpm db:deploy`, `pnpm db:seed`.

## Tables

| Area        | Tables                                                                           |
| ----------- | -------------------------------------------------------------------------------- |
| Accounts    | `users`, `sessions` (one per signed-in device), `otp_codes`                      |
| Site        | `teacher_profile` (single row), `testimonials`, `site_settings`, `announcements` |
| Syllabus    | `units` (19), `sub_parts`, `resources` (free PDFs), `videos`                     |
| Past papers | `past_papers` (one per year), `past_paper_files` (Paper I/II + marking schemes)  |
| Commerce    | `products`, `orders`, `payment_events`, `access_grants`                          |
| Learning    | `video_progress`                                                                 |
| Audit       | `audit_logs` (append-only)                                                       |

```
units ─┬─< sub_parts ─< videos (TEACHING)
       ├─< videos (DISCUSSION: MCQ / STRUCTURED / ESSAY)
       ├─< resources (THEORY_NOTE, PAST_PAPER_QUESTIONS)
       └── products ─< orders ─── access_grants >── users
past_papers ─┬─< past_paper_files
             └── products
```

## Rules the database enforces

Besides foreign keys and unique indexes, the first migration adds **CHECK constraints**
(hand-written at the end of `migrations/*_init/migration.sql`):

- units are numbered 1-19 and belong to Grade 12 or 13
- a teaching video has a sub-part; a discussion video has a type (MCQ/Structured/Essay) instead
- prices and order amounts are greater than zero (BR-07)
- a product / access grant points at exactly one unit **or** one past-paper year
- **one current access grant per student and product**: `access_grants.currentFlag` is `TRUE` for
  the current grant and `NULL` once revoked or replaced; a unique index on
  `(userId, unitId, currentFlag)` then allows only one current grant (MySQL ignores NULLs in
  unique indexes). Expiry dates are checked when content is requested.

## Conventions

- **Bilingual text**: paired columns `titleEn` / `titleSi`. Tamil later = add `titleTa` columns.
- **Money**: whole rupees (`Int`). Orders copy the price at purchase time (BR-08).
- **Time**: stored in **UTC** (every connection runs `SET time_zone = '+00:00'`); shown in
  Asia/Colombo by `formatDate` / `formatTime` from `@al-agri/shared`.
- **Table names**: snake_case plurals via `@@map`, identical on Windows and Linux.
- **IDs**: `cuid2` strings, except `units.id` (small integer) and `audit_logs.id` (big integer).

## Seed data

`pnpm db:seed` (source: `apps/api/prisma/seed/`) creates, only if missing:

- the 19 NIE syllabus units with English and Sinhala titles
- **placeholder** sub-parts (3-4 per unit) - the teacher replaces them with the real list
- 30 past-paper years (1996-2025) and a product + starting price for every unit and year
- default site settings, the teacher profile and two testimonials (**placeholders** from the design)
- the first admin, from `ADMIN_*` in `apps/api/.env`
- with `SEED_SAMPLE_CONTENT=true` (default outside production): sample videos (mock provider),
  free-PDF records and past-paper file records - for development only

## Tests

API integration tests use a separate database, **`al_agri_test`** (created by
`docker/mysql/init/01-dev-setup.sh`). Before the tests run, `prisma migrate deploy` and the seed
are applied to it - nothing is deleted. The setup refuses any database whose name does not end
in `_test`.
