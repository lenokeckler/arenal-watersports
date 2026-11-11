import type { CustomComboPricing } from "../models/CustomComboPricing.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

const EMPTY_INPUT: CustomComboPricingInput = {
  durationHours: 1,
  items: [],
};
const PRICING: CustomComboPricing = {
  listAmountCrc: 0,
  listAmountUsd: null,
};
const STALE_PRICING: CustomComboPricing = {
  listAmountCrc: 999,
  listAmountUsd: 999,
};

export const CUSTOM_COMBO_PRICING_TEST = {
  EMPTY_INPUT,
  ERROR_MESSAGE: "pricing request rejected",
  FIRST_INPUT: {
    durationHours: 1,
    items: [
      {
        categoryId: "category-a",
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        quantity: 1,
      },
    ],
  } satisfies CustomComboPricingInput,
  PRICING,
  SECOND_INPUT: {
    durationHours: 2,
    items: [
      {
        categoryId: "category-b",
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        quantity: 2,
      },
    ],
  } satisfies CustomComboPricingInput,
  STALE_PRICING,
  UNIT_INPUT: {
    durationHours: 1,
    items: [
      {
        categoryId: "category-lancha",
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
        unitId: "unit-lancha-model-a",
      },
    ],
  } satisfies CustomComboPricingInput,
} as const;
