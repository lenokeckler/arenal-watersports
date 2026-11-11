"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitErrors } from "../models/ReservationSplitErrors.interface";
import { resolveReservationSplitInvalidControlId } from "../utils/resolveReservationSplitInvalidControlId";

export const useReservationSplitErrorFocus = (
  errors: ReservationSplitErrors,
  formError: string,
  drafts: ReservationSplitDraft[]
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    const controlId =
      resolveReservationSplitInvalidControlId(
        errors.departures,
        drafts
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
        .getElementById(RESERVATION_SPLIT_FIELD_ID.ALERT)
        ?.focus();
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
