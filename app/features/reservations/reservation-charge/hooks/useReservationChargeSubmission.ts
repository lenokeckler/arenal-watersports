"use client";

import type { ReservationChargeSubmission } from "../models/ReservationChargeSubmission.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";
import { useReservationChargeErrors } from "./useReservationChargeErrors";
import { useReservationChargeSend } from "./useReservationChargeSend";

export const useReservationChargeSubmission = (
  reservationId: string,
  values: ReservationChargeValues
): ReservationChargeSubmission => {
  const { clearErrors, errors, formError, showErrors } =
    useReservationChargeErrors();
  const { isSubmitting, recorded, send } =
    useReservationChargeSend(
      reservationId,
      values,
      showErrors
    );

  const handleSubmit: ReservationChargeSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitting || recorded !== null) {
        return;
      }
      const nextErrors =
        resolveReservationChargeErrors(values);
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
