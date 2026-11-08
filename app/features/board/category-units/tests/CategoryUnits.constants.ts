import type { vi } from "vitest";
import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { UnitOccupancy } from "../models/UnitOccupancy.interface";

export const NOW = new Date("2026-11-02T18:00:00.000Z");

export const FAKE_TIMER_OPTIONS = {
  now: NOW,
  toFake: ["Date"],
} satisfies Parameters<typeof vi.useFakeTimers>[0];

export const CATEGORY_NAME = "Jet ski";

export const RETURNS_TODAY_UTC = "2026-11-02T20:30:00.000Z";
export const RETURNS_TODAY_OFFSET =
  "2026-11-02T14:30:00-06:00";
export const RETURNS_TODAY_AFTER_UTC_MIDNIGHT =
  "2026-11-03T05:30:00.000Z";
export const RETURNS_TOMORROW = "2026-11-03T09:15:00-06:00";

export const RETURNS_EXACTLY_NOW = NOW.toISOString();
export const RETURNS_ONE_MS_BEFORE_NOW = new Date(
  NOW.getTime() - 1
).toISOString();
export const RETURNS_OVERDUE_TODAY =
  "2026-11-02T10:00:00-06:00";
export const RETURNS_OVERDUE_YESTERDAY =
  "2026-11-01T15:30:00-06:00";

export const EXPECTED_OVERDUE = {
  TIME_TODAY: "10:00",
  TIME_YESTERDAY: "15:30",
  DATE_YESTERDAY: "1 nov",
} as const;

export const EXPECTED_TIME = {
  AFTER_UTC_MIDNIGHT: "23:30",
  TODAY: "14:30",
  TOMORROW: "09:15",
} as const;

export const EXPECTED_TOMORROW_DATE = "3 nov";

export const RESERVATION_WINDOW = {
  ENDS_AT: "2026-11-02T12:00:00-06:00",
  EXPECTED: "10:00 a 12:00",
  STARTS_AT: "2026-11-02T10:00:00-06:00",
} as const;

export const DEFAULT_UNIT_OCCUPANCY: UnitOccupancy = {
  customerName: "María Rojas",
  isOverdue: false,
  reservationCode: "R-000123",
  reservationEndsAt: RESERVATION_WINDOW.ENDS_AT,
  reservationId: "reservation-123",
  reservationStartsAt: RESERVATION_WINDOW.STARTS_AT,
  returnsAt: RETURNS_TODAY_OFFSET,
};

export const DEFAULT_CATEGORY_UNIT: CategoryUnit = {
  code: "JS-01",
  id: "unit-01",
  occupancy: null,
  status: INVENTORY_UNIT_STATUS.AVAILABLE,
};

export const OCCUPIED_CATEGORY_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  code: "JS-02",
  id: "unit-02",
  occupancy: DEFAULT_UNIT_OCCUPANCY,
  status: INVENTORY_UNIT_STATUS.OCCUPIED,
};

export const UNIT_CODE = {
  AVAILABLE: "JS-01",
  DAMAGED: "JS-04",
  IN_MAINTENANCE: "JS-03",
  IN_REPAIR: "JS-05",
  OCCUPIED: "JS-02",
} as const;

export const CATEGORY_UNITS: CategoryUnit[] = [
  DEFAULT_CATEGORY_UNIT,
  OCCUPIED_CATEGORY_UNIT,
  {
    ...DEFAULT_CATEGORY_UNIT,
    code: UNIT_CODE.IN_MAINTENANCE,
    id: "unit-03",
    status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
  },
  {
    ...DEFAULT_CATEGORY_UNIT,
    code: UNIT_CODE.DAMAGED,
    id: "unit-04",
    status: INVENTORY_UNIT_STATUS.DAMAGED,
  },
  {
    ...DEFAULT_CATEGORY_UNIT,
    code: UNIT_CODE.IN_REPAIR,
    id: "unit-05",
    status: INVENTORY_UNIT_STATUS.IN_REPAIR,
  },
];

export const UNMAPPABLE_STATUSES = [
  null,
  INVENTORY_UNIT_STATUS.DECOMMISSIONED,
  "unknown",
  "toString",
] as const;

export const DECORATIVE_SELECTOR = "[aria-hidden='true']";

export const RETURN_TEXT_PATTERN = /^Regresa/;

export const HEADING_LEVEL_TWO = 2;

export const UNIT_NOT_FOUND_MESSAGE = "Unit row not found:";

export const NON_OCCUPIED_UNIT_CODES = [
  UNIT_CODE.AVAILABLE,
  UNIT_CODE.DAMAGED,
  UNIT_CODE.IN_MAINTENANCE,
  UNIT_CODE.IN_REPAIR,
] as const;

export const STATUS_BY_UNIT_CODE: Record<
  string,
  ActiveInventoryUnitStatus
> = {
  [UNIT_CODE.AVAILABLE]: INVENTORY_UNIT_STATUS.AVAILABLE,
  [UNIT_CODE.DAMAGED]: INVENTORY_UNIT_STATUS.DAMAGED,
  [UNIT_CODE.IN_MAINTENANCE]:
    INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
  [UNIT_CODE.IN_REPAIR]: INVENTORY_UNIT_STATUS.IN_REPAIR,
  [UNIT_CODE.OCCUPIED]: INVENTORY_UNIT_STATUS.OCCUPIED,
};
