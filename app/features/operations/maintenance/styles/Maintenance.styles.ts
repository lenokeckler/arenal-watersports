import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const MAINTENANCE_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6 lg:max-w-5xl";

export const MAINTENANCE_SECTION_HEADING_CLASS =
  "text-title-md font-semibold text-on-surface";

export const MAINTENANCE_MESSAGE_CLASS =
  "rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3 text-body-base text-on-surface";

export const MAINTENANCE_HINT_CLASS =
  "text-body-sm text-on-surface-variant";

export const MAINTENANCE_ATTEND_ROW_CLASS =
  "flex min-h-12 items-center justify-between gap-2 rounded-xl border border-outline-variant bg-surface-container/80 px-3 hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const MAINTENANCE_ATTEND_CODE_CLASS =
  "text-body-base font-semibold text-on-surface";

export const MAINTENANCE_ATTEND_VALUES_CLASS =
  "flex items-center gap-2";

export const MAINTENANCE_ATTEND_STATE_CLASS =
  "text-body-sm font-semibold";

export const resolveMaintenanceStateClass = (
  isDamaged: boolean
): string =>
  joinClassNames(
    MAINTENANCE_ATTEND_STATE_CLASS,
    isDamaged ? "text-error" : "text-on-surface-variant"
  );

export const MAINTENANCE_SPLIT_CLASS =
  "grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr] lg:items-start";

export const MAINTENANCE_COLUMN_CLASS =
  "flex min-w-0 flex-col gap-3";
