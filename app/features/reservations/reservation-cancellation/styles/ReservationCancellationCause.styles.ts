import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { ReservationCancellationCauseOptionClassState } from "../models/ReservationCancellationCauseOptionClassState.interface";

export const RESERVATION_CANCELLATION_CAUSE_FIELDSET_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_CANCELLATION_CAUSE_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const RESERVATION_CANCELLATION_CAUSE_HELPER_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_CANCELLATION_CAUSE_ERROR_CLASS =
  "text-sm text-error";

export const RESERVATION_CANCELLATION_CAUSE_GRID_CLASS =
  "grid grid-cols-1 gap-3 pt-1 md:grid-cols-2";

export const RESERVATION_CANCELLATION_CAUSE_RADIO_CLASS =
  "sr-only";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_CLASS =
  "flex min-h-24 flex-col justify-center gap-2 rounded-2xl border bg-surface-container-high px-4 py-4 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary md:px-5";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_SELECTED_CLASS =
  "border-2 border-primary bg-primary/10 shadow-lg shadow-primary/5";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_ERROR_CLASS =
  "border-error text-on-surface hover:border-error";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_ENABLED_CLASS =
  "cursor-pointer";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_CANCELLATION_CAUSE_OPTION_DESCRIPTION_CLASS =
  "text-sm leading-relaxed text-on-surface-variant";

export const resolveReservationCancellationCauseOptionClassName =
  ({
    hasError,
    isDisabled,
    isSelected,
  }: ReservationCancellationCauseOptionClassState): string =>
    joinClassNames(
      RESERVATION_CANCELLATION_CAUSE_OPTION_CLASS,
      isSelected &&
        RESERVATION_CANCELLATION_CAUSE_OPTION_SELECTED_CLASS,
      !isSelected &&
        !hasError &&
        RESERVATION_CANCELLATION_CAUSE_OPTION_IDLE_CLASS,
      !isSelected &&
        hasError &&
        RESERVATION_CANCELLATION_CAUSE_OPTION_ERROR_CLASS,
      isDisabled
        ? RESERVATION_CANCELLATION_CAUSE_OPTION_DISABLED_CLASS
        : RESERVATION_CANCELLATION_CAUSE_OPTION_ENABLED_CLASS
    );
