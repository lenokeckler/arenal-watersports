"use client";

import type { ReservationRefund } from "../models/ReservationRefund.interface";
import type { ReservationRefundViewModel } from "../models/ReservationRefundViewModel.interface";
import { useReservationRefundEdit } from "./useReservationRefundEdit";
import { useReservationRefundSubmission } from "./useReservationRefundSubmission";
import { useReservationRefundValues } from "./useReservationRefundValues";

export const useReservationRefundViewModel = (
  refund: ReservationRefund
): ReservationRefundViewModel => {
  const {
    available,
    currencyOptions,
    setAmountText,
    setCurrency,
    setOtherReasonText,
    setReason,
    values,
  } = useReservationRefundValues(refund);
  const {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending,
    recorded,
  } = useReservationRefundSubmission(
    refund.id,
    values,
    available
  );

  const edit = useReservationRefundEdit(
    isPending,
    clearErrors
  );

  return {
    ...values,
    available,
    currencyOptions,
    errors,
    formError,
    handleSubmit,
    isPending,
    isSubmitDisabled: isPending || recorded !== null,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    setOtherReasonText: edit(setOtherReasonText),
    setReason: edit(setReason),
  };
};
