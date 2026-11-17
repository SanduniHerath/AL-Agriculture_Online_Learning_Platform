import { useTranslations } from "next-intl";
import { SiteShell } from "@/components/layout/site-shell";
import { LinkButton } from "@/components/ui";

/** Localised 404 (design: SystemStatePage "notFound"). */
export default function NotFound() {
  const t = useTranslations();
  return (
    <SiteShell>
      <main id="main" className="container-main py-10 lg:py-14">
        <p className="eyebrow">404</p>
        <h1 className="heading mt-3 max-w-4xl text-h1">{t("system.notFoundTitle")}</h1>
        <p className="mt-3 max-w-3xl text-text-muted">{t("system.notFoundBody")}</p>
        <div className="card mt-8 grid place-items-center gap-5 p-10 text-center">
          <span aria-hidden="true" className="heading text-7xl">
            404
          </span>
          <LinkButton href="/" icon="home">
            {t("common.returnHome")}
          </LinkButton>
        </div>
      </main>
    </SiteShell>
  );
}
