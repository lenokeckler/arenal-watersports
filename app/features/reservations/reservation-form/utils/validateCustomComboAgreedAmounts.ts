import type { NullableRef } from "@/app/types";
import { CUSTOM_COMBO_AGREED_AMOUNT_MAX } from "../constants/CustomComboAgreedAmount.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { CustomComboReservationValidation } from "../models/CustomComboReservationValidation.interface";
import { addCustomComboReservationError } from "./addCustomComboReservationError";

const isValidAgreedAmount = (
  amount: NullableRef<number>,
  maximum: number
): boolean =>
  amount === null ||
  (Number.isFinite(amount) &&
    amount >= 0 &&
    amount <= maximum);

export const validateCustomComboAgreedAmounts = (
  input: CustomComboReservationInput
): CustomComboReservationValidation["errors"] => {
  const errors: CustomComboReservationValidation["errors"] =
    {};

  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC,
    isValidAgreedAmount(
      input.agreedAmountCrc,
      CUSTOM_COMBO_AGREED_AMOUNT_MAX.CRC
    ),
    CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_CRC
  );
  addCustomComboReservationError(
    errors,
    CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD,
    isValidAgreedAmount(
      input.agreedAmountUsd,
      CUSTOM_COMBO_AGREED_AMOUNT_MAX.USD
    ),
    CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_USD
  );

  return errors;
};
