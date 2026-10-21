import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_RESERVATION_FORM_COPY = {
  HEADING: "Nueva reserva",
  BACK_TO_CALENDAR: "Volver al calendario",
  ACTIONS: "Acciones de reserva",
  CUSTOMER_NAME: "Nombre de la reserva",
  PEOPLE_COUNT: "Cantidad de personas",
  QUANTITY: "Cantidad de equipos",
  DATE: "Fecha de la actividad",
  TIME: "Hora de inicio",
  TIME_ZONE: "Hora de Costa Rica · UTC−06:00",
  DURATION: "Duración en horas",
  CUSTOM_DURATION: "Otra duración en horas",
  CUSTOM_DURATION_OPTION: "Otra duración",
  CUSTOM_DURATION_HOURS: "2.5",
  NEGATIVE_INPUT: "-1",
  VALID_EQUIPMENT_QUANTITY: "3",
  VALID_PEOPLE_COUNT: "4",
  CATEGORY: "Equipo",
  CATEGORY_FIELD_NAME: "Equipo *",
  UNIT: "Unidad de lancha",
  UNIT_OPTION: "PONTOON",
  CATEGORY_OPTION: "Jet Ski",
  CATEGORY_AVAILABILITY_OPTION: "Jet Ski",
  CATEGORY_AVAILABILITY_TIME: "10:00",
  CONCRETE_CATEGORY_OPTION: "Lancha",
  REALTIME_UNIT_OPTION: "BENNINGTON",
  REALTIME_DATE: "2099-12-31",
  CUSTOMER_NAME_VALID: "US-RES-04 E2E reservation",
  SUBMIT: "Registrar reserva",
  SUCCESS: "La reserva quedó registrada correctamente.",
  VALIDATION_ERROR: "Ingrese el nombre de la reserva.",
  SCREENSHOT_DATE: "2099-12-31",
} as const;

export const E2E_RESERVATION_EQUIPMENT_STATUS = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
} as const;

export const E2E_RESERVATION_FORM_MOBILE_VIEWPORT = {
  HEIGHT: 844,
  WIDTH: 390,
} as const;

export const E2E_RESERVATION_FORM_SCREENSHOT_BASENAME =
  "reservation-form";

export const E2E_RESERVATION_FORM_EQUIPMENT_SCREENSHOT_SUFFIX =
  "equipment-and-submit";

export const E2E_RESERVATION_FORM_UNIT_SCREENSHOT_SUFFIX =
  "lancha-unit-selected";

export const E2E_RESERVATION_FORM_CUSTOM_DURATION_SCREENSHOT_SUFFIX =
  "custom-duration";

export const E2E_RESERVATION_FORM_SUCCESS_SCREENSHOT_SUFFIX =
  "success";

export const E2E_RESERVATION_FORM_ELIGIBILITY_SCREENSHOT_SUFFIX =
  "eligibility-refreshed";

export const E2E_RESERVATION_CATEGORY_AVAILABILITY_SCREENSHOT_BASENAME =
  "us-res-15-01-interval-availability";

export const E2E_RESERVATION_CATEGORY_CONFLICT = {
  FIRST_CUSTOMER_NAME: "Cliente de referencia",
  SECOND_CUSTOMER_NAME: "Cliente de seguimiento",
  SCREENSHOT_BASENAME:
    "us-res-16-02-category-conflict-warning",
  WARNING_TITLE:
    RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE,
  REFERENCE_DATE: "2098-12-15",
  DATE_SAFE_UTC_HOUR: 12,
  CANCEL_REASON:
    "Playwright reservation conflict fixture cleanup",
  PROJECT_DATE_OFFSETS: {
    [E2E_PROJECT.MOBILE]: 0,
    [E2E_PROJECT.DEFAULT]: 1,
    [E2E_PROJECT.SCREENSHOTS_MOBILE]: 2,
    [E2E_PROJECT.SCREENSHOTS]: 3,
  },
  PROJECT_CUSTOMER_SUFFIXES: {
    [E2E_PROJECT.MOBILE]: "móvil",
    [E2E_PROJECT.DEFAULT]: "escritorio",
    [E2E_PROJECT.SCREENSHOTS_MOBILE]: "captura móvil",
    [E2E_PROJECT.SCREENSHOTS]: "captura escritorio",
  },
} as const;

export const E2E_RESERVATION_CATEGORY_AVAILABILITY_COUNT_PATTERN =
  new RegExp(
    `^-?\\d+ ${RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_AVAILABLE}$`
  );

export const E2E_RESERVATION_DURATION_PRESET = {
  LABEL: "1 h 30",
  HOURS: "1.5",
} as const;

export const E2E_RESERVATION_GUIDE_ONLY_CATEGORY = {
  BOAT: E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION,
  QUADRICYCLE: "Cuadraciclo",
} as const;

export const E2E_RESERVATION_GUIDES = {
  FIRST_NAME: "Guia de prueba uno",
  SECOND_NAME: "Guia de prueba dos",
  UNMARKED_WORKER_NAME: "Administración",
  SCREENSHOT_BASENAME: "us-res-12-guide-assignment",
  MULTIPLE_GUIDES_SUFFIX: "multiple-guides",
} as const;

export const E2E_RESERVATION_TYPE_COPY = {
  LABEL: RESERVATION_TYPE_COPY.LABEL,
  OPTIONS: RESERVATION_TYPE_COPY.OPTIONS,
  GUIDE_ONLY_CATEGORY: E2E_RESERVATION_GUIDE_ONLY_CATEGORY,
  GUIDE_ONLY_CATEGORY_OPTIONS: Object.values(
    E2E_RESERVATION_GUIDE_ONLY_CATEGORY
  ),
  GUIDE_ONLY_UNIT_OPTION:
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION,
} as const;
