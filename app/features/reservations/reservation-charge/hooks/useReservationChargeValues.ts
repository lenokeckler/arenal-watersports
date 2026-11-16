"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeValuesState } from "../models/ReservationChargeValuesState.interface";
import { resolveReservationChargeCurrencySwitch } from "../utils/resolveReservationChargeCurrencySwitch";
import { resolveReservationChargeInitialValues } from "../utils/resolveReservationChargeInitialValues";

export const useReservationChargeValues = (
  proposal: ReservationChargeProposal
): ReservationChargeValuesState => {
  const [values, setValues] = useState(() =>
    resolveReservationChargeInitialValues(proposal)
  );

  return {
    setAmountText: (amountText) =>
      setValues((current) => ({ ...current, amountText })),
    setCurrency: (currency) =>
      setValues((current) =>
        resolveReservationChargeCurrencySwitch(
          current,
          proposal,
          currency
        )
      ),
    setOtherPaymentMethod: (otherPaymentMethod) =>
      setValues((current) => ({
        ...current,
        otherPaymentMethod,
      })),
    setPaymentChoice: (paymentChoice) =>
      setValues((current) => ({
        ...current,
        paymentChoice,
      })),
    setSecondAmountText: (secondAmountText) =>
      setValues((current) => ({
        ...current,
        secondAmountText,
      })),
    toggleSecondAmount: () =>
      setValues((current) => ({
        ...current,
        secondAmountText:
          current.secondAmountText === null
            ? STRING.Empty
            : null,
      })),
    values,
  };
};
