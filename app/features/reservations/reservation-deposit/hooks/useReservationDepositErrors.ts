"use client";

import { useState } from "react";
import {
  RESERVATION_DEPOSIT_NO_ERRORS,
  RESERVATION_DEPOSIT_NO_FORM_ERROR,
} from "../constants/ReservationDepositDefaults.constants";
import type { ReservationDepositErrorsState } from "../models/ReservationDepositErrorsState.interface";

export const useReservationDepositErrors =
  (): ReservationDepositErrorsState => {
    const [errors, setErrors] = useState(
      RESERVATION_DEPOSIT_NO_ERRORS
    );
    const [formError, setFormError] = useState(
      RESERVATION_DEPOSIT_NO_FORM_ERROR
    );

    const showErrors: ReservationDepositErrorsState["showErrors"] =
      (nextErrors, nextFormError) => {
        setErrors(nextErrors);
        setFormError(
          nextFormError ?? RESERVATION_DEPOSIT_NO_FORM_ERROR
        );
      };

    const clearErrors = (): void =>
      showErrors(
        RESERVATION_DEPOSIT_NO_ERRORS,
        RESERVATION_DEPOSIT_NO_FORM_ERROR
      );

    return { clearErrors, errors, formError, showErrors };
  };
