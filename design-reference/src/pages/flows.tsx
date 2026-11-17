import { useState, type ReactNode } from "react";
import type { TranslationKey } from "../translations";
import {
  Annotation,
  Badge,
  Button,
  EmptyState,
  Icon,
  Input,
  LinkButton,
  PhoneInput,
  SkeletonLoader,
  Tabs,
  UnitCard,
  type TFunction,
} from "../components/ui";

function Frame({
  eyebrow,
  title,
  intro,
  children,
  t,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  t: TFunction;
}) {
  return (
    <main id="main">
      <section className="container-main py-10 lg:py-14">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading mt-3 max-w-4xl text-[length:var(--type-h1)]">{title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-[var(--wf-muted)]">{intro}</p>}
        {children}
      </section>
    </main>
  );
}

export function CheckoutPage({ t }: { t: TFunction }) {
  const params = new URLSearchParams(window.location.search);
  const isPaper = params.get("item") === "paper";
  const year = params.get("year") || "2025";
  const title = isPaper ? t("paperYear", { year }) : t("unit1Title");
  const price = isPaper ? t("paperCheckoutPrice") : t("unitPrice");
  return (
    <Frame eyebrow={t("checkout")} title={t("completePurchase")} intro={t("checkoutIntro")} t={t}>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="grid gap-5">
          <section className="card p-5 sm:p-6">
            <h2 className="heading text-xl">{t("paymentMethod")}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {(["cards", "mobileWallet", "bankPayment"] as TranslationKey[]).map((key, index) => (
                <label
                  key={key}
                  className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-button)] border p-4 text-center font-bold transition hover:border-[var(--color-primary)] has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary-soft)]"
                >
                  <input type="radio" name="payment" defaultChecked={index === 0} />
                  <span className="flex h-9 w-20 items-center justify-center rounded border bg-[var(--wf-surface-muted)] text-xs">
                    {t("logoPlaceholder")}
                  </span>
                  <span>{t(key)}</span>
                </label>
              ))}
            </div>
          </section>
          <Annotation>{t("checkoutSecureNote")}</Annotation>
        </div>
        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="heading text-xl">{t("orderSummary")}</h2>
          <div className="mt-5 border-y py-5">
            <Badge icon={isPaper ? "paper" : "book"}>
              {isPaper ? t("pastPapersTitle") : t("unitLabel", { number: "01" })}
            </Badge>
            <p className="mt-3 font-bold">{title}</p>
            <p className="mt-1 text-sm text-[var(--wf-muted)]">
              {isPaper ? t("paperBundle") : t("lifetimeAccess")}
            </p>
          </div>
          <div className="flex items-center justify-between py-5">
            <span className="font-bold">{t("total")}</span>
            <span className="heading text-2xl">{price}</span>
          </div>
          <LinkButton
            href={`/payment/success?item=${isPaper ? "paper" : "unit"}&year=${year}`}
            className="w-full"
            icon="lock"
          >
            {t("payNow", { price })}
          </LinkButton>
          <p className="mt-3 text-center text-xs text-[var(--wf-muted)]">{t("securePayment")}</p>
          <a
            href="#refund-policy"
            className="mt-2 flex min-h-12 items-center justify-center text-center text-sm font-semibold text-[var(--color-primary)] underline"
          >
            {t("refund")}
          </a>
        </aside>
      </div>
    </Frame>
  );
}

export function PaymentResultPage({ t, result }: { t: TFunction; result: "success" | "failed" }) {
  const params = new URLSearchParams(window.location.search);
  const isPaper = params.get("item") === "paper";
  const year = params.get("year") || "2025";
  const success = result === "success";
  return (
    <Frame
      eyebrow={t(success ? "paymentComplete" : "paymentIncomplete")}
      title={t(success ? "paymentSuccessTitle" : "paymentFailedTitle")}
      intro={t(success ? "paymentSuccessBody" : "paymentFailedBody")}
      t={t}
    >
      <div className="card mx-auto mt-8 max-w-2xl p-6 text-center sm:p-10">
        <span
          className={`mx-auto flex size-20 items-center justify-center rounded-full border-2 ${
            success
              ? "border-[var(--color-secondary)] bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-surface))] text-[var(--color-secondary)]"
              : "border-[var(--color-error)] bg-[color-mix(in_srgb,var(--color-error)_10%,var(--color-surface))] text-[var(--color-error)]"
          }`}
        >
          <Icon name={success ? "check" : "lock"} size={36} />
        </span>
        <p className="heading mt-5 text-2xl">
          {success ? t("paymentReference", { reference: "PAY-260418-1042" }) : t("noChargeMade")}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {success ? (
            <LinkButton
              href={isPaper ? `/past-papers?state=purchased` : "/units/1?state=purchased"}
              icon="arrow"
            >
              {t(isPaper ? "viewPurchasedPaper" : "goToPurchasedUnit")}
            </LinkButton>
          ) : (
            <>
              <LinkButton
                href={`/checkout?item=${isPaper ? "paper" : "unit"}&year=${year}`}
                icon="arrow"
              >
                {t("retryPayment")}
              </LinkButton>
              <LinkButton href="/account" variant="outline">
                {t("contactSupport")}
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
}

function AccountOverview({ t }: { t: TFunction }) {
  return (
    <div className="grid gap-8">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="heading text-[length:var(--type-h2)]">{t("myPurchasedUnits")}</h2>
          <LinkButton href="/units" variant="text">
            {t("browseMoreUnits")}
          </LinkButton>
        </div>
        <div className="mt-4 max-w-md">
          <UnitCard
            number={1}
            title={t("unit1Title")}
            videos={12}
            status="purchased"
            price="1,500"
            progress={42}
            t={t}
            href="/units/1?state=purchased"
          />
        </div>
      </section>
      <section>
        <h2 className="heading text-[length:var(--type-h2)]">{t("myPastPapers")}</h2>
        <div className="card mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[var(--wf-surface-muted)]">
            <Icon name="paper" />
          </span>
          <div className="flex-1">
            <p className="font-bold">{t("paperYear", { year: 2025 })}</p>
            <p className="text-sm text-[var(--wf-muted)]">{t("paperBundle")}</p>
          </div>
          <LinkButton href="/past-papers?state=purchased" variant="outline">
            {t("openDocument")}
          </LinkButton>
        </div>
      </section>
    </div>
  );
}

function PaymentHistory({ t }: { t: TFunction }) {
  return (
    <section>
      <h2 className="heading text-[length:var(--type-h2)]">{t("paymentHistory")}</h2>
      <div className="mt-4 overflow-x-auto rounded-[var(--radius-card)] border bg-[var(--wf-surface)]">
        <table className="w-full min-w-2xl text-left">
          <thead className="bg-[var(--wf-surface-muted)] text-sm">
            <tr>
              {(["date", "purchase", "amount", "status", "receipt"] as TranslationKey[]).map(
                (key) => (
                  <th className="p-4" key={key}>
                    {t(key)}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {[
              ["18 Apr 2026", t("unit1Title"), "Rs. 1,500"],
              ["02 Apr 2026", t("paperYear", { year: 2025 }), "Rs. 750"],
            ].map((row) => (
              <tr className="border-t" key={row[0]}>
                <td className="p-4">{row[0]}</td>
                <td className="p-4 font-bold">{row[1]}</td>
                <td className="p-4">{row[2]}</td>
                <td className="p-4">
                  <Badge variant="purchased" icon="check">
                    {t("paid")}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button variant="text" icon="download">
                    {t("receipt")}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProfileSettings({ t }: { t: TFunction }) {
  return (
    <form className="card grid gap-5 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
      <h2 className="heading text-[length:var(--type-h2)]">{t("profileSettings")}</h2>
      <label className="grid gap-2 font-bold">
        {t("fullName")}
        <Input defaultValue={t("sampleStudentName")} />
      </label>
      <label className="grid gap-2 font-bold">
        {t("mobileNumber")}
        <PhoneInput defaultValue="77 123 4821" />
      </label>
      <label className="grid gap-2 font-bold">
        {t("preferredLanguage")}
        <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
          <option>{t("languageSinhalaFull")}</option>
          <option>{t("languageEnglishFull")}</option>
        </select>
      </label>
      <Button className="w-fit">{t("saveChanges")}</Button>
      <div className="rounded-[var(--radius-button)] border border-[color-mix(in_srgb,var(--color-error)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-error)_5%,var(--color-surface))] p-4">
        <Button
          variant="outline"
          className="border-[var(--color-error)] text-[var(--color-error)] hover:bg-[color-mix(in_srgb,var(--color-error)_8%,transparent)]"
        >
          {t("logoutAllDevices")}
        </Button>
        <p className="mt-2 text-sm text-[var(--wf-muted)]">{t("logoutAllNote")}</p>
      </div>
    </form>
  );
}

export function AccountPage({ t }: { t: TFunction }) {
  const [tab, setTab] = useState("overview");
  return (
    <Frame
      eyebrow={t("navAccount")}
      title={t("studentDashboard")}
      intro={t("accountWelcome")}
      t={t}
    >
      <div className="mt-7">
        <Tabs
          tabs={[
            { id: "overview", label: t("overview") },
            { id: "payments", label: t("paymentHistory") },
            { id: "profile", label: t("profile") },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>
      <div className="mt-8">
        {tab === "overview" ? (
          <AccountOverview t={t} />
        ) : tab === "payments" ? (
          <PaymentHistory t={t} />
        ) : (
          <ProfileSettings t={t} />
        )}
      </div>
    </Frame>
  );
}

export type SystemState = "empty" | "loading" | "notFound" | "offline";

export function SystemStatePage({ t, state }: { t: TFunction; state: SystemState }) {
  if (state === "loading") {
    return (
      <Frame
        eyebrow={t("systemStates")}
        title={t("loadingState")}
        intro={t("loadingStateNote")}
        t={t}
      >
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </Frame>
    );
  }
  if (state === "empty") {
    return (
      <Frame eyebrow={t("systemStates")} title={t("emptyStates")} intro={t("emptyStateNote")} t={t}>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <EmptyState t={t} />
          <div className="card grid place-items-center gap-4 p-10 text-center">
            <Icon name="paper" size={32} />
            <h2 className="heading text-xl">{t("noPaymentsYet")}</h2>
            <p className="text-[var(--wf-muted)]">{t("noPaymentsBody")}</p>
            <LinkButton href="/units">{t("browseUnits")}</LinkButton>
          </div>
        </div>
      </Frame>
    );
  }
  const offline = state === "offline";
  return (
    <Frame
      eyebrow={offline ? t("offline") : "404"}
      title={t(offline ? "offlineTitle" : "notFoundTitle")}
      intro={t(offline ? "offlineBody" : "notFoundBody")}
      t={t}
    >
      <div className="card mt-8 grid place-items-center gap-5 p-10 text-center">
        <span className="heading text-7xl">{offline ? "—" : "404"}</span>
        <LinkButton href="/" icon="home">
          {t("returnHome")}
        </LinkButton>
      </div>
    </Frame>
  );
}
