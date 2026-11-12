import type { UnitCorrectionInput } from "../models/UnitCorrectionInput.interface";
import type { UnitReading } from "../models/UnitReading.interface";

export const UNIT_ID =
  "eeeeeeee-0000-0000-0000-000000000001";

export const UNIT_ROW = {
  category: {
    name: "Jet ski",
    usage_metric: "engine_hours",
  },
  code: "JS-1",
  fuel_level: 2,
  fuel_max: 4,
  id: UNIT_ID,
  impact_count: 1,
  next_oil_change_at: "50.00",
  status: "available",
  usage_total: "60.50",
};

export const UNIT: UnitReading = {
  categoryName: "Jet ski",
  code: "JS-1",
  fuelLevel: 2,
  fuelMax: 4,
  id: UNIT_ID,
  impactCount: 1,
  nextOilChangeAt: 50,
  status: "available",
  usageMetric: "engine_hours",
  usageTotal: 60.5,
};

export const UNIT_WITHOUT_READING: UnitReading = {
  ...UNIT,
  fuelLevel: null,
  nextOilChangeAt: null,
  status: "damaged",
  usageMetric: "kilometers",
  usageTotal: 12,
};

export const CORRECTION_INPUT: UnitCorrectionInput = {
  fuelLevel: 3,
  fuelMax: 8,
  impactCount: 2,
  status: "in_maintenance",
  unitId: UNIT_ID,
  usageTotal: 61.25,
};

export const CORRECTION_RPC_ARGS = {
  p_fuel_level: 3,
  p_fuel_max: 8,
  p_impact_count: 2,
  p_status: "in_maintenance",
  p_unit_id: UNIT_ID,
  p_usage_total: 61.25,
};

export const INVALID_CORRECTIONS: UnitCorrectionInput[] = [
  { ...CORRECTION_INPUT, unitId: "nope" },
  { ...CORRECTION_INPUT, fuelMax: 21 },
  { ...CORRECTION_INPUT, fuelMax: 0 },
  { ...CORRECTION_INPUT, fuelLevel: 9 },
  { ...CORRECTION_INPUT, fuelLevel: -1 },
  { ...CORRECTION_INPUT, impactCount: -1 },
  { ...CORRECTION_INPUT, impactCount: 1.5 },
  { ...CORRECTION_INPUT, usageTotal: -1 },
  { ...CORRECTION_INPUT, usageTotal: 1.234 },
  {
    ...CORRECTION_INPUT,
    status:
      "decommissioned" as UnitCorrectionInput["status"],
  },
];

export const DRAFT_CASES = [
  { field: "fuelMax", text: "21" },
  { field: "fuelMax", text: "0" },
  { field: "fuelLevel", text: "9" },
  { field: "fuelLevel", text: "x" },
  { field: "impactCount", text: "-1" },
  { field: "usageTotal", text: "1,234" },
] as const;
