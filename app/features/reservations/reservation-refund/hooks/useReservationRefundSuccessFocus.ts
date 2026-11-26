"use client";

import { useEffect } from "react";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";

export const useReservationRefundSuccessFocus =
  (): void => {
    useEffect(() => {
      document
        .getElementById(RESERVATION_REFUND_FIELD_ID.SUCCESS)
        ?.focus();
    }, []);
  };
