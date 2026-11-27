"use client";

import { useState } from "react";
import { DEPOSIT_RESOLUTION_INITIAL_VALUES } from "../constants/DepositResolutionDefaults.constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionValuesState } from "../models/DepositResolutionValuesState.interface";
import { resolveDepositResolutionKept } from "../utils/resolveDepositResolutionKept";

export const useDepositResolutionValues = (
  deposit: Pick<DepositResolution, "amount" | "currency">
): DepositResolutionValuesState => {
  const [values, setValues] = useState(
    DEPOSIT_RESOLUTION_INITIAL_VALUES
  );

  return {
    keptAmount: resolveDepositResolutionKept(
      values,
      deposit
    ),
    setReasonText: (reasonText) =>
      setValues((current) => ({ ...current, reasonText })),
    setReturnedText: (returnedText) =>
      setValues((current) => ({
        ...current,
        returnedText,
      })),
    setReturnsAll: (returnsAll) =>
      setValues((current) => ({ ...current, returnsAll })),
    values,
  };
};
