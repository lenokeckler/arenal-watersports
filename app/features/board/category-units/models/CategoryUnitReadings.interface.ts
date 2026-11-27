import type { DispatchUsageMetric } from "@/app/components/dispatch-board/models/DispatchUsageMetric.type";
import type { NullableRef } from "@/app/types";

export interface CategoryUnitReadings {
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  hasFuelGauge: boolean;
  impactCount: number;
  lowFuelLines: number;
  oilRemaining: NullableRef<number>;
  usageMetric: NullableRef<DispatchUsageMetric>;
  usageTotal: number;
}
