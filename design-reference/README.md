# Design reference (read-only)

This folder is the **approved UI design** exported from Figma Make ("Build Agriculture Learning
Wireframes"). It is a Vite + React 19 + Tailwind v4 prototype with mock data and fake navigation.

**Do not edit these files and do not import them from the apps.** They exist so that
`apps/web` can port components, layouts, design tokens and translations faithfully.

| File                      | What it holds                                                                 |
| ------------------------- | ----------------------------------------------------------------------------- |
| `src/theme.css`           | Design tokens: colours (light + dark), spacing, radius, shadows, type, fonts   |
| `src/components/ui.tsx`   | Shared components (Button, Input, TopNav, BottomNav, UnitCard, Tabs, Modal...) |
| `src/App.tsx`             | Public + student screens and the prototype's pathname router                  |
| `src/pages/admin.tsx`     | Admin screens                                                                 |
| `src/pages/flows.tsx`     | Checkout, payment result, account, system states                              |
| `src/translations.ts`     | Every UI string as `{ en, si }`                                               |

Things that are **wireframe-only** and must not be ported: `Annotation` notes, the `/screens`
index, the user-state switcher (`?state=`), `window.location.href` navigation, mock data.

Excluded from the export on purpose: `.figma/`, `CLAUDE.md`, `AGENTS.md`, `.mise.toml`, lockfile.
