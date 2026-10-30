import type { CurrencyIncomeSummary } from "@/app/services/income-report";
import { fromMinorUnits } from "@/app/utils/money/fromMinorUnits";
import type { CurrencyIncomeDisplay } from "../models/CurrencyIncomeDisplay.interface";

export const toCurrencyIncomeDisplay = ({
  currency,
  chargedCents,
  refundedCents,
  netCents,
}: CurrencyIncomeSummary): CurrencyIncomeDisplay => ({
  currency,
  hasMovement: chargedCents > 0 || refundedCents > 0,
  collected: {
    amount: fromMinorUnits(chargedCents),
    currency,
  },
  refunded: {
    amount: fromMinorUnits(refundedCents),
    currency,
  },
  net: {
    amount: fromMinorUnits(Math.abs(netCents)),
    currency,
  },
  isNetNegative: netCents < 0,
});
