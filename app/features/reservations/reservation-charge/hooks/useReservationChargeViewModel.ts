"use client";

import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeViewModel } from "../models/ReservationChargeViewModel.interface";
import { useReservationChargeSubmission } from "./useReservationChargeSubmission";
import { useReservationChargeValues } from "./useReservationChargeValues";

export const useReservationChargeViewModel = (
  charge: ReservationCharge
): ReservationChargeViewModel => {
  const {
    currencyOptions,
    setAmountText,
    setCurrency,
    setPaymentMethod,
    values,
  } = useReservationChargeValues(charge.proposal);
  const {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending,
    recorded,
  } = useReservationChargeSubmission(charge.id, values);

  const edit =
    <Value>(apply: (next: Value) => void) =>
    (next: Value): void => {
      if (isPending) {
        return;
      }
      apply(next);
      clearErrors();
    };

  return {
    ...values,
    currencyOptions,
    errors,
    formError,
    handleSubmit,
    isPending,
    isSubmitDisabled: isPending || recorded !== null,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    setPaymentMethod: edit(setPaymentMethod),
  };
};
