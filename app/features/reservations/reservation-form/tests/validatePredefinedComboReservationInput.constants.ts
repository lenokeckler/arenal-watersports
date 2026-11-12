import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";

export const VALID_PREDEFINED_COMBO_RESERVATION_INPUT = {
  comboId: "e4800000-0000-4000-8000-000000000301",
  customerName: " Predefined Combo Customer ",
  date: "2030-06-15",
  durationHours: 1.5,
  guideIds: ["e4800000-0000-4000-8000-000000000302"],
  peopleCount: 3,
  time: "09:30",
} satisfies PredefinedComboReservationInput;

export const EMPTY_CUSTOMER_NAME = "  ";
export const INVALID_COMBO_ID = "not-a-uuid";
export const NEGATIVE_DURATION_HOURS = -1;
export const NEGATIVE_PEOPLE_COUNT = -1;
export const ZERO_PEOPLE_COUNT = 0;
