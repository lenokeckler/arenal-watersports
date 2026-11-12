import { UNIT_FORM_LIMITS } from "./UnitFormLimits.constants";

const {
  CODE_MAX_LENGTH,
  FUEL_MAX_MAX,
  FUEL_MAX_MIN,
  REASON_MAX_LENGTH,
} = UNIT_FORM_LIMITS;

export const UNIT_FORM_ERROR_COPY = {
  CODE_REQUIRED: "Ingrese el código de la unidad.",
  CODE_TOO_LONG: `El código no puede tener más de ${CODE_MAX_LENGTH} caracteres.`,
  DECIMAL_INVALID:
    "Escriba un número mayor o igual que cero, con hasta 2 decimales y sin separador de miles.",
  FUEL_LEVEL_ABOVE_MAX:
    "La lectura de gasolina no puede ser mayor que las rayas del medidor.",
  FUEL_LEVEL_INVALID:
    "La gasolina debe ser un número entero de cero en adelante, o deje el campo vacío si aún no hay lectura.",
  FUEL_MAX_INVALID: `Las rayas del medidor deben ser un número entero entre ${FUEL_MAX_MIN} y ${FUEL_MAX_MAX}.`,
  REASON_REQUIRED: "Ingrese el motivo de la baja.",
  USAGE_REQUIRED:
    "Ingrese las horas o el kilometraje acumulado; escriba 0 si la unidad es nueva.",
  REASON_TOO_LONG: `El motivo no puede tener más de ${REASON_MAX_LENGTH} caracteres.`,
  STATUS_INVALID: "Elija un estado válido para la unidad.",
} as const;
