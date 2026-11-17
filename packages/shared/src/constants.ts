/**
 * Constants shared by the web app and the API.
 * Keep this file free of runtime dependencies so it can be imported anywhere.
 */

/** Supported UI locales. Sinhala is the default; Tamil is planned (see docs/decisions.md). */
export const LOCALES = ["si", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "si";

/** User roles. ASSISTANT is a limited staff role (SRS TBD-07). */
export const USER_ROLES = ["STUDENT", "ADMIN", "ASSISTANT"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** The A/L Agricultural Science syllabus has 19 units (NIE syllabus, 2017). */
export const UNIT_COUNT = 19;
export const UNIT_NUMBERS = Array.from({ length: UNIT_COUNT }, (_, i) => i + 1);

/** Grades. Units 1-11 are Grade 12, units 12-19 are Grade 13 (admin-editable seed default). */
export const GRADES = [12, 13] as const;
export type Grade = (typeof GRADES)[number];

/** Free, public PDF resource types attached to a unit. */
export const RESOURCE_TYPES = ["THEORY_NOTE", "PAST_PAPER_QUESTIONS"] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];

/** Video kinds: teaching videos belong to a sub-part; discussion videos belong to a unit. */
export const VIDEO_KINDS = ["TEACHING", "DISCUSSION"] as const;
export type VideoKind = (typeof VIDEO_KINDS)[number];

/** Past-paper discussion sections within a unit. */
export const DISCUSSION_TYPES = ["MCQ", "STRUCTURED", "ESSAY"] as const;
export type DiscussionType = (typeof DISCUSSION_TYPES)[number];

/** Sellable product types (v1). BUNDLE is reserved for later (SRS TBD-08). */
export const PRODUCT_TYPES = ["UNIT", "PAST_PAPER_YEAR"] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

/** Order lifecycle. */
export const ORDER_STATUSES = ["PENDING", "PAID", "FAILED", "CANCELLED", "REFUNDED"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** How an access grant was created. */
export const ACCESS_GRANT_SOURCES = ["PAYMENT", "MANUAL"] as const;
export type AccessGrantSource = (typeof ACCESS_GRANT_SOURCES)[number];

/** Admin-configurable access duration modes (SRS FR-SEC-05 / BR-10). */
export const ACCESS_DURATION_MODES = ["LIFETIME", "FIXED_MONTHS", "FIXED_DATE"] as const;
export type AccessDurationMode = (typeof ACCESS_DURATION_MODES)[number];

/** Past papers: 30 years, newest first. */
export const PAST_PAPER_FIRST_YEAR = 1996;
export const PAST_PAPER_LAST_YEAR = 2025;

/** Money and locale formatting. */
export const CURRENCY = "LKR" as const;
export const TIMEZONE = "Asia/Colombo" as const;
export const DATE_FORMAT = "DD/MM/YYYY" as const;

/** Sri Lankan mobile numbers: +94 followed by 9 digits starting with 7. */
export const SL_MOBILE_REGEX = /^\+947\d{8}$/;
export const SL_MOBILE_COUNTRY_CODE = "+94";

/** Default security settings (all overridable by admin settings or env). */
export const DEFAULT_DEVICE_LIMIT = 2;
export const OTP_LENGTH = 6;
export const PASSWORD_MIN_LENGTH = 8;
