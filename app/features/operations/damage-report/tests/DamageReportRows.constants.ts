import type { NullableRef } from "@/app/types";
import type {
  DamageReportTripRow,
  DamageReportUnitRow,
} from "../models/DamageReportRows.interface";
import {
  REPORT_TRIP_ID,
  REPORT_UNIT_ID,
} from "./DamageReport.constants";

export const REPORT_UNIT_ROWS: DamageReportUnitRow[] = [
  {
    category: { name: "Jet Ski" },
    code: "JET-01",
    id: REPORT_UNIT_ID,
    impact_count: 0,
    status: "available",
  },
];

const buildTripRow = (
  reservationId: string,
  customer: string,
  dispatchedAt: NullableRef<string>
): DamageReportTripRow => ({
  dispatch: dispatchedAt
    ? { dispatched_at: dispatchedAt }
    : null,
  reservation: { customer_name: customer },
  reservation_id: reservationId,
  unit_id: REPORT_UNIT_ID,
});

export const REPORT_TRIP_ROWS: DamageReportTripRow[] = [
  buildTripRow("old", "Antes", "2026-11-20T15:00:00Z"),
  buildTripRow(
    REPORT_TRIP_ID,
    "Después",
    "2026-11-25T15:00:00Z"
  ),
  buildTripRow("none", "Sin salida", null),
];
