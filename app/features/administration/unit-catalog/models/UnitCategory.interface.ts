import type { NullableRef } from "@/app/types";
import type { UnitCategoryTrackingMode } from "../constants/UnitCategoryTrackingMode.constants";
import type { UnitUsageMetric } from "../constants/UnitUsageMetric.constants";

export interface UnitCategory {
  id: string;
  name: string;
  trackingMode: UnitCategoryTrackingMode;
  hasMotor: boolean;
  usageMetric: NullableRef<UnitUsageMetric>;
}
