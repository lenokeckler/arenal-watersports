import type { UnitReservationFixtureSeed } from "../models/UnitReservationFixtureSeed.interface";

export const E2E_UNIT_RESERVATION = {
  CLEANUP_FAILED: "seedUnitReservations: cleanup failed",
  DURATION_MINUTES: 60,
  MISSING_RESERVATION:
    "insertUnitReservation: no reservation returned",
  PEOPLE_COUNT: 2,
  TYPE: "rental",
} as const;

export const E2E_UNIT_RESERVATION_SEEDS: UnitReservationFixtureSeed[] =
  [
    {
      customerName: "E2E Cliente Antiguo",
      startsAt: "2030-03-10T15:00:00Z",
    },
    {
      customerName: "E2E Cliente Reciente",
      startsAt: "2030-03-12T15:00:00Z",
    },
  ];

export const E2E_UNIT_RESERVATION_ORDER = {
  NEWEST: 0,
  OLDEST: 1,
} as const;

export const E2E_UNIT_RESERVATION_SEED_INDEX = {
  NEWEST: 1,
  OLDEST: 0,
} as const;

export const E2E_UNIT_RESERVATION_SCENARIO = {
  DECOMMISSIONED: "history-decommissioned",
  EMPTY: "history-empty",
  LISTED: "history-listed",
} as const;

export const E2E_UNIT_RESERVATION_SCREENSHOT = {
  BASENAME: "us-adm-18-unit-reservation-history",
  SCENARIO: "history-screenshot",
  STATE: {
    DECOMMISSIONED: "decommissioned",
    EMPTY: "empty",
    ROWS: "rows",
  },
} as const;

export const resolveUnitReservationScreenshotBasename = (
  state: string
): string =>
  `${E2E_UNIT_RESERVATION_SCREENSHOT.BASENAME}-${state}`;
