import { CUSTOM_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/CustomComboFormCopy.constants";
import { RESERVATION_TYPE } from "@/app/features/reservations/reservation-form/constants/ReservationType.constants";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_GUIDE_ONLY_CATEGORY,
  E2E_RESERVATION_GUIDES,
} from "./E2eReservationForm.constants";

export const E2E_CUSTOM_COMBO_FIXTURE = {
  LOCAL_HOSTNAMES: ["localhost", "127.0.0.1", "::1"],
  REGULAR_CATEGORY_NAME:
    E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION,
  GUIDE_ONLY_CATEGORY_NAME:
    E2E_RESERVATION_GUIDE_ONLY_CATEGORY.QUADRICYCLE,
  GUIDE_NAME: E2E_RESERVATION_GUIDES.FIRST_NAME,
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
  FIXTURE_FAILURE:
    "Unable to prepare or restore local custom combo tariffs.",
} as const;

export const E2E_CUSTOM_COMBO = {
  SCREENSHOT_BASENAME: "us-res-10-06-custom-combo",
  QUANTITY: {
    INITIAL: "1",
    INCREMENTED: "2",
  },
  AGREED_AMOUNT: {
    CRC: "28000",
    USD: "55",
  },
  QUOTE: {
    SINGLE_CATEGORY_CRC: /20\s000,00/,
    SINGLE_CATEGORY_USD: /40,00/,
    COMBINED_CRC: /25\s000,00/,
    COMBINED_USD: /50,00/,
    DURATION_CRC: /37\s500,00/,
    DURATION_USD: /75,00/,
  },
  COPY: CUSTOM_COMBO_FORM_COPY,
} as const;

export const E2E_CUSTOM_COMBO_SCREENSHOT = {
  NO_GUIDE: "no-guide",
  EQUIPMENT_SELECTION: "equipment-selection",
  PRICING_AND_GUIDE: "pricing-and-guide",
} as const;
