import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { ValidatedCustomComboReservationInput } from "../models/ValidatedCustomComboReservationInput.interface";

export const CUSTOM_COMBO_RESERVATION_ACTION_TEST = {
  AUTHORIZATION_ERROR: new Error(
    "Reservation access denied"
  ),
  CREATED_RESERVATION_ID:
    "e4800000-0000-4000-8000-000000000201",
  INPUT: {
    agreedAmountCrc: 30000,
    agreedAmountUsd: 60,
    customerName: "  Combo Customer  ",
    date: "2030-06-15",
    durationHours: 1.5,
    items: [
      {
        categoryId: "e4800000-0000-4000-8000-000000000101",
        quantity: 2,
      },
      {
        categoryId: "e4800000-0000-4000-8000-000000000102",
        quantity: 1,
      },
    ],
    peopleCount: 3,
    time: "09:30",
  } satisfies CustomComboReservationInput,
  INVALID_DURATION_INPUT: {
    agreedAmountCrc: 30000,
    agreedAmountUsd: 60,
    customerName: "Combo Customer",
    date: "2030-06-15",
    durationHours: 0,
    items: [
      {
        categoryId: "e4800000-0000-4000-8000-000000000101",
        quantity: 2,
      },
    ],
    peopleCount: 3,
    time: "09:30",
  } satisfies CustomComboReservationInput,
  INVALID_SHAPE: null,
  SERVICE_ERROR: new Error(
    "Reservation persistence failed"
  ),
  VALIDATED_INPUT: {
    agreedAmountCrc: 30000,
    agreedAmountUsd: 60,
    customerName: "Combo Customer",
    date: "2030-06-15",
    durationMinutes: 90,
    guideIds: [],
    items: [
      {
        categoryId: "e4800000-0000-4000-8000-000000000101",
        quantity: 2,
      },
      {
        categoryId: "e4800000-0000-4000-8000-000000000102",
        quantity: 1,
      },
    ],
    peopleCount: 3,
    time: "09:30",
  } satisfies ValidatedCustomComboReservationInput,
} as const;
