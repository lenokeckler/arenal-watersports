import type { MaintenanceCostRow } from "../models/MaintenanceCostRow.interface";
import type { UnitMaintenanceCost } from "../models/UnitMaintenanceCost.interface";

export const groupCostsByUnit = (
  rows: MaintenanceCostRow[],
  categoryNames: Record<string, string>
): UnitMaintenanceCost[] => {
  const byUnit = new Map<string, UnitMaintenanceCost>();

  rows.forEach((row) => {
    const current = byUnit.get(row.unitId) ?? {
      categoryName: categoryNames[row.categoryId] ?? "",
      jobsCount: 0,
      lastPerformedAt: row.lastPerformedAt,
      totals: [],
      unitCode: row.unitCode,
      unitId: row.unitId,
    };

    byUnit.set(row.unitId, {
      ...current,
      jobsCount: current.jobsCount + row.recordsCount,
      lastPerformedAt:
        row.lastPerformedAt > current.lastPerformedAt
          ? row.lastPerformedAt
          : current.lastPerformedAt,
      totals: [
        ...current.totals,
        { currency: row.currency, total: row.totalCost },
      ].sort((left, right) =>
        left.currency.localeCompare(right.currency)
      ),
    });
  });

  return [...byUnit.values()].sort((left, right) =>
    left.unitCode.localeCompare(right.unitCode)
  );
};
