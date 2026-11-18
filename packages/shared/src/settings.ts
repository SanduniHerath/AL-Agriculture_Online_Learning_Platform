import { z } from "zod";
import { DEFAULT_DEVICE_LIMIT, LOCALES } from "./constants.js";

/**
 * Admin-editable site settings, stored as JSON in the `site_settings` table.
 * Every key has a Zod schema (validated on write AND on read) and a default value, so the
 * site works before the admin has saved anything.
 */

/**
 * How long a purchase gives access (SRS FR-SEC-05, BR-10, decision D5).
 * - LIFETIME:      never expires (default)
 * - FIXED_MONTHS:  N months after the purchase
 * - FIXED_DATE:    until the end of a calendar day (Sri Lanka time), e.g. the exam date
 */
export const accessDurationSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("LIFETIME") }),
  z.object({ mode: z.literal("FIXED_MONTHS"), months: z.number().int().min(1).max(60) }),
  z.object({ mode: z.literal("FIXED_DATE"), date: z.iso.date() }),
]);
export type AccessDuration = z.infer<typeof accessDurationSchema>;

export const siteSettingSchemas = {
  /** Access duration for unit purchases. */
  "access.duration.unit": accessDurationSchema,
  /** Access duration for past-paper-year purchases (may differ, SRS TBD-01). */
  "access.duration.pastPaper": accessDurationSchema,
  /** Max signed-in devices per student (SRS TBD-04). */
  "security.deviceLimit": z.number().int().min(1).max(10),
  /** Max videos playing at once per student (SRS TBD-04). */
  "security.concurrentStreams": z.number().int().min(1).max(5),
  /** Whether purchased past papers may be downloaded (watermarked) or only viewed (TBD-05). */
  "pastPapers.allowDownload": z.boolean(),
  /** Language for visitors who have not chosen one. */
  "site.defaultLocale": z.enum(LOCALES),
  /** Contact details shown in the footer and on the home page. Empty = hidden. */
  "contact.phone": z.string().trim().max(30),
  "contact.email": z.union([z.email(), z.literal("")]),
  /** WhatsApp number, digits only with country code, e.g. 94771234567. Empty = hidden. */
  "contact.whatsapp": z.union([z.string().regex(/^94\d{9}$/), z.literal("")]),
} as const;

export type SiteSettingKey = keyof typeof siteSettingSchemas;
export type SiteSettingValue<K extends SiteSettingKey> = z.infer<(typeof siteSettingSchemas)[K]>;
export type SiteSettings = { [K in SiteSettingKey]: SiteSettingValue<K> };

export const SITE_SETTING_DEFAULTS: SiteSettings = {
  "access.duration.unit": { mode: "LIFETIME" },
  "access.duration.pastPaper": { mode: "LIFETIME" },
  "security.deviceLimit": DEFAULT_DEVICE_LIMIT,
  "security.concurrentStreams": 1,
  "pastPapers.allowDownload": false,
  "site.defaultLocale": "si",
  "contact.phone": "",
  "contact.email": "",
  "contact.whatsapp": "",
};

export const SITE_SETTING_KEYS = Object.keys(siteSettingSchemas) as SiteSettingKey[];

export function isSiteSettingKey(key: string): key is SiteSettingKey {
  return key in siteSettingSchemas;
}

/**
 * Works out when a new access grant expires. Returns null for lifetime access.
 * The result is stored on the grant when it is created, so changing the setting later
 * never changes existing purchases (BR-10).
 */
export function computeAccessExpiry(duration: AccessDuration, purchasedAt: Date): Date | null {
  switch (duration.mode) {
    case "LIFETIME":
      return null;
    case "FIXED_MONTHS": {
      const expiry = new Date(purchasedAt.getTime());
      const day = expiry.getUTCDate();
      expiry.setUTCMonth(expiry.getUTCMonth() + duration.months);
      // 31 Jan + 1 month would roll over to early March; clamp to the last day instead.
      if (expiry.getUTCDate() !== day) expiry.setUTCDate(0);
      return expiry;
    }
    case "FIXED_DATE":
      // End of that day in Sri Lanka (UTC+05:30).
      return new Date(`${duration.date}T23:59:59.999+05:30`);
  }
}
