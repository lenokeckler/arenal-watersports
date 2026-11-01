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

export const ALL_FLAGS_OFF = {
  isReservable: false,
  hasMotor: false,
  consumesFuel: false,
  canBeDamaged: false,
  hasConditionPhotos: false,
  guideOnly: false,
  unitsAreInterchangeable: false,
} as const satisfies Record<
  (typeof CATEGORY_BEHAVIOR_FLAG_FIELDS)[number],
  boolean
>;
