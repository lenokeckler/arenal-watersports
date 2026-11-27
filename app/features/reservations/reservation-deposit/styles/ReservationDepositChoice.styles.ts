import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { ReservationDepositOptionClassState } from "../models/ReservationDepositOptionClassState.interface";

export const RESERVATION_DEPOSIT_CHOICE_SELECTED_CLASS =
  "border-2 border-primary bg-primary/10 shadow-lg shadow-primary/5";

export const RESERVATION_DEPOSIT_CHOICE_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_DEPOSIT_CHOICE_ENABLED_CLASS =
  "cursor-pointer";

export const RESERVATION_DEPOSIT_CHOICE_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const RESERVATION_DEPOSIT_CHOICE_FIELDSET_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_DEPOSIT_CHOICE_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const RESERVATION_DEPOSIT_CHOICE_GRID_CLASS =
  "grid grid-cols-2 gap-3 pt-1";

export const RESERVATION_DEPOSIT_CHOICE_RADIO_CLASS =
  "sr-only";

export const RESERVATION_DEPOSIT_CHOICE_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_DEPOSIT_CHOICE_DESCRIPTION_CLASS =
  "text-sm leading-relaxed tabular-nums text-on-surface-variant";

export const RESERVATION_DEPOSIT_DECISION_OPTION_CLASS =
  "flex min-h-12 w-full items-center justify-center rounded-xl border bg-surface-container-high px-4 py-3 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_DEPOSIT_CURRENCY_OPTION_CLASS =
  "flex min-h-24 flex-col justify-center gap-2 rounded-2xl border bg-surface-container-high px-4 py-4 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

const resolveChoiceStateClassName = ({
  isDisabled,
  isSelected,
}: ReservationDepositOptionClassState): string =>
  joinClassNames(
    isSelected
      ? RESERVATION_DEPOSIT_CHOICE_SELECTED_CLASS
      : RESERVATION_DEPOSIT_CHOICE_IDLE_CLASS,
    isDisabled
      ? RESERVATION_DEPOSIT_CHOICE_DISABLED_CLASS
      : RESERVATION_DEPOSIT_CHOICE_ENABLED_CLASS
  );

export const resolveReservationDepositDecisionOptionClassName =
  (state: ReservationDepositOptionClassState): string =>
    joinClassNames(
      RESERVATION_DEPOSIT_DECISION_OPTION_CLASS,
      resolveChoiceStateClassName(state)
    );

export const resolveReservationDepositCurrencyOptionClassName =
  (state: ReservationDepositOptionClassState): string =>
    joinClassNames(
      RESERVATION_DEPOSIT_CURRENCY_OPTION_CLASS,
      resolveChoiceStateClassName(state)
    );
