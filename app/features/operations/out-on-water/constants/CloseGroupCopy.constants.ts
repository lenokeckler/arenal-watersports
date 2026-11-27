export const CLOSE_GROUP_COPY = {
  ARRIVAL_ERROR:
    "La hora de llegada no puede ser anterior a la salida ni futura.",
  ARRIVAL_LABEL: "Hora de llegada",
  BUTTON: "Cerrar grupo",
  CAUSE_LABEL: "Causa del daño",
  CAUSE_PLACEHOLDER: "Seleccione la causa",
  CAUSE_REQUIRED: "Seleccione la causa del daño.",
  CAUSES: {
    collision: "Choque",
    machine_failure: "Falla de la máquina",
    other: "Otra",
    rollover: "Volcadura",
  },
  DAMAGE_LABEL: "Volvió con daño",
  DESCRIPTION_LABEL: "Qué pasó",
  DESCRIPTION_REQUIRED: "Describa el daño.",
  FUEL_INVALID_PREFIX:
    "Escriba un número entero entre 0 y ",
  FUEL_LABEL: "Gasolina que quedó",
  IMPACT_COUNT_LABEL: "Golpes",
  IMPACT_COUNT_LESS: "Quitar un golpe",
  IMPACT_COUNT_MORE: "Agregar un golpe",
  IMPACT_INVALID: "Escriba un número entero de cero o más.",
  IMPACT_LABEL: "Aumento del conteo de golpes",
  MAINTENANCE_LABEL: "Enviar a mantenimiento",
  LOADING: "Cargando las unidades del grupo…",
  LOAD_ERROR:
    "No se pudo cargar el grupo. Cierre la hoja e intente de nuevo.",
  NO_UNITS_NOTE:
    "Este grupo se cuenta por cantidad: solo se registra la hora de llegada.",
  OK_NOTE:
    "Si todo volvió en orden, no marque nada: queda la constancia del cierre.",
  READINGS_NOTE:
    "Lea el medidor de cada unidad y anote la lectura con la que volvió.",
  SAVE_ERROR_ALREADY_CLOSED:
    "Este grupo ya se había cerrado.",
  SAVE_ERROR_ARRIVAL:
    "La hora de llegada no es válida. Revísela e intente de nuevo.",
  SAVE_ERROR_GENERIC:
    "No se pudo cerrar el grupo. Intente de nuevo.",
  SAVE_ERROR_RETURNS:
    "Alguna lectura o reporte no es válido. Revíselos e intente de nuevo.",
  SUBMIT: "Confirmar cierre",
  SUBMITTING: "Cerrando…",
  TITLE_PREFIX: "Cerrar · ",
  USAGE_BELOW_PREFIX:
    "No puede ser menor que la última lectura: ",
  USAGE_INVALID:
    "Escriba una lectura válida, con hasta dos decimales.",
  USAGE_LAST_PREFIX: "Última lectura: ",
} as const;

export const CLOSE_GROUP_FIELD_ID = {
  ARRIVAL: "close-arrival",
  CAUSE_PREFIX: "close-cause-",
  DAMAGE_PREFIX: "close-damage-",
  DESCRIPTION_PREFIX: "close-description-",
  FUEL_PREFIX: "close-fuel-",
  IMPACT_PREFIX: "close-impact-",
  MAINTENANCE_PREFIX: "close-maintenance-",
  USAGE_PREFIX: "close-usage-",
} as const;

export const CLOSE_GROUP_USAGE_COPY = {
  engine_hours: {
    LABEL: "Horas de motor al volver",
    UNIT: " h",
  },
  kilometers: {
    LABEL: "Kilómetros al volver",
    UNIT: " km",
  },
} as const;
