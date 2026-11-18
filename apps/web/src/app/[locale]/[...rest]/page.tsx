import { notFound } from "next/navigation";

/** Any unknown path under /si or /en shows the localised 404 page. */
export default function CatchAll() {
  notFound();
}
