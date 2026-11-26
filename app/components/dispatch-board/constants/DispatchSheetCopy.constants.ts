export const DISPATCH_SHEET_COPY = {
  ACTION: "Despachar",
  ACTION_LABEL_PREFIX: "Despachar la reserva de ",
  ASSIGNED_UNIT: "Asignada a la reserva",
  BACK: "Volver a las categorías",
  CHANGE_UNITS: "Cambiar unidades",
  CHOOSE_GROUP: "Escoja la categoría que sale ahora",
  COMBO_NOTE:
    "Es un combo: el equipo ya está fijo y no se cambia al despachar. Si el paquete cambió, se cancela y se crea una reserva nueva.",
  DEPARTURE_LABEL: "Hora de salida",
  DEPARTURE_SHIFT_LATER:
    "Sumar 15 minutos a la hora de salida",
  DEPARTURE_SHIFT_SOONER:
    "Restar 15 minutos a la hora de salida",
  DURATION_LABEL: "Duración",
  FUEL_MISSING:
    "Marque la gasolina de esta unidad para poder despacharla.",
  GROUP_SEPARATOR: " · ",
  LOAD_ERROR:
    "No se pudo cargar el equipo de la reserva. Cierre la hoja e intente de nuevo.",
  LOADING: "Cargando el equipo de la reserva…",
  NEXT_DAY_NOTE: "El regreso es al día siguiente.",
  NO_UNITS_FREE:
    "No hay unidades libres en esta categoría para completar el despacho.",
  NOTHING_LEFT:
    "Esta reserva no tiene equipo pendiente de despachar.",
  PENDING_LABEL: "Pendientes:",
  QUANTITY_NOTE:
    "Esta categoría se cuenta por cantidad: no necesita escoger unidades.",
  RADIO_FIELD_LABEL: "Canal de radio",
  RADIO_INVALID: "Escriba un canal entre 1 y 99.",
  RADIO_PLACEHOLDER: "Ej. 7",
  READINGS_INVALID:
    "Alguna lectura no es válida. Revise la gasolina e intente de nuevo.",
  RETURN_LABEL: "Hora de regreso",
  RETURN_SHIFT_LATER:
    "Sumar 15 minutos a la hora de regreso",
  RETURN_SHIFT_SOONER:
    "Restar 15 minutos a la hora de regreso",
  SELECTED_LABEL: "Seleccionadas:",
  SELECTED_OF: " de ",
  SHIFT_LATER_TEXT: "+15",
  SHIFT_SOONER_TEXT: "−15",
  SUBMIT: "Despachar",
  SUBMIT_ERROR: "No se pudo despachar. Intente de nuevo.",
  SUBMITTING: "Despachando…",
  STEPPER_LESS_TEXT: "−",
  STEPPER_MORE_TEXT: "+",
  TAKE_LABEL: "Salen ahora",
  TAKE_LESS: "Que salga una unidad menos",
  TAKE_MORE: "Que salga una unidad más",
  TAKE_REST: (count: number) =>
    count === 1
      ? "Queda 1 pendiente en la reserva: sale cuando llegue, con su propia hora."
      : `Quedan ${count} pendientes en la reserva: salen cuando lleguen, con su propia hora.`,
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
  RADIO: "dispatch-radio",
  RETURN: "dispatch-return",
  UNIT_PREFIX: "dispatch-unit-",
} as const;

export const DISPATCH_DURATION_COPY = {
  HOURS: " h",
  MINUTES: " min",
} as const;
