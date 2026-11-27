import type { ReservationExtraTimeGroup } from "../models/ReservationExtraTimeGroup.interface";
import type { ReservationExtraTimeGroupRow } from "../models/ReservationExtraTimeGroupRow.type";
import { resolveReservationExtraTimeSource } from "./resolveReservationExtraTimeSource";

export const mapReservationExtraTimeGroup = (
  row: ReservationExtraTimeGroupRow
): ReservationExtraTimeGroup => ({
  arrivedAt: row.arrived_at,
  categoryId: row.category_id,
  categoryName: row.category_name,
  dispatchedAt: row.dispatched_at,
  extendedMinutes: row.extended_minutes,
  extraMinutes: row.extra_minutes,
  plannedReturnsAt: row.planned_returns_at,
  source: resolveReservationExtraTimeSource(
    row.extra_minutes,
    row.extended_minutes
  ),
});
