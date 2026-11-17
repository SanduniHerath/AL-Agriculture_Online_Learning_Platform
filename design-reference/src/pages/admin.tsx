import { useState, type ReactNode } from "react";
import type { TranslationKey } from "../translations";
import {
  AdminTable,
  Annotation,
  Badge,
  BilingualInput,
  Button,
  Icon,
  Input,
  LinkButton,
  PasswordInput,
  UploadWidget,
  type TFunction,
} from "../components/ui";

const adminNav: Array<{
  key: TranslationKey;
  href: string;
  icon: "home" | "book" | "download" | "paper" | "check" | "user" | "lock" | "leaf";
}> = [
  { key: "dashboard", href: "/admin", icon: "home" },
  { key: "unitsManager", href: "/admin/units", icon: "book" },
  { key: "contentUpload", href: "/admin/content", icon: "download" },
  { key: "pastPapersManager", href: "/admin/past-papers", icon: "paper" },
  { key: "pricing", href: "/admin/pricing", icon: "check" },
  { key: "students", href: "/admin/students", icon: "user" },
  { key: "payments", href: "/admin/payments", icon: "lock" },
  { key: "siteSettings", href: "/admin/settings", icon: "leaf" },
];

function AdminShell({
  active,
  title,
  intro,
  children,
  t,
}: {
  active: string;
  title: string;
  intro: string;
  children: ReactNode;
  t: TFunction;
}) {
  return (
    <main id="main" className="container-main py-6 lg:py-8">
      <div className="mb-5 border-l-4 bg-[var(--wf-surface-muted)] p-3 text-sm text-[var(--wf-muted)]">
        {t("adminSimpleNote")}
      </div>
      <div className="grid gap-6 md:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="card h-fit overflow-hidden md:sticky md:top-24">
          <div className="border-b p-5">
            <div className="flex items-center gap-2 font-bold">
              <Icon name="leaf" />
              {t("admin")}
            </div>
          </div>
          <nav className="grid p-2">
            {adminNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] px-4 py-3 font-bold transition ${active === item.href ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"}`}
              >
                <Icon name={item.icon} size={20} />
                {t(item.key)}
              </a>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">
          <p className="eyebrow">{t("admin")}</p>
          <h1 className="heading mt-2 text-[length:var(--type-h1)]">{title}</h1>
          <p className="mt-2 text-[var(--wf-muted)]">{intro}</p>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function AdminLoginPage({ t }: { t: TFunction }) {
  const [step, setStep] = useState<"login" | "twoFactor">("login");
  return (
    <main id="main" className="container-main grid min-h-[75vh] place-items-center py-10">
      <div className="card w-full max-w-lg p-6 sm:p-9">
        <div className="flex items-center gap-2 font-bold">
          <Icon name="leaf" />
          {t("admin")}
        </div>
        <p className="eyebrow mt-8">{t("adminLogin")}</p>
        <h1 className="heading mt-2 text-[length:var(--type-h1)]">
          {t(step === "login" ? "adminLoginTitle" : "adminTwoFactor")}
        </h1>
        <p className="mt-2 text-[var(--wf-muted)]">
          {t(step === "login" ? "adminLoginIntro" : "adminTwoFactorIntro")}
        </p>
        {step === "login" ? (
          <form
            className="mt-7 grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              setStep("twoFactor");
            }}
          >
            <label className="grid gap-2 font-bold">
              {t("emailAddress")}
              <Input required type="email" placeholder={t("emailPlaceholder")} />
            </label>
            <label className="grid gap-2 font-bold">
              {t("password")}
              <PasswordInput t={t} required />
            </label>
            <Button type="submit">{t("continue")}</Button>
          </form>
        ) : (
          <form
            className="mt-7"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = "/admin";
            }}
          >
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <Input
                  key={index}
                  required
                  inputMode="numeric"
                  maxLength={1}
                  className="px-0 text-center text-xl font-bold"
                  aria-label={`${t("otpLabel")} ${index + 1}`}
                />
              ))}
            </div>
            <Button type="submit" className="mt-6 w-full">
              {t("verifyCode")}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

export function AdminDashboardPage({ t }: { t: TFunction }) {
  const metrics: Array<[TranslationKey, string]> = [
    ["revenue", "Rs. 428,500"],
    ["unitSales", "286"],
    ["newStudents", "94"],
    ["activeStudents", "1,284"],
  ];
  return (
    <AdminShell active="/admin" title={t("adminDashboard")} intro={t("adminSimpleNote")} t={t}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([key, value]) => (
          <section className="card p-5" key={key}>
            <p className="text-sm font-bold text-[var(--wf-muted)]">{t(key)}</p>
            <p className="heading mt-2 text-3xl">{value}</p>
            <p className="mt-2 text-xs text-[var(--wf-muted)]">{t("comparedLastMonth")}</p>
          </section>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="card p-5">
          <h2 className="heading text-xl">{t("salesPerUnit")}</h2>
          <div className="mt-6 grid gap-4">
            {[72, 58, 44, 31, 24].map((value, index) => (
              <div className="grid grid-cols-[5rem_1fr_2rem] items-center gap-3" key={value}>
                <span className="font-bold">{t("unitLabel", { number: index + 1 })}</span>
                <div className="h-4 rounded-full bg-[var(--wf-surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--wf-strong)]"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-5">
          <h2 className="heading text-xl">{t("quickActions")}</h2>
          <div className="mt-5 grid gap-3">
            <LinkButton href="/admin/content" className="justify-start" icon="download">
              {t("addContent")}
            </LinkButton>
            <LinkButton
              href="/admin/past-papers"
              variant="outline"
              className="justify-start"
              icon="paper"
            >
              {t("addPaper")}
            </LinkButton>
          </div>
        </section>
      </div>
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="heading text-xl">{t("recentPayments")}</h2>
          <LinkButton href="/admin/payments" variant="text">
            {t("viewAll")}
          </LinkButton>
        </div>
        <SimplePaymentsTable t={t} />
      </section>
    </AdminShell>
  );
}

const unitKeys = Array.from(
  { length: 19 },
  (_, index) => `unit${index + 1}Title` as TranslationKey,
);

export function UnitsManagerPage({ t }: { t: TFunction }) {
  const [selected, setSelected] = useState(1);
  const [subparts, setSubparts] = useState([1, 2, 3, 4]);
  const moveUp = (number: number) => {
    setSubparts((items) => {
      const index = items.indexOf(number);
      if (index <= 0) return items;
      const next = [...items];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };
  return (
    <AdminShell active="/admin/units" title={t("manageUnits")} intro={t("selectUnitToEdit")} t={t}>
      <div className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
        <section className="card max-h-[70vh] overflow-y-auto p-2">
          {unitKeys.map((key, index) => (
            <Button
              key={key}
              variant="text"
              className={`w-full justify-start text-left ${selected === index + 1 ? "bg-[var(--wf-surface-muted)]" : ""}`}
              onClick={() => setSelected(index + 1)}
            >
              <span className="w-8">{String(index + 1).padStart(2, "0")}</span>
              {t(key)}
            </Button>
          ))}
        </section>
        <section className="card p-5 sm:p-7">
          <Badge>{t("unitLabel", { number: String(selected).padStart(2, "0") })}</Badge>
          <h2 className="heading mt-4 text-2xl">{t("editUnit")}</h2>
          <div className="mt-6">
            <p className="mb-2 font-bold">{t("unitTitles")}</p>
            <BilingualInput t={t} />
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="heading text-xl">{t("subparts")}</h3>
              <Button
                variant="outline"
                onClick={() => setSubparts((items) => [...items, items.length + 1])}
              >
                + {t("addSubpart")}
              </Button>
            </div>
            <div className="mt-4 grid gap-3">
              {subparts.map((number) => (
                <div className="rounded-[var(--radius-button)] border p-4" key={number}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">
                      {selected}.{number}
                    </span>
                    <div className="min-w-52 flex-1">
                      <BilingualInput t={t} />
                    </div>
                    <Button
                      variant="text"
                      disabled={subparts[0] === number}
                      onClick={() => moveUp(number)}
                    >
                      ↑ {t("reorder")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setSubparts((items) => items.filter((item) => item !== number))
                      }
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button className="mt-6">{t("saveUnit")}</Button>
        </section>
      </div>
    </AdminShell>
  );
}

function Selectors({ t }: { t: TFunction }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 font-bold">
        {t("chooseUnit")}
        <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
          <option>{t("unitLabel", { number: "01" })}</option>
        </select>
      </label>
      <label className="grid gap-2 font-bold">
        {t("chooseSubpart")}
        <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
          <option>1.1 — {t("subpart1")}</option>
        </select>
      </label>
    </div>
  );
}

function UploadBlock({ title, t }: { title: string; t: TFunction }) {
  return (
    <div className="rounded-[var(--radius-button)] border p-4">
      <p className="mb-3 font-bold">{title}</p>
      <UploadWidget t={t} />
    </div>
  );
}

export function ContentUploadPage({ t }: { t: TFunction }) {
  return (
    <AdminShell
      active="/admin/content"
      title={t("uploadContentTitle")}
      intro={t("adminSimpleNote")}
      t={t}
    >
      <div className="card p-5 sm:p-7">
        <Selectors t={t} />
        <div className="mt-6">
          <p className="mb-2 font-bold">{t("contentTitles")}</p>
          <BilingualInput t={t} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <UploadBlock title={t("teachingVideoUpload")} t={t} />
          <UploadBlock title={t("theoryNoteUpload")} t={t} />
          <UploadBlock title={t("questionsPdfUpload")} t={t} />
          <div className="rounded-[var(--radius-button)] border p-4">
            <p className="font-bold">{t("discussionUpload")}</p>
            <label className="mt-3 grid gap-2 font-bold">
              {t("discussionType")}
              <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
                <option>{t("tabMcq")}</option>
                <option>{t("tabStructured")}</option>
                <option>{t("tabEssay")}</option>
              </select>
            </label>
            <div className="mt-3">
              <UploadWidget t={t} />
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-[var(--radius-button)] bg-[var(--wf-surface-muted)] p-4">
          <div className="flex justify-between font-bold">
            <span>{t("uploadProgress")}</span>
            <span>{t("uploading", { percent: 68 })}</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--wf-surface)]">
            <div className="h-full w-[68%] bg-[var(--wf-strong)]" />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

export function PastPapersManagerPage({ t }: { t: TFunction }) {
  return (
    <AdminShell
      active="/admin/past-papers"
      title={t("pastPapersManager")}
      intro={t("addPastPaperYear")}
      t={t}
    >
      <form className="card grid gap-6 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 font-bold">
            {t("year")}
            <Input type="number" defaultValue="2025" />
          </label>
          <label className="grid gap-2 font-bold">
            {t("setPrice")}
            <Input defaultValue="750" />
          </label>
        </div>
        <UploadBlock title={t("questionPaper")} t={t} />
        <UploadBlock title={t("markingScheme")} t={t} />
        <Button className="w-fit">{t("savePastPaper")}</Button>
      </form>
    </AdminShell>
  );
}

export function PricingPage({ t }: { t: TFunction }) {
  return (
    <AdminShell
      active="/admin/pricing"
      title={t("pricingTitle")}
      intro={t("adminSimpleNote")}
      t={t}
    >
      <form className="card grid gap-6 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 font-bold">
          {t("unitPriceSetting")}
          <Input defaultValue="1500" />
        </label>
        <label className="grid gap-2 font-bold">
          {t("paperPriceSetting")}
          <Input defaultValue="750" />
        </label>
        <label className="grid gap-2 font-bold">
          {t("accessDuration")}
          <Input disabled value={t("configurableTbd")} />
        </label>
        <Annotation>{t("configurableTbd")}</Annotation>
        <Button className="w-fit">{t("savePrices")}</Button>
      </form>
    </AdminShell>
  );
}

export function StudentsPage({ t }: { t: TFunction }) {
  const [query, setQuery] = useState("");
  const [access, setAccess] = useState<Record<string, boolean>>({});
  const students = [t("sampleStudentName"), "Kavindi Silva", "Ahamed Rizwan"].filter((name) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <AdminShell active="/admin/students" title={t("studentManagement")} intro={t("students")} t={t}>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("searchStudents")}
      />
      <AdminTable>
        <table className="mt-0 w-full min-w-3xl text-left">
          <thead className="bg-[var(--wf-surface-muted)]">
            <tr>
              <th className="p-4">{t("fullName")}</th>
              <th className="p-4">{t("mobileNumber")}</th>
              <th className="p-4">{t("purchases")}</th>
              <th className="p-4">{t("access")}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((name, index) => (
              <tr className="border-t" key={name}>
                <td className="p-4 font-bold">{name}</td>
                <td className="p-4">077 123 48{21 + index}</td>
                <td className="p-4">
                  <Button variant="text">{t("viewPurchases")}</Button>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      icon={access[name] ? "check" : "lock"}
                      variant={access[name] ? "purchased" : "locked"}
                    >
                      {access[name] ? t("readyToWatch") : t("locked")}
                    </Badge>
                    <Button
                      variant="outline"
                      onClick={() => setAccess((current) => ({ ...current, [name]: true }))}
                    >
                      {t("grantAccess")}
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setAccess((current) => ({ ...current, [name]: false }))}
                    >
                      {t("revokeAccess")}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </AdminShell>
  );
}

function SimplePaymentsTable({ t, approval = false }: { t: TFunction; approval?: boolean }) {
  const [approved, setApproved] = useState(false);
  return (
    <AdminTable>
      <table className="w-full min-w-3xl text-left">
        <thead className="bg-[var(--wf-surface-muted)]">
          <tr>
            {(["date", "fullName", "purchase", "amount", "status"] as TranslationKey[]).map(
              (key) => (
                <th className="p-4" key={key}>
                  {t(key)}
                </th>
              ),
            )}
            {approval && <th className="p-4">{t("bankSlip")}</th>}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2].map((index) => (
            <tr className="border-t" key={index}>
              <td className="p-4">18 Apr 2026</td>
              <td className="p-4 font-bold">{index ? "Kavindi Silva" : t("sampleStudentName")}</td>
              <td className="p-4">{t("unitLabel", { number: `0${index + 1}` })}</td>
              <td className="p-4">Rs. 1,500</td>
              <td className="p-4">
                <Badge
                  variant={index === 0 && approval && !approved ? "price" : "purchased"}
                  icon={index === 0 && approval && !approved ? "lock" : "check"}
                >
                  {index === 0 && approval && !approved ? t("pending") : t("paid")}
                </Badge>
              </td>
              {approval && (
                <td className="p-4">
                  {index === 0 && !approved ? (
                    <div className="flex gap-2">
                      <Button variant="outline">{t("reviewSlip")}</Button>
                      <Button onClick={() => setApproved(true)}>{t("approve")}</Button>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTable>
  );
}

export function PaymentsPage({ t }: { t: TFunction }) {
  return (
    <AdminShell
      active="/admin/payments"
      title={t("paymentManagement")}
      intro={t("manualApprovalNote")}
      t={t}
    >
      <div className="mb-5 flex flex-wrap gap-3">
        <label className="grid gap-1 font-bold">
          {t("filterStatus")}
          <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
            <option>{t("allStatuses")}</option>
            <option>{t("paid")}</option>
            <option>{t("pending")}</option>
            <option>{t("failed")}</option>
          </select>
        </label>
      </div>
      <SimplePaymentsTable t={t} approval />
    </AdminShell>
  );
}

export function SiteSettingsPage({ t }: { t: TFunction }) {
  return (
    <AdminShell
      active="/admin/settings"
      title={t("teacherProfileSettings")}
      intro={t("siteSettings")}
      t={t}
    >
      <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
        <section className="card p-5 sm:p-7">
          <h2 className="heading text-xl">{t("introText")}</h2>
          <div className="mt-4">
            <BilingualInput t={t} />
          </div>
          <div className="mt-5">
            <UploadBlock title={t("introVideoUpload")} t={t} />
          </div>
        </section>
        <section className="card p-5 sm:p-7">
          <h2 className="heading text-xl">{t("statistics")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input defaultValue="18+" />
            <Input defaultValue="7,500+" />
            <Input defaultValue="620+" />
          </div>
        </section>
        <section className="card p-5 sm:p-7">
          <h2 className="heading text-xl">{t("testimonials")}</h2>
          <div className="mt-4">
            <BilingualInput t={t} />
          </div>
        </section>
        <section className="card p-5 sm:p-7">
          <h2 className="heading text-xl">{t("contactDetails")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input defaultValue="+94 77 123 4567" />
            <Input defaultValue="hello@alagriculture.lk" />
          </div>
          <label className="mt-5 grid gap-2 font-bold">
            {t("defaultSiteLanguage")}
            <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4">
              <option>{t("languageSinhalaFull")}</option>
              <option>{t("languageEnglishFull")}</option>
            </select>
          </label>
        </section>
        <Button className="w-fit">{t("saveSettings")}</Button>
      </form>
    </AdminShell>
  );
}
