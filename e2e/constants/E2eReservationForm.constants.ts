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
  CUSTOM_DURATION_PRECISION_CASE: "4.1",
  NEGATIVE_INPUT: "-1",
  VALID_EQUIPMENT_QUANTITY: "3",
  VALID_PEOPLE_COUNT: "4",
  CATEGORY: "Equipo",
  UNIT: "Unidad",
  UNIT_OPTION: "PONTOON",
  CATEGORY_OPTION: "Jet Ski",
  CONCRETE_CATEGORY_OPTION: "Lancha",
  REALTIME_UNIT_OPTION: "BENNINGTON",
  REALTIME_DATE: "2099-12-31",
  CUSTOMER_NAME_VALID: "US-RES-04 E2E reservation",
  CUSTOM_DURATION_CUSTOMER_NAME:
    "US-RES-04 E2E custom duration",
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

export const E2E_RESERVATION_DURATION_PRESET = {
  LABEL: "1 h 30",
  HOURS: "1.5",
} as const;
