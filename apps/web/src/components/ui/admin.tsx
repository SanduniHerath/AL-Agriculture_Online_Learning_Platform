"use client";

import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { FormField, Input, Textarea } from "./form";
import { Icon } from "./icon";

/** Scrollable table container with sticky header and zebra rows (admin lists). */
export function AdminTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-card border bg-surface shadow-sm [&_tbody_tr:nth-child(even)]:bg-[color-mix(in_srgb,var(--color-primary-soft)_45%,transparent)] [&_thead]:sticky [&_thead]:top-0 [&_thead]:bg-primary-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Side-by-side English and Sinhala fields for any bilingual text the admin edits
 * (titles, descriptions). The Sinhala field uses lang="si" so it renders in the Sinhala font.
 */
export function BilingualInput({
  nameEn,
  nameSi,
  labelEn,
  labelSi,
  defaultValueEn,
  defaultValueSi,
  errorEn,
  errorSi,
  multiline = false,
  required = false,
}: {
  nameEn: string;
  nameSi: string;
  labelEn?: string;
  labelSi?: string;
  defaultValueEn?: string;
  defaultValueSi?: string;
  errorEn?: string;
  errorSi?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const t = useTranslations("common");
  const Control = multiline ? Textarea : Input;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <FormField label={labelEn ?? t("englishTitle")} error={errorEn}>
        <Control lang="en" name={nameEn} defaultValue={defaultValueEn} required={required} />
      </FormField>
      <FormField label={labelSi ?? t("sinhalaTitle")} error={errorSi}>
        <Control lang="si" name={nameSi} defaultValue={defaultValueSi} required={required} />
      </FormField>
    </div>
  );
}

/** Large dashed file picker. Shows the chosen file name once a file is selected. */
export function UploadWidget({
  name,
  accept,
  label,
  disabled = false,
  onFileSelected,
}: {
  name: string;
  /** e.g. "application/pdf" or "video/*" */
  accept?: string;
  label?: string;
  disabled?: boolean;
  onFileSelected?: (file: File | null) => void;
}) {
  const t = useTranslations("common");
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onFileSelected?.(file);
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-button border border-dashed border-primary bg-primary-soft px-5 py-3 text-center font-semibold text-primary transition hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-primary-soft))] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-primary",
        disabled && "cursor-not-allowed opacity-45",
      )}
    >
      <Icon name="download" className="rotate-180" />
      <span>{fileName ?? label ?? t("uploadFile")}</span>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}
