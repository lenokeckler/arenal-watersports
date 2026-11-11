import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

const GUIDE_CATEGORY_ID = "category-tour";
const GUIDE_UNIT_ID = "unit-tour";
const INITIAL_DURATION_HOURS: number = 1;
const REGULAR_CATEGORY_ID = "category-rental";
const SECOND_GUIDE_UNIT_ID = "unit-tour-second-model";

export const CUSTOM_COMBO_FORM_TEST = {
  AGREED_AMOUNT: 0,
  AGREED_AMOUNT_USD: 25,
  CATEGORIES: [
    {
      id: REGULAR_CATEGORY_ID,
      isGuideOnly: false,
      isInterchangeable: true,
      name: "Kayak",
    },
    {
      id: GUIDE_CATEGORY_ID,
      isGuideOnly: true,
      isInterchangeable: false,
      name: "Lancha",
    },
  ] satisfies ReservationCategoryOption[],
  CATEGORY_SELECTION_KIND:
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
  GUIDE_CATEGORY_ID,
  GUIDE_UNIT_ID,
  GUIDE_UNIT_SELECTION: {
    categoryId: GUIDE_CATEGORY_ID,
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
    unitId: GUIDE_UNIT_ID,
  },
  INITIAL_DURATION_HOURS,
  INVALID_QUANTITY: 0,
  REGULAR_CATEGORY_ID,
  REGULAR_SELECTION: {
    categoryId: REGULAR_CATEGORY_ID,
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
    quantity: 2,
  },
  SECOND_GUIDE_UNIT_ID,
  UNIT_SELECTION_KIND:
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
  UPDATED_DURATION_HOURS: 2,
  AGREED_AMOUNT_USD_INDEPENDENT: 25,
  AGREED_AMOUNT_CRC_INDEPENDENT: 120,
  INVALID_NON_FINITE_AMOUNT: Number.NaN,
  NEGATIVE_AGREED_AMOUNT: -1,
  UPDATED_QUANTITY: 1,
  VALID_QUANTITY: 2,
} as const;
