import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

const INITIAL_DURATION_HOURS: number = 1;

export const CUSTOM_COMBO_FORM_TEST = {
  REGULAR_CATEGORY_ID: "category-rental",
  GUIDE_CATEGORY_ID: "category-tour",
  CATEGORIES: [
    {
      id: "category-rental",
      isGuideOnly: false,
      isInterchangeable: true,
      name: "Kayak",
    },
    {
      id: "category-tour",
      isGuideOnly: true,
      isInterchangeable: false,
      name: "Lancha",
    },
  ] satisfies ReservationCategoryOption[],
  INVALID_QUANTITY: 0,
  VALID_QUANTITY: 2,
  UPDATED_QUANTITY: 1,
  INITIAL_DURATION_HOURS,
  UPDATED_DURATION_HOURS: 2,
  AGREED_AMOUNT_USD: 25,
  AGREED_AMOUNT: 0,
} as const;
