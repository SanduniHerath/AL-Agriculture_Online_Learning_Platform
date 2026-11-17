import Link from "next/link";
import "./globals.css";

/**
 * Fallback 404 for requests that never reached a locale (rare - the proxy redirects almost
 * everything to /si or /en). Bilingual because we do not know the visitor's language here.
 */
export default function GlobalNotFound() {
  return (
    <html lang="si">
      <body>
        <main className="container-main grid min-h-screen place-items-center py-10 text-center">
          <div className="card grid gap-4 p-10">
            <p className="heading text-7xl">404</p>
            <p>පිටුව හමු නොවීය · Page not found</p>
            <p className="flex justify-center gap-4 font-semibold text-primary underline">
              <Link href="/si">මුල් පිටුව</Link>
              <Link href="/en">Home</Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
