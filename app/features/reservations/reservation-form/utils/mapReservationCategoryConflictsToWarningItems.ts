import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import type { ReservationCategoryConflictWarningItem } from "../models/ReservationCategoryConflictWarningItem.interface";
import { getReservationIntervalLabel } from "./getReservationIntervalLabel";

export const mapReservationCategoryConflictsToWarningItems =
  (
    conflicts: ReservationCategoryConflict[]
  ): ReservationCategoryConflictWarningItem[] =>
    conflicts.map((conflict) => ({
      code: conflict.code,
      customerName: conflict.customer_name,
      id: conflict.reservation_id,
      intervalLabel: getReservationIntervalLabel({
        startsAt: conflict.starts_at,
        endsAt: conflict.ends_at,
      }),
    }));
