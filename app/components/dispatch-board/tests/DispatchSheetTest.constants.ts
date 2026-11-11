import { DISPATCH_SHEET_LIMITS } from "../constants/DispatchSheet.constants";

export const DISPATCH_CLOCK_FIXTURE = {
  MIDNIGHT: "00:00",
  MORNING: "08:15",
  MORNING_AFTER_NINETY: "09:45",
  NIGHT: "23:30",
  NIGHT_AFTER_NINETY: "01:00",
  NIGHT_BEFORE_TWENTY: "23:50",
  NOT_A_TIME: "25:99",
  NOW_COSTA_RICA: "09:00",
  SHORT_START: "00:10",
} as const;

export const DISPATCH_MINUTES_FIXTURE = {
  AFTER_MIDNIGHT_SPAN: 120,
  FULL_DAY: 1440,
  NINETY: 90,
  TWENTY_MINUS: -20,
  TWO_HOURS: 120,
} as const;

export const DISPATCH_WINDOW_FIXTURE = {
  AFTER_MIDNIGHT: {
    departureAt: "2026-09-06T04:00:00.000Z",
    departureTime: "22:00",
    returnTime: "00:00",
    returnsAt: "2026-09-06T06:00:00.000Z",
  },
  NOW: new Date("2026-09-05T15:00:00.000Z"),
  NOW_LATE_EVENING: new Date("2026-09-06T03:00:00.000Z"),
  SAME_DAY: {
    departureAt: "2026-09-05T15:30:00.000Z",
    departureTime: "09:30",
    returnTime: "11:00",
    returnsAt: "2026-09-05T17:00:00.000Z",
  },
  SAME_TIME: {
    departureAt: "2026-09-05T15:30:00.000Z",
    departureTime: "09:30",
    returnTime: "09:30",
    returnsAt: "2026-09-06T15:30:00.000Z",
  },
} as const;

export const DISPATCH_INPUT_FIXTURE = {
  CATEGORY_ID: "aaaaaaaa-0000-4000-8000-000000000001",
  DEPARTURE_AT: "2026-09-05T15:00:00.000Z",
  NOT_A_DATE: "not-a-date",
  NOT_A_UUID: "not-a-uuid",
  RESERVATION_ID: "dddddddd-0000-4000-8000-000000000001",
  RETURNS_AT: "2026-09-05T16:30:00.000Z",
  UNIT_ID: "bbbbbbbb-0000-4000-8000-000000000001",
} as const;

export const CATEGORY_RESERVATION_ROW_FIXTURE = {
  code: "R-000001",
  customer_name: "Cliente uno",
  people_count: 2,
  required_count: 2,
  reservation_id: "dddddddd-0000-4000-8000-000000000001",
  starts_at: "2026-09-05T15:00:00.000Z",
};

export const DISPATCH_READING_FIXTURE = {
  FRACTION_FUEL: 2.5,
  FUEL: 3,
  FUEL_OVER_GAUGE: 21,
  NEGATIVE_USAGE: -1,
  OTHER_UNIT_ID: "bbbbbbbb-0000-4000-8000-000000000002",
  THREE_DECIMALS_USAGE: 1.005,
  TOO_BIG_USAGE: 100_000_000_000,
  USAGE: 13.5,
} as const;

export const DISPATCH_TOO_MANY_UNITS = Array.from(
  { length: DISPATCH_SHEET_LIMITS.MAX_UNITS + 1 },
  () => DISPATCH_INPUT_FIXTURE.UNIT_ID
);

export const DISPATCH_GROUP_ROW_FIXTURE = {
  category_id: DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
  category_name: "Tablas",
  consumes_fuel: false,
  duration_minutes: 60,
  fixed_unit_ids: [] as string[],
  has_motor: false,
  required_quantity: 2,
  tracking_mode: "by_unit",
  usage_metric: null,
};

export const DISPATCH_UNIT_ROW_FIXTURE = {
  code: "T-1",
  fuel_level: null,
  fuel_max: 4,
  is_assigned: false,
  unit_id: DISPATCH_INPUT_FIXTURE.UNIT_ID,
  usage_total: 0,
};
