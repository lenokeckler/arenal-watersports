import type { DamageReportInput } from "../models/DamageReportInput.interface";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

export const REPORT_UNIT_ID =
  "eeeeeeee-0000-0000-0000-000000000001";

export const REPORT_ID =
  "eeeeeeee-0000-0000-0000-000000000002";

export const REPORT_TRIP_ID =
  "eeeeeeee-0000-0000-0000-000000000003";

export const REPORT_UNIT: DamageReportUnit = {
  categoryName: "Jet Ski",
  code: "JET-01",
  id: REPORT_UNIT_ID,
  impactCount: 2,
  isOut: false,
  status: "available",
  trips: [
    {
      label: "25 nov 13:00 · Pérez, Ana",
      reservationId: REPORT_TRIP_ID,
    },
  ],
};

export const NEW_REPORT_SCREEN: DamageReportScreen = {
  pending: null,
  presetUnitId: REPORT_UNIT_ID,
  units: [REPORT_UNIT],
};

export const PENDING_REPORT_SCREEN: DamageReportScreen = {
  pending: {
    cause: null,
    description: "",
    hasTrip: true,
    hits: 3,
    id: REPORT_ID,
    unitId: REPORT_UNIT_ID,
  },
  presetUnitId: REPORT_UNIT_ID,
  units: [{ ...REPORT_UNIT, status: "damaged" }],
};

export const VALID_REPORT_INPUT: DamageReportInput = {
  cause: "collision",
  description: "Golpe en la proa",
  detailLater: false,
  hits: 1,
  reportId: null,
  reservationId: null,
  unitId: REPORT_UNIT_ID,
  unitStatus: "damaged",
};

export const INVALID_REPORT_INPUTS: unknown[] = [
  null,
  "report",
  { ...VALID_REPORT_INPUT, unitId: "1 or 1=1" },
  { ...VALID_REPORT_INPUT, reportId: "x" },
  { ...VALID_REPORT_INPUT, reservationId: 5 },
  { ...VALID_REPORT_INPUT, detailLater: "yes" },
  { ...VALID_REPORT_INPUT, description: "a".repeat(2001) },
  { ...VALID_REPORT_INPUT, hits: -1 },
  { ...VALID_REPORT_INPUT, hits: 1.5 },
  { ...VALID_REPORT_INPUT, hits: 10000 },
  { ...VALID_REPORT_INPUT, cause: "fire" },
  { ...VALID_REPORT_INPUT, unitStatus: "available" },
];
