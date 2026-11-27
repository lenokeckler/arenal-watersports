import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import type { RankedUnit } from "./models/RankedUnit.interface";
import type { UnitAmount } from "./models/UnitAmount.interface";

export const rankUnits = (
  amounts: UnitAmount[],
  limit: number
): RankedUnit[] => {
  const totals = new Map<string, RankedUnit>();

  amounts.forEach(({ amount, unitCode, unitId }) => {
    const current = safeNumber(totals.get(unitId)?.total);
    totals.set(unitId, {
      total: current + amount,
      unitCode,
      unitId,
    });
  });

  return [...totals.values()]
    .filter((unit) => unit.total > 0)
    .sort(
      (first, second) =>
        second.total - first.total ||
        first.unitCode.localeCompare(second.unitCode)
    )
    .slice(0, limit);
};
