"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_DEPOSIT_FIELD_ID } from "../constants/ReservationDepositUi.constants";
import type { ReservationDepositErrors } from "../models/ReservationDepositErrors.interface";

const focusById = (id: string): void => {
  document.getElementById(id)?.focus();
};

export const useReservationDepositErrorFocus = (
  errors: ReservationDepositErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    if (errors.amount) {
      focusById(RESERVATION_DEPOSIT_FIELD_ID.AMOUNT);
      return;
    }
    if (formError) {
      focusById(RESERVATION_DEPOSIT_FIELD_ID.ALERT);
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
