import type { CustomComboPricing } from "../models/CustomComboPricing.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";

export const CUSTOM_COMBO_PRICING_ACTION_TEST = {
  AUTHORIZATION_ERROR: new Error(
    "Reservation access denied"
  ),
  INPUT: {
    durationHours: 1.5,
    items: [
      {
        categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
        quantity: 2,
      },
      {
        categoryId: "aaaaaaaa-0000-0000-0000-000000000002",
        quantity: 1,
      },
    ],
  } satisfies CustomComboPricingInput,
  INVALID_INPUT: {
    durationHours: 1.5,
    items: [
      {
        categoryId: "",
        quantity: 1,
      },
    ],
  },
  PRICING: {
    listAmountCrc: 18000,
    listAmountUsd: 36,
  } satisfies CustomComboPricing,
  PRICING_ERROR: new Error("Pricing service failed"),
} as const;
