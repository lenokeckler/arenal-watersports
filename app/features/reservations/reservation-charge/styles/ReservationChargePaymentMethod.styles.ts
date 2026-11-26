import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { ReservationChargePaymentMethodChipClassState } from "../models/ReservationChargePaymentMethodChipClassState.interface";
import {
  RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS,
  RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS,
  RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS,
} from "./ReservationChargeCurrency.styles";

export const RESERVATION_CHARGE_PAYMENT_METHOD_GROUP_CLASS =
  "space-y-3";

export const RESERVATION_CHARGE_PAYMENT_METHOD_GRID_CLASS =
  "grid grid-cols-3 gap-2 pt-1 sm:grid-cols-5";

export const RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_CLASS =
  "flex min-h-12 items-center justify-center rounded-xl border bg-surface-container-high px-2 py-2 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

export const RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_INVALID_CLASS =
  "border-error text-on-surface hover:border-error";

export const RESERVATION_CHARGE_PAYMENT_METHOD_ERROR_CLASS =
  "text-sm text-error";

const resolveChipTone = ({
  isInvalid,
  isSelected,
}: Pick<
  ReservationChargePaymentMethodChipClassState,
  "isInvalid" | "isSelected"
>): string => {
  if (isSelected) {
    return RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS;
  }
  return isInvalid
    ? RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_INVALID_CLASS
    : RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_IDLE_CLASS;
};

export const resolveReservationChargePaymentMethodChipClassName =
  ({
    isDisabled,
    isInvalid,
    isSelected,
  }: ReservationChargePaymentMethodChipClassState): string =>
    joinClassNames(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_CLASS,
      resolveChipTone({ isInvalid, isSelected }),
      isDisabled
        ? RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS
        : RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS
    );
