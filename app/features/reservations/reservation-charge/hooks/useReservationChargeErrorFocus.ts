"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";

const focusById = (id: string): void => {
  document.getElementById(id)?.focus();
};

export const useReservationChargeErrorFocus = (
  errors: ReservationChargeErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    if (errors.amount) {
      focusById(RESERVATION_CHARGE_FIELD_ID.AMOUNT);
      return;
    }
    if (errors.paymentMethod) {
      focusById(RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD);
      return;
    }
    if (formError) {
      focusById(RESERVATION_CHARGE_FIELD_ID.ALERT);
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
