import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

const RESERVATION_POSTPONEMENT_OPTION_CLASS =
  "group flex min-h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-3 transition-colors hover:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

const RESERVATION_POSTPONEMENT_OPTION_SELECTED_CLASS =
  "border-primary bg-primary/15";

const RESERVATION_POSTPONEMENT_OPTION_TEXT_BASE_CLASS =
  "min-w-0 break-words text-sm";

const RESERVATION_POSTPONEMENT_OPTION_TEXT_SELECTED_CLASS =
  "font-semibold text-primary";

const RESERVATION_POSTPONEMENT_OPTION_TEXT_IDLE_CLASS =
  "text-on-surface group-hover:text-primary";

export const RESERVATION_POSTPONEMENT_OPTION_INPUT_CLASS =
  "sr-only";

export const RESERVATION_POSTPONEMENT_OPTION_ICON_CLASS =
  "text-primary";

export const resolveReservationPostponementOptionClassName =
  (isSelected: boolean): string =>
    joinClassNames(
      RESERVATION_POSTPONEMENT_OPTION_CLASS,
      isSelected
        ? RESERVATION_POSTPONEMENT_OPTION_SELECTED_CLASS
        : ""
    );

export const resolveReservationPostponementOptionTextClassName =
  (isSelected: boolean): string =>
    joinClassNames(
      RESERVATION_POSTPONEMENT_OPTION_TEXT_BASE_CLASS,
      isSelected
        ? RESERVATION_POSTPONEMENT_OPTION_TEXT_SELECTED_CLASS
        : RESERVATION_POSTPONEMENT_OPTION_TEXT_IDLE_CLASS
    );
