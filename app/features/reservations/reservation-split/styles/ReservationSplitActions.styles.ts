import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_SPLIT_ADD_WRAPPER_CLASS = "mt-4";

const RESERVATION_SPLIT_ADD_BASE_CLASS =
  "min-h-12 w-full gap-2 rounded-full md:w-auto";

export const RESERVATION_SPLIT_ADD_BLOCKED_CLASS =
  "cursor-default opacity-50 hover:bg-transparent";

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
