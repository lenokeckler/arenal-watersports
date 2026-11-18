import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import {
  DEFAULT_CATEGORY_UNIT,
  DEFAULT_UNIT_OCCUPANCY,
} from "./CategoryUnits.constants";

export const MOTOR_READINGS: CategoryUnitReadings = {
  fuelLevel: 2,
  fuelMax: 4,
  hasFuelGauge: true,
  impactCount: 2,
  lowFuelLines: 1,
  usageMetric: "engine_hours",
  usageTotal: 12.5,
};

export const MOTOR_AVAILABLE_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  code: "JS-11",
  id: "unit-11",
  readings: MOTOR_READINGS,
};

export const MOTOR_OCCUPIED_UNIT: CategoryUnit = {
  code: "JS-12",
  id: "unit-12",
  occupancy: DEFAULT_UNIT_OCCUPANCY,
  readings: MOTOR_READINGS,
  status: INVENTORY_UNIT_STATUS.OCCUPIED,
};

export const PLAIN_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  code: "KY-01",
  id: "unit-21",
};

export const BOARD_UNITS: CategoryUnit[] = [
  MOTOR_AVAILABLE_UNIT,
  MOTOR_OCCUPIED_UNIT,
  PLAIN_UNIT,
];

export const EXPECTED_INFO = {
  DEPARTED: "09:30",
  NEW_DEPARTURE: "10:00",
  NEW_DEPARTURE_ISO: "2026-11-02T16:00:00.000Z",
  NEW_RADIO: "8",
  NEW_RADIO_NUMBER: 8,
  NEW_RETURN_ISO: "2026-11-02T21:00:00.000Z",
  OUT_OF_RANGE_RADIO: "100",
  RETURNS: "14:30",
} as const;

export const EXPECTED_MODIFY = {
  LINE_FOUR: "Raya 4 de 4",
  NEW_IMPACT_COUNT: 3,
  NEW_LEVEL: 4,
  NEW_USAGE: "13,5",
  NEW_USAGE_NUMBER: 13.5,
  NOT_A_NUMBER: "abc",
} as const;
