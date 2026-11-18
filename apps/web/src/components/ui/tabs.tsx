"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; count?: number };

/**
 * Accessible tabs (WAI-ARIA tabs pattern): arrow keys move between tabs, only the active
 * tab is in the Tab order. Pair with <TabPanel> using the same `idPrefix`.
 */
export function Tabs({
  tabs,
  active,
  onChange,
  idPrefix,
  label,
  className,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  /** Unique prefix linking tabs to their panels. */
  idPrefix: string;
  /** Accessible name of the tab list. */
  label: string;
  className?: string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    const tab = tabs[next];
    if (!tab) return;
    onChange(tab.id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex gap-1 overflow-x-auto rounded-button bg-primary-soft p-1 lg:rounded-none lg:border-b lg:bg-transparent lg:p-0",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "inline-flex min-h-12 min-w-fit flex-1 items-center justify-center gap-2 rounded-button border border-transparent px-5 py-3 font-semibold text-primary transition duration-200 hover:bg-primary-soft",
              "lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-2",
              selected
                ? "bg-surface shadow-sm lg:border-b-primary lg:bg-transparent lg:shadow-none"
                : "lg:border-b-transparent",
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-text-muted">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  idPrefix,
  id,
  active,
  children,
  className,
}: {
  idPrefix: string;
  id: string;
  active: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${id}`}
      aria-labelledby={`${idPrefix}-tab-${id}`}
      hidden={id !== active}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
