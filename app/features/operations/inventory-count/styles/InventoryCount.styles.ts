import {
  INVENTORY_COUNT_RESULT,
  type InventoryCountResult,
} from "../constants/InventoryCount.constants";

export const INVENTORY_COUNT_PAGE_CLASS =
  "mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6";

export const INVENTORY_COUNT_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const INVENTORY_COUNT_FORM_CLASS =
  "flex flex-col gap-6 md:grid md:grid-cols-[20rem_1fr] md:items-start";

export const INVENTORY_COUNT_NOTE_CLASS =
  "text-body-md text-on-surface-variant";

export const INVENTORY_COUNT_SIDE_CLASS = {
  closed: "flex flex-col gap-3 md:row-span-2",
  open: "hidden flex-col gap-3 md:row-span-2 md:flex",
} as const;

export const INVENTORY_COUNT_PANEL_CLASS = {
  closed: "hidden md:block",
  open: "block",
} as const;

export const INVENTORY_COUNT_SUMMARY_WRAPPER_CLASS = {
  closed: "block",
  open: "hidden md:block",
} as const;

export const INVENTORY_COUNT_LIST_CLASS =
  "m-0 flex list-none flex-col gap-2 p-0 md:max-h-[60vh] md:overflow-y-auto md:pr-1";

export const INVENTORY_COUNT_PROGRESS_CLASS =
  "text-body-md font-semibold text-on-surface";

export const INVENTORY_COUNT_CATEGORY_BUTTON_CLASS = {
  active:
    "flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border-2 border-primary bg-primary/10 px-4 py-2 text-left text-on-surface",
  idle: "flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border border-outline px-4 py-2 text-left text-on-surface hover:bg-surface-container",
} as const;

export const INVENTORY_COUNT_CATEGORY_NAME_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_COUNT_CATEGORY_META_CLASS =
  "text-body-sm text-on-surface-variant";

export const INVENTORY_COUNT_BADGE_CLASS = {
  done: "shrink-0 rounded-full bg-primary/20 px-3 py-1 text-body-sm font-semibold text-on-surface",
  pending:
    "shrink-0 rounded-full border border-outline px-3 py-1 text-body-sm text-on-surface-variant",
} as const;

export const INVENTORY_COUNT_PANEL_CARD_CLASS =
  "flex flex-col gap-4 rounded-xl border border-outline p-4 md:p-6";

export const INVENTORY_COUNT_PANEL_HEADER_CLASS =
  "flex flex-col gap-2";

export const INVENTORY_COUNT_BACK_BUTTON_CLASS =
  "min-h-11 w-fit rounded-lg border border-outline px-4 text-body-md text-on-surface md:hidden";

export const INVENTORY_COUNT_SECTION_TITLE_CLASS =
  "text-title-lg text-on-surface";

export const INVENTORY_COUNT_QUANTITY_GRID_CLASS =
  "grid grid-cols-1 gap-md sm:grid-cols-3";

export const INVENTORY_COUNT_UNIT_ROW_CLASS =
  "flex flex-col gap-2 border-t border-outline/60 pt-3";

export const INVENTORY_COUNT_UNIT_HEAD_CLASS =
  "flex items-baseline justify-between gap-3";

export const INVENTORY_COUNT_UNIT_CODE_CLASS =
  "text-title-md font-semibold text-on-surface";

export const INVENTORY_COUNT_OPTIONS_CLASS =
  "grid grid-cols-2 gap-2 sm:grid-cols-4";

export const INVENTORY_COUNT_OPTION_CLASS = {
  idle: "min-h-11 rounded-lg border border-outline px-2 text-body-md text-on-surface-variant hover:bg-surface-container",
  selected:
    "min-h-11 rounded-lg border-2 border-primary bg-primary/15 px-2 text-body-md font-semibold text-on-surface",
} as const;

export const INVENTORY_COUNT_ACTIONS_CLASS =
  "flex flex-col gap-3 sm:flex-row";

export const INVENTORY_COUNT_ACTION_BUTTON_CLASS =
  "min-h-12 flex-1 rounded-lg border border-outline px-4 text-body-md font-semibold text-on-surface";

export const INVENTORY_COUNT_SUMMARY_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline p-4";

export const INVENTORY_COUNT_ERROR_CLASS =
  "rounded-xl border border-error/60 bg-error/10 px-4 py-3 text-body-base text-on-surface";

export const INVENTORY_COUNT_SUCCESS_CLASS =
  "rounded-xl border border-outline px-4 py-3 text-body-base text-on-surface";

export const INVENTORY_COUNT_RESULT_CLASS: Record<
  InventoryCountResult,
  string
> = {
  [INVENTORY_COUNT_RESULT.FAILED]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.INCOMPLETE]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.INVALID]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.NOT_ALLOWED]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.RECORDED]:
    INVENTORY_COUNT_SUCCESS_CLASS,
};
