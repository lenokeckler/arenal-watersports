import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";

export const PREDEFINED_COMBO_RESERVATION_ACTION_TEST = {
  AUTHORIZATION_ERROR: new Error(
    "Reservation access denied"
  ),
  CREATED_RESERVATION_ID:
    "e4800000-0000-4000-8000-000000000304",
  INPUT: {
    comboId: "e4800000-0000-4000-8000-000000000301",
    customerName: "  Predefined Combo Customer  ",
    date: "2030-06-15",
    durationHours: 1.5,
    guideIds: ["e4800000-0000-4000-8000-000000000302"],
    peopleCount: 3,
    time: "09:30",
  } satisfies PredefinedComboReservationInput,
  INVALID_INPUT: null,
  PERSISTENCE_ERROR: new Error(
    "Predefined combo reservation persistence failed"
  ),
  VALIDATED_INPUT: {
    comboId: "e4800000-0000-4000-8000-000000000301",
    customerName: "Predefined Combo Customer",
    date: "2030-06-15",
    durationMinutes: 90,
    guideIds: ["e4800000-0000-4000-8000-000000000302"],
    peopleCount: 3,
    time: "09:30",
  },
} as const;
