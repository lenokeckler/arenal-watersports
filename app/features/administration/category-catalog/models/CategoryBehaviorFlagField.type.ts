import type { CATEGORY_BEHAVIOR_FLAG_FIELD } from "../constants/CategoryBehaviorFlagField.constants";

export type CategoryBehaviorFlagField =
  (typeof CATEGORY_BEHAVIOR_FLAG_FIELD)[keyof typeof CATEGORY_BEHAVIOR_FLAG_FIELD];
