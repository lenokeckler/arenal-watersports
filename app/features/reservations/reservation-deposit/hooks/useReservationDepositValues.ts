"use client";

import { useState } from "react";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositValuesState } from "../models/ReservationDepositValuesState.interface";
import { resolveReservationDepositCurrencySwitch } from "../utils/resolveReservationDepositCurrencySwitch";
import { resolveReservationDepositInitialValues } from "../utils/resolveReservationDepositInitialValues";

export const useReservationDepositValues = (
  proposal: ReservationDepositProposal
): ReservationDepositValuesState => {
  const [values, setValues] = useState(() =>
    resolveReservationDepositInitialValues(proposal)
  );

  return {
    proposal,
    setAmountText: (amountText) =>
      setValues((current) => ({ ...current, amountText })),
    setCurrency: (currency) =>
      setValues((current) =>
        resolveReservationDepositCurrencySwitch(
          current,
          proposal,
          currency
        )
      ),
    setHasDeposit: (hasDeposit) =>
      setValues((current) => ({ ...current, hasDeposit })),
    values,
  };
};
