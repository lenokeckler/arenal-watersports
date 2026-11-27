import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const EXTRA_FORM_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-4 px-margin-mobile pt-md md:px-margin-desktop md:pt-lg";

export const EXTRA_FORM_HEADER_CLASS =
  "flex flex-col gap-2";

export const EXTRA_FORM_BACK_LINK_CLASS =
  "-ml-1.5 inline-flex min-h-11 items-center gap-1 self-start rounded-lg pr-2 font-bold text-primary focus-visible:outline-2 focus-visible:outline-primary";

export const EXTRA_FORM_BACK_ICON_CLASS = "text-xl";

export const EXTRA_FORM_HEADING_CLASS =
  "flex flex-col gap-0.5";

export const EXTRA_FORM_OVERLINE_CLASS =
  "text-sm font-bold text-on-surface-variant";

export const EXTRA_FORM_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const EXTRA_FORM_FORM_CLASS = "flex flex-col gap-4";

export const EXTRA_FORM_CARD_CLASS =
  "flex flex-col gap-6 rounded-2xl border border-outline-variant bg-surface-container p-4 md:p-6";

export const EXTRA_FORM_NAME_GROUP_CLASS =
  "flex flex-col gap-1.5";

export const EXTRA_FORM_GROUP_CLASS = "flex flex-col gap-3";

export const EXTRA_FORM_GROUP_TITLE_CLASS =
  "text-lg font-bold text-on-surface";

export const EXTRA_FORM_PRICE_FIELDS_CLASS =
  "grid grid-cols-1 gap-3 sm:grid-cols-2";

export const EXTRA_FORM_HELP_CLASS =
  "text-sm text-on-surface-variant";

export const EXTRA_FORM_PRICE_INPUT_CLASS: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.CRC]: "pl-9",
  [CURRENCY_CODE.USD]: "pl-14",
};

export const EXTRA_FORM_NOTE_CLASS =
  "flex items-start gap-2.5 rounded-xl bg-primary/10 px-3.5 py-3 text-base text-on-surface";

export const EXTRA_FORM_NOTE_ICON_CLASS =
  "shrink-0 text-xl text-primary";

export const EXTRA_FORM_BOATS_LINK_CLASS =
  "flex min-h-14 items-center gap-3 rounded-xl border border-outline-variant px-3.5 text-on-surface hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary";

export const EXTRA_FORM_BOATS_LINK_TEXT_CLASS =
  "min-w-0 flex-1 font-bold";

export const EXTRA_FORM_BOATS_LINK_CUE_CLASS =
  "inline-flex shrink-0 items-center gap-0.5 font-bold text-primary";

export const EXTRA_FORM_ACTIONS_CLASS =
  "sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] z-10 -mx-margin-mobile flex flex-col gap-2 border-t border-outline-variant bg-surface-container px-margin-mobile pb-4 pt-3 md:static md:mx-0 md:flex-row-reverse md:justify-start md:border-0 md:bg-transparent md:px-0";

export const EXTRA_FORM_ACTION_BUTTON_CLASS =
  "min-h-12 w-full min-w-0 md:w-auto md:min-w-40";
