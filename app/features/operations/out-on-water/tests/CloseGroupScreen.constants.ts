import type { GroupReturnUnit } from "../models/GroupReturnUnit.interface";

export const CLOSE_RETURN_UNITS: GroupReturnUnit[] = [
  {
    code: "JS-1",
    consumesFuel: true,
    fuelMax: 4,
    fuelOut: 3,
    impactCount: 2,
    lowFuelLines: 1,
    unitId: "bbbbbbbb-0000-0000-0000-000000000001",
    usageMetric: "engine_hours",
    usageOut: 13,
    usageTotal: 13,
  },
  {
    code: "KY-1",
    consumesFuel: false,
    fuelMax: 4,
    fuelOut: null,
    impactCount: 0,
    lowFuelLines: 1,
    unitId: "bbbbbbbb-0000-0000-0000-000000000002",
    usageMetric: null,
    usageOut: null,
    usageTotal: 0,
  },
];

export const CLOSE_FORM_TEXT = {
  CLOCK_PATTERN: /^\d{2}:\d{2}$/,
  CAUSE: "collision",
  DESCRIPTION: "Cracked hull",
  FUEL: "2",
  FUEL_LINE: "Raya 2 de 4",
  IMPACT_LESS: "Quitar un golpe",
  IMPACT_MORE: "Agregar un golpe",
  USAGE: "14.25",
  USAGE_BELOW: "12",
  USAGE_BELOW_ERROR:
    "No puede ser menor que la última lectura: 13.",
  USAGE_LABEL: "Horas de motor al volver",
  USAGE_OUT: "Última lectura: 13 h.",
} as const;
