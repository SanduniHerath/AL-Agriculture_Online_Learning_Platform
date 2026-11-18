"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { useTranslations } from "next-intl";
import { SL_MOBILE_COUNTRY_CODE } from "@al-agri/shared";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

/**
 * Form controls. Use them inside <FormField>, which wires up the label, hint and error
 * for screen readers (id, aria-describedby, aria-invalid) automatically.
 */

type ControlA11yProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function FormField({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  /** Error message; when set the control is marked invalid. */
  error?: ReactNode;
  className?: string;
  /** Exactly one form control (Input, PhoneInput, PasswordInput, Select, Textarea). */
  children: ReactElement<ControlA11yProps>;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  const control = Children.only(children);
  const enhanced = isValidElement(control)
    ? cloneElement(control, {
        id: control.props.id ?? id,
        "aria-describedby": describedBy || undefined,
        "aria-invalid": error ? true : undefined,
      })
    : control;

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={control.props.id ?? id} className="font-bold">
        {label}
      </label>
      {enhanced}
      {hint && (
        <span id={hintId} className="text-xs font-normal text-text-muted">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className="flex items-center gap-1 text-sm text-error">
          <span aria-hidden="true">!</span>
          {error}
        </span>
      )}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("field-control px-4", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("field-control min-h-28 px-4 py-3", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={cn("field-control px-4", className)} {...props}>
      {children}
    </select>
  );
}

/** Sri Lankan mobile number with a fixed +94 prefix. */
export function PhoneInput({
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <div className="field-control flex overflow-hidden">
      <span
        lang="en"
        className="flex min-w-16 items-center justify-center border-r bg-primary-soft px-3 font-semibold text-primary"
      >
        {SL_MOBILE_COUNTRY_CODE}
      </span>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={cn(
          "min-h-12 min-w-0 flex-1 bg-transparent px-4 text-text outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

/** Password field with a show/hide toggle. */
export function PasswordInput({
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const t = useTranslations("auth");
  const [visible, setVisible] = useState(false);
  return (
    <div className="field-control flex overflow-hidden">
      <input
        type={visible ? "text" : "password"}
        className={cn(
          "min-h-12 min-w-0 flex-1 bg-transparent px-4 text-text outline-none",
          className,
        )}
        {...props}
      />
      <button
        type="button"
        className="flex min-h-12 items-center gap-1 px-3 text-sm font-semibold text-text hover:bg-primary-soft"
        aria-pressed={visible}
        onClick={() => setVisible((value) => !value)}
      >
        {t(visible ? "hidePassword" : "showPassword")}
      </button>
    </div>
  );
}

/** Text input with a search icon. */
export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field-control flex items-center overflow-hidden">
      <span className="pl-4 text-text-muted">
        <Icon name="search" size={18} />
      </span>
      <input
        type="search"
        className={cn(
          "min-h-12 min-w-0 flex-1 bg-transparent px-3 text-text outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
