import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import { TARIFF_TYPE_SECTION_STATE } from "../constants/TariffTypeSectionState.constants";
import type { TariffTypeSectionState } from "../models/TariffTypeSectionState.type";

export const TARIFF_FORM_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-4 px-margin-mobile pt-md md:px-margin-desktop md:pt-lg";

export const TARIFF_FORM_HEADER_CLASS =
  "flex flex-col gap-0.5";

export const TARIFF_FORM_EYEBROW_CLASS =
  "text-sm font-bold text-on-surface-variant";

export const TARIFF_FORM_TITLE_CLASS =
  "min-w-0 break-words text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const TARIFF_FORM_NOTE_CLASS =
  "flex items-start gap-2.5 rounded-xl bg-primary/10 px-3.5 py-3 text-base text-on-surface";

export const TARIFF_FORM_NOTE_ICON_CLASS =
  "shrink-0 text-xl text-primary";

export const TARIFF_FORM_FORM_CLASS = "flex flex-col gap-4";

export const TARIFF_FORM_CARD_CLASS =
  "flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container p-4 md:p-6";

export const TARIFF_FORM_ACTIONS_CLASS =
  "sticky bottom-0 z-10 -mx-margin-mobile flex flex-col gap-2 border-t border-outline-variant bg-surface-container px-margin-mobile pb-4 pt-3 md:static md:mx-0 md:flex-row-reverse md:justify-start md:border-0 md:bg-transparent md:px-0";

export const TARIFF_FORM_ACTION_BUTTON_CLASS =
  "min-h-12 w-full min-w-0 md:w-auto md:min-w-40";

export const TARIFF_FORM_SECTION_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant p-3";

export const TARIFF_FORM_SECTION_HEADER_CLASS =
  "flex items-center justify-between gap-2";

export const TARIFF_FORM_SECTION_TITLE_CLASS =
  "text-lg font-bold text-on-surface";

const TARIFF_FORM_SECTION_STATUS_BASE_CLASS =
  "inline-flex min-h-8 items-center whitespace-nowrap rounded-full px-3 text-sm font-bold";

export const TARIFF_FORM_SECTION_STATUS_CLASS: Record<
  TariffTypeSectionState,
  string
> = {
  [TARIFF_TYPE_SECTION_STATE.EMPTY]: `${TARIFF_FORM_SECTION_STATUS_BASE_CLASS} border border-dashed border-outline text-on-surface-variant`,
  [TARIFF_TYPE_SECTION_STATE.SAVED]: `${TARIFF_FORM_SECTION_STATUS_BASE_CLASS} bg-primary/15 text-primary`,
};

export const TARIFF_FORM_SECTION_HELP_CLASS =
  "text-sm text-on-surface-variant";

export const TARIFF_FORM_PRICE_INPUT_CLASS: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.CRC]: "pl-9 pr-24",
  [CURRENCY_CODE.USD]: "pl-14 pr-24",
};
