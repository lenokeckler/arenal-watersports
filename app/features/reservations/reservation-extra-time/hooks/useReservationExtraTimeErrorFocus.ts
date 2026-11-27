"use client";

import { useEffect, useEffectEvent } from "react";
import { FIRST_PAYMENT_CHOICE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME_ORDER } from "../constants/ReservationExtraTimeOutcome.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID,
  RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID,
  RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeErrors } from "../models/ReservationExtraTimeErrors.interface";

const [FIRST_OUTCOME] =
  RESERVATION_EXTRA_TIME_OUTCOME_ORDER;

const focusById = (id: string): void => {
  document.getElementById(id)?.focus();
};

const FOCUS_ORDER: readonly (readonly [
  keyof ReservationExtraTimeErrors,
  string,
])[] = [
  [
    "outcome",
    RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID(FIRST_OUTCOME),
  ],
  ["amount", FIELD_ID.AMOUNT],
  [
    "paymentChoice",
    RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID(
      FIRST_PAYMENT_CHOICE
    ),
  ],
  ["otherPaymentMethod", FIELD_ID.OTHER_PAYMENT_METHOD],
];

export const useReservationExtraTimeErrorFocus = (
  errors: ReservationExtraTimeErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    const first = FOCUS_ORDER.find(
      ([field]) => errors[field]
    );
    if (first) {
      focusById(first[1]);
      return;
    }
    if (formError) {
      focusById(FIELD_ID.ALERT);
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
