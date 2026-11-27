import {
  EXTRA_FORM_ACTION_BUTTON_CLASS,
  EXTRA_FORM_ACTIONS_CLASS,
  EXTRA_FORM_CARD_CLASS,
  EXTRA_FORM_CONTENT_CLASS,
} from "./ExtraForm.styles";

export const EXTRA_COMPATIBILITY_UNITS_CONTENT_CLASS =
  EXTRA_FORM_CONTENT_CLASS;

export const EXTRA_COMPATIBILITY_UNITS_CARD_CLASS =
  EXTRA_FORM_CARD_CLASS;

export const EXTRA_COMPATIBILITY_UNITS_ACTIONS_CLASS =
  EXTRA_FORM_ACTIONS_CLASS;

export const EXTRA_COMPATIBILITY_UNITS_ACTION_BUTTON_CLASS =
  EXTRA_FORM_ACTION_BUTTON_CLASS;

export const EXTRA_COMPATIBILITY_UNITS_HELPERS_CLASS =
  "grid grid-cols-2 gap-3";

export const EXTRA_COMPATIBILITY_UNITS_HELPER_BUTTON_CLASS =
  "min-h-11 w-full";

export const EXTRA_COMPATIBILITY_UNITS_LIST_CLASS =
  "flex flex-col gap-2";

const EXTRA_COMPATIBILITY_UNIT_ROW_BASE_CLASS =
  "flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-2 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

const EXTRA_COMPATIBILITY_UNIT_ROW_CHECKED_CLASS = `${EXTRA_COMPATIBILITY_UNIT_ROW_BASE_CLASS} border-primary bg-primary/10`;

const EXTRA_COMPATIBILITY_UNIT_ROW_UNCHECKED_CLASS = `${EXTRA_COMPATIBILITY_UNIT_ROW_BASE_CLASS} border-outline-variant bg-surface-container/60 hover:bg-surface-container-high`;

export const resolveExtraCompatibilityUnitRowClass = (
  isChecked: boolean
): string =>
  isChecked
    ? EXTRA_COMPATIBILITY_UNIT_ROW_CHECKED_CLASS
    : EXTRA_COMPATIBILITY_UNIT_ROW_UNCHECKED_CLASS;

export const EXTRA_COMPATIBILITY_UNIT_CHECKBOX_CLASS =
  "size-6 shrink-0 accent-primary";

export const EXTRA_COMPATIBILITY_UNIT_TEXT_CLASS =
  "flex min-w-0 flex-col";

export const EXTRA_COMPATIBILITY_UNIT_CODE_CLASS =
  "break-words text-title-md font-semibold text-on-surface";

export const EXTRA_COMPATIBILITY_UNIT_STATUS_CLASS =
  "text-sm font-medium text-on-surface-variant";

export const EXTRA_COMPATIBILITY_UNITS_EMPTY_CLASS =
  "py-6 text-center text-body-base text-on-surface-variant";
