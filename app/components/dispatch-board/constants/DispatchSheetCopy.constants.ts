export const DISPATCH_SHEET_COPY = {
  ACTION: "Despachar",
  ACTION_LABEL_PREFIX: "Despachar la reserva de ",
  ASSIGNED_UNIT: "Asignada a la reserva",
  BACK: "Volver a las categorías",
  CHOOSE_GROUP: "Escoja la categoría que sale ahora",
  COMMITTED_LABEL: "Comprometidas:",
  DEPARTURE_LABEL: "Hora de salida",
  GROUP_SEPARATOR: " · ",
  LOADING: "Cargando el equipo de la reserva…",
  LOAD_ERROR:
    "No se pudo cargar el equipo de la reserva. Cierre la hoja e intente de nuevo.",
  NEXT_DAY_NOTE: "El regreso es al día siguiente.",
  NO_UNITS_FREE:
    "No hay unidades libres en esta categoría para completar el despacho.",
  NOTHING_LEFT:
    "Esta reserva no tiene equipo pendiente de despachar.",
  QUANTITY_NOTE:
    "Esta categoría se cuenta por cantidad: no necesita escoger unidades.",
  RETURN_LABEL: "Hora de regreso",
  SELECTED_LABEL: "Seleccionadas:",
  SELECTED_OF: " de ",
  SUBMIT: "Confirmar despacho",
  SUBMIT_ERROR: "No se pudo despachar. Intente de nuevo.",
  SUBMITTING: "Despachando…",
  TITLE_PREFIX: "Despachar · ",
  UNITS_LEGEND: "Unidades que salen",
  UNITS_UNAVAILABLE:
    "Alguna unidad ya no está disponible. Revise las unidades e intente de nuevo.",
  WITH_MOTOR: "Con motor",
  WITHOUT_MOTOR: "Sin motor",
} as const;

export const DISPATCH_SHEET_PHASE = {
  FAILED: "failed",
  LOADING: "loading",
  READY: "ready",
} as const;

export const DISPATCH_SHEET_FIELD_ID = {
  DEPARTURE: "dispatch-departure",
  RETURN: "dispatch-return",
  UNIT_PREFIX: "dispatch-unit-",
} as const;
