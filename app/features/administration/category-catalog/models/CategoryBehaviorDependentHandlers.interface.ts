import type { CategoryBehaviorFieldHandlers } from "./CategoryBehaviorFieldHandlers.interface";

export type CategoryBehaviorDependentHandlers = Pick<
  CategoryBehaviorFieldHandlers,
  | "onHasConditionPhotosChange"
  | "onHasMotorChange"
  | "onUsageMetricChange"
>;
