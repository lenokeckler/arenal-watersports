"use client";

import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTimeViewModel } from "../models/ReservationExtraTimeViewModel.interface";
import { useReservationExtraTimeSubmission } from "./useReservationExtraTimeSubmission";
import { useReservationExtraTimeValues } from "./useReservationExtraTimeValues";

export const useReservationExtraTimeViewModel = (
  reservationId: string
): ReservationExtraTimeViewModel => {
  const {
    setAmountText,
    setCurrency,
    setOtherPaymentMethod,
    setOutcome,
    setPaymentChoice,
    values,
  } = useReservationExtraTimeValues();
  const {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending,
    recorded,
  } = useReservationExtraTimeSubmission(
    reservationId,
    values
  );

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
    errors,
    formError,
    handleSubmit,
    isCharged:
      values.outcome ===
      RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
    isPending,
    isSubmitDisabled: isPending || recorded !== null,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    setOtherPaymentMethod: edit(setOtherPaymentMethod),
    setOutcome: edit(setOutcome),
    setPaymentChoice: edit(setPaymentChoice),
  };
};
