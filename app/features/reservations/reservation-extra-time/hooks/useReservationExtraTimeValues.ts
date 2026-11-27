"use client";

import { useState } from "react";
import { RESERVATION_EXTRA_TIME_INITIAL_VALUES } from "../constants/ReservationExtraTimeDefaults.constants";
import type { ReservationExtraTimeValuesState } from "../models/ReservationExtraTimeValuesState.interface";

export const useReservationExtraTimeValues =
  (): ReservationExtraTimeValuesState => {
    const [values, setValues] = useState(
      RESERVATION_EXTRA_TIME_INITIAL_VALUES
    );

    return {
      setAmountText: (amountText) =>
        setValues((current) => ({
          ...current,
          amountText,
        })),
      setCurrency: (currency) =>
        setValues((current) => ({ ...current, currency })),
      setOtherPaymentMethod: (otherPaymentMethod) =>
        setValues((current) => ({
          ...current,
          otherPaymentMethod,
        })),
      setOutcome: (outcome) =>
        setValues((current) => ({ ...current, outcome })),
      setPaymentChoice: (paymentChoice) =>
        setValues((current) => ({
          ...current,
          paymentChoice,
        })),
      values,
    };
  };
