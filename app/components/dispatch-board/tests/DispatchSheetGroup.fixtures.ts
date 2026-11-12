import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

export const DISPATCH_FIXTURE_GAUGE = {
  LAST_FUEL: 2,
  LAST_USAGE: 12.5,
  MAX: 4,
} as const;

export const DISPATCH_FIXTURE_UNIT = {
  FIRST: {
    code: "TAB-1",
    fuelLevel: null,
    fuelMax: DISPATCH_FIXTURE_GAUGE.MAX,
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000001",
    usageTotal: 0,
  },
  SECOND: {
    code: "TAB-2",
    fuelLevel: null,
    fuelMax: DISPATCH_FIXTURE_GAUGE.MAX,
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000002",
    usageTotal: 0,
  },
  THIRD: {
    code: "TAB-3",
    fuelLevel: null,
    fuelMax: DISPATCH_FIXTURE_GAUGE.MAX,
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000003",
    usageTotal: 0,
  },
  ASSIGNED: {
    code: "TAB-9",
    fuelLevel: null,
    fuelMax: DISPATCH_FIXTURE_GAUGE.MAX,
    isAssigned: true,
    unitId: "bbbbbbbb-0000-4000-8000-000000000009",
    usageTotal: 0,
  },
} as const;

export const DISPATCH_FIXTURE_UNKNOWN_CATEGORY =
  "aaaaaaaa-0000-4000-8000-000000000099";

export const DISPATCH_FIXTURE_COUNT = {
  ONE: 1,
  TWO: 2,
} as const;

export const UNIT_GROUP_FIXTURE: DispatchSheetGroup = {
  candidateUnits: [
    DISPATCH_FIXTURE_UNIT.FIRST,
    DISPATCH_FIXTURE_UNIT.SECOND,
    DISPATCH_FIXTURE_UNIT.THIRD,
  ],
  categoryId: "aaaaaaaa-0000-4000-8000-000000000001",
  categoryName: "Tablas",
  consumesFuel: false,
  durationMinutes: 60,
  fixedUnitIds: [],
  hasMotor: false,
  isTrackedByUnit: true,
  requiredQuantity: DISPATCH_FIXTURE_COUNT.TWO,
  usageMetric: null,
};

export const ASSIGNED_GROUP_FIXTURE: DispatchSheetGroup = {
  ...UNIT_GROUP_FIXTURE,
  candidateUnits: [
    DISPATCH_FIXTURE_UNIT.ASSIGNED,
    DISPATCH_FIXTURE_UNIT.FIRST,
  ],
  fixedUnitIds: [DISPATCH_FIXTURE_UNIT.ASSIGNED.unitId],
  requiredQuantity: DISPATCH_FIXTURE_COUNT.ONE,
};

export const QUANTITY_GROUP_FIXTURE: DispatchSheetGroup = {
  candidateUnits: [],
  categoryId: "aaaaaaaa-0000-4000-8000-000000000002",
  categoryName: "Chalecos",
  consumesFuel: false,
  durationMinutes: 60,
  fixedUnitIds: [],
  hasMotor: false,
  isTrackedByUnit: false,
  requiredQuantity: DISPATCH_FIXTURE_COUNT.TWO,
  usageMetric: null,
};

export const MOTOR_GROUP_FIXTURE: DispatchSheetGroup = {
  ...UNIT_GROUP_FIXTURE,
  categoryId: "aaaaaaaa-0000-4000-8000-000000000003",
  categoryName: "Motos",
  hasMotor: true,
};

const MOTOR_UNITS = [
  DISPATCH_FIXTURE_UNIT.FIRST,
  DISPATCH_FIXTURE_UNIT.SECOND,
  DISPATCH_FIXTURE_UNIT.THIRD,
].map((unit) => ({
  ...unit,
  fuelLevel: DISPATCH_FIXTURE_GAUGE.LAST_FUEL,
  usageTotal: DISPATCH_FIXTURE_GAUGE.LAST_USAGE,
}));

export const MOTOR_READINGS_GROUP_FIXTURE: DispatchSheetGroup =
  {
    ...MOTOR_GROUP_FIXTURE,
    candidateUnits: MOTOR_UNITS,
    consumesFuel: true,
    usageMetric: "engine_hours",
  };

export const KILOMETERS_GROUP_FIXTURE: DispatchSheetGroup =
  {
    ...MOTOR_READINGS_GROUP_FIXTURE,
    consumesFuel: false,
    usageMetric: "kilometers",
  };

export const DISPATCH_TIME_FIXTURE = {
  DEPARTURE_EVENING: "22:00",
  DEPARTURE_MORNING: "09:00",
  HOUR_MS: 3_600_000,
  RETURN_AFTER_MIDNIGHT: "01:00",
  RETURN_MORNING: "11:00",
  THREE_HOURS: 3,
  TWO_HOURS: 2,
} as const;
