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

const RESERVATION_SPLIT_DEFINITION_BASE_CLASS =
  "break-words text-base font-semibold tabular-nums";

const RESERVATION_SPLIT_DEFINITION_CLASS = `${RESERVATION_SPLIT_DEFINITION_BASE_CLASS} text-on-surface`;

const RESERVATION_SPLIT_DEFINITION_MINIMUM_CLASS = `${RESERVATION_SPLIT_DEFINITION_BASE_CLASS} text-primary`;

export const resolveReservationSplitDefinitionClassName = (
  isAtMinimum: boolean
): string =>
  isAtMinimum
    ? RESERVATION_SPLIT_DEFINITION_MINIMUM_CLASS
    : RESERVATION_SPLIT_DEFINITION_CLASS;

export const RESERVATION_SPLIT_HINT_CLASS =
  "text-sm font-normal text-on-surface-variant";

export const RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS =
  "mt-2 space-y-2";

export const RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS =
  "flex items-baseline justify-between gap-3 break-words text-base text-on-surface";

const RESERVATION_SPLIT_EQUIPMENT_COUNT_CLASS =
  "text-right font-semibold tabular-nums";

const RESERVATION_SPLIT_EQUIPMENT_COUNT_MINIMUM_CLASS = `${RESERVATION_SPLIT_EQUIPMENT_COUNT_CLASS} text-primary`;

export const resolveReservationSplitEquipmentValueClassName =
  (isUnit: boolean, isAtMinimum: boolean): string => {
    if (isUnit) {
      return RESERVATION_SPLIT_HINT_CLASS;
    }
    return isAtMinimum
      ? RESERVATION_SPLIT_EQUIPMENT_COUNT_MINIMUM_CLASS
      : RESERVATION_SPLIT_EQUIPMENT_COUNT_CLASS;
  };

export const RESERVATION_SPLIT_DEPARTURE_CLASS =
  "space-y-4 rounded-2xl border border-outline-variant bg-surface-container-high/70 p-4 md:p-5";

export const RESERVATION_SPLIT_DEPARTURE_HEADER_CLASS =
  "flex items-center justify-between gap-3";

export const RESERVATION_SPLIT_REMOVE_CLASS =
  "min-h-11 min-w-11 rounded-lg px-3 text-sm font-semibold text-error underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error active:opacity-80";

export const RESERVATION_SPLIT_DEPARTURE_GRID_CLASS =
  "grid grid-cols-1 gap-4 md:grid-cols-2";

export const RESERVATION_SPLIT_FIELD_WIDE_CLASS =
  "min-w-0 md:col-span-2";

export const RESERVATION_SPLIT_TIME_FIELD_CLASS =
  "!min-h-12";

export const RESERVATION_SPLIT_TIME_HINT_CLASS =
  "mt-2 text-sm text-primary";

export const RESERVATION_SPLIT_EQUIPMENT_LEGEND_CLASS =
  "mb-3 text-sm font-medium text-on-surface-variant";

export const RESERVATION_SPLIT_EQUIPMENT_ERROR_CLASS =
  "text-sm text-error";
