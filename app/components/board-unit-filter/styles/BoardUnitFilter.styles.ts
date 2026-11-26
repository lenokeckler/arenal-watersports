import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const BOARD_UNIT_FILTER_CLASS =
  "relative flex shrink-0";

export const BOARD_UNIT_FILTER_TRIGGER_CLASS =
  "inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-outline-variant bg-card-tint-neutral-bg px-md text-button font-semibold text-on-surface hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const BOARD_UNIT_FILTER_TRIGGER_COUNT_CLASS =
  "font-bold text-primary";

export const BOARD_UNIT_FILTER_MENU_CLASS =
  "m-0 min-w-60 gap-xs rounded-xl border border-outline-variant bg-background p-xs text-on-surface shadow-lg [inset:auto] [position-area:block-end_span-inline-start] [position-try-fallbacks:flip-block] [&:popover-open]:flex [&:popover-open]:flex-col";

export const BOARD_UNIT_FILTER_ITEM_CLASS =
  "flex min-h-12 items-center justify-between gap-md rounded-lg border border-outline-variant bg-card-tint-neutral-bg px-md text-button font-semibold whitespace-nowrap hover:border-primary focus-visible:outline-2 focus-visible:outline-primary";

export const BOARD_UNIT_FILTER_ITEM_CURRENT_CLASS =
  "border-primary bg-primary/10 text-primary";

export const BOARD_UNIT_FILTER_COUNT_CLASS =
  "font-bold text-on-surface-variant";

export const BOARD_UNIT_FILTER_COUNT_CURRENT_CLASS =
  "font-bold text-primary";

export const resolveBoardUnitFilterItemClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    BOARD_UNIT_FILTER_ITEM_CLASS,
    isCurrent
      ? BOARD_UNIT_FILTER_ITEM_CURRENT_CLASS
      : undefined
  );

export const resolveBoardUnitFilterCountClass = (
  isCurrent: boolean
): string =>
  isCurrent
    ? BOARD_UNIT_FILTER_COUNT_CURRENT_CLASS
    : BOARD_UNIT_FILTER_COUNT_CLASS;
