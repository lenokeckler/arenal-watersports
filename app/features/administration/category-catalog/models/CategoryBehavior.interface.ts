import { Nullable } from "@/app/types";
import { CategoryTrackingMode } from "./CategoryTrackingMode.type";
import { UsageMetric } from "./UsageMetric.type";

export interface CategoryBehavior {
  id: string;
  trackingMode: CategoryTrackingMode;
  isReservable: boolean;
  hasMotor: boolean;
  usageMetric: Nullable<UsageMetric>;
  consumesFuel: boolean;
  canBeDamaged: boolean;
  hasConditionPhotos: boolean;
  guideOnly: boolean;
  defaultDurationMinutes: Nullable<number>;
  unitsAreInterchangeable: boolean;
}
