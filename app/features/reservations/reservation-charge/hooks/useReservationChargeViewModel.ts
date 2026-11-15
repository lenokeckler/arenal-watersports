"use client";

import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeViewModel } from "../models/ReservationChargeViewModel.interface";
import { resolveReservationChargeSecondCurrency } from "../utils/resolveReservationChargeSecondCurrency";
import { useReservationChargeEdit } from "./useReservationChargeEdit";
import { useReservationChargeSubmission } from "./useReservationChargeSubmission";
import { useReservationChargeValues } from "./useReservationChargeValues";

export const useReservationChargeViewModel = (
  charge: ReservationCharge
): ReservationChargeViewModel => {
  const {
    setAmountText,
    setCurrency,
    setPaymentMethod,
    setSecondAmountText,
    toggleSecondAmount,
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

  const edit = useReservationChargeEdit(
    isPending,
    clearErrors
  );

  return {
    ...values,
    errors,
    formError,
    handleSubmit,
    isPending,
    isMixed: values.secondAmountText !== null,
    isSubmitDisabled: isPending || recorded !== null,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    secondCurrency: resolveReservationChargeSecondCurrency(
      values.currency
    ),
    setPaymentMethod: edit(setPaymentMethod),
    setSecondAmountText: edit(setSecondAmountText),
    toggleSecondAmount: edit<void>(toggleSecondAmount),
  };
};
