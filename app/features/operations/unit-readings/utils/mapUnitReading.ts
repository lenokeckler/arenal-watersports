import type { Database } from "@/app/types";
import type { UnitReading } from "../models/UnitReading.interface";

interface UnitReadingRow {
  category: {
    name: string;
    usage_metric:
      Database["public"]["Enums"]["usage_metric"] | null;
  } | null;
  code: string;
  fuel_level: number | null;
  fuel_max: number;
  id: string;
  impact_count: number;
  next_oil_change_at: number | null;
  status: Database["public"]["Enums"]["unit_status"];
  usage_total: number;
}

export const mapUnitReading = (
  row: UnitReadingRow
): UnitReading => ({
  categoryName: row.category?.name ?? "",
  code: row.code,
  fuelLevel: row.fuel_level,
  fuelMax: row.fuel_max,
  id: row.id,
  impactCount: row.impact_count,
  nextOilChangeAt:
    row.next_oil_change_at === null
      ? null
      : Number(row.next_oil_change_at),
  status: row.status,
  usageMetric: row.category?.usage_metric ?? null,
  usageTotal: Number(row.usage_total),
});
