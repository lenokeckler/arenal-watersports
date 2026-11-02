export const RESERVATION_SPLIT_ORIGINAL_CLASS =
  "space-y-4 rounded-xl bg-surface-container-low/70 px-4 py-4";

export const RESERVATION_SPLIT_CARD_HEADING_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_SPLIT_CODE_CLASS =
  "font-mono text-sm tabular-nums text-primary";

export const RESERVATION_SPLIT_DETAILS_CLASS =
  "grid grid-cols-1 gap-3";

export const RESERVATION_SPLIT_TERM_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_SPLIT_DEFINITION_CLASS =
  "break-words text-base font-semibold text-on-surface";

export const RESERVATION_SPLIT_HINT_CLASS =
  "text-sm font-normal text-on-surface-variant";

export const RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS =
  "mt-2 space-y-2";

export const RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS =
  "flex items-baseline justify-between gap-3 break-words text-base text-on-surface";

const RESERVATION_SPLIT_EQUIPMENT_COUNT_CLASS =
  "text-right font-semibold tabular-nums";

export const resolveReservationSplitEquipmentValueClassName =
  (isUnit: boolean): string =>
    isUnit
      ? RESERVATION_SPLIT_HINT_CLASS
      : RESERVATION_SPLIT_EQUIPMENT_COUNT_CLASS;
