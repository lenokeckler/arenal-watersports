import { CURRENCY_ORDER } from "@/app/constants";
import type { CurrencyIncomeSummary } from "./models/CurrencyIncomeSummary.interface";
import type { IncomeMovements } from "./models/IncomeMovements.interface";
import { sumCentsByCurrency } from "./sumCentsByCurrency";

export const summarizeIncomeByCurrency = ({
  charges,
  refunds,
}: IncomeMovements): CurrencyIncomeSummary[] =>
  CURRENCY_ORDER.map((currency) => {
    const chargedCents = sumCentsByCurrency(
      charges,
      currency
    );
    const refundedCents = sumCentsByCurrency(
      refunds,
      currency
    );
    return {
      currency,
      chargedCents,
      refundedCents,
      netCents: chargedCents - refundedCents,
    };
  });
