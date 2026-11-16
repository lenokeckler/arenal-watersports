"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER } from "../constants/ReservationChargePaymentChoice.constants";
import {
  RESERVATION_CHARGE_FIELD_ID,
  RESERVATION_CHARGE_FIRST_CHIP_INDEX,
  RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationChargeUi.constants";
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
    if (errors.secondAmount) {
      focusById(RESERVATION_CHARGE_FIELD_ID.SECOND_AMOUNT);
      return;
    }
    if (errors.paymentChoice) {
      focusById(
        RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID(
          RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER[
            RESERVATION_CHARGE_FIRST_CHIP_INDEX
          ]
        )
      );
      return;
    }
    if (errors.otherPaymentMethod) {
      focusById(
        RESERVATION_CHARGE_FIELD_ID.OTHER_PAYMENT_METHOD
      );
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
