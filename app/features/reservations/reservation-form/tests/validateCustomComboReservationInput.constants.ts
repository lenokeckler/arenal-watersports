import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import { CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES } from "../constants/CustomComboPricing.constants";

export const VALID_CUSTOM_COMBO_RESERVATION_INPUT: CustomComboReservationInput =
  {
    agreedAmountCrc: 30000,
    agreedAmountUsd: 60,
    customerName: "  MarÃ­a LÃ³pez  ",
    date: "2028-02-29",
    durationHours: 1.5,
    guideIds: ["e2500000-0000-4000-8000-000000000301"],
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
    peopleCount: 3,
    time: "09:30",
  };

export const EXPECTED_CUSTOM_COMBO_DURATION_MINUTES = 90;
export const NEGATIVE_AGREED_AMOUNT = -1;
export const NON_FINITE_AGREED_AMOUNTS = [
  Number.NaN,
  Number.POSITIVE_INFINITY,
];
export const INVALID_CUSTOM_COMBO_QUANTITY = 0;
export const INVALID_CUSTOM_COMBO_PEOPLE_COUNTS = [
  0, -1, 1.5,
];
export const INVALID_CUSTOM_COMBO_DURATION_HOURS =
  (CUSTOM_COMBO_PRICING_MAX_DURATION_MINUTES + 1) / 60;
