"use client";

import { useMemo, useState } from "react";
import type { ReservationRefund } from "../models/ReservationRefund.interface";
import type { ReservationRefundValuesState } from "../models/ReservationRefundValuesState.interface";
import { resolveReservationRefundAvailable } from "../utils/resolveReservationRefundAvailable";
import { resolveReservationRefundCurrencyOptions } from "../utils/resolveReservationRefundCurrencyOptions";
import { resolveReservationRefundCurrencySwitch } from "../utils/resolveReservationRefundCurrencySwitch";
import { resolveReservationRefundInitialValues } from "../utils/resolveReservationRefundInitialValues";
import { resolveReservationRefundReasonSwitch } from "../utils/resolveReservationRefundReasonSwitch";

export const useReservationRefundValues = ({
  refundable,
}: Pick<
  ReservationRefund,
  "refundable"
>): ReservationRefundValuesState => {
  const currencyOptions = useMemo(
    () =>
      resolveReservationRefundCurrencyOptions(refundable),
    [refundable]
  );
  const [values, setValues] = useState(() =>
    resolveReservationRefundInitialValues(refundable)
  );

  return {
    available: resolveReservationRefundAvailable(
      refundable,
      values.currency
    ),
    currencyOptions,
    setAmountText: (amountText) =>
      setValues((current) => ({ ...current, amountText })),
    setCurrency: (currency) =>
      setValues((current) =>
        resolveReservationRefundCurrencySwitch(
          current,
          currency
        )
      ),
    setOtherReasonText: (otherReasonText) =>
      setValues((current) => ({
        ...current,
        otherReasonText,
      })),
    setReason: (reason) =>
      setValues((current) =>
        resolveReservationRefundReasonSwitch(
          current,
          reason
        )
      ),
    values,
  };
};
