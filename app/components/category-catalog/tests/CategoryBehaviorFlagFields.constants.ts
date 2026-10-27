import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";

export const CATEGORY_BEHAVIOR_FLAG_FIELDS = [
  "isReservable",
  "hasMotor",
  "consumesFuel",
  "canBeDamaged",
  "hasConditionPhotos",
  "guideOnly",
  "unitsAreInterchangeable",
] as const satisfies ReadonlyArray<
  keyof CategoryBehaviorFormValues
>;
