import type { CATEGORY_UNIT_ACTION } from "../constants/CategoryUnits.constants";

export type CategoryUnitAction =
  (typeof CATEGORY_UNIT_ACTION)[keyof typeof CATEGORY_UNIT_ACTION];
