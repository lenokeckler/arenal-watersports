"use client";

import { useEffect } from "react";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";

export const useReservationSplitAlertFocus = (
  message: string
): void => {
  useEffect(() => {
    if (message) {
      document
        .getElementById(RESERVATION_SPLIT_FIELD_ID.ALERT)
        ?.focus();
    }
  }, [message]);
};
