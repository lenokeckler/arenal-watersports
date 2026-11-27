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

export const MAINTENANCE_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const MAINTENANCE_SECTION_CLASS =
  "flex flex-col gap-3";

export const MAINTENANCE_LIST_CLASS =
  "flex w-full flex-col gap-3 [&_ul]:list-none";

export const MAINTENANCE_CARD_CLASS =
  "flex min-h-11 flex-col gap-1 rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3 shadow-sm backdrop-blur";

export const MAINTENANCE_CARD_HEADING_CLASS =
  "text-title-md font-semibold text-on-surface";

export const MAINTENANCE_CARD_DETAIL_CLASS =
  "text-body-base text-on-surface-variant";

export const MAINTENANCE_OIL_HEADER_CLASS =
  "flex items-center justify-between gap-sm";

export const MAINTENANCE_OIL_COLUMNS_CLASS =
  "grid grid-cols-2 gap-md";

export const MAINTENANCE_OIL_COLUMN_CLASS = "flex flex-col";

export const MAINTENANCE_OIL_CAPTION_CLASS =
  "text-body-sm text-on-surface-variant";

export const MAINTENANCE_OIL_VALUE_CLASS =
  "text-title-md font-semibold text-on-surface";

export const MAINTENANCE_STATUS_CLASS =
  "text-body-base font-semibold text-error";

export const MAINTENANCE_NEW_JOB_LINK_CLASS =
  "inline-flex min-h-12 items-center self-start rounded-xl border border-outline-variant bg-surface-container/80 px-4 text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const MAINTENANCE_CARD_LINK_CLASS =
  "inline-flex min-h-11 items-center self-start text-body-base font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
