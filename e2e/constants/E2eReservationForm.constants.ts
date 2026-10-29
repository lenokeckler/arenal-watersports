export const E2E_RESERVATION_FORM_COPY = {
  HEADING: "Nueva reserva",
  CUSTOMER_NAME: "Nombre de la reserva",
  PEOPLE_COUNT: "Cantidad de personas",
  QUANTITY: "Cantidad de equipos",
  DATE: "Fecha de la actividad",
  TIME: "Hora de inicio",
  TIME_ZONE: "Hora de Costa Rica · UTC−06:00",
  DURATION: "Duración en horas",
  CUSTOM_DURATION: "Otra duración en horas",
  CATEGORY: "Equipo",
  CATEGORY_FIELD_NAME: "Equipo *",
  CATEGORY_OPTION: "Jet Ski",
  CUSTOMER_NAME_VALID: "US-RES-04 E2E reservation",
  SUBMIT: "Registrar reserva",
  SUCCESS: "La reserva quedó registrada correctamente.",
  VALIDATION_ERROR: "Ingrese el nombre de la reserva.",
} as const;

export const E2E_RESERVATION_FORM_SCREENSHOT_BASENAME =
  "reservation-form";

export const E2E_RESERVATION_FORM_EQUIPMENT_SCREENSHOT_SUFFIX =
  "equipment-and-submit";

export const E2E_RESERVATION_FORM_SUCCESS_SCREENSHOT_SUFFIX =
  "success";

export const E2E_RESERVATION_DURATION_PRESET = {
  LABEL: "1 h 30",
  HOURS: "1.5",
} as const;
