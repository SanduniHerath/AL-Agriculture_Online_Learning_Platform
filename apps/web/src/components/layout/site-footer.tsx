import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/icon";

/**
 * Dark green footer with tagline, contact details and legal links.
 * Contact details come from the teacher's site settings (Phase 4/5); they are optional here.
 */
export function SiteFooter({ phone, email }: { phone?: string; email?: string }) {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-footer py-12 text-footer-text">
      <div className="container-main grid gap-8 md:grid-cols-3">
        <div>
          <p className="mb-3 flex items-center gap-2 font-bold">
            <Icon name="leaf" />
            {t("common.brand")}
          </p>
          <p className="max-w-sm text-[color-mix(in_srgb,var(--color-footer-text)_72%,transparent)]">
            {t("footer.tagline")}
          </p>
        </div>
        {(phone || email) && (
          <div>
            <h2 className="mb-3 text-lg font-bold">{t("footer.contact")}</h2>
            {phone && (
              <p lang="en">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-12 items-center"
                >
                  {phone}
                </a>
              </p>
            )}
            {email && (
              <p lang="en">
                <a href={`mailto:${email}`} className="inline-flex min-h-12 items-center">
                  {email}
                </a>
              </p>
            )}
          </div>
        )}
        <div>
          <h2 className="mb-3 text-lg font-bold">{t("footer.legal")}</h2>
          <ul className="grid gap-2">
            <li>
              <Link className="flex min-h-12 items-center" href="/privacy">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-12 items-center" href="/terms">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link className="flex min-h-12 items-center" href="/refund-policy">
                {t("footer.refund")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-main mt-8 border-t border-footer-border pt-6 text-sm text-[color-mix(in_srgb,var(--color-footer-text)_68%,transparent)]">
        {t("common.copyright", { year })}
      </div>
    </footer>
  );
}
