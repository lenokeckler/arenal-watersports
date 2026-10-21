import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";

const GUIDE_IDS = ["guide-a"];

export const RESERVATION_SUBMIT_TEST = {
  FORM_NAME: "Reservation submission",
  COMBO_OPTIONS: {
    customCombo: {
      draft: {
        agreedAmountCrc: 0,
        agreedAmountUsd: 25,
        items: [{ categoryId: "category-a", quantity: 2 }],
      },
      hasGuideOnlyItem: true,
    },
    requiresConcreteUnit: true,
    resolvedDurationHours: 1.5,
    setFieldError: () => undefined,
    submitCustomComboReservation: () => undefined,
    submitReservation: () => undefined,
    values: {
      categoryId: "category-a",
      customerName: "Customer",
      date: "2030-04-12",
      durationHours: 1,
      guideIds: GUIDE_IDS,
      peopleCount: 2,
      quantity: 1,
      reservationType: RESERVATION_TYPE.COMBO,
      time: "09:00",
      unitId: "unit-a",
    },
  } satisfies ReservationFormSubmitOptions,
  EXPECTED_CUSTOM_COMBO_INPUT: {
    agreedAmountCrc: 0,
    agreedAmountUsd: 25,
    customerName: "Customer",
    date: "2030-04-12",
    durationHours: 1.5,
    guideIds: GUIDE_IDS,
    items: [{ categoryId: "category-a", quantity: 2 }],
    peopleCount: 2,
    time: "09:00",
  },
} as const;
