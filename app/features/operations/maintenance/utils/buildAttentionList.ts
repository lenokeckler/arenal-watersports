import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import type { MaintenanceOverview } from "../models/MaintenanceOverview.interface";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const buildAttentionList = ({
  oilDue,
  outOfService,
}: MaintenanceOverview): MaintenanceUnit[] => {
  const byOil = [...oilDue].sort(
    (first, second) =>
      safeNumber(first.oilRemaining) -
      safeNumber(second.oilRemaining)
  );
  const listed = new Set(byOil.map((unit) => unit.unitId));

  return [
    ...byOil,
    ...outOfService.filter(
      (unit) => !listed.has(unit.unitId)
    ),
  ];
};
