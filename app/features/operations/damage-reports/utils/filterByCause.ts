import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { DamageFilters } from "../models/DamageFilters.interface";

export const filterByCause = (
  reports: EquipmentReport[],
  cause: DamageFilters["cause"]
): EquipmentReport[] =>
  cause
    ? reports.filter((report) => report.cause === cause)
    : reports;
