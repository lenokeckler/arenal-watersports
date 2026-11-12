"use client";

import { useEffect } from "react";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";

export const useReservationChargeSuccessFocus =
  (): void => {
    useEffect(() => {
      document
        .getElementById(RESERVATION_CHARGE_FIELD_ID.SUCCESS)
        ?.focus();
    }, []);
  };
