import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";

export const RESERVATION_EXTRAS_PRICING_INPUT_TEST = {
  DUPLICATE_EXTRA_IDS: {
    durationHours: 1,
    extraIds: [
      "f3200000-0000-4000-8000-000000000001",
      "f3200000-0000-4000-8000-000000000001",
    ],
    reservationType: "rental",
    unitId: "e3200000-0000-4000-8000-000000000001",
  },
  DUPLICATE_NORMALIZED_EXTRA_IDS: {
    durationHours: 1,
    extraIds: [
      "f3200000-0000-4000-8000-000000000001",
      "F3200000-0000-4000-8000-000000000001",
    ],
    reservationType: "rental",
    unitId: "e3200000-0000-4000-8000-000000000001",
  },
  INPUT: {
    durationHours: 1.5,
    extraIds: ["f3200000-0000-4000-8000-000000000001"],
    reservationType: "rental",
    unitId: "e3200000-0000-4000-8000-000000000001",
  } satisfies ReservationExtrasPricingInput,
  INVALID_DURATION: {
    durationHours: -1,
    extraIds: [],
    reservationType: "rental",
    unitId: "e3200000-0000-4000-8000-000000000001",
  },
  INVALID_EXTRA_ID: {
    durationHours: 1,
    extraIds: ["not-a-uuid"],
    reservationType: "rental",
    unitId: "e3200000-0000-4000-8000-000000000001",
  },
  INVALID_RESERVATION_TYPE: {
    durationHours: 1,
    extraIds: [],
    reservationType: "combo",
    unitId: "e3200000-0000-4000-8000-000000000001",
  },
  INVALID_UNIT_ID: {
    durationHours: 1,
    extraIds: [],
    reservationType: "rental",
    unitId: "invalid",
  },
  PRICING: {
    hasBoatTariff: true,
    listAmountCrc: 23000,
    listAmountUsd: 43,
  },
} as const;
