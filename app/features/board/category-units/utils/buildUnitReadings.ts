import type { BoardCategoryUnitRow } from "@/app/services/board";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import type { NullableRef } from "@/app/types";
import { DEFAULT_LOW_FUEL_LINES } from "../constants/CategoryUnits.constants";

export const buildUnitReadings = (
  row: BoardCategoryUnitRow
): NullableRef<CategoryUnitReadings> =>
  row.has_motor
    ? {
        fuelLevel: row.fuel_level,
        fuelMax: safeNumber(row.fuel_max),
        hasFuelGauge: Boolean(row.consumes_fuel),
        impactCount: safeNumber(row.impact_count),
        lowFuelLines:
          row.low_fuel_lines ?? DEFAULT_LOW_FUEL_LINES,
        oilRemaining: row.oil_warning
          ? row.oil_remaining
          : null,
        usageMetric: row.usage_metric,
        usageTotal: safeNumber(row.usage_total),
      }
    : null;
