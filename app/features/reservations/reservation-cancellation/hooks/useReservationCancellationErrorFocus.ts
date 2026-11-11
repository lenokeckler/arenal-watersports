"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_CANCELLATION_FIELD_ID } from "../constants/ReservationCancellationUi.constants";
import type { ReservationCancellationErrors } from "../models/ReservationCancellationErrors.interface";

export const useReservationCancellationErrorFocus = (
  errors: ReservationCancellationErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    if (errors.reason) {
      document
        .getElementById(
          RESERVATION_CANCELLATION_FIELD_ID.REASON
        )
        ?.focus();
      return;
    }
    if (formError) {
      document
        .getElementById(
          RESERVATION_CANCELLATION_FIELD_ID.ALERT
        )
        ?.focus();
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
