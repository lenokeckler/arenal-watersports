export const UNIT_CORRECTION_COPY = {
  ERROR_FUEL_LEVEL:
    "Escriba un número entero de cero al máximo de rayas.",
  ERROR_FUEL_MAX: "Escriba de 1 a 20 rayas.",
  ERROR_GENERIC:
    "No se pudo guardar la corrección. Intente de nuevo.",
  ERROR_IMPACTS: "Escriba un número entero, cero o más.",
  ERROR_INVALID:
    "Alguno de los datos no es válido. Revíselos e intente de nuevo.",
  ERROR_LOAD: "No se pudo cargar la unidad.",
  ERROR_NOT_CORRECTABLE:
    "Esa unidad no se puede corregir desde acá.",
  ERROR_UNCHANGED: "No cambió ningún dato.",
  ERROR_USAGE:
    "Escriba un número válido, con hasta dos decimales.",
  FUEL_LEVEL_LABEL: "Rayas de gasolina",
  FUEL_MAX_LABEL: "Rayas del medidor",
  HEADING: "Corregir datos de la máquina",
  IMPACTS_LABEL: "Golpes acumulados",
  NOT_FOUND: "No se encontró la unidad.",
  STATUS_LABEL: "Estado",
  SUBMIT: "Guardar corrección",
  SUBMITTING: "Guardando…",
  USAGE_LABEL: {
    engine_hours: "Horas de motor",
    kilometers: "Kilómetros",
  },
  USAGE_LABEL_NONE: "Uso acumulado",
} as const;

export const UNIT_CORRECTION_FIELD_ID = {
  FUEL_LEVEL: "unit-correction-fuel-level",
  FUEL_MAX: "unit-correction-fuel-max",
  IMPACTS: "unit-correction-impacts",
  STATUS: "unit-correction-status",
  USAGE: "unit-correction-usage",
} as const;
