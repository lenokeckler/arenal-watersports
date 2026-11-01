import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { DecommissionUnitInput } from "../models/DecommissionUnitInput.interface";
import type { Unit } from "../models/Unit.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import type { UnitRow } from "../models/UnitRow.type";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";

export const FAKE_UNIT_ID = "fake-unit-id";
export const FAKE_CATEGORY_ID = "fake-category-id";
export const FAKE_UNIT_ADMIN_WORKER_ID =
  "fake-unit-admin-id";
export const FAKE_DECOMMISSIONED_AT = new Date(
  "2026-01-15T10:30:00.000Z"
);
export const UNIT_ROW_COLUMNS = [
  "code",
  "fuel_level",
  "fuel_max",
  "next_oil_change_at",
  "status",
  "updated_by",
  "usage_total",
];
export const UNIT_INSERT_COLUMNS = [
  "category_id",
  "code",
  "created_by",
  "fuel_level",
  "fuel_max",
  "next_oil_change_at",
  "status",
  "updated_by",
  "usage_total",
];

export const DEFAULT_UNIT_FORM_VALUES: UnitFormValues = {
  code: "JET-01",
  status: UNIT_STATUS.AVAILABLE,
  fuelMax: "6",
  fuelLevel: "3",
  usageTotal: "12.5",
  nextOilChangeAt: "50",
};

export const DEFAULT_UNIT_ROW: UnitRow = {
  id: FAKE_UNIT_ID,
  category_id: FAKE_CATEGORY_ID,
  code: "JET-01",
  status: UNIT_STATUS.AVAILABLE,
  fuel_max: 6,
  fuel_level: 3,
  usage_total: 12.5,
  next_oil_change_at: 50,
  decommissioned_at: null,
  decommission_reason: null,
};

export const DEFAULT_UNIT: Unit = {
  id: FAKE_UNIT_ID,
  categoryId: FAKE_CATEGORY_ID,
  code: "JET-01",
  status: UNIT_STATUS.AVAILABLE,
  fuelMax: 6,
  fuelLevel: 3,
  usageTotal: 12.5,
  nextOilChangeAt: 50,
  decommissionedAt: null,
  decommissionReason: null,
};

export const DEFAULT_CREATE_UNIT_INPUT: CreateUnitInput = {
  categoryId: FAKE_CATEGORY_ID,
  code: "JET-01",
  status: UNIT_STATUS.AVAILABLE,
  fuelMax: 6,
  fuelLevel: 3,
  usageTotal: 12.5,
  nextOilChangeAt: 50,
};

export const DEFAULT_UPDATE_UNIT_INPUT: UpdateUnitInput = {
  unitId: FAKE_UNIT_ID,
  code: "JET-01",
  status: UNIT_STATUS.IN_REPAIR,
  fuelMax: 6,
  fuelLevel: 3,
  usageTotal: 12.5,
  nextOilChangeAt: 50,
};

export const DEFAULT_DECOMMISSION_UNIT_INPUT: DecommissionUnitInput =
  {
    unitId: FAKE_UNIT_ID,
    reason: "  Motor fundido  ",
  };

export const buildUnitFormValues = (
  overrides: Partial<UnitFormValues> = {}
): UnitFormValues => ({
  ...DEFAULT_UNIT_FORM_VALUES,
  ...overrides,
});

export const buildUnitRow = (
  overrides: Partial<UnitRow> = {}
): UnitRow => ({ ...DEFAULT_UNIT_ROW, ...overrides });

export const buildCreateUnitInput = (
  overrides: Partial<CreateUnitInput> = {}
): CreateUnitInput => ({
  ...DEFAULT_CREATE_UNIT_INPUT,
  ...overrides,
});

export const buildUpdateUnitInput = (
  overrides: Partial<UpdateUnitInput> = {}
): UpdateUnitInput => ({
  ...DEFAULT_UPDATE_UNIT_INPUT,
  ...overrides,
});
