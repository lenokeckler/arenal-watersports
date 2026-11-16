"use client";

import type { ReservationRefundSubmission } from "../models/ReservationRefundSubmission.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { resolveReservationRefundErrors } from "../utils/resolveReservationRefundErrors";
import { useReservationRefundErrors } from "./useReservationRefundErrors";
import { useReservationRefundSend } from "./useReservationRefundSend";

export const useReservationRefundSubmission = (
  reservationId: string,
  values: ReservationRefundValues,
  available: number
): ReservationRefundSubmission => {
  const { clearErrors, errors, formError, showErrors } =
    useReservationRefundErrors();
  const { isSubmitting, recorded, send } =
    useReservationRefundSend(
      reservationId,
      values,
      showErrors
    );

  const handleSubmit: ReservationRefundSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitting || recorded !== null) {
        return;
      }
      const nextErrors = resolveReservationRefundErrors(
        values,
        available
      );
      if (Object.keys(nextErrors).length > 0) {
        showErrors(nextErrors);
        return;
      }
      void send();
    };

  return {
    clearErrors,
    errors,
    formError,
    handleSubmit,
    isPending: isSubmitting,
    recorded,
  };
};
