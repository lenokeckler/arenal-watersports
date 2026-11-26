import type { NullableRef } from "@/app/types";
import { CATEGORY_UNIT_USAGE } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

export const formatMaintenanceCost = (
  amount: NullableRef<number>,
  currency: NullableRef<string>
): NullableRef<string> =>
  amount === null || currency === null
    ? null
    : CATEGORY_UNITS_COPY.STATUS_COST_AMOUNT(
        CATEGORY_UNITS_COPY.STATUS_COST_SYMBOLS[currency] ??
          currency,
        amount.toLocaleString(CATEGORY_UNIT_USAGE.LOCALE)
      );
