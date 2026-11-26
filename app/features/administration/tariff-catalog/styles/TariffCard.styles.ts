export const TARIFF_CARD_CONTAINER_CLASS =
  "flex flex-col gap-2.5 rounded-xl border border-outline-variant bg-surface-container/60 p-4";

export const TARIFF_CARD_HEADER_CLASS =
  "flex items-center justify-between gap-2";

export const TARIFF_CARD_NAME_CLASS =
  "min-w-0 break-words text-lg font-bold leading-tight text-on-surface";

export const TARIFF_CARD_EDIT_LINK_CLASS =
  "inline-flex min-h-11 shrink-0 items-center gap-0.5 rounded-lg pl-2 font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary";

export const TARIFF_CARD_EDIT_ICON_CLASS = "text-xl";

export const TARIFF_CARD_LINE_CLASS =
  "flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-outline-variant pt-2";

export const TARIFF_CARD_LINE_LABEL_CLASS =
  "text-base font-bold text-on-surface";

export const TARIFF_CARD_LINE_VALUE_CLASS =
  "flex flex-wrap items-baseline justify-end gap-x-1.5";

const TARIFF_CARD_LINE_PRICE_CLASS =
  "text-right text-base font-bold text-on-surface";

const TARIFF_CARD_LINE_MISSING_CLASS =
  "inline-flex items-center rounded-full border border-dashed border-outline px-2.5 py-0.5 text-sm font-bold text-on-surface-variant";

export const TARIFF_CARD_LINE_UNIT_CLASS =
  "text-sm text-on-surface-variant";

export const resolveTariffCardLineAmountsClassName = (
  hasTariff: boolean
): string =>
  hasTariff
    ? TARIFF_CARD_LINE_PRICE_CLASS
    : TARIFF_CARD_LINE_MISSING_CLASS;
