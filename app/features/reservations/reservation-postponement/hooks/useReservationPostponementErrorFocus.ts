"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";
import { resolveReservationPostponementInvalidControlId } from "../utils/resolveReservationPostponementInvalidControlId";

export const useReservationPostponementErrorFocus = (
  errors: ReservationPostponementErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    const controlId =
      resolveReservationPostponementInvalidControlId(
        errors
      );
    const control = controlId
      ? document.getElementById(controlId)
      : null;
    if (control) {
      control.focus();
      return;
    }
    if (formError) {
      document
        .getElementById(
          RESERVATION_POSTPONEMENT_FIELD_ID.ALERT
        )
        ?.focus();
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
