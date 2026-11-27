"use client";

import type { ReservationExtraTimeSubmission } from "../models/ReservationExtraTimeSubmission.interface";
import type { ReservationExtraTimeValues } from "../models/ReservationExtraTimeValues.interface";
import { resolveReservationExtraTimeErrors } from "../utils/resolveReservationExtraTimeErrors";
import { useReservationExtraTimeErrors } from "./useReservationExtraTimeErrors";
import { useReservationExtraTimeSend } from "./useReservationExtraTimeSend";

export const useReservationExtraTimeSubmission = (
  reservationId: string,
  values: ReservationExtraTimeValues
): ReservationExtraTimeSubmission => {
  const { clearErrors, errors, formError, showErrors } =
    useReservationExtraTimeErrors();
  const { isSubmitting, recorded, send } =
    useReservationExtraTimeSend(
      reservationId,
      values,
      showErrors
    );

  const handleSubmit: ReservationExtraTimeSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitting || recorded !== null) {
        return;
      }
      const nextErrors =
        resolveReservationExtraTimeErrors(values);
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
