import { STRING } from "@/app/constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { ReservationExtraTimeOptionClassState } from "../models/ReservationExtraTimeOptionClassState.interface";

export const RESERVATION_EXTRA_TIME_FORM_CLASS =
  "space-y-6";

export const RESERVATION_EXTRA_TIME_FIELDSET_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_EXTRA_TIME_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const RESERVATION_EXTRA_TIME_OUTCOME_GRID_CLASS =
  "grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2";

export const RESERVATION_EXTRA_TIME_CURRENCY_GRID_CLASS =
  "grid grid-cols-2 gap-3 pt-1";

export const RESERVATION_EXTRA_TIME_CHIP_GRID_CLASS =
  "flex flex-wrap gap-2 pt-1";

export const RESERVATION_EXTRA_TIME_RADIO_CLASS = "sr-only";

export const RESERVATION_EXTRA_TIME_CARD_CLASS =
  "flex min-h-20 flex-col justify-center gap-1 rounded-2xl border bg-surface-container-high px-4 py-4 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_EXTRA_TIME_CHIP_CLASS =
  "inline-flex min-h-11 items-center rounded-full border bg-surface-container-high px-4 text-sm font-semibold transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_EXTRA_TIME_OPTION_SELECTED_CLASS =
  "border-2 border-primary bg-primary/10 text-on-surface shadow-lg shadow-primary/5";

export const RESERVATION_EXTRA_TIME_OPTION_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_EXTRA_TIME_OPTION_ENABLED_CLASS =
  "cursor-pointer";

export const RESERVATION_EXTRA_TIME_OPTION_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const RESERVATION_EXTRA_TIME_OPTION_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_EXTRA_TIME_OPTION_DESCRIPTION_CLASS =
  "text-sm leading-relaxed text-on-surface-variant";

export const RESERVATION_EXTRA_TIME_CHARGE_BLOCK_CLASS =
  "space-y-5 border-t border-outline-variant/50 pt-5";

export const RESERVATION_EXTRA_TIME_AMOUNT_INPUT_CLASS =
  "text-xl font-semibold tabular-nums";

export const RESERVATION_EXTRA_TIME_HINT_CLASS =
  "mt-1 text-sm text-on-surface-variant";

export const RESERVATION_EXTRA_TIME_ERROR_CLASS =
  "mt-1 text-sm font-medium text-error";

export const RESERVATION_EXTRA_TIME_ALERT_CLASS =
  "rounded-xl border border-error/50 bg-error-container/30 px-4 py-3 text-error";

export const RESERVATION_EXTRA_TIME_ACTIONS_CLASS =
  "sticky bottom-0 z-20 -mx-gutter flex flex-col gap-3 border-t border-outline-variant/50 bg-background/95 px-gutter py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:static md:mx-0 md:flex-row-reverse md:items-center md:justify-start md:border-0 md:bg-transparent md:p-0 md:pt-2 md:backdrop-blur-none";

export const RESERVATION_EXTRA_TIME_SUBMIT_CLASS =
  "min-h-12 w-full rounded-full md:w-auto md:min-w-56";

export const RESERVATION_EXTRA_TIME_SECONDARY_LINK_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto";

export const resolveReservationExtraTimeOptionClassName = ({
  isChip,
  isDisabled,
  isSelected,
}: ReservationExtraTimeOptionClassState): string =>
  joinClassNames(
    isChip
      ? RESERVATION_EXTRA_TIME_CHIP_CLASS
      : RESERVATION_EXTRA_TIME_CARD_CLASS,
    isSelected
      ? RESERVATION_EXTRA_TIME_OPTION_SELECTED_CLASS
      : RESERVATION_EXTRA_TIME_OPTION_IDLE_CLASS,
    isDisabled
      ? RESERVATION_EXTRA_TIME_OPTION_DISABLED_CLASS
      : RESERVATION_EXTRA_TIME_OPTION_ENABLED_CLASS
  );

export const resolveReservationExtraTimeOptionLabelClassName =
  (isChip: boolean): string =>
    isChip
      ? STRING.Empty
      : RESERVATION_EXTRA_TIME_OPTION_LABEL_CLASS;
