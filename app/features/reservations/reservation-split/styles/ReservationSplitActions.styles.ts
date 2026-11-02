import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_SPLIT_ADD_WRAPPER_CLASS = "mt-4";

const RESERVATION_SPLIT_ADD_BASE_CLASS =
  "min-h-12 w-full gap-2 rounded-full md:w-auto";

export const RESERVATION_SPLIT_ADD_BLOCKED_CLASS =
  "opacity-50";

export const resolveReservationSplitAddClassName = (
  isBlocked: boolean
): string =>
  joinClassNames(
    RESERVATION_SPLIT_ADD_BASE_CLASS,
    isBlocked ? RESERVATION_SPLIT_ADD_BLOCKED_CLASS : ""
  );

export const RESERVATION_SPLIT_ADD_NOTE_CLASS =
  "mt-2 text-sm text-on-surface-variant";

export const RESERVATION_SPLIT_ALERT_CLASS =
  "mt-4 rounded-xl border border-error/50 bg-error-container/30 px-4 py-3 text-error";

export const RESERVATION_SPLIT_ACTIONS_CLASS =
  "sticky bottom-0 z-20 -mx-4 mt-6 flex flex-col gap-3 border-t border-outline-variant/50 bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:static md:mx-0 md:flex-row md:items-center md:justify-end md:border-0 md:bg-transparent md:p-0 md:pt-2 md:backdrop-blur-none";

export const RESERVATION_SPLIT_SUBMIT_CLASS =
  "min-h-12 w-full rounded-full md:w-auto md:min-w-56";

export const RESERVATION_SPLIT_SUCCESS_CLASS =
  "space-y-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-4 text-on-surface";

export const RESERVATION_SPLIT_SUCCESS_LIST_CLASS =
  "space-y-1 font-mono text-base tabular-nums text-primary";

export const RESERVATION_SPLIT_SUCCESS_LINK_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto md:min-w-56";
