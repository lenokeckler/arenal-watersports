"use client";

import { useEffect } from "react";
import { RESERVATION_DEPOSIT_FIELD_ID } from "../constants/ReservationDepositUi.constants";

export const useReservationDepositSuccessFocus =
  (): void => {
    useEffect(() => {
      document
        .getElementById(
          RESERVATION_DEPOSIT_FIELD_ID.SUCCESS
        )
        ?.focus();
    }, []);
  };
