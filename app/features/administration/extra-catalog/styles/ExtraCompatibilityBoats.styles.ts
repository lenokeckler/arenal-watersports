import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const EXTRA_BOATS_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-4 px-margin-mobile pt-md md:px-margin-desktop md:pt-lg";

export const EXTRA_BOATS_HEADER_CLASS =
  "flex flex-col gap-2";

export const EXTRA_BOATS_HEADING_CLASS =
  "flex flex-col gap-0.5";

export const EXTRA_BOATS_OVERLINE_CLASS =
  "text-sm font-bold text-on-surface-variant";

export const EXTRA_BOATS_TITLE_CLASS =
  "min-w-0 break-words text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const EXTRA_BOATS_SUBTITLE_CLASS =
  "text-base text-on-surface-variant";

export const EXTRA_BOATS_TOTAL_CLASS =
  "flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container/60 p-4";

export const EXTRA_BOATS_TOTAL_ICON_CLASS =
  "shrink-0 text-2xl text-primary";

export const EXTRA_BOATS_TOTAL_TEXT_CLASS = "flex flex-col";

export const EXTRA_BOATS_TOTAL_LABEL_CLASS =
  "text-base font-bold text-on-surface";

export const EXTRA_BOATS_TOTAL_HELP_CLASS =
  "text-sm text-on-surface-variant";

export const EXTRA_BOATS_GROUPS_CLASS =
  "flex flex-col gap-3";

export const EXTRA_BOATS_GROUP_CLASS =
  "overflow-hidden rounded-xl border border-outline-variant bg-surface-container";

export const EXTRA_BOATS_GROUP_HEADER_CLASS =
  "flex min-h-16 w-full items-center gap-3 px-3.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";

export const EXTRA_BOATS_GROUP_HEADER_TEXT_CLASS =
  "flex min-w-0 flex-1 flex-col";

export const EXTRA_BOATS_GROUP_NAME_CLASS =
  "break-words text-base font-bold text-on-surface";

export const EXTRA_BOATS_GROUP_COUNT_CLASS =
  "text-sm text-on-surface-variant";

export const EXTRA_BOATS_GROUP_MARKED_CLASS =
  "inline-flex min-h-7 shrink-0 items-center rounded-full bg-primary/15 px-2.5 text-sm font-bold text-primary";

const EXTRA_BOATS_GROUP_CHEVRON_OPEN_CLASS = "rotate-180";

const EXTRA_BOATS_GROUP_CHEVRON_CLASS =
  "shrink-0 text-2xl text-on-surface-variant transition-transform motion-reduce:transition-none";

export const resolveExtraBoatsGroupChevronClassName = (
  isOpen: boolean
): string =>
  joinClassNames(
    EXTRA_BOATS_GROUP_CHEVRON_CLASS,
    isOpen && EXTRA_BOATS_GROUP_CHEVRON_OPEN_CLASS
  );

export const EXTRA_BOATS_GROUP_BODY_CLASS =
  "flex flex-col gap-3 border-t border-outline-variant p-3.5";

export const EXTRA_BOATS_BAR_CLASS =
  "sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] z-10 -mx-margin-mobile flex flex-col gap-2 border-t border-outline-variant bg-surface-container px-margin-mobile pb-4 pt-3 md:static md:mx-0 md:border-0 md:bg-transparent md:px-0";

export const EXTRA_BOATS_BAR_BUTTONS_CLASS =
  "flex flex-col gap-2 md:flex-row-reverse md:justify-start";

export const EXTRA_BOATS_DIRTY_CLASS =
  "flex items-center gap-1.5 text-sm font-bold text-on-surface-variant";

export const EXTRA_BOATS_DIRTY_ICON_CLASS = "text-lg";

export const EXTRA_BOATS_BUTTON_CLASS =
  "min-h-12 w-full md:w-auto md:min-w-48";

export const EXTRA_BOATS_SHEET_BODY_CLASS =
  "flex flex-col gap-3.5";

export const EXTRA_BOATS_SHEET_TEXT_CLASS =
  "text-base text-on-surface";
