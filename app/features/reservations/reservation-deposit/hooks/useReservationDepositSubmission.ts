"use client";

import type { ReservationDepositSubmission } from "../models/ReservationDepositSubmission.interface";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { resolveReservationDepositErrors } from "../utils/resolveReservationDepositErrors";
import { useReservationDepositErrors } from "./useReservationDepositErrors";
import { useReservationDepositSend } from "./useReservationDepositSend";

export const useReservationDepositSubmission = (
  reservationId: string,
  values: ReservationDepositValues
): ReservationDepositSubmission => {
  const { clearErrors, errors, formError, showErrors } =
    useReservationDepositErrors();
  const { isSubmitting, mayBeRecorded, recorded, send } =
    useReservationDepositSend(
      reservationId,
      values,
      showErrors
    );

  const keepErrorsWhileUnconfirmed = (): void => {
    if (!mayBeRecorded) {
      clearErrors();
    }
  };

  const handleSubmit: ReservationDepositSubmission["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (
        isSubmitting ||
        mayBeRecorded ||
        recorded !== null
      ) {
        return;
      }
      const nextErrors =
        resolveReservationDepositErrors(values);
      if (Object.keys(nextErrors).length > 0) {
        showErrors(nextErrors);
        return;
      }
      void send();
    };

  return {
    clearErrors: keepErrorsWhileUnconfirmed,
    errors,
    formError,
    handleSubmit,
    isPending: isSubmitting,
    mayBeRecorded,
    recorded,
  };
};
