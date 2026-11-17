"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./button";

/**
 * Modal dialog built on the native <dialog> element, which gives focus trapping, Escape
 * to close and correct screen-reader semantics for free. Bottom sheet on phones, centred
 * card from the `sm` breakpoint.
 */
export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const t = useTranslations("common");
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop (outside the content box) closes the dialog.
        if (event.target === event.currentTarget) onClose();
      }}
      className="card m-0 mt-auto w-full max-w-none rounded-b-none p-0 text-text backdrop:bg-overlay sm:m-auto sm:max-w-lg sm:rounded-card"
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="heading text-xl">
            {title}
          </h2>
          <Button variant="text" onClick={onClose}>
            {t("close")}
          </Button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}
