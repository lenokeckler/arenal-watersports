import type { CategoryTrackingMode } from "@/app/components/category-catalog/models/CategoryTrackingMode.type";
import type { UsageMetric } from "@/app/components/category-catalog/models/UsageMetric.type";
import type { NullableRef } from "@/app/types";

export interface CategoryFixtureBehavior {
  hasMotor: boolean;
  trackingMode: CategoryTrackingMode;
  usageMetric: NullableRef<UsageMetric>;
}
