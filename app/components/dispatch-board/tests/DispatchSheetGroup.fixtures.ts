import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

export const DISPATCH_FIXTURE_UNIT = {
  FIRST: {
    code: "TAB-1",
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000001",
  },
  SECOND: {
    code: "TAB-2",
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000002",
  },
  THIRD: {
    code: "TAB-3",
    isAssigned: false,
    unitId: "bbbbbbbb-0000-4000-8000-000000000003",
  },
  ASSIGNED: {
    code: "TAB-9",
    isAssigned: true,
    unitId: "bbbbbbbb-0000-4000-8000-000000000009",
  },
} as const;

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
  durationMinutes: 60,
  fixedUnitIds: [],
  hasMotor: false,
  isTrackedByUnit: true,
  requiredQuantity: DISPATCH_FIXTURE_COUNT.TWO,
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
  durationMinutes: 60,
  fixedUnitIds: [],
  hasMotor: false,
  isTrackedByUnit: false,
  requiredQuantity: DISPATCH_FIXTURE_COUNT.TWO,
};

export const MOTOR_GROUP_FIXTURE: DispatchSheetGroup = {
  ...UNIT_GROUP_FIXTURE,
  categoryId: "aaaaaaaa-0000-4000-8000-000000000003",
  categoryName: "Motos",
  hasMotor: true,
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
