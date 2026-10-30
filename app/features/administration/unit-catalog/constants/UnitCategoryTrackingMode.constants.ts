export const UNIT_CATEGORY_TRACKING_MODE = {
  BY_QUANTITY: "by_quantity",
  BY_UNIT: "by_unit",
} as const;

export type UnitCategoryTrackingMode =
  (typeof UNIT_CATEGORY_TRACKING_MODE)[keyof typeof UNIT_CATEGORY_TRACKING_MODE];
