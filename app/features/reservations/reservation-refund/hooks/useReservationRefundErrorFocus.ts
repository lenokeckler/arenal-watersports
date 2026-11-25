"use client";

import { useEffect, useEffectEvent } from "react";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundErrors } from "../models/ReservationRefundErrors.interface";

const focusById = (id: string): void => {
  document.getElementById(id)?.focus();
};

export const useReservationRefundErrorFocus = (
  errors: ReservationRefundErrors,
  formError: string
): void => {
  const focusFirstProblem = useEffectEvent(() => {
    if (errors.amount) {
      focusById(RESERVATION_REFUND_FIELD_ID.AMOUNT);
      return;
    }
    if (errors.reason) {
      focusById(RESERVATION_REFUND_FIELD_ID.REASON);
      return;
    }
    if (errors.otherReason) {
      focusById(RESERVATION_REFUND_FIELD_ID.OTHER_REASON);
      return;
    }
    if (formError) {
      focusById(RESERVATION_REFUND_FIELD_ID.ALERT);
    }
  });

  useEffect(() => {
    focusFirstProblem();
  }, [errors, formError]);
};
