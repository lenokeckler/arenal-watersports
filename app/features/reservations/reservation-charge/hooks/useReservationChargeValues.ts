"use client";

import { useMemo, useState } from "react";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeValuesState } from "../models/ReservationChargeValuesState.interface";
import { resolveReservationChargeCurrencyOptions } from "../utils/resolveReservationChargeCurrencyOptions";
import { resolveReservationChargeCurrencySwitch } from "../utils/resolveReservationChargeCurrencySwitch";
import { resolveReservationChargeInitialValues } from "../utils/resolveReservationChargeInitialValues";

export const useReservationChargeValues = (
  proposal: ReservationChargeProposal
): ReservationChargeValuesState => {
  const currencyOptions = useMemo(
    () => resolveReservationChargeCurrencyOptions(proposal),
    [proposal]
  );
  const [values, setValues] = useState(() =>
    resolveReservationChargeInitialValues(proposal)
  );

  return {
    currencyOptions,
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
    setPaymentMethod: (paymentMethod) =>
      setValues((current) => ({
        ...current,
        paymentMethod,
      })),
    values,
  };
};
