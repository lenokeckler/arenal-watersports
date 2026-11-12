import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_POSTPONEMENT_READINGS_CLASS =
  "min-w-0 space-y-4";

export const RESERVATION_POSTPONEMENT_READING_UNIT_CLASS =
  "space-y-4 rounded-xl bg-surface-container-low/70 px-4 py-4";

export const RESERVATION_POSTPONEMENT_READING_UNIT_GRID_CLASS =
  "grid grid-cols-1 gap-4 md:grid-cols-2";

export const RESERVATION_POSTPONEMENT_READING_UNIT_CODE_CLASS =
  "font-mono text-base font-semibold tabular-nums text-primary";

export const RESERVATION_POSTPONEMENT_FUEL_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_POSTPONEMENT_FUEL_LEGEND_CLASS =
  "mb-2 text-sm font-semibold text-on-surface";

export const RESERVATION_POSTPONEMENT_FUEL_GRID_CLASS =
  "grid grid-cols-4 gap-2 md:grid-cols-6";

const RESERVATION_POSTPONEMENT_FUEL_OPTION_CLASS =
  "flex min-h-14 cursor-pointer flex-col items-stretch justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-3 py-3 transition-colors hover:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary active:opacity-80";

const RESERVATION_POSTPONEMENT_FUEL_OPTION_SELECTED_CLASS =
  "border-primary bg-primary/15";

export const resolveReservationPostponementFuelOptionClassName =
  (isSelected: boolean): string =>
    joinClassNames(
      RESERVATION_POSTPONEMENT_FUEL_OPTION_CLASS,
      isSelected
        ? RESERVATION_POSTPONEMENT_FUEL_OPTION_SELECTED_CLASS
        : ""
    );

export const RESERVATION_POSTPONEMENT_STRIPE_ROW_CLASS =
  "flex gap-1";

const RESERVATION_POSTPONEMENT_STRIPE_CLASS =
  "h-6 min-w-0 flex-1 rounded-sm border";

const RESERVATION_POSTPONEMENT_STRIPE_FILLED_CLASS =
  "border-primary bg-primary";

const RESERVATION_POSTPONEMENT_STRIPE_LOW_CLASS =
  "border-error bg-error";

const RESERVATION_POSTPONEMENT_STRIPE_EMPTY_CLASS =
  "border-outline bg-transparent";

export const RESERVATION_POSTPONEMENT_STRIPE_CLASSES = {
  EMPTY: joinClassNames(
    RESERVATION_POSTPONEMENT_STRIPE_CLASS,
    RESERVATION_POSTPONEMENT_STRIPE_EMPTY_CLASS
  ),
  FILLED: joinClassNames(
    RESERVATION_POSTPONEMENT_STRIPE_CLASS,
    RESERVATION_POSTPONEMENT_STRIPE_FILLED_CLASS
  ),
  LOW: joinClassNames(
    RESERVATION_POSTPONEMENT_STRIPE_CLASS,
    RESERVATION_POSTPONEMENT_STRIPE_LOW_CLASS
  ),
} as const;

const RESERVATION_POSTPONEMENT_FUEL_CAPTION_CLASS =
  "text-center text-xs tabular-nums";

export const resolveReservationPostponementFuelCaptionClassName =
  (isSelected: boolean): string =>
    joinClassNames(
      RESERVATION_POSTPONEMENT_FUEL_CAPTION_CLASS,
      isSelected
        ? "font-semibold text-primary"
        : "text-on-surface-variant"
    );

export const RESERVATION_POSTPONEMENT_USAGE_FIELD_CLASS =
  "!min-h-12 font-mono text-lg tabular-nums";
