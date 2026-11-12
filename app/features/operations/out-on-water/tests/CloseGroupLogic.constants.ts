import type { CloseGroupDraft } from "../models/CloseGroupDraft.interface";
import type { GroupReturnUnit } from "../models/GroupReturnUnit.interface";

export const CLOSE_NOW = new Date(
  "2026-09-07T16:00:00.000Z"
);

export const ARRIVAL_CASES = [
  { iso: "2026-09-07T16:00:00.000Z", time: "10:00" },
  { iso: "2026-09-07T06:00:00.000Z", time: "00:00" },
  { iso: "2026-09-07T21:59:00.000Z", time: "15:59" },
] as const;

export const EMPTY_CLOSE_DRAFT: CloseGroupDraft = {
  cause: "",
  description: "",
  fuel: "",
  hasDamage: false,
  impact: "",
  maintenance: false,
  usage: "",
};

export const MOTOR_UNIT: GroupReturnUnit = {
  code: "JS-1",
  consumesFuel: true,
  fuelMax: 4,
  fuelOut: 3,
  unitId: "bbbbbbbb-0000-0000-0000-000000000001",
  usageMetric: "engine_hours",
  usageOut: 13,
};

export const PLAIN_UNIT: GroupReturnUnit = {
  code: "KY-1",
  consumesFuel: false,
  fuelMax: 4,
  fuelOut: null,
  unitId: "bbbbbbbb-0000-0000-0000-000000000002",
  usageMetric: null,
  usageOut: null,
};
