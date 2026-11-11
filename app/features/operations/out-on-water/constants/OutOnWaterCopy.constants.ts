export const OUT_ON_WATER_COPY = {
  ADJUST_BUTTON: "Ajustar duración",
  DEPARTED_AT: "Salió a las ",
  EMPTY: "No hay equipo afuera en este momento.",
  ERROR: "No se pudo cargar el equipo que está afuera.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Equipo afuera",
  HOURS_SUFFIX: " h",
  MINUTES_SUFFIX: " min",
  DELAY_SUFFIX: " de retraso",
  OVERDUE_LABEL: "Por regresar",
  PART_SEPARATOR: " ",
  QUANTITY_LABEL: "Cantidad: ",
  REMAINING_PREFIX: "Faltan ",
  RESERVATION_SEPARATOR: " · ",
  RETURNS_AT: "Regresa a las ",
  TIMES_SEPARATOR: " · ",
  UNITS_SEPARATOR: ", ",
} as const;

export const OUT_ON_WATER_HEADING_ID = "equipo-afuera";

export const DURATION_ADJUST_COPY = {
  CURRENT_LABEL: "Duración actual: ",
  ERROR_CLOSED:
    "Este grupo ya regresó y no se puede ajustar.",
  ERROR_FIELD: "Escriba minutos enteros entre 1 y 1440.",
  ERROR_GENERIC:
    "No se pudo guardar la duración. Intente de nuevo.",
  ERROR_INVALID: "La duración no es válida.",
  EXTENDED_NOTE:
    "Queda marcada para que Reservas decida si cobra las horas de más.",
  EXTENDED_PREFIX: "Se alargó ",
  FIELD_LABEL: "Duración en minutos",
  PRESET_GROUP_LABEL: "Ajustes rápidos",
  PRESET_MINUS: "−",
  PRESET_PLUS: "+",
  SAVE: "Guardar duración",
  SAVING: "Guardando…",
  TITLE_PREFIX: "Ajustar duración · ",
} as const;

export const DURATION_ADJUST_FIELD_ID =
  "duracion-en-minutos";
