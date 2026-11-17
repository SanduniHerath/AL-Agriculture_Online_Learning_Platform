import type { ReactNode } from "react";

/**
 * Mobile-only bar above the bottom navigation with the unit price and the unlock action.
 * Render it only when the unit is not purchased. On desktop the same action lives in the
 * sidebar card.
 */
export function StickyUnlockBar({
  caption,
  price,
  action,
}: {
  /** e.g. "One payment · Full unit access" */
  caption: string;
  /** Formatted price */
  price: string;
  /** The button or link that starts the purchase / registration. */
  action: ReactNode;
}) {
  return (
    <div className="fixed inset-x-0 bottom-[4.5rem] z-20 border-t bg-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-text-muted">{caption}</p>
          <p className="heading text-lg">{price}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
