import { UNIT_COUNT } from "@al-agri/shared";

/**
 * Phase 0 placeholder page. Proves the Next.js app builds, Tailwind works and
 * the shared workspace package can be imported. Replaced in Phase 1/4.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold text-(--color-primary)">
        A/L Agriculture Online Learning Platform
      </h1>
      <p>Monorepo scaffold is working. {UNIT_COUNT} units coming soon.</p>
    </main>
  );
}
