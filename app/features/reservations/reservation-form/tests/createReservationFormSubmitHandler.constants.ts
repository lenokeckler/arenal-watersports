import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";

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
    predefinedCombo: {
      mode: PREDEFINED_COMBO_SELECTION_MODE.CUSTOM,
      selectedComboId: null,
    },
    requiresConcreteUnit: true,
    resolvedDurationHours: 1.5,
    setFieldError: () => undefined,
    setSubmissionError: () => undefined,
    submitCustomComboReservation: () => undefined,
    submitPredefinedComboReservation: () => undefined,
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
  EXPECTED_PREDEFINED_COMBO_INPUT: {
    comboId: "saved-combo-a",
    customerName: "Customer",
    date: "2030-04-12",
    durationHours: 1.5,
    guideIds: GUIDE_IDS,
    peopleCount: 2,
    time: "09:00",
  },
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
  PREDEFINED_COMBO_ID: "saved-combo-a",
  PREDEFINED_COMBO_NO_SELECTION_ERROR:
    "Seleccione un paquete para continuar.",
} as const;
