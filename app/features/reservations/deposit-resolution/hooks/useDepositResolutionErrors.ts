"use client";

import { useState } from "react";
import {
  DEPOSIT_RESOLUTION_NO_ERRORS,
  DEPOSIT_RESOLUTION_NO_FORM_ERROR,
} from "../constants/DepositResolutionDefaults.constants";
import type { DepositResolutionErrorsState } from "../models/DepositResolutionErrorsState.interface";

export const useDepositResolutionErrors =
  (): DepositResolutionErrorsState => {
    const [errors, setErrors] = useState(
      DEPOSIT_RESOLUTION_NO_ERRORS
    );
    const [formError, setFormError] = useState(
      DEPOSIT_RESOLUTION_NO_FORM_ERROR
    );

    const showErrors: DepositResolutionErrorsState["showErrors"] =
      (nextErrors, nextFormError) => {
        setErrors(nextErrors);
        setFormError(
          nextFormError ?? DEPOSIT_RESOLUTION_NO_FORM_ERROR
        );
      };

    const clearErrors = (): void =>
      showErrors(
        DEPOSIT_RESOLUTION_NO_ERRORS,
        DEPOSIT_RESOLUTION_NO_FORM_ERROR
      );

    return { clearErrors, errors, formError, showErrors };
  };
