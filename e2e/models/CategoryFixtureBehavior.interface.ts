import type { CategoryTrackingMode } from "@/app/features/administration/category-catalog/models/CategoryTrackingMode.type";
import type { UsageMetric } from "@/app/features/administration/category-catalog/models/UsageMetric.type";
import type { NullableRef } from "@/app/types";

export interface CategoryFixtureBehavior {
  hasMotor: boolean;
  trackingMode: CategoryTrackingMode;
  usageMetric: NullableRef<UsageMetric>;
}
