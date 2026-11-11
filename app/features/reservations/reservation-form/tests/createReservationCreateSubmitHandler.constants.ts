import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCreateSubmitOptions } from "../models/ReservationCreateSubmitOptions.interface";

const GUIDE_IDS = ["guide-a"];

export const RESERVATION_CREATE_SUBMIT_TEST = {
  FORM_NAME: "Reservation submission",
  COMBO_OPTIONS: {
    applyResult: () => undefined,
    customCombo: {
      draft: {
        agreedAmountCrc: 0,
        agreedAmountUsd: 25,
        items: [
          {
            kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
            categoryId: "category-a",
            quantity: 2,
          },
        ],
      },
      hasGuideOnlyItem: true,
    },
    durationHours: 1.5,
    isQuantityUnavailable: false,
    onSuccess: () => undefined,
    onUnitUnavailable: () => undefined,
    predefinedCombo: {
      mode: PREDEFINED_COMBO_SELECTION_MODE.CUSTOM,
      selectedComboId: null,
    },
    requestErrorFocus: () => undefined,
    requiresConcreteUnit: false,
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
      unitId: "",
    },
  } satisfies ReservationCreateSubmitOptions,
  EXPECTED_PREDEFINED_COMBO_INPUT: {
    comboId: "saved-combo-a",
    customerName: "Customer",
    date: "2030-04-12",
    durationHours: 1.5,
    guideIds: GUIDE_IDS,
    peopleCount: 2,
    time: "09:00",
  },
  PREDEFINED_COMBO_ID: "saved-combo-a",
  PREDEFINED_COMBO_NO_SELECTION_ERROR:
    "Seleccione un paquete para continuar.",
} as const;
