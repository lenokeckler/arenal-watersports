import type { ReservationPostponementUsageMetric } from "../models/ReservationPostponementUsageMetric.type";

const USAGE_LABEL = {
  engine_hours: "Horas del motor",
  kilometers: "Kilometraje",
} satisfies Record<
  ReservationPostponementUsageMetric,
  string
>;

const USAGE_SUFFIX = {
  engine_hours: "h",
  kilometers: "km",
} satisfies Record<
  ReservationPostponementUsageMetric,
  string
>;

export const RESERVATION_POSTPONEMENT_READINGS_COPY = {
  FUEL_EMPTY: "Vacío",
  FUEL_FULL: "Lleno",
  FUEL_LEVEL: (level: number, max: number): string =>
    `${level} de ${max}`,
  FUEL_LEVEL_LABEL: (level: number, max: number): string =>
    `${level} de ${max} franjas`,
  HELPER:
    "Registre el combustible y las horas o el kilometraje de cada unidad.",
  LABEL_FUEL: "Nivel de combustible",
  LEGEND: "Lo que sí se usó",
  NO_READINGS: "Sin lecturas por registrar",
  USAGE_FIELD_LABEL: (
    metric: ReservationPostponementUsageMetric
  ): string =>
    `${USAGE_LABEL[metric]} (${USAGE_SUFFIX[metric]})`,
  USAGE_FLOOR: (reading: string): string =>
    `No puede ser menor que ${reading}.`,
  USAGE_LABEL,
  USAGE_SUFFIX,
} as const;
