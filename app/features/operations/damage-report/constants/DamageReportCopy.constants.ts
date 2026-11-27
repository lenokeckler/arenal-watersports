export const DAMAGE_REPORT_COPY = {
  ALREADY_COMPLETE: "Ese reporte ya estaba completo.",
  CAUSE_LABEL: "Causa",
  CAUSE_REQUIRED_ERROR: "Seleccione la causa.",
  DESCRIPTION_LABEL: "¿Qué pasó?",
  DESCRIPTION_PLACEHOLDER: "Describa lo ocurrido",
  DESCRIPTION_REQUIRED_ERROR: "Describa lo ocurrido.",
  ERROR: "No se pudo guardar el reporte. Intente de nuevo.",
  ERROR_LOAD:
    "No se pudo cargar el formulario del reporte.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HITS_LABEL: "Golpes nuevos",
  HITS_LESS: "Quitar un golpe",
  HITS_MORE: "Agregar un golpe",
  INVALID:
    "Alguno de los datos no es válido. Revíselos e intente de nuevo.",
  OUT_NOTE:
    "Esta unidad está en el agua. Su estado se cambia al recibirla.",
  OUT_ON_WATER:
    "La unidad está en el agua. Recíbala antes de cambiar su estado.",
  REPORT_NOT_FOUND: "No se encontró el reporte.",
  RETIRED: "No se puede reportar esa unidad.",
  STATE_DAMAGED: "Dañada",
  STATE_KEEP: "Sin cambios",
  STATE_KEEP_AVAILABLE: "Sigue disponible",
  STATE_LABEL: "¿Cómo queda la unidad?",
  STATE_MAINTENANCE: "En mantenimiento",
  SUBMIT_BUTTON: "Guardar reporte",
  SUBMIT_LATER_BUTTON: "Guardar y detallar después",
  SUBMITTING: "Guardando…",
  TITLE: "Reportar daño",
  TITLE_COMPLETE: "Completar reporte",
  TRIP_KEEP: "La salida ya anotada",
  TRIP_LABEL: "¿Fue en una salida?",
  TRIP_NONE: "No fue en una salida",
  TRIP_OPTION: (when: string, customer: string): string =>
    `${when} · ${customer}`,
  UNIT_LABEL: "¿Cuál unidad?",
  UNIT_OPTION: (code: string, category: string): string =>
    `${code} · ${category}`,
  UNIT_PLACEHOLDER: "Seleccione la unidad",
  UNIT_REQUIRED_ERROR: "Seleccione la unidad.",
} as const;
