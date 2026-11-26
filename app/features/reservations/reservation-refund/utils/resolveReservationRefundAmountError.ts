import {
  MONEY_AMOUNT_ISSUE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { countMoneyAmountDecimals } from "@/app/utils/money/countMoneyAmountDecimals";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import { RESERVATION_REFUND_LIMITS } from "../constants/ReservationRefundLimits.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as COPY } from "../constants/ReservationRefundValidationCopy.constants";
import { parseReservationRefundAmount } from "./parseReservationRefundAmount";

export const resolveReservationRefundAmountError = (
  amountText: string,
  currency: CurrencyCode,
  available?: number
): NullableUndefined<string> => {
  const trimmed = amountText.trim();
  if (trimmed === STRING.Empty) {
    return COPY.AMOUNT_REQUIRED;
  }
  const limits = RESERVATION_REFUND_LIMITS.AMOUNT[currency];
  const issue = findMoneyAmountIssue(trimmed, limits);
  if (issue !== null) {
    return issue === MONEY_AMOUNT_ISSUE.PRECISION &&
      countMoneyAmountDecimals(trimmed) >
        limits.decimalPlaces
      ? COPY.AMOUNT_TOO_MANY_DECIMALS
      : COPY.AMOUNT[issue];
  }
  return available !== undefined &&
    toMinorUnits(parseReservationRefundAmount(trimmed)) >
      toMinorUnits(available)
    ? COPY.AMOUNT_ABOVE_AVAILABLE(
        formatMoney({ amount: available, currency })
      )
    : undefined;
};
