"use client";

import { useState } from "react";
import {
  RESERVATION_EXTRA_TIME_NO_ERRORS,
  RESERVATION_EXTRA_TIME_NO_FORM_ERROR,
} from "../constants/ReservationExtraTimeDefaults.constants";
import type { ReservationExtraTimeErrorsState } from "../models/ReservationExtraTimeErrorsState.interface";

export const useReservationExtraTimeErrors =
  (): ReservationExtraTimeErrorsState => {
    const [errors, setErrors] = useState(
      RESERVATION_EXTRA_TIME_NO_ERRORS
    );
    const [formError, setFormError] = useState(
      RESERVATION_EXTRA_TIME_NO_FORM_ERROR
    );

    const showErrors: ReservationExtraTimeErrorsState["showErrors"] =
      (nextErrors, nextFormError) => {
        setErrors(nextErrors);
        setFormError(
          nextFormError ??
            RESERVATION_EXTRA_TIME_NO_FORM_ERROR
        );
      };

    const clearErrors = (): void =>
      showErrors(RESERVATION_EXTRA_TIME_NO_ERRORS);

    return { clearErrors, errors, formError, showErrors };
  };
