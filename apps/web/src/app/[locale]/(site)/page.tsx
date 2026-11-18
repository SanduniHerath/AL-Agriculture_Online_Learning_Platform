import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { Icon, LinkButton, type IconName } from "@/components/ui";
import { toLocale } from "@/i18n/routing";

/**
 * Home page - Phase 1 version: hero and "how it works" from the design, using only
 * translated UI text. Phase 4 adds the teacher's photo, intro video, statistics, popular
 * units and testimonials from the database.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  const steps: Array<{ icon: IconName; title: string; body: string }> = [
    { icon: "book", title: t("chooseUnitStep"), body: t("chooseUnitStepBody") },
    { icon: "download", title: t("freeNotesStep"), body: t("freeNotesStepBody") },
    { icon: "unlock", title: t("unlockStep"), body: t("unlockStepBody") },
  ];

  return (
    <>
      <main id="main">
        <section className="hero-organic py-10 lg:py-16">
          <div className="container-main">
            <p className="eyebrow mt-8">{t("eyebrow")}</p>
            <h1 className="heading mt-3 max-w-3xl text-display">{t("title")}</h1>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/units" iconAfter="arrow">
                {t("startLearning")}
              </LinkButton>
            </div>
          </div>
        </section>

        <section className="container-main py-14 lg:py-20">
          <h2 className="heading max-w-2xl text-h2">{t("howItWorks")}</h2>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li className="card p-6" key={step.title}>
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name={step.icon} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-bold text-primary-soft"
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3 className="heading mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
