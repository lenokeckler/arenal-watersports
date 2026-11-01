import type { CurrencyCode } from "@/app/constants";
import type { Money } from "@/app/utils/money/models/Money.interface";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";

export const sumCentsByCurrency = (
  items: readonly Money[],
  currency: CurrencyCode
): number =>
  items
    .filter((item) => item.currency === currency)
    .reduce(
      (total, item) => total + toMinorUnits(item.amount),
      0
    );
