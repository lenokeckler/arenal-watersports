import { PREDEFINED_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/PredefinedComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";

export const E2E_PREDEFINED_COMBO_FIXTURE = {
  AUDIENCE: "national",
  CATEGORY_NAME_PREFIX: "Equipo E2E",
  COMBO_NAME_PREFIX: "Paquete E2E",
  CUSTOMER_PREFIX: "E2E US-RES-09",
  FIXTURE_FAILURE:
    "Unable to prepare or clean up the local predefined combo fixture.",
  LOCAL_HOSTNAMES: ["localhost", "127.0.0.1", "::1"],
  PACKAGE_PRICE_CRC: 25_000,
  PACKAGE_PRICE_TEXT: /25\s?000,00/,
  QUANTITY: 2,
  STOCK_QUANTITY: 10,
  DURATION_MINUTES: 60,
  TRACKING_MODE: "by_quantity",
  ITEM_COUNT: PREDEFINED_COMBO_FORM_COPY.ITEM_COUNT,
  SCREENSHOT_CATALOG_BASENAME:
    "us-res-09-05-predefined-combo-catalog",
  SCREENSHOT_SELECTED_BASENAME:
    "us-res-09-05-predefined-combo-selected",
  SUCCESS_COPY: RESERVATION_FORM_UI_COPY.SUCCESS,
  STATUS: "active",
  WORKER_EMAIL_DOMAIN: "arenal.local",
  WORKER_FULL_NAME: "E2E Reservation Worker",
  WORKER_PASSWORD_PREFIX: "E2E-RES-09-",
  WORKER_USERNAME_PREFIX: "e2e-res-09-",
  WORKER_TOKEN_LENGTH: 20,
} as const;
