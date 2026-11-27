"use client";

import { useEffect, useRef } from "react";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";

export const useReservationChargeSecondAmountFocus = (
  isMixed: boolean
): void => {
  const wasMixed = useRef(isMixed);

  useEffect(() => {
    if (wasMixed.current === isMixed) {
      return;
    }
    wasMixed.current = isMixed;
    document
      .getElementById(
        isMixed
          ? RESERVATION_CHARGE_FIELD_ID.SECOND_AMOUNT
          : RESERVATION_CHARGE_FIELD_ID.ADD_CURRENCY
      )
      ?.focus();
  }, [isMixed]);
};
