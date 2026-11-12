import type { CATEGORY_UNITS_DISPATCH_STEP } from "../constants/CategoryUnits.constants";

export type CategoryUnitsDispatchStep =
  (typeof CATEGORY_UNITS_DISPATCH_STEP)[keyof typeof CATEGORY_UNITS_DISPATCH_STEP];
