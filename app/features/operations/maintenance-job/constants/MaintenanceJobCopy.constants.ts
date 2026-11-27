export const MAINTENANCE_JOB_COPY = {
  COST_CURRENCY_LABEL: "Moneda",
  COST_CURRENCY_PLACEHOLDER: "Seleccione la moneda",
  COST_FIELD_LABEL: "Costo del trabajo",
  COST_HINT: "Déjelo vacío si no costó nada.",
  CURRENCIES: {
    CRC: "Colones (CRC)",
    USD: "Dólares (USD)",
  },
  DATE_LABEL: "Fecha del trabajo",
  DESCRIPTION_LABEL: "Descripción",
  ERROR_LOAD: "No se pudieron cargar las unidades.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  ERROR_COST:
    "Escriba un monto válido, con hasta dos decimales.",
  ERROR_CURRENCY: "Seleccione la moneda del costo.",
  ERROR_DATE: "Escriba una fecha que no sea futura.",
  ERROR_DESCRIPTION: "Describa el trabajo realizado.",
  ERROR_GENERIC:
    "No se pudo registrar el trabajo. Intente de nuevo.",
  ERROR_INVALID:
    "Alguno de los datos no es válido. Revíselos e intente de nuevo.",
  ERROR_RETIRED: "Esa unidad fue dada de baja.",
  ERROR_INTERVAL_INVALID:
    "Escriba un número mayor que cero, con hasta dos decimales.",
  ERROR_UNIT: "Seleccione la unidad.",
  ERROR_WORK_TYPE: "Seleccione el tipo de trabajo.",
  EXTERNAL_LABEL: "Lo hizo un taller externo",
  HEADING: "Registrar un trabajo de mantenimiento",
  NEXT_OIL_CHANGE_LABEL: "Cada cuánto cambia el aceite",
  NEXT_OIL_CHANGE_PLACEHOLDER: {
    engine_hours: "Ej. 100",
    kilometers: "Ej. 2500",
  },
  NEXT_OIL_CHANGE_RESULT: (value: string): string =>
    `Próximo cambio: ${value}`,
  SUBMIT: "Registrar trabajo",
  SUBMITTING: "Registrando…",
  UNIT_LABEL: "Unidad",
  UNIT_PLACEHOLDER: "Seleccione la unidad",
  UNIT_SEPARATOR: " · ",
  USAGE_UNIT: {
    engine_hours: " h",
    kilometers: " km",
  },
  WORK_TYPE_LABEL: "Tipo de trabajo",
  WORK_TYPE_PLACEHOLDER: "Seleccione el tipo de trabajo",
  WORK_TYPES: {
    oil_change: "Cambio de aceite",
    other: "Otro trabajo",
    part_change: "Cambio de pieza",
    tire_change: "Cambio de llanta",
  },
} as const;

export const MAINTENANCE_JOB_FIELD_ID = {
  COST: "maintenance-job-cost",
  CURRENCY: "maintenance-job-currency",
  DATE: "maintenance-job-date",
  DESCRIPTION: "maintenance-job-description",
  EXTERNAL: "maintenance-job-external",
  NEXT_OIL_CHANGE: "maintenance-job-next-oil-change",
  UNIT: "maintenance-job-unit",
  WORK_TYPE: "maintenance-job-work-type",
} as const;
