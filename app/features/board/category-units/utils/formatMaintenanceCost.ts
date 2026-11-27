import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";

export const formatMaintenanceCost = (
  amount: NullableRef<number>,
  currency: NullableRef<string>
): NullableRef<string> => {
  const code = resolveQueryChoice(
    currency ?? undefined,
    EQUIPMENT_CURRENCIES
  );

  return amount === null || code === null
    ? null
    : formatMoney({ amount, currency: code });
};
