import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const COMBO_FORM_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-4 px-margin-mobile pt-md md:px-margin-desktop md:pt-lg";

export const COMBO_FORM_HEADER_CLASS =
  "flex flex-col gap-1";

export const COMBO_FORM_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const COMBO_FORM_SUBTITLE_CLASS =
  "text-base text-on-surface-variant";

export const COMBO_FORM_FORM_CLASS = "flex flex-col gap-4";

export const COMBO_FORM_CARD_CLASS =
  "flex flex-col gap-5 rounded-2xl border border-outline-variant bg-surface-container p-4 md:p-6";

export const COMBO_FORM_ACTIONS_CLASS =
  "sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] z-10 -mx-margin-mobile flex flex-col gap-2 border-t border-outline-variant bg-surface-container px-margin-mobile pb-4 pt-3 md:static md:mx-0 md:flex-row-reverse md:justify-start md:border-0 md:bg-transparent md:px-0";

export const COMBO_FORM_ACTION_BUTTON_CLASS =
  "min-h-12 w-full min-w-0 md:w-auto md:min-w-40";

export const COMBO_FORM_GROUP_CLASS =
  "flex flex-col gap-2.5";

export const COMBO_FORM_GROUP_TITLE_CLASS =
  "text-base font-bold text-on-surface";

export const COMBO_AUDIENCE_OPTIONS_CLASS =
  "grid grid-cols-2 gap-2";

const COMBO_AUDIENCE_OPTION_BASE_CLASS =
  "flex min-h-16 w-full flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-4 text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const COMBO_AUDIENCE_OPTION_SELECTED_CLASS =
  "border-primary bg-primary text-on-primary";

const COMBO_AUDIENCE_OPTION_IDLE_CLASS =
  "border-outline text-on-surface hover:bg-surface-container-high";

export const resolveComboAudienceOptionClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    COMBO_AUDIENCE_OPTION_BASE_CLASS,
    isSelected
      ? COMBO_AUDIENCE_OPTION_SELECTED_CLASS
      : COMBO_AUDIENCE_OPTION_IDLE_CLASS
  );

export const COMBO_AUDIENCE_OPTION_NOTE_CLASS =
  "text-sm font-normal opacity-85";

export const COMBO_AUDIENCE_HELP_CLASS =
  "text-sm text-on-surface-variant";

export const COMBO_AUDIENCE_LOCKED_CLASS =
  "flex min-h-14 items-center gap-2 rounded-xl border-2 border-dashed border-outline px-3.5";

export const COMBO_AUDIENCE_LOCKED_LABEL_CLASS =
  "flex-1 font-bold text-on-surface";

export const COMBO_AUDIENCE_LOCKED_NOTE_CLASS =
  "inline-flex items-center gap-1 text-sm text-on-surface-variant";

export const COMBO_AUDIENCE_LOCKED_ICON_CLASS = "text-lg";

export const COMBO_FORM_PRICE_INPUT_CLASS: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.CRC]: "pl-9",
  [CURRENCY_CODE.USD]: "pl-14",
};

export const COMBO_ITEM_ROW_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant p-3";

export const COMBO_ITEM_QUANTITY_ROW_CLASS =
  "flex items-end gap-3";

export const COMBO_ITEM_STEPPER_CLASS =
  "flex flex-1 items-end gap-1.5";

export const COMBO_ITEM_QUANTITY_FIELD_CLASS =
  "min-w-0 flex-1";

export const COMBO_ITEM_QUANTITY_INPUT_CLASS =
  "text-center text-xl font-bold";

export const COMBO_ITEM_STEP_BUTTON_CLASS =
  "flex h-14 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-outline bg-surface-container-high text-on-surface hover:border-primary focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50";

export const COMBO_ITEM_REMOVE_BUTTON_CLASS =
  "inline-flex min-h-12 shrink-0 items-center gap-1.5 px-1 text-base font-bold text-error hover:underline focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50";

export const COMBO_ITEM_ADD_BUTTON_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline px-4 text-base font-bold text-on-surface hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50";

export const COMBO_ITEMS_ERROR_CLASS =
  "text-body-base text-error";
