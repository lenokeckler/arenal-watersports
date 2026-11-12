import type { MovementReportData } from "../models/MovementReportData.interface";

export const MOVEMENT_TEST = {
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
} as const;

export const MOVEMENT_REPORT: MovementReportData = {
  departuresByMonth: [
    { month: "2026-01-01", value: 10 },
    { month: "2026-02-01", value: 5 },
  ],
  departuresByWeekday: [
    { value: 8, weekday: 6 },
    { value: 2, weekday: 2 },
  ],
  incomeByCurrency: [
    {
      currency: "USD",
      months: [
        { month: "2026-01-01", value: 1500 },
        { month: "2026-02-01", value: 750 },
      ],
    },
  ],
};

export const MOVEMENT_MONTH_TEXT = {
  FEBRUARY: "feb 2026",
  JANUARY: "ene 2026",
} as const;
