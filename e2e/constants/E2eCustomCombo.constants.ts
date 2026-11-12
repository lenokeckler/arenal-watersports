import { CUSTOM_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/CustomComboFormCopy.constants";
import { RESERVATION_TYPE } from "@/app/features/reservations/reservation-form/constants/ReservationType.constants";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_GUIDE_ONLY_CATEGORY,
  E2E_RESERVATION_GUIDES,
} from "./E2eReservationForm.constants";

export const E2E_CUSTOM_COMBO_FIXTURE = {
  BOAT_CATEGORY_NAME:
    E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION,
  FIXTURE_FAILURE:
    "Unable to prepare or restore local custom combo tariffs.",
  GUIDE_NAME: E2E_RESERVATION_GUIDES.FIRST_NAME,
  GUIDE_ONLY_CATEGORY_NAME:
    E2E_RESERVATION_GUIDE_ONLY_CATEGORY.QUADRICYCLE,
  LOCAL_HOSTNAMES: ["localhost", "127.0.0.1", "::1"],
  REGULAR_CATEGORY_NAME:
    E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION,
  RENTAL_TARIFF: {
    amountCrc: 10_000,
    amountUsd: 20,
    type: RESERVATION_TYPE.RENTAL,
  },
  TOUR_TARIFF: {
    amountCrc: 5_000,
    amountUsd: 10,
    type: RESERVATION_TYPE.TOUR,
  },
} as const;

export const E2E_CUSTOM_COMBO = {
  AGREED_AMOUNT: {
    CRC: "28000",
    USD: "55",
  },
  COPY: CUSTOM_COMBO_FORM_COPY,
  CUSTOMER_NAME: "US-RES-10 E2E custom combo",
  ERROR_CENTER_TOLERANCE_PX: 64,
  SCREENSHOT_BASENAME: "us-res-10-06-custom-combo",
  QUANTITY: {
    INITIAL: "1",
    INCREMENTED: "2",
  },
  QUOTE: {
    SINGLE_CATEGORY_CRC: /20\s000,00/,
    SINGLE_CATEGORY_USD: /40,00/,
    COMBINED_CRC: /25\s000,00/,
    COMBINED_USD: /50,00/,
    DURATION_CRC: /37\s500,00/,
    DURATION_USD: /75,00/,
  },
} as const;

export const E2E_CUSTOM_COMBO_SCREENSHOT = {
  MISSING_EQUIPMENT_ERROR: "missing-equipment-error",
  NO_GUIDE: "no-guide",
  EQUIPMENT_SELECTION: "equipment-selection",
  PRICING_AND_GUIDE: "pricing-and-guide",
} as const;
