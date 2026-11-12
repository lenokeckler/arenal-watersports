import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { ReservationChargeCurrencyOptionClassState } from "../models/ReservationChargeCurrencyOptionClassState.interface";

export const RESERVATION_CHARGE_CURRENCY_FIELDSET_CLASS =
  "min-w-0 space-y-2";

export const RESERVATION_CHARGE_CURRENCY_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const RESERVATION_CHARGE_CURRENCY_GRID_CLASS =
  "grid grid-cols-2 gap-3 pt-1";

export const RESERVATION_CHARGE_CURRENCY_RADIO_CLASS =
  "sr-only";

export const RESERVATION_CHARGE_CURRENCY_OPTION_CLASS =
  "flex min-h-24 flex-col justify-center gap-2 rounded-2xl border bg-surface-container-high px-4 py-4 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS =
  "border-2 border-primary bg-primary/10 shadow-lg shadow-primary/5";

export const RESERVATION_CHARGE_CURRENCY_OPTION_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS =
  "cursor-pointer";

export const RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const RESERVATION_CHARGE_CURRENCY_OPTION_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_CHARGE_CURRENCY_OPTION_DESCRIPTION_CLASS =
  "text-sm leading-relaxed tabular-nums text-on-surface-variant";

export const resolveReservationChargeCurrencyOptionClassName =
  ({
    isDisabled,
    isSelected,
  }: ReservationChargeCurrencyOptionClassState): string =>
    joinClassNames(
      RESERVATION_CHARGE_CURRENCY_OPTION_CLASS,
      isSelected
        ? RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS
        : RESERVATION_CHARGE_CURRENCY_OPTION_IDLE_CLASS,
      isDisabled
        ? RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS
        : RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS
    );
