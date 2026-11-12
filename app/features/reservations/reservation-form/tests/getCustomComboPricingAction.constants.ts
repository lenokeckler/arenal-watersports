import type { CustomComboPricing } from "../models/CustomComboPricing.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

export const CUSTOM_COMBO_PRICING_ACTION_TEST = {
  AUTHORIZATION_ERROR: new Error(
    "Reservation access denied"
  ),
  INPUT: {
    durationHours: 1.5,
    items: [
      {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
        quantity: 2,
      },
      {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId: "aaaaaaaa-0000-0000-0000-000000000002",
        quantity: 1,
      },
    ],
  } satisfies CustomComboPricingInput,
  INVALID_DURATION_INPUT: {
    durationHours: 0,
    items: [
      {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
        quantity: 1,
      },
    ],
  },
  INVALID_INPUT: {
    durationHours: 1.5,
    items: [
      {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
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
