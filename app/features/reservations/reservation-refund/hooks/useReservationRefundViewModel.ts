"use client";

import type { ReservationRefund } from "../models/ReservationRefund.interface";
import type { ReservationRefundViewModel } from "../models/ReservationRefundViewModel.interface";
import { createReservationRefundEdit } from "../utils/createReservationRefundEdit";
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
    mayBeRecorded,
    recorded,
  } = useReservationRefundSubmission(
    refund.id,
    values,
    available
  );

  const edit = createReservationRefundEdit(
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
    isSubmitDisabled:
      isPending || mayBeRecorded || recorded !== null,
    mayBeRecorded,
    recorded,
    setAmountText: edit(setAmountText),
    setCurrency: edit(setCurrency),
    setOtherReasonText: edit(setOtherReasonText),
    setReason: edit(setReason),
  };
};
