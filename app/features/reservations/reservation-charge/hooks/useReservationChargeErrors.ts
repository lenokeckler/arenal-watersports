"use client";

import { useState } from "react";
import {
  RESERVATION_CHARGE_NO_ERRORS,
  RESERVATION_CHARGE_NO_FORM_ERROR,
} from "../constants/ReservationChargeDefaults.constants";
import type { ReservationChargeErrorsState } from "../models/ReservationChargeErrorsState.interface";

export const useReservationChargeErrors =
  (): ReservationChargeErrorsState => {
    const [errors, setErrors] = useState(
      RESERVATION_CHARGE_NO_ERRORS
    );
    const [formError, setFormError] = useState(
      RESERVATION_CHARGE_NO_FORM_ERROR
    );

    const showErrors: ReservationChargeErrorsState["showErrors"] =
      (nextErrors, nextFormError) => {
        setErrors(nextErrors);
        setFormError(
          nextFormError ?? RESERVATION_CHARGE_NO_FORM_ERROR
        );
      };

    const clearErrors = (): void =>
      showErrors(
        RESERVATION_CHARGE_NO_ERRORS,
        RESERVATION_CHARGE_NO_FORM_ERROR
      );

    return { clearErrors, errors, formError, showErrors };
  };
