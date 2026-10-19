export const RESERVATION_TYPE_FIELDSET_CLASS =
  "min-w-0 space-y-2 md:col-span-2";

export const RESERVATION_TYPE_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const RESERVATION_TYPE_DESCRIPTION_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_TYPE_RADIO_CLASS = "sr-only";

export const RESERVATION_TYPE_GRID_CLASS =
  "grid grid-cols-1 gap-3 pt-1 md:grid-cols-3";

export const RESERVATION_TYPE_OPTION_CLASS =
  "flex min-h-24 cursor-pointer flex-col justify-center gap-2 rounded-2xl border bg-surface-container-high px-4 py-4 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary md:min-h-32 md:px-5";

export const RESERVATION_TYPE_OPTION_SELECTED_CLASS =
  "border-primary bg-primary/10 shadow-lg shadow-primary/5";

export const RESERVATION_TYPE_OPTION_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_TYPE_OPTION_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_TYPE_OPTION_DESCRIPTION_CLASS =
  "text-sm leading-relaxed text-on-surface-variant";

export const resolveReservationTypeOptionClassName = (
  isSelected: boolean
): string =>
  `${RESERVATION_TYPE_OPTION_CLASS} ${isSelected ? RESERVATION_TYPE_OPTION_SELECTED_CLASS : RESERVATION_TYPE_OPTION_IDLE_CLASS}`;
