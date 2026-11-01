import { Nullable } from "@/app/types";
import { UsageMetric } from "./UsageMetric.type";

export interface UpdateCategoryBehaviorInput {
  categoryId: string;
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
