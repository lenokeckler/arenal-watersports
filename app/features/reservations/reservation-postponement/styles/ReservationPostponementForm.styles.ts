import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_POSTPONEMENT_FORM_CLASS =
  "space-y-6";

export const RESERVATION_POSTPONEMENT_NOTES_CLASS =
  "space-y-3";

const RESERVATION_POSTPONEMENT_NOTE_BASE_CLASS =
  "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm text-on-surface";

export const RESERVATION_POSTPONEMENT_NOTE_INFO_CLASS =
  joinClassNames(
    RESERVATION_POSTPONEMENT_NOTE_BASE_CLASS,
    "border-primary/40 bg-primary/10"
  );

export const RESERVATION_POSTPONEMENT_NOTE_WARN_CLASS =
  joinClassNames(
    RESERVATION_POSTPONEMENT_NOTE_BASE_CLASS,
    "border-error/50 bg-error-container/30"
  );

export const RESERVATION_POSTPONEMENT_NOTE_INFO_ICON_CLASS =
  "text-primary";

export const RESERVATION_POSTPONEMENT_NOTE_WARN_ICON_CLASS =
  "text-error";

export const RESERVATION_POSTPONEMENT_SCHEDULE_CLASS =
  "grid grid-cols-1 gap-4 md:grid-cols-2";

export const RESERVATION_POSTPONEMENT_FIELD_CLASS =
  "!min-h-12";

export const RESERVATION_POSTPONEMENT_HINT_CLASS =
  "mt-1 text-sm text-on-surface-variant";

export const RESERVATION_POSTPONEMENT_CAUSE_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_POSTPONEMENT_LEGEND_CLASS =
  "mb-2 text-base font-semibold text-on-surface";

export const RESERVATION_POSTPONEMENT_CAUSE_GRID_CLASS =
  "grid grid-cols-1 gap-2 sm:grid-cols-3";

export const RESERVATION_POSTPONEMENT_ERROR_TEXT_CLASS =
  "text-sm text-error";

export const RESERVATION_POSTPONEMENT_ALERT_CLASS =
  "rounded-xl border border-error/50 bg-error-container/30 px-4 py-3 text-error";

export const RESERVATION_POSTPONEMENT_ACTIONS_CLASS =
  "sticky bottom-0 z-20 -mx-4 flex flex-col gap-3 border-t border-outline-variant/50 bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:static md:mx-0 md:flex-row-reverse md:items-center md:justify-start md:border-0 md:bg-transparent md:p-0 md:pt-2 md:backdrop-blur-none";

export const RESERVATION_POSTPONEMENT_SUBMIT_CLASS =
  "min-h-12 w-full rounded-full md:w-auto md:min-w-56";

export const RESERVATION_POSTPONEMENT_CANCEL_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto";

export const RESERVATION_POSTPONEMENT_SUCCESS_CLASS =
  "space-y-4 text-on-surface";
