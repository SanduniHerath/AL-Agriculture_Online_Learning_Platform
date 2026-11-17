import { z } from "zod";
import {
  LOCALES,
  PASSWORD_MIN_LENGTH,
  SL_MOBILE_COUNTRY_CODE,
  SL_MOBILE_REGEX,
  OTP_LENGTH,
} from "./constants.js";

/**
 * Zod schemas shared between the web forms and the API validators.
 * The API is the source of truth: the web app only reuses these for early feedback.
 */

export const localeSchema = z.enum(LOCALES);

/**
 * Accepts the common ways Sri Lankan students type a mobile number
 * ("0771234567", "77 123 4567", "+94771234567") and normalises to E.164 "+94771234567".
 */
export const slMobileSchema = z
  .string()
  .trim()
  .transform((value) => {
    const digits = value.replace(/[\s-]/g, "");
    if (digits.startsWith("+94")) return digits;
    if (digits.startsWith("94") && digits.length === 11) return `+${digits}`;
    if (digits.startsWith("0") && digits.length === 10)
      return `${SL_MOBILE_COUNTRY_CODE}${digits.slice(1)}`;
    if (digits.length === 9) return `${SL_MOBILE_COUNTRY_CODE}${digits}`;
    return digits;
  })
  .pipe(z.string().regex(SL_MOBILE_REGEX, "Enter a valid Sri Lankan mobile number"));

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(128)
  .regex(/\d/, "Password must contain at least one number");

export const otpCodeSchema = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Code must be ${OTP_LENGTH} digits`);

/** A bilingual text value as stored in the database (Tamil can be added later). */
export const bilingualTextSchema = z.object({
  en: z.string().trim().min(1).max(500),
  si: z.string().trim().min(1).max(500),
});
export type BilingualText = z.infer<typeof bilingualTextSchema>;

/** Prices are whole rupees in v1 (SRS BR-07: must be > 0 to be on sale). */
export const priceLkrSchema = z.number().int().positive().max(1_000_000);
