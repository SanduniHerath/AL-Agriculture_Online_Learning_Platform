import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { translate, type Language, type TranslationKey } from "./translations";
import {
  Annotation,
  Badge,
  BottomNav,
  Button,
  Icon,
  Input,
  LanguageSwitch,
  LinkButton,
  Modal,
  PDFDownloadItem,
  PasswordInput,
  PhoneInput,
  SkeletonLoader,
  StickyUnlockBar,
  SubPartAccordion,
  Tabs,
  TopNav,
  UnitCard,
  VideoListItem,
  type Theme,
  type UserState,
} from "./components/ui";

const AdminLoginPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.AdminLoginPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.AdminDashboardPage })),
);
const UnitsManagerPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.UnitsManagerPage })),
);
const ContentUploadPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.ContentUploadPage })),
);
const PastPapersManagerPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.PastPapersManagerPage })),
);
const PricingPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.PricingPage })),
);
const StudentsPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.StudentsPage })),
);
const PaymentsPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.PaymentsPage })),
);
const SiteSettingsPage = lazy(() =>
  import("./pages/admin").then((module) => ({ default: module.SiteSettingsPage })),
);
const AccountPage = lazy(() =>
  import("./pages/flows").then((module) => ({ default: module.AccountPage })),
);
const CheckoutPage = lazy(() =>
  import("./pages/flows").then((module) => ({ default: module.CheckoutPage })),
);
const PaymentResultPage = lazy(() =>
  import("./pages/flows").then((module) => ({ default: module.PaymentResultPage })),
);
const SystemStatePage = lazy(() =>
  import("./pages/flows").then((module) => ({ default: module.SystemStatePage })),
);

function usePrototypeSettings() {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("agri-language") as Language) || "si",
  );
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("agri-theme") as Theme) || "light",
  );
  const queryState = new URLSearchParams(window.location.search).get("state") as UserState | null;
  const [userState, setUserState] = useState<UserState>(queryState || "visitor");
  useEffect(() => {
    localStorage.setItem("agri-language", language);
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    localStorage.setItem("agri-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return { language, setLanguage, theme, setTheme, userState, setUserState };
}

function Layout({
  children,
  language,
  setLanguage,
  t,
}: {
  children: React.ReactNode;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}) {
  const path = window.location.pathname;
  const isAdmin = path.startsWith("/admin");
  return (
    <div className={`wireframe page-shell ${isAdmin ? "pb-0" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only">
        {t("skipToContent")}
      </a>
      <TopNav language={language} onLanguage={setLanguage} t={t} path={path} />
      {children}
      {!isAdmin && <BottomNav t={t} path={path} />}
    </div>
  );
}

function WireframeLabel({ t }: { t: (key: TranslationKey) => string }) {
  void t;
  return null;
}

function Placeholder({ label, kind = "image" }: { label: string; kind?: "image" | "video" }) {
  return (
    <div
      className={`placeholder w-full rounded-[var(--radius-card)] ${kind === "video" ? "aspect-video" : "aspect-[4/5]"}`}
    >
      <div className="flex max-w-[75%] flex-col items-center gap-2 text-center text-sm font-semibold">
        <Icon name={kind === "video" ? "play" : "user"} size={kind === "video" ? 32 : 48} />
        <span>{label}</span>
      </div>
    </div>
  );
}

function Footer({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <footer className="mt-16 border-t border-transparent bg-[var(--color-footer)] py-12 text-[var(--color-footer-text)]">
      <div className="container-main grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 font-bold text-[var(--color-footer-text)]">
            <Icon name="leaf" />
            {t("brand")}
          </div>
          <p className="max-w-sm text-[color-mix(in_srgb,var(--color-footer-text)_72%,transparent)]">
            {t("footerTagline")}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-bold text-[var(--color-footer-text)]">{t("contact")}</h2>
          <p>{t("contactPhone")}</p>
          <p>{t("contactEmail")}</p>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-bold text-[var(--color-footer-text)]">{t("legal")}</h2>
          <div className="grid gap-2">
            <a className="flex min-h-12 items-center" href="#privacy">
              {t("privacy")}
            </a>
            <a className="flex min-h-12 items-center" href="#terms">
              {t("terms")}
            </a>
            <a className="flex min-h-12 items-center" href="#refund">
              {t("refund")}
            </a>
          </div>
        </div>
      </div>
      <div className="container-main mt-8 border-t border-[var(--color-footer-border)] pt-6 text-sm text-[color-mix(in_srgb,var(--color-footer-text)_68%,transparent)]">
        {t("copyright")}
      </div>
    </footer>
  );
}

function HomePage({
  t,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}) {
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="hero-organic py-10 lg:py-16">
        <div className="container-main">
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{t("homeEyebrow")}</p>
              <h1 className="heading mt-3 max-w-3xl text-[length:var(--type-display)]">
                {t("homePromise")}
              </h1>
              <p className="mt-4 text-xl font-bold text-[var(--color-text)]">{t("teacherName")}</p>
              <p className="mt-3 font-semibold text-[var(--wf-muted)]">
                {t("teacherQualifications")}
              </p>
              <p className="mt-5 max-w-2xl text-[length:var(--type-body-lg)] text-[var(--wf-muted)]">
                {t("heroDescription")}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/units" icon="arrow">
                  {t("startLearning")}
                </LinkButton>
                <LinkButton href="#introduction" variant="outline" icon="play">
                  {t("watchIntroduction")}
                </LinkButton>
              </div>
            </div>
            <div className="mx-auto grid w-full max-w-lg gap-4">
              <div className="mx-auto w-full max-w-sm rounded-[var(--radius-card)] bg-[var(--color-primary-soft)] p-4">
                <Placeholder label={t("teacherPhoto")} />
              </div>
              <div id="introduction">
                <Placeholder label={t("introVideo")} kind="video" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y bg-[var(--color-primary-soft)]">
        <div className="container-main grid grid-cols-3 divide-x py-6 text-center">
          {[
            ["18+", "statYears"],
            ["7,500+", "statStudents"],
            ["620+", "statPasses"],
          ].map(([value, key]) => (
            <div className="px-2" key={key}>
              <p className="heading text-2xl sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs text-[var(--wf-muted)] sm:text-sm">
                {t(key as TranslationKey)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-main py-14 lg:py-20">
        <h2 className="heading max-w-2xl text-[length:var(--type-h2)]">{t("howItWorks")}</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["book", "chooseUnitStep", "chooseUnitStepBody"],
            ["download", "freeNotesStep", "freeNotesStepBody"],
            ["unlock", "unlockStep", "unlockStepBody"],
          ].map(([icon, title, body], index) => (
            <div className="card p-6" key={title}>
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Icon name={icon as "book" | "download" | "unlock"} />
                </span>
                <span className="font-[var(--font-heading-en)] text-3xl font-bold text-[var(--color-primary-soft)]">
                  0{index + 1}
                </span>
              </div>
              <h3 className="heading mt-5 text-xl">{t(title as TranslationKey)}</h3>
              <p className="mt-2 text-[var(--color-text-muted)]">{t(body as TranslationKey)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-primary-soft)] py-14 lg:py-20">
        <div className="container-main">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="heading text-[length:var(--type-h2)]">{t("popularUnits")}</h2>
              <p className="mt-2 text-[var(--color-text-muted)]">{t("popularUnitsBody")}</p>
            </div>
            <LinkButton href="/units" variant="outline">
              {t("navUnits")}
              <Icon name="arrow" />
            </LinkButton>
          </div>
          <div className="mt-7 grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-[48%] lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
            {[1, 2, 3, 4].map((number) => (
              <UnitCard
                key={number}
                number={number}
                title={t(unitTitleKeys[number - 1])}
                videos={12}
                status={number === 1 ? "purchased" : "locked"}
                price="1,500"
                progress={number === 1 ? 42 : undefined}
                t={t}
                href={`/units/1?state=${number === 1 ? "purchased" : "logged"}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container-main py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">01</p>
            <h2 className="heading mt-2 text-[length:var(--type-h2)]">{t("aboutTitle")}</h2>
            <p className="mt-4 text-[var(--wf-muted)]">{t("aboutBody")}</p>
          </div>
          <div className="card p-6">
            <h2 className="heading text-[length:var(--type-h2)]">{t("resultsTitle")}</h2>
            <div className="mt-5 grid gap-4">
              {["resultOne", "resultTwo"].map((key) => (
                <div className="flex gap-3" key={key}>
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--wf-surface-muted)]">
                    <Icon name="check" size={16} />
                  </span>
                  <p>{t(key as TranslationKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[var(--wf-surface-muted)] py-14">
        <div className="container-main">
          <h2 className="heading text-[length:var(--type-h2)]">{t("testimonialsTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[1, 2].map((item) => (
              <blockquote className="card p-6" key={item}>
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Icon name="user" />
                </span>
                <p className="text-lg">{t(item === 1 ? "testimonialOne" : "testimonialTwo")}</p>
                <footer className="mt-4 text-sm font-bold text-[var(--wf-muted)]">
                  {t(item === 1 ? "testimonialOneBy" : "testimonialTwoBy")}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <section className="container-main py-14">
        <div className="card flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="heading text-[length:var(--type-h2)]">{t("contactTitle")}</h2>
            <p className="mt-2 text-[var(--wf-muted)]">{t("contactBody")}</p>
          </div>
          <Button variant="outline" icon="message">
            {t("whatsapp")}
          </Button>
        </div>
      </section>
      <section className="border-y bg-[var(--color-surface)] py-6">
        <div className="container-main grid gap-4 text-sm font-semibold sm:grid-cols-3">
          {[
            ["lock", "trustSecure"],
            ["check", "trustFlexible"],
            ["message", "trustSupport"],
          ].map(([icon, key]) => (
            <div className="flex items-center gap-3" key={key}>
              <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <Icon name={icon as "lock" | "check" | "message"} />
              </span>
              {t(key as TranslationKey)}
            </div>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  );
}

const unitTitleKeys = Array.from(
  { length: 19 },
  (_, index) => `unit${index + 1}Title` as TranslationKey,
);

function UnitsPage({
  t,
  userState,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  userState: UserState;
}) {
  const [grade, setGrade] = useState("12");
  const [search, setSearch] = useState("");
  const units = Array.from({ length: 19 }, (_, index) => index + 1)
    .filter((number) => (grade === "12" ? number <= 9 : number >= 10))
    .filter((number) =>
      t(unitTitleKeys[number - 1])
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-10 lg:py-14">
        <p className="eyebrow">{t("unitsEyebrow")}</p>
        <h1 className="heading mt-3 max-w-3xl text-[length:var(--type-h1)]">{t("unitsTitle")}</h1>
        <p className="mt-4 max-w-3xl text-[var(--wf-muted)]">{t("unitsDescription")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,24rem)_minmax(0,22rem)]">
          <Tabs
            tabs={[
              { id: "12", label: t("grade12") },
              { id: "13", label: t("grade13") },
            ]}
            active={grade}
            onChange={setGrade}
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchUnits")}
            aria-label={t("searchUnits")}
          />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {units.map((number) => {
            const status =
              number === 1 && userState === "purchased"
                ? "purchased"
                : number % 5 === 0
                  ? "free"
                  : "locked";
            return (
              <UnitCard
                key={number}
                number={number}
                title={t(unitTitleKeys[number - 1])}
                videos={10 + (number % 5)}
                status={status}
                price={number < 10 ? "1,500" : "1,750"}
                progress={number === 1 ? 42 : undefined}
                t={t}
                href={`/units/1?state=${userState}`}
              />
            );
          })}
        </div>
      </section>
      <Footer t={t} />
    </main>
  );
}

function UnlockCard({
  state,
  t,
  onUnlock,
}: {
  state: UserState;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  onUnlock: () => void;
}) {
  return (
    <aside className="card sticky top-24 p-6">
      {state === "purchased" ? (
        <>
          <Badge variant="purchased" icon="check">
            {t("purchased")}
          </Badge>
          <h2 className="heading mt-4 text-xl">{t("unitUnlocked")}</h2>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--color-primary-soft)]">
            <div className="h-full w-[42%] rounded-full bg-[var(--color-secondary)]" />
          </div>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {t("progressComplete", { percent: 42 })}
          </p>
        </>
      ) : (
        <>
          <Badge variant="price">{t("unitPrice")}</Badge>
          <p className="heading mt-5 text-3xl">{t("unitPrice")}</p>
          <p className="mt-2 text-sm text-[var(--wf-muted)]">{t("lifetimeAccess")}</p>
          <div className="mt-5 grid gap-3 border-y py-5 text-sm">
            {(["includedVideos", "includedDiscussions", "includedAccess"] as TranslationKey[]).map(
              (key) => (
                <p className="flex gap-2" key={key}>
                  <span className="text-[var(--color-secondary)]">
                    <Icon name="check" size={18} />
                  </span>
                  {t(key)}
                </p>
              ),
            )}
          </div>
          <Button
            className="mt-5 w-full"
            icon={state === "visitor" ? "lock" : "unlock"}
            onClick={onUnlock}
          >
            {state === "visitor" ? t("registerToUnlock") : t("unlockUnit")}
          </Button>
          <p className="mt-3 text-center text-xs text-[var(--wf-muted)]">{t("securePayment")}</p>
        </>
      )}
    </aside>
  );
}

function UnitDetailPage({
  t,
  state,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  state: UserState;
}) {
  const [discussionTab, setDiscussionTab] = useState("mcq");
  const [modalOpen, setModalOpen] = useState(false);
  const unlocked = state === "purchased";
  const unlock = () => {
    if (state === "visitor") {
      setModalOpen(true);
      return;
    }
    window.location.href = "/checkout?item=unit";
  };
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-8 lg:py-12">
        <a
          href="/units"
          className="inline-flex min-h-12 items-center gap-2 font-semibold text-[var(--color-primary)]"
        >
          {t("navUnits")} <span aria-hidden="true">›</span> {t("unitLabel", { number: "01" })}
        </a>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              <span className="font-[var(--font-heading-en)] text-6xl font-bold leading-none tabular-nums text-[var(--color-primary)] sm:text-7xl">
                01
              </span>
              <div>
                <p className="eyebrow">{t("unitDetailEyebrow")}</p>
                <h1 className="heading mt-2 text-[length:var(--type-h1)]">{t("unit1Title")}</h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-[var(--wf-muted)]">{t("unitDetailIntro")}</p>
            <p className="mt-3 font-semibold text-[var(--color-primary)]">{t("unitMeta")}</p>
            {unlocked && (
              <div className="mt-6 rounded-[var(--radius-card)] border bg-[var(--color-primary-soft)] p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">{t("progressComplete", { percent: 42 })}</span>
                  <span>42%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface)]">
                  <div className="h-full w-[42%] rounded-full bg-[var(--color-secondary)]" />
                </div>
                <LinkButton href="/video-player" className="mt-4 w-full sm:w-auto" icon="play">
                  {t("resumeLesson")}
                </LinkButton>
              </div>
            )}
            <section className="mt-10 rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-secondary)_35%,var(--color-border))] bg-[var(--color-primary-soft)] p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="heading text-[length:var(--type-h2)]">{t("freeSectionTitle")}</h2>
                <Badge variant="free" icon="leaf">
                  {t("free")}
                </Badge>
              </div>
              <p className="mt-2 text-[var(--wf-muted)]">{t("freeSectionBody")}</p>
              <div className="mt-5 grid gap-3">
                <PDFDownloadItem title={t("theoryNote")} meta="PDF" size="4.8 MB" t={t} />
                <PDFDownloadItem
                  title={t("pastPaperQuestions")}
                  meta={t("thirtyYears")}
                  size="12.6 MB"
                  t={t}
                />
              </div>
            </section>
            <section className="mt-12">
              <h2 className="heading text-[length:var(--type-h2)]">{t("teachingVideos")}</h2>
              <p className="mt-2 text-[var(--wf-muted)]">{t("teachingBody")}</p>
              <div className="mt-5 grid gap-3">
                {[1, 2, 3, 4].map((number) => (
                  <SubPartAccordion
                    key={number}
                    number={`1.${number}`}
                    title={t(`subpart${number}` as TranslationKey)}
                    unlocked={unlocked}
                    defaultOpen={number === 1}
                    t={t}
                  />
                ))}
              </div>
            </section>
            <section className="mt-12">
              <h2 className="heading text-[length:var(--type-h2)]">{t("discussions")}</h2>
              <p className="mt-2 text-[var(--wf-muted)]">{t("discussionsBody")}</p>
              <div className="mt-5">
                <Tabs
                  tabs={[
                    { id: "mcq", label: t("tabMcq"), count: 12 },
                    { id: "structured", label: t("tabStructured"), count: 8 },
                    { id: "essay", label: t("tabEssay"), count: 6 },
                  ]}
                  active={discussionTab}
                  onChange={setDiscussionTab}
                />
              </div>
              <div className="card mt-4 px-5">
                {[2025, 2024, 2023, 2022].map((year) => (
                  <VideoListItem
                    key={year}
                    title={t("paperVideoTitle", {
                      year,
                      type: t(
                        discussionTab === "mcq"
                          ? "tabMcq"
                          : discussionTab === "structured"
                            ? "tabStructured"
                            : "tabEssay",
                      ),
                    })}
                    duration={discussionTab === "essay" ? "24:10" : "16:30"}
                    unlocked={unlocked}
                    t={t}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="hidden lg:block">
            <UnlockCard state={state} t={t} onUnlock={unlock} />
          </div>
        </div>
      </section>
      <Footer t={t} />
      <StickyUnlockBar state={state} t={t} onUnlock={unlock} />
      <Modal
        open={modalOpen}
        title={t("createAccountToContinue")}
        onClose={() => setModalOpen(false)}
        t={t}
      >
        <p>{t("registerIntro")}</p>
        <LinkButton href="/register" className="mt-5 w-full">
          {t("registerToUnlock")}
        </LinkButton>
      </Modal>
    </main>
  );
}

function VideoPlayerPage({
  t,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}) {
  const [lesson, setLesson] = useState(0);
  const [complete, setComplete] = useState(false);
  const lessonKeys = ["subpart1", "subpart2", "subpart3", "subpart4"] as TranslationKey[];
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-8 lg:py-12">
        <a
          href="/units/1?state=purchased"
          className="inline-flex min-h-12 items-center gap-2 font-bold text-[var(--color-primary)]"
        >
          ← {t("backToUnit")}
        </a>
        <div className="mt-6">
          <p className="eyebrow">{t("nowPlaying")}</p>
          <h1 className="heading mt-2 text-[length:var(--type-h1)]">
            {t("subpartTitle", { number: `1.${lesson + 1}`, title: t(lessonKeys[lesson]) })}
          </h1>
          <p className="mt-2 text-[var(--wf-muted)]">
            {t("lessonPosition", { current: lesson + 1, total: 4 })}
          </p>
        </div>
        <div className="-mx-4 mt-7 grid overflow-hidden bg-[var(--color-player)] text-[var(--color-player-text)] sm:mx-0 sm:rounded-[var(--radius-video)]">
          <div className="aspect-video [grid-area:1/1] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-current">
                <Icon name="play" size={30} />
              </span>
              <span className="font-semibold">{t("videoPlaceholder")}</span>
            </div>
          </div>
          <div className="[grid-area:1/1] m-4 self-center justify-self-end rounded border border-[var(--color-player-text)] bg-[var(--color-player)] px-3 py-2 text-xs font-bold text-[var(--color-player-text)] opacity-70">
            {t("studentWatermark")}
          </div>
        </div>
        <div className="mt-4">
          <Annotation>{t("watermarkNote")}</Annotation>
        </div>
        <div className="mt-5 flex flex-col gap-3 rounded-[var(--radius-card)] border bg-[var(--wf-surface)] p-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="grid gap-1 text-sm font-bold">
            {t("playbackSpeed")}
            <select className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-3">
              <option>0.75×</option>
              <option>1×</option>
              <option>1.25×</option>
              <option>1.5×</option>
              <option>2×</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              disabled={lesson === 0}
              onClick={() => setLesson((current) => Math.max(0, current - 1))}
            >
              ← {t("previousLesson")}
            </Button>
            <Button
              disabled={lesson === 3}
              onClick={() => setLesson((current) => Math.min(3, current + 1))}
            >
              {t("nextLesson")} <Icon name="arrow" />
            </Button>
          </div>
        </div>
        <Button
          variant={complete ? "secondary" : "outline"}
          icon="check"
          className="mt-4 w-full sm:w-auto"
          onClick={() => setComplete((value) => !value)}
        >
          {complete ? t("lessonCompleted") : t("markComplete")}
        </Button>
        <section className="mt-12">
          <h2 className="heading text-[length:var(--type-h2)]">{t("otherSubparts")}</h2>
          <p className="mt-2 text-[var(--wf-muted)]">{t("otherSubpartsBody")}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {lessonKeys.map((key, index) => (
              <Button
                key={key}
                variant={lesson === index ? "secondary" : "outline"}
                className="h-auto justify-start p-4 text-left"
                onClick={() => setLesson(index)}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                  {lesson === index ? (
                    <Icon name="play" />
                  ) : index < lesson ? (
                    <Icon name="check" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span>
                  <span className="block">
                    {t("subpartTitle", { number: `1.${index + 1}`, title: t(key) })}
                  </span>
                  <span className="mt-1 block text-sm font-normal text-[var(--wf-muted)]">
                    {lesson === index
                      ? t("currentlyPlaying")
                      : index < lesson
                        ? t("completed")
                        : t("notStarted")}
                  </span>
                </span>
              </Button>
            ))}
          </div>
        </section>
      </section>
      <Footer t={t} />
    </main>
  );
}

function PDFViewerPage({
  t,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [downloaded, setDownloaded] = useState(false);
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-8 lg:py-12">
        <a
          href="/units/1"
          className="inline-flex min-h-12 items-center gap-2 font-bold text-[var(--color-primary)]"
        >
          ← {t("backToUnit")}
        </a>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{t("pdfViewerEyebrow")}</p>
            <h1 className="heading mt-2 text-[length:var(--type-h1)]">{t("openPdfTitle")}</h1>
            <p className="mt-2 text-[var(--wf-muted)]">{t("pdfFileMeta", { size: "4.8 MB" })}</p>
          </div>
          <Button icon={downloaded ? "check" : "download"} onClick={() => setDownloaded(true)}>
            {downloaded ? t("downloaded") : t("download")}
          </Button>
        </div>
        <div className="mt-6 rounded-[var(--radius-card)] border bg-[var(--wf-surface-muted)] p-3 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] p-2">
            <div className="flex items-center gap-2">
              <Button
                variant="text"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                ←
              </Button>
              <span className="text-sm font-bold">
                {t("pdfPage", { current: page, total: 18 })}
              </span>
              <Button
                variant="text"
                disabled={page === 18}
                onClick={() => setPage((current) => Math.min(18, current + 1))}
              >
                →
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="text"
                aria-label={t("zoomOut")}
                onClick={() => setZoom((current) => Math.max(75, current - 25))}
              >
                −
              </Button>
              <span className="min-w-14 text-center text-sm font-bold">{zoom}%</span>
              <Button
                variant="text"
                aria-label={t("zoomIn")}
                onClick={() => setZoom((current) => Math.min(150, current + 25))}
              >
                +
              </Button>
            </div>
          </div>
          <div className="mx-auto flex aspect-[1/1.414] w-full max-w-2xl flex-col bg-[var(--wf-surface)] p-8 shadow-lg">
            <div className="border-b pb-5">
              <p className="eyebrow">{t("unitDetailEyebrow")}</p>
              <h2 className="heading mt-2 text-2xl">{t("unit1Title")}</h2>
            </div>
            <div className="placeholder mt-6 flex-1 rounded-[var(--radius-button)]">
              <span className="text-center font-semibold">
                {t("pdfDocumentPlaceholder")} · {t("pdfPage", { current: page, total: 18 })}
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="h-3 w-full rounded bg-[var(--wf-surface-muted)]" />
              <div className="h-3 w-11/12 rounded bg-[var(--wf-surface-muted)]" />
              <div className="h-3 w-4/5 rounded bg-[var(--wf-surface-muted)]" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Annotation>{t("pdfViewerNote")}</Annotation>
        </div>
      </section>
    </main>
  );
}

function PastPaperCard({
  year,
  purchased,
  t,
  onBuy,
}: {
  year: number;
  purchased: boolean;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  onBuy: () => void;
}) {
  return (
    <article className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{year}</p>
          <h2 className="heading mt-1 text-xl">{t("paperYear", { year })}</h2>
        </div>
        <Badge icon={purchased ? "check" : "lock"} variant={purchased ? "purchased" : "locked"}>
          {purchased ? t("yearPurchased") : t("locked")}
        </Badge>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["questionPaper", "2.6 MB"],
          ["markingScheme", "3.1 MB"],
        ].map(([key, size]) => (
          <div
            className="flex items-center gap-3 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] p-3"
            key={key}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--wf-surface-muted)]">
              <Icon name={purchased ? "paper" : "lock"} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{t(key as TranslationKey)}</p>
              <p className="text-xs text-[var(--wf-muted)]">{t("pdfFileMeta", { size })}</p>
            </div>
            {purchased && (
              <a
                className="inline-flex min-h-12 items-center text-sm font-bold text-[var(--color-primary)] underline"
                href="/pdf-viewer"
              >
                {t("openDocument")}
              </a>
            )}
          </div>
        ))}
      </div>
      {!purchased && (
        <Button className="mt-4 w-full" icon="unlock" onClick={onBuy}>
          {t("buyYear", { price: year >= 2020 ? "750" : "500" })}
        </Button>
      )}
    </article>
  );
}

function PastPapersPage({
  t,
  state,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  state: UserState;
}) {
  const years = Array.from({ length: 30 }, (_, index) => 2025 - index);
  const purchasedYear = state === "purchased" ? 2025 : null;
  const decades = [2020, 2010, 2000, 1990];
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-10 lg:py-14">
        <p className="eyebrow">{t("pastPapersEyebrow")}</p>
        <h1 className="heading mt-3 max-w-3xl text-[length:var(--type-h1)]">
          {t("pastPapersTitle")}
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--wf-muted)]">{t("pastPapersIntro")}</p>
        <div className="mt-6">
          <Annotation>{t(purchasedYear ? "paperPurchasedNote" : "paperLockedNote")}</Annotation>
        </div>
        <div className="mt-10 grid gap-12">
          {decades.map((decade) => (
            <section key={decade}>
              <h2 className="heading mb-5 border-b pb-3 text-[length:var(--type-h2)]">
                {t("decadeLabel", { decade })}
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {years
                  .filter((year) => Math.floor(year / 10) * 10 === decade)
                  .map((year) => (
                    <PastPaperCard
                      key={year}
                      year={year}
                      purchased={purchasedYear === year}
                      t={t}
                      onBuy={() => {
                        if (state === "visitor") {
                          window.location.href = "/login";
                          return;
                        }
                        window.location.href = `/checkout?item=paper&year=${year}`;
                      }}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 font-bold">
      <span>{label}</span>
      {children}
      {hint && <span className="text-xs font-normal text-[var(--wf-muted)]">{hint}</span>}
    </label>
  );
}

function AuthPageShell({
  eyebrow,
  title,
  intro,
  children,
  t,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  t: (key: TranslationKey) => string;
}) {
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-10 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="heading mt-3 text-[length:var(--type-h1)]">{title}</h1>
          <p className="mt-3 text-[var(--wf-muted)]">{intro}</p>
          <div className="card mt-7 p-5 sm:p-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

function RegisterPage({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <AuthPageShell
      eyebrow={t("registerScreen")}
      title={t("createAccount")}
      intro={t("registerIntro")}
      t={t}
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>{t("registerScreen")}</span>
          <span>{t("registrationStep", { current: 1 })}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="h-2 rounded-full bg-[var(--color-secondary)]" />
          <span className="h-2 rounded-full bg-[var(--color-primary-soft)]" />
        </div>
      </div>
      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = "/verify-otp";
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label={t("fullName")}>
            <Input required placeholder={t("fullNamePlaceholder")} />
          </FormField>
          <FormField label={t("mobileNumber")} hint={t("whyMobile")}>
            <PhoneInput required placeholder={t("mobilePlaceholder")} />
          </FormField>
        </div>
        <FormField label={t("emailAddress")}>
          <Input required type="email" placeholder={t("emailPlaceholder")} />
        </FormField>
        <FormField label={t("password")} hint={t("passwordHint")}>
          <PasswordInput t={t} required minLength={8} placeholder={t("password")} />
        </FormField>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label={t("examYear")}>
            <select
              required
              defaultValue=""
              className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4"
            >
              <option value="" disabled>
                {t("selectExamYear")}
              </option>
              {[2026, 2027, 2028].map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </FormField>
          <FormField label={t("district")}>
            <select
              required
              defaultValue=""
              className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-4"
            >
              <option value="" disabled>
                {t("selectDistrict")}
              </option>
              <option>{t("districtKandy")}</option>
              <option>{t("districtColombo")}</option>
              <option>{t("districtKurunegala")}</option>
            </select>
          </FormField>
        </div>
        <FormField label={t("school")}>
          <Input required placeholder={t("schoolPlaceholder")} />
        </FormField>
        <FormField label={t("preferredLanguage")}>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] border p-3 font-normal">
              <input type="radio" name="preferred-language" defaultChecked />
              {t("languageSinhalaFull")}
            </label>
            <label className="flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] border p-3 font-normal">
              <input type="radio" name="preferred-language" />
              {t("languageEnglishFull")}
            </label>
          </div>
        </FormField>
        <label className="flex min-h-12 items-start gap-3 py-2 font-normal">
          <input className="mt-1 size-5" type="checkbox" required />
          <span>{t("acceptTerms")}</span>
        </label>
        <Button type="submit" className="w-full">
          {t("registerButton")}
        </Button>
        <p className="text-center text-sm text-[var(--wf-muted)]">
          {t("alreadyAccount")}{" "}
          <a
            className="inline-flex min-h-12 items-center font-bold text-[var(--color-primary)] underline"
            href="/login"
          >
            {t("login")}
          </a>
        </p>
      </form>
    </AuthPageShell>
  );
}

function OTPPage({
  t,
}: {
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}) {
  const [sent, setSent] = useState(false);
  return (
    <AuthPageShell
      eyebrow={t("otpScreen")}
      title={t("otpTitle")}
      intro={t("otpIntro", { mobile: "077 XXX 4821" })}
      t={t}
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>{t("otpScreen")}</span>
          <span>{t("registrationStep", { current: 2 })}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="h-2 rounded-full bg-[var(--color-secondary)]" />
          <span className="h-2 rounded-full bg-[var(--color-secondary)]" />
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = "/units/1?state=logged";
        }}
      >
        <fieldset>
          <legend className="font-bold">{t("otpLabel")}</legend>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Input
                key={index}
                required
                inputMode="numeric"
                maxLength={1}
                aria-label={`${t("otpLabel")} ${index + 1}`}
                className="px-0 text-center text-xl font-bold"
              />
            ))}
          </div>
        </fieldset>
        <Button type="submit" className="mt-6 w-full">
          {t("verifyCode")}
        </Button>
        <div className="mt-5 text-center">
          <p className="text-sm text-[var(--wf-muted)]">
            {sent ? t("resendTimer") : t("codeNotReceived")}
          </p>
          <Button type="button" variant="text" onClick={() => setSent(true)} disabled={sent}>
            {t("resendCode")}
          </Button>
        </div>
        <a
          className="mt-3 flex min-h-12 items-center justify-center text-center text-sm font-bold text-[var(--color-primary)] underline"
          href="/register"
        >
          {t("changeMobile")}
        </a>
        <div className="mt-6">
          <Annotation>{t("otpNote")}</Annotation>
        </div>
      </form>
    </AuthPageShell>
  );
}

function LoginPage({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <AuthPageShell
      eyebrow={t("loginScreen")}
      title={t("welcomeBack")}
      intro={t("loginIntro")}
      t={t}
    >
      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = "/units";
        }}
      >
        <FormField label={t("mobileNumber")}>
          <PhoneInput required placeholder={t("mobilePlaceholder")} />
        </FormField>
        <FormField label={t("password")}>
          <PasswordInput t={t} required placeholder={t("password")} />
        </FormField>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex min-h-12 items-center gap-2">
            <input type="checkbox" />
            {t("rememberMe")}
          </label>
          <a
            className="inline-flex min-h-12 items-center font-bold text-[var(--color-primary)] underline"
            href="/forgot-password"
          >
            {t("forgotPassword")}
          </a>
        </div>
        <Button type="submit" className="w-full">
          {t("login")}
        </Button>
        <p className="text-center text-sm text-[var(--wf-muted)]">
          {t("noAccount")}{" "}
          <a
            className="inline-flex min-h-12 items-center font-bold text-[var(--color-primary)] underline"
            href="/register"
          >
            {t("registerButton")}
          </a>
        </p>
      </form>
    </AuthPageShell>
  );
}

function ForgotPasswordPage({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <AuthPageShell
      eyebrow={t("forgotPasswordScreen")}
      title={t("resetPasswordTitle")}
      intro={t("resetPasswordIntro")}
      t={t}
    >
      <form
        className="grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = "/verify-otp";
        }}
      >
        <FormField label={t("mobileNumber")}>
          <PhoneInput required placeholder={t("mobilePlaceholder")} />
        </FormField>
        <Button type="submit" className="w-full">
          {t("sendOtp")}
        </Button>
        <a
          className="flex min-h-12 items-center justify-center text-center text-sm font-bold text-[var(--color-primary)] underline"
          href="/login"
        >
          ← {t("backToLogin")}
        </a>
      </form>
    </AuthPageShell>
  );
}

function ScreenIndex({
  language,
  setLanguage,
  theme,
  setTheme,
  userState,
  setUserState,
  t,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  userState: UserState;
  setUserState: (state: UserState) => void;
  t: (key: TranslationKey) => string;
}) {
  const screens = [
    { title: "homeScreen" as TranslationKey, href: "/" },
    { title: "unitsScreen" as TranslationKey, href: `/units?state=${userState}` },
  ];
  const states = [
    { title: "detailVisitor" as TranslationKey, href: "/units/1?state=visitor" },
    { title: "detailLogged" as TranslationKey, href: "/units/1?state=logged" },
    { title: "detailPurchased" as TranslationKey, href: "/units/1?state=purchased" },
  ];
  const learning = [
    { title: "videoPlayerScreen" as TranslationKey, href: "/video-player" },
    { title: "pdfViewerScreen" as TranslationKey, href: "/pdf-viewer" },
    { title: "pastPapersLockedScreen" as TranslationKey, href: "/past-papers?state=logged" },
    { title: "pastPapersPurchasedScreen" as TranslationKey, href: "/past-papers?state=purchased" },
  ];
  const account = [
    { title: "registerScreen" as TranslationKey, href: "/register" },
    { title: "otpScreen" as TranslationKey, href: "/verify-otp" },
    { title: "loginScreen" as TranslationKey, href: "/login" },
    { title: "forgotPasswordScreen" as TranslationKey, href: "/forgot-password" },
  ];
  const purchase = [
    { title: "checkoutScreenUnit" as TranslationKey, href: "/checkout?item=unit" },
    { title: "checkoutScreenPaper" as TranslationKey, href: "/checkout?item=paper&year=2025" },
    { title: "paymentSuccessScreen" as TranslationKey, href: "/payment/success?item=unit" },
    { title: "paymentFailedScreen" as TranslationKey, href: "/payment/failed?item=unit" },
    { title: "accountScreen" as TranslationKey, href: "/account" },
  ];
  const system = [
    { title: "emptyScreen" as TranslationKey, href: "/states/empty" },
    { title: "loadingScreen" as TranslationKey, href: "/states/loading" },
    { title: "notFoundScreen" as TranslationKey, href: "/404" },
    { title: "offlineScreen" as TranslationKey, href: "/offline" },
  ];
  const admin = [
    { title: "adminLoginScreen" as TranslationKey, href: "/admin/login" },
    { title: "adminDashboardScreen" as TranslationKey, href: "/admin" },
    { title: "unitsManagerScreen" as TranslationKey, href: "/admin/units" },
    { title: "contentUploadScreen" as TranslationKey, href: "/admin/content" },
    { title: "pastPapersManagerScreen" as TranslationKey, href: "/admin/past-papers" },
    { title: "pricingScreen" as TranslationKey, href: "/admin/pricing" },
    { title: "studentsScreen" as TranslationKey, href: "/admin/students" },
    { title: "paymentsScreen" as TranslationKey, href: "/admin/payments" },
    { title: "settingsScreen" as TranslationKey, href: "/admin/settings" },
  ];
  return (
    <main id="main">
      <WireframeLabel t={t} />
      <section className="container-main py-10">
        <p className="eyebrow">{t("prototypeControls")}</p>
        <h1 className="heading mt-3 text-[length:var(--type-h1)]">{t("screenIndex")}</h1>
        <p className="mt-3 max-w-2xl text-[var(--wf-muted)]">{t("screenIndexIntro")}</p>
        {[
          [t("publicScreens"), screens],
          [t("unitStates"), states],
          [t("learningScreens"), learning],
          [t("accountScreens"), account],
          [t("purchaseScreens"), purchase],
          [t("systemScreens"), system],
          [t("adminScreens"), admin],
        ].map(([heading, items]) => (
          <section className="mt-10" key={heading as string}>
            <h2 className="heading text-[length:var(--type-h2)]">{heading as string}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {(items as typeof screens).map((item) => (
                <a
                  className="card flex items-center justify-between gap-4 p-5 font-bold hover:bg-[var(--wf-surface-muted)]"
                  href={item.href}
                  key={item.title}
                >
                  <span>{t(item.title)}</span>
                  <span className="flex items-center gap-2 text-sm">
                    {t("openScreen")}
                    <Icon name="arrow" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </section>
      <aside className="fixed bottom-24 right-4 z-40 w-[min(22rem,calc(100%-2rem))] rounded-[var(--radius-card)] border bg-[var(--color-surface)] p-4 shadow-[var(--shadow-md)] lg:bottom-4">
        <h2 className="heading text-lg">{t("prototypeControls")}</h2>
        <p className="mt-1 text-xs text-[var(--wf-muted)]">{t("controlsNote")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <LanguageSwitch language={language} onChange={setLanguage} t={t} />
          <Button
            variant="outline"
            icon={theme === "light" ? "moon" : "sun"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? t("themeDark") : t("themeLight")}
          </Button>
        </div>
        <label className="mt-3 grid gap-1 text-sm font-bold">
          {t("userStateLabel")}
          <select
            className="min-h-12 rounded-[var(--radius-button)] border bg-[var(--wf-surface)] px-3"
            value={userState}
            onChange={(event) => setUserState(event.target.value as UserState)}
          >
            <option value="visitor">{t("visitor")}</option>
            <option value="logged">{t("loggedIn")}</option>
            <option value="purchased">{t("purchasedUnit")}</option>
          </select>
        </label>
      </aside>
    </main>
  );
}

export default function App() {
  const settings = usePrototypeSettings();
  const t = useMemo(
    () => (key: TranslationKey, variables?: Record<string, string | number>) =>
      translate(settings.language, key, variables),
    [settings.language],
  );
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  let page = path === "/" ? <HomePage t={t} /> : <SystemStatePage t={t} state="notFound" />;
  if (path === "/screens") page = <ScreenIndex {...settings} t={t} />;
  else if (path === "/units") page = <UnitsPage t={t} userState={settings.userState} />;
  else if (path === "/units/1") page = <UnitDetailPage t={t} state={settings.userState} />;
  else if (path === "/video-player") page = <VideoPlayerPage t={t} />;
  else if (path === "/pdf-viewer") page = <PDFViewerPage t={t} />;
  else if (path === "/past-papers") page = <PastPapersPage t={t} state={settings.userState} />;
  else if (path === "/register") page = <RegisterPage t={t} />;
  else if (path === "/verify-otp") page = <OTPPage t={t} />;
  else if (path === "/login") page = <LoginPage t={t} />;
  else if (path === "/forgot-password") page = <ForgotPasswordPage t={t} />;
  else if (path === "/checkout") page = <CheckoutPage t={t} />;
  else if (path === "/payment/success") page = <PaymentResultPage t={t} result="success" />;
  else if (path === "/payment/failed") page = <PaymentResultPage t={t} result="failed" />;
  else if (path === "/account") page = <AccountPage t={t} />;
  else if (path === "/states/empty") page = <SystemStatePage t={t} state="empty" />;
  else if (path === "/states/loading") page = <SystemStatePage t={t} state="loading" />;
  else if (path === "/404") page = <SystemStatePage t={t} state="notFound" />;
  else if (path === "/offline") page = <SystemStatePage t={t} state="offline" />;
  else if (path === "/admin/login") page = <AdminLoginPage t={t} />;
  else if (path === "/admin") page = <AdminDashboardPage t={t} />;
  else if (path === "/admin/units") page = <UnitsManagerPage t={t} />;
  else if (path === "/admin/content") page = <ContentUploadPage t={t} />;
  else if (path === "/admin/past-papers") page = <PastPapersManagerPage t={t} />;
  else if (path === "/admin/pricing") page = <PricingPage t={t} />;
  else if (path === "/admin/students") page = <StudentsPage t={t} />;
  else if (path === "/admin/payments") page = <PaymentsPage t={t} />;
  else if (path === "/admin/settings") page = <SiteSettingsPage t={t} />;
  return (
    <Layout language={settings.language} setLanguage={settings.setLanguage} t={t}>
      <Suspense
        fallback={
          <main id="main" className="container-main py-10">
            <SkeletonLoader />
          </main>
        }
      >
        {page}
      </Suspense>
    </Layout>
  );
}
