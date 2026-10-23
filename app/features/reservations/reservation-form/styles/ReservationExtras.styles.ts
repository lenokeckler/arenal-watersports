export const RESERVATION_EXTRAS_CARD_CLASS =
  "min-w-0 space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-container-low/80 p-4 md:col-span-2 md:p-5";

export const RESERVATION_EXTRAS_LEGEND_CLASS =
  "px-1 text-base font-semibold text-on-surface";

export const RESERVATION_EXTRAS_OPTIONS_CLASS =
  "grid grid-cols-1 gap-2 sm:grid-cols-2";

export const RESERVATION_EXTRAS_OPTION_CLASS =
  "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-outline-variant/70 bg-surface-container-high px-3 py-3 text-on-surface transition-colors hover:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_EXTRAS_SELECTED_OPTION_CLASS =
  "border-primary bg-primary/10";

export const resolveReservationExtrasOptionClassName = (
  isSelected: boolean
): string =>
  isSelected
    ? `${RESERVATION_EXTRAS_OPTION_CLASS} ${RESERVATION_EXTRAS_SELECTED_OPTION_CLASS}`
    : RESERVATION_EXTRAS_OPTION_CLASS;

export const RESERVATION_EXTRAS_CHECKBOX_CLASS =
  "size-5 shrink-0 accent-primary";

export const RESERVATION_EXTRAS_OPTION_CONTENT_CLASS =
  "flex min-w-0 flex-1 flex-col gap-1";

export const RESERVATION_EXTRAS_PRICES_CLASS =
  "flex flex-wrap gap-x-3 text-sm text-on-surface-variant";

export const RESERVATION_EXTRAS_INVENTORY_CLASS =
  "text-xs text-on-surface-variant";

export const RESERVATION_EXTRAS_FEEDBACK_CLASS =
  "rounded-xl border border-outline-variant/60 bg-surface-container-high px-3 py-3 text-sm text-on-surface-variant";

export const RESERVATION_EXTRAS_ERROR_CLASS =
  "rounded-xl border border-error/50 bg-error-container/30 px-3 py-3 text-sm text-error";

export const RESERVATION_EXTRAS_RETRY_CLASS =
  "mt-2 min-h-11 w-full md:w-auto";

export const RESERVATION_EXTRAS_QUOTE_CLASS =
  "flex min-w-0 flex-col gap-2 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 md:flex-1";

export const RESERVATION_EXTRAS_QUOTE_TOTALS_CLASS =
  "flex flex-wrap gap-x-5 gap-y-1";

export const RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS =
  "font-semibold text-on-surface";
