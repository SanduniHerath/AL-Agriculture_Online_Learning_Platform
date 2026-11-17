"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DISTRICTS, formatDate, formatLkr, type Locale } from "@al-agri/shared";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  AdminTable,
  AnchorButton,
  Badge,
  BilingualInput,
  Button,
  EmptyState,
  FormField,
  InfoNote,
  Input,
  LinkButton,
  MediaPlaceholder,
  Modal,
  PasswordInput,
  PDFDownloadItem,
  PhoneInput,
  ProgressBar,
  SearchInput,
  Select,
  SkeletonLoader,
  StickyUnlockBar,
  SubPartAccordion,
  TabPanel,
  Tabs,
  Toast,
  UnitCard,
  UploadWidget,
  VideoListItem,
} from "@/components/ui";

/** Sample content for previews only (real titles come from the database from Phase 2). */
const SAMPLE: Record<
  Locale,
  { units: string[]; subparts: string[]; videos: string[]; student: string }
> = {
  en: {
    units: [
      "Agriculture and the Development of Sri Lanka",
      "Climatic Factors in Crop Production",
      "Soil Quality Management",
    ],
    subparts: ["Agriculture as technology and management", "Agricultural resources of Sri Lanka"],
    videos: ["Core concepts and key definitions", "Sri Lankan examples and exam links"],
    student: "Nimal Perera",
  },
  si: {
    units: [
      "ශ්‍රී ලංකාවේ සංවර්ධනයට කෘෂි අංශයේ දායකත්වය",
      "බෝග වගාවේ දේශගුණික සාධක",
      "පස් ගුණාත්මක බව කළමනාකරණය",
    ],
    subparts: ["තාක්ෂණය හා කළමනාකරණය ලෙස කෘෂිකර්මය", "ශ්‍රී ලංකාවේ කෘෂිකාර්මික සම්පත්"],
    videos: ["මූලික සංකල්ප සහ ප්‍රධාන නිර්වචන", "ශ්‍රී ලාංකික උදාහරණ සහ විභාග සම්බන්ධතා"],
    student: "නිමල් පෙරේරා",
  },
};

const COLOR_TOKENS = [
  "primary",
  "primary-soft",
  "secondary",
  "accent",
  "bg",
  "surface",
  "text",
  "text-muted",
  "border",
  "error",
  "warning",
  "info",
  "locked",
  "footer",
  "player",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="heading border-b pb-3 text-h2">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function UiGallery() {
  const t = useTranslations();
  const locale = useLocale();
  const sample = SAMPLE[locale];
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [grade, setGrade] = useState("12");
  const [discussion, setDiscussion] = useState("MCQ");
  const [modalOpen, setModalOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const price = formatLkr(1500, locale);

  // Preview dark mode on the whole page; restore light mode when leaving the gallery.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => {
      document.documentElement.dataset.theme = "light";
    };
  }, [theme]);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      <main id="main" className="container-main py-10">
        <p className="eyebrow">Phase 1 · design system</p>
        <h1 className="heading mt-3 text-h1">UI gallery</h1>
        <p className="mt-3 max-w-2xl text-text-muted">
          Development only - every ported component in the current language. Switch language in the
          header; switch theme here.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            variant="outline"
            icon={theme === "light" ? "moon" : "sun"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? t("common.themeDark") : t("common.themeLight")}
          </Button>
        </div>

        <Section title="Colours">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {COLOR_TOKENS.map((token) => (
              <div key={token} className="text-center text-xs">
                <div
                  className="mb-1 h-14 rounded-button border"
                  style={{ background: `var(--color-${token})` }}
                />
                {token}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <p className="eyebrow">{t("units.eyebrow")}</p>
          <p className="heading mt-2 text-display">{t("home.title")}</p>
          <p className="heading mt-2 text-h1">{t("units.title")}</p>
          <p className="heading mt-2 text-h2">{t("home.howItWorks")}</p>
          <p className="heading mt-2 text-h3">{t("unit.teachingVideos")}</p>
          <p className="mt-2 text-body-lg">{t("units.description")}</p>
          <p className="mt-2 text-caption text-text-muted">
            {formatDate(new Date())} · {price}
          </p>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button icon="unlock">{t("unit.unlockUnitShort")}</Button>
            <Button variant="secondary">{t("common.continue")}</Button>
            <Button variant="outline" icon="download">
              {t("common.download")}
            </Button>
            <Button variant="text">{t("common.viewAll")}</Button>
            <Button variant="ghost">{t("common.close")}</Button>
            <Button loading>{t("auth.verifyCode")}</Button>
            <Button disabled>{t("auth.resendCode")}</Button>
            <LinkButton href="/units" variant="outline" iconAfter="arrow">
              {t("nav.units")}
            </LinkButton>
            <AnchorButton href="#main" variant="text" icon="message">
              {t("home.whatsapp")}
            </AnchorButton>
          </div>
        </Section>

        <Section title="Badges & progress">
          <div className="flex flex-wrap gap-2">
            <Badge>{t("common.unitLabel", { number: "01" })}</Badge>
            <Badge variant="dark">{t("units.grade12")}</Badge>
            <Badge variant="outline">{t("common.pending")}</Badge>
            <Badge variant="free" icon="leaf">
              {t("common.free")}
            </Badge>
            <Badge variant="purchased" icon="check">
              {t("common.purchased")}
            </Badge>
            <Badge variant="locked" icon="lock">
              {t("units.lockedPrice", { price })}
            </Badge>
            <Badge variant="price">{price}</Badge>
            <Badge variant="new">{t("common.comingSoon")}</Badge>
            <Badge variant="error">{t("common.failed")}</Badge>
          </div>
          <div className="mt-5 max-w-sm">
            <ProgressBar value={42} label={t("units.progressComplete", { percent: 42 })} />
          </div>
        </Section>

        <Section title="Forms">
          <form
            className="card grid max-w-2xl gap-5 p-5 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label={t("auth.fullName")}>
                <Input placeholder={t("auth.fullNamePlaceholder")} autoComplete="name" />
              </FormField>
              <FormField label={t("auth.mobileNumber")} hint={t("auth.whyMobile")}>
                <PhoneInput placeholder={t("auth.mobilePlaceholder")} />
              </FormField>
            </div>
            <FormField label={t("auth.emailOptional")} error={t("auth.requiredField")}>
              <Input type="email" placeholder={t("auth.emailPlaceholder")} />
            </FormField>
            <FormField label={t("auth.password")} hint={t("auth.passwordHint")}>
              <PasswordInput autoComplete="new-password" />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label={t("auth.district")}>
                <Select defaultValue="">
                  <option value="" disabled>
                    {t("auth.selectDistrict")}
                  </option>
                  {DISTRICTS.map((code) => (
                    <option key={code} value={code}>
                      {t(`districts.${code}`)}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label={t("units.search")}>
                <SearchInput placeholder={t("units.search")} />
              </FormField>
            </div>
            <label className="flex min-h-12 items-start gap-3 py-2">
              <input className="mt-1 size-5" type="checkbox" />
              <span>
                {t.rich("auth.acceptTerms", {
                  terms: (chunks) => (
                    <a className="font-bold text-primary underline" href="#main">
                      {chunks}
                    </a>
                  ),
                  privacy: (chunks) => (
                    <a className="font-bold text-primary underline" href="#main">
                      {chunks}
                    </a>
                  ),
                })}
              </span>
            </label>
            <Button type="submit" className="w-full">
              {t("auth.registerButton")}
            </Button>
          </form>
        </Section>

        <Section title="Tabs">
          <Tabs
            idPrefix="gallery-grade"
            label={t("nav.units")}
            tabs={[
              { id: "12", label: t("units.grade12") },
              { id: "13", label: t("units.grade13") },
            ]}
            active={grade}
            onChange={setGrade}
            className="max-w-md"
          />
          <TabPanel
            idPrefix="gallery-grade"
            id="12"
            active={grade}
            className="mt-3 text-text-muted"
          >
            {t("units.grade12")}: 1-11
          </TabPanel>
          <TabPanel
            idPrefix="gallery-grade"
            id="13"
            active={grade}
            className="mt-3 text-text-muted"
          >
            {t("units.grade13")}: 12-19
          </TabPanel>
        </Section>

        <Section title="Unit cards">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <UnitCard
              number={1}
              title={sample.units[0] ?? ""}
              subpartCount={4}
              videoCount={12}
              status="purchased"
              progress={42}
              href="/units/1"
            />
            <UnitCard
              number={2}
              title={sample.units[1] ?? ""}
              subpartCount={3}
              videoCount={9}
              status="locked"
              price={price}
              href="/units/2"
            />
            <UnitCard
              number={3}
              title={sample.units[2] ?? ""}
              subpartCount={1}
              videoCount={1}
              status="free"
              href="/units/3"
            />
          </div>
        </Section>

        <Section title="Free PDFs">
          <div className="grid gap-3 rounded-card border border-[color-mix(in_srgb,var(--color-secondary)_35%,var(--color-border))] bg-primary-soft p-4 sm:p-6">
            <PDFDownloadItem
              title={t("unit.theoryNote")}
              meta="PDF"
              size="4.8 MB"
              viewHref="/units/1"
              downloadHref="#main"
            />
            <PDFDownloadItem
              title={t("unit.pastPaperQuestions")}
              meta={t("unit.thirtyYears")}
              size="12.6 MB"
              viewHref="/units/1"
              downloadHref="#main"
            />
          </div>
        </Section>

        <Section title="Sub-parts & videos">
          <div className="grid gap-3">
            <SubPartAccordion
              code="1.1"
              title={sample.subparts[0] ?? ""}
              totalDuration="40 min"
              unlocked
              defaultOpen
              videos={[
                {
                  id: "a",
                  title: sample.videos[0] ?? "",
                  duration: "12:40",
                  state: "watched",
                  href: "/units/1",
                },
                {
                  id: "b",
                  title: sample.videos[1] ?? "",
                  duration: "18:15",
                  state: "ready",
                  href: "/units/1",
                },
              ]}
            />
            <SubPartAccordion
              code="1.2"
              title={sample.subparts[1] ?? ""}
              totalDuration="25 min"
              unlocked={false}
              videos={[
                { id: "c", title: sample.videos[0] ?? "", duration: "09:25", state: "locked" },
              ]}
            />
          </div>
          <div className="mt-6">
            <Tabs
              idPrefix="gallery-discussion"
              label={t("unit.discussions")}
              tabs={[
                { id: "MCQ", label: t("discussionType.MCQ"), count: 12 },
                { id: "STRUCTURED", label: t("discussionType.STRUCTURED"), count: 8 },
                { id: "ESSAY", label: t("discussionType.ESSAY"), count: 6 },
              ]}
              active={discussion}
              onChange={setDiscussion}
            />
            <div className="card mt-4 px-5">
              {[2025, 2024].map((year) => (
                <VideoListItem
                  key={year}
                  title={t("unit.paperVideoTitle", {
                    year,
                    type: t(`discussionType.${discussion as "MCQ" | "STRUCTURED" | "ESSAY"}`),
                  })}
                  duration="16:30"
                  state="locked"
                />
              ))}
            </div>
          </div>
        </Section>

        <Section title="Overlays">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Modal
            </Button>
            <Button variant="outline" onClick={() => setShowSticky((v) => !v)}>
              Sticky unlock bar (mobile)
            </Button>
            <Button variant="outline" onClick={() => setShowToast(true)}>
              Toast
            </Button>
          </div>
        </Section>

        <Section title="States">
          <div className="grid gap-5 md:grid-cols-2">
            <EmptyState
              title={t("account.noPaymentsYet")}
              description={t("account.noPaymentsBody")}
              icon="paper"
              action={<LinkButton href="/units">{t("account.browseUnits")}</LinkButton>}
            />
            <SkeletonLoader label={t("common.loading")} />
            <MediaPlaceholder label={t("home.introVideo")} kind="video" />
            <div className="grid content-start gap-4">
              <InfoNote>{t("checkout.secureNote")}</InfoNote>
              <MediaPlaceholder label={t("home.teacherPhotoAlt")} className="max-w-48" />
            </div>
          </div>
        </Section>

        <Section title="Admin">
          <div className="card grid gap-6 p-5 sm:p-7">
            <BilingualInput
              nameEn="titleEn"
              nameSi="titleSi"
              defaultValueEn={SAMPLE.en.units[0]}
              defaultValueSi={SAMPLE.si.units[0]}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <UploadWidget
                name="theoryNote"
                accept="application/pdf"
                label={t("admin.theoryNoteUpload")}
              />
              <UploadWidget name="video" accept="video/*" label={t("admin.teachingVideoUpload")} />
            </div>
            <AdminTable>
              <table className="w-full min-w-xl text-left">
                <thead>
                  <tr>
                    <th className="p-4">{t("common.date")}</th>
                    <th className="p-4">{t("auth.fullName")}</th>
                    <th className="p-4">{t("common.amount")}</th>
                    <th className="p-4">{t("common.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map((row) => (
                    <tr className="border-t" key={row}>
                      <td className="p-4">{formatDate(new Date(2026, 3, 18 - row))}</td>
                      <td className="p-4 font-bold">{sample.student}</td>
                      <td className="p-4">{price}</td>
                      <td className="p-4">
                        <Badge
                          variant={row === 0 ? "price" : "purchased"}
                          icon={row === 0 ? "lock" : "check"}
                        >
                          {row === 0 ? t("common.pending") : t("common.paid")}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AdminTable>
          </div>
        </Section>
      </main>

      <SiteFooter phone="+94 77 123 4567" email="hello@example.com" />

      <Modal
        open={modalOpen}
        title={t("unit.createAccountToContinue")}
        onClose={() => setModalOpen(false)}
      >
        <p>{t("auth.registerIntro")}</p>
        <LinkButton href="/register" className="mt-5 w-full">
          {t("unit.registerToUnlock")}
        </LinkButton>
      </Modal>
      {showSticky && (
        <StickyUnlockBar
          caption={t("unit.lifetimeAccess")}
          price={price}
          action={<Button icon="unlock">{t("unit.unlockUnitShort")}</Button>}
        />
      )}
      {showToast && <Toast>{t("common.downloaded")}</Toast>}
    </>
  );
}
