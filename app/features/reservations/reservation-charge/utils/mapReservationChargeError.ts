import { RESERVATION_CHARGE_REFUSALS } from "../constants/ReservationChargeRefusals.constants";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import type { ReservationChargePaymentChoice } from "../models/ReservationChargePaymentChoice.type";
import type { NullableRef } from "@/app/types";
import { resolveReservationChargeMethodRefusalErrors } from "./resolveReservationChargeMethodRefusalErrors";

export const mapReservationChargeError = (
  error: unknown,
  paymentChoice: NullableRef<ReservationChargePaymentChoice>
): ReservationChargeActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_CHARGE_REFUSALS.find(
    ({ message }) => error.message.includes(message)
  );

  if (!refusal) {
    throw error;
  }

  return {
    ok: false,
    errors: {
      ...refusal.errors,
      ...resolveReservationChargeMethodRefusalErrors(
        refusal.paymentMethodError,
        paymentChoice
      ),
    },
    formError: refusal.formError,
  };
};
