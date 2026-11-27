"use client";

import { useEffect } from "react";
import { RESERVATION_EXTRA_TIME_FIELD_ID } from "../constants/ReservationExtraTimeUi.constants";

export const useReservationExtraTimeSuccessFocus =
  (): void => {
    useEffect(() => {
      document
        .getElementById(
          RESERVATION_EXTRA_TIME_FIELD_ID.SUCCESS
        )
        ?.focus();
    }, []);
  };
