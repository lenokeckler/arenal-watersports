import type { CustomComboPricing } from "../models/CustomComboPricing.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";

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
  FIRST_INPUT: {
    durationHours: 1,
    items: [{ categoryId: "category-a", quantity: 1 }],
  } satisfies CustomComboPricingInput,
  SECOND_INPUT: {
    durationHours: 2,
    items: [{ categoryId: "category-b", quantity: 2 }],
  } satisfies CustomComboPricingInput,
  PRICING,
  STALE_PRICING,
  ERROR_MESSAGE: "pricing request rejected",
} as const;
