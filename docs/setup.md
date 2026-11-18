# Local development setup

## 1. Prerequisites

| Tool           | Version  | Notes                                                                 |
| -------------- | -------- | --------------------------------------------------------------------- |
| Node.js        | 24.x     | `node --version`                                                      |
| pnpm           | 12.x     | `npm install -g pnpm` (or `corepack enable` if you have admin rights) |
| Docker Desktop | latest   | Runs MySQL 8 + Adminer locally                                        |
| Git            | 2.40+    |                                                                       |
| gitleaks       | optional | Local secret scan on commit; CI runs it anyway                        |

## 2. First-time setup

```bash
git clone https://github.com/SanduniHerath/AL-Agriculture_Online_Learning_Platform.git
cd AL-Agriculture_Online_Learning_Platform
git switch develop

pnpm install                       # installs all workspaces and git hooks (husky)

cp .env.example .env               # docker-compose values
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Edit the copied files if you need different ports or passwords. Never commit them.

## 3. Start and fill the database

Open Docker Desktop first (the whale icon must say "Engine running"), then:

```bash
pnpm db:up        # MySQL + Adminer in Docker
pnpm db:deploy    # create the tables (apply migrations)
pnpm db:seed      # add the 19 units, prices, settings, admin and sample content
```

- MySQL: `localhost:3307` (not 3306 - see decision D21), database `al_agri`, user `al_agri` / `al_agri`
- Adminer UI: http://localhost:8080 (server `mysql`)
- Admin login created by the seed: `ADMIN_MOBILE` / `ADMIN_PASSWORD` from `apps/api/.env`

Stop with `pnpm db:down`. Data persists in the `mysql_data` Docker volume.
More commands and the table overview: [database.md](database.md).

## 4. Run the apps

```bash
pnpm dev          # runs web (http://localhost:3000) and api (http://localhost:4000) together
```

Or individually:

```bash
pnpm --filter @al-agri/web dev
pnpm --filter @al-agri/api dev
```

- API health: http://localhost:4000/api/health (and `/api/health/ready` for the database)
- API docs: http://localhost:4000/api/docs
- Units: http://localhost:4000/api/units

## 5. Quality checks (same as CI)

```bash
pnpm lint
pnpm typecheck
pnpm test          # API tests need the Docker database running (they use al_agri_test)
pnpm build
pnpm format        # auto-format everything
```

> **Windows PowerShell 5.1** does not support `&&`. Run commands one per line, or join them
> with `;` - e.g. `git switch develop; git pull`.

Git hooks run automatically:

- **pre-commit** - lint-staged (ESLint + Prettier on staged files) and gitleaks if installed
- **commit-msg** - commitlint enforces Conventional Commits, e.g. `feat(api): add OTP endpoint`

## 6. Branching cheat-sheet

```bash
git switch develop
git pull
git switch -c feature/<short-name>     # or fix/, chore/, docs/
# ...commit small steps...
git push -u origin feature/<short-name>
# open a PR into develop on GitHub; squash-merge after CI passes; delete the branch
```

See the project brief in `docs/project-brief.md` for the full branching model.
