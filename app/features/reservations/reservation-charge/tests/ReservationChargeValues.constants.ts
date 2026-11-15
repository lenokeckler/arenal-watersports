import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { CHARGE_PAYMENT_METHOD } from "./ReservationChargeAction.constants";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";

export const VALID_CHARGE_VALUES: ReservationChargeValues =
  {
    amountText: "45.50",
    currency: CURRENCY_CODE.USD,
    paymentMethod: CHARGE_PAYMENT_METHOD,
    secondAmountText: null,
  };

export const MIXED_CHARGE_VALUES: ReservationChargeValues =
  {
    ...VALID_CHARGE_VALUES,
    secondAmountText: "12000",
  };

export const VALID_CHARGE_INPUT: ReservationChargeInput = {
  ...VALID_CHARGE_VALUES,
  reservationId: CHARGE_RESERVATION_ID,
};

export const MIXED_CHARGE_INPUT: ReservationChargeInput = {
  ...MIXED_CHARGE_VALUES,
  reservationId: CHARGE_RESERVATION_ID,
};

export const NON_BREAKING_SPACE = "\u00a0";

export const ZERO_WIDTH_SPACE = "\u200b";

export const MONGOLIAN_VOWEL_SEPARATOR = "\u180e";

export const BYTE_ORDER_MARK = "\ufeff";
