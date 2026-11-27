"use client";

import { useEffect, useEffectEvent } from "react";
import { DEPOSIT_RESOLUTION_FIELD_ID } from "../constants/DepositResolutionUi.constants";
import type { DepositResolutionErrors } from "../models/DepositResolutionErrors.interface";

const focusById = (id: string): void => {
  document.getElementById(id)?.focus();
};

export const useDepositResolutionErrorFocus = (
  errors: DepositResolutionErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    if (errors.returned) {
      focusById(DEPOSIT_RESOLUTION_FIELD_ID.RETURNED);
      return;
    }
    if (errors.reason) {
      focusById(DEPOSIT_RESOLUTION_FIELD_ID.REASON);
      return;
    }
    if (formError) {
      focusById(DEPOSIT_RESOLUTION_FIELD_ID.ALERT);
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};

export const useDepositResolutionSuccessFocus =
  (): void => {
    useEffect(() => {
      focusById(DEPOSIT_RESOLUTION_FIELD_ID.SUCCESS);
    }, []);
  };
