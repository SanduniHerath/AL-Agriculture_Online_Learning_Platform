import { TIMEZONE, type Locale } from "./constants.js";

/**
 * Display formatters shared by the web app (pages) and the API (receipts, SMS, email).
 * SRS NFR-LOC-04: dates DD/MM/YYYY, times hh:mm AM/PM, Asia/Colombo time zone.
 */

const LKR_PREFIX: Record<Locale, string> = { en: "Rs.", si: "රු." };

/**
 * Formats a whole-rupee amount, e.g. 1500 -> "Rs. 1,500" (en) / "රු. 1,500" (si).
 * Digits are always Western with comma grouping, which is how prices are written in Sri Lanka
 * in both languages.
 */
export function formatLkr(amount: number, locale: Locale): string {
  const digits = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(amount);
  return `${LKR_PREFIX[locale]} ${digits}`;
}

/** Formats a date as DD/MM/YYYY in Sri Lanka time, regardless of the server's time zone. */
export function formatDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("day")}/${get("month")}/${get("year")}`;
}

/** Formats a time as hh:mm AM/PM in Sri Lanka time. */
export function formatTime(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/** Formats a duration in seconds as m:ss or h:mm:ss (video lengths). */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

/** Zero-pads a unit number for display, e.g. 1 -> "01". */
export function formatUnitNumber(number: number): string {
  return String(number).padStart(2, "0");
}
