import {
  CURRENCY_ORDER,
  type CurrencyCode,
} from "@/app/constants";
import { fromMinorUnits } from "@/app/utils/money/fromMinorUnits";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import { groupAmountsByPaymentMethod } from "./groupAmountsByPaymentMethod";
import type { ChargeMovement } from "./models/ChargeMovement.interface";
import type { CurrencyIncome } from "./models/CurrencyIncome.interface";

const summarizeCurrency = (
  currency: CurrencyCode,
  charges: readonly ChargeMovement[]
): CurrencyIncome => {
  const ownCharges = charges.filter(
    (charge) => charge.currency === currency
  );
  const totalMinorUnits = ownCharges.reduce(
    (sum, charge) => sum + toMinorUnits(charge.amount),
    0
  );
  return {
    currency,
    total: fromMinorUnits(totalMinorUnits),
    byPaymentMethod:
      groupAmountsByPaymentMethod(ownCharges),
  };
};

export const summarizeIncomeByCurrency = (
  charges: readonly ChargeMovement[]
): CurrencyIncome[] =>
  CURRENCY_ORDER.map((currency) =>
    summarizeCurrency(currency, charges)
  );
