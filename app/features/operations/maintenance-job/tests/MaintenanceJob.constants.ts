import type { MaintenanceJobDraft } from "../models/MaintenanceJobDraft.interface";
import type { MaintenanceJobInput } from "../models/MaintenanceJobInput.interface";
import type { MaintenanceJobUnit } from "../models/MaintenanceJobUnit.interface";

export const JOB_TODAY = "2026-09-07";

export const JOB_UNIT: MaintenanceJobUnit = {
  categoryName: "Jet ski",
  code: "JS-1",
  unitId: "bbbbbbbb-0000-0000-0000-000000000001",
  usageMetric: "engine_hours",
  usageTotal: 100,
};

export const JOB_UNITS: MaintenanceJobUnit[] = [JOB_UNIT];

export const EMPTY_JOB_DRAFT: MaintenanceJobDraft = {
  costAmount: "",
  costCurrency: "",
  description: "",
  isExternal: false,
  nextOilChangeAt: "",
  performedAt: JOB_TODAY,
  unitId: JOB_UNIT.unitId,
  workType: "tire_change",
};

export const JOB_INPUT_FIXTURE: MaintenanceJobInput = {
  costAmount: 35000,
  costCurrency: "CRC",
  description: "  New handlebar  ",
  isExternal: true,
  nextOilChangeAt: null,
  performedAt: JOB_TODAY,
  unitId: JOB_UNIT.unitId,
  workType: "part_change",
};

export const JOB_RPC_ARGS = {
  p_cost_amount: 35000,
  p_cost_currency: "CRC",
  p_description: "New handlebar",
  p_is_external: true,
  p_next_oil_change_at: undefined,
  p_performed_at: JOB_TODAY,
  p_unit_id: JOB_UNIT.unitId,
  p_work_type: "part_change",
};

export const JOB_UNIT_ROW = {
  category: {
    name: "Jet ski",
    usage_metric: "engine_hours",
  },
  code: "JS-1",
  id: JOB_UNIT.unitId,
  usage_total: 100,
};

export const INVALID_JOB_INPUTS = [
  {
    input: { ...JOB_INPUT_FIXTURE, unitId: "not-a-uuid" },
    name: "an id that is not a uuid",
  },
  {
    input: {
      ...JOB_INPUT_FIXTURE,
      workType:
        "welding" as MaintenanceJobInput["workType"],
    },
    name: "a type of work that does not exist",
  },
  {
    input: {
      ...JOB_INPUT_FIXTURE,
      performedAt: "07/09/2026",
    },
    name: "a date that is not a date",
  },
  {
    input: { ...JOB_INPUT_FIXTURE, costCurrency: null },
    name: "a cost without currency",
  },
  {
    input: { ...JOB_INPUT_FIXTURE, costAmount: -5 },
    name: "a negative cost",
  },
  {
    input: {
      ...JOB_INPUT_FIXTURE,
      workType: "other" as const,
      description: "  ",
    },
    name: "another type of work without description",
  },
  {
    input: {
      ...JOB_INPUT_FIXTURE,
      workType: "oil_change" as const,
      nextOilChangeAt: null,
    },
    name: "an oil change without the next threshold",
  },
  {
    input: { ...JOB_INPUT_FIXTURE, nextOilChangeAt: 150 },
    name: "a threshold on a work that is not an oil change",
  },
] as const;

export const JOB_FORM_TEXT = {
  COST: "35000",
  CURRENCY: "CRC",
  THRESHOLD: "150",
  THRESHOLD_BELOW: "90",
  THRESHOLD_BELOW_ERROR:
    "Debe ser mayor que lo acumulado: 100.",
} as const;
