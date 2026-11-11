import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";

export const CUSTOM_COMBO_UNIT_SELECTOR_TEST = {
  CATEGORY_ID: "lancha-category",
  CATEGORY_NAME: "Lancha",
  AVAILABLE_UNITS: [
    { id: "lancha-a", code: "Lancha A" },
    { id: "lancha-b", code: "Lancha B" },
  ] satisfies ReservationCategoryUnitOption[],
} as const;
