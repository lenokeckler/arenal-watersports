import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRA_TIME_NO_MINUTES } from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTime } from "../models/ReservationExtraTime.interface";
import type { ReservationExtraTimeGroupRow } from "../models/ReservationExtraTimeGroupRow.type";
import type { ReservationExtraTimeReservationRow } from "../models/ReservationExtraTimeReservationRow.type";
import type { ReservationExtraTimeResolutionRow } from "../models/ReservationExtraTimeResolutionRow.type";
import { mapReservationExtraTimeGroup } from "./mapReservationExtraTimeGroup";

export const mapReservationExtraTime = (
  reservation: ReservationExtraTimeReservationRow,
  groupRows: readonly ReservationExtraTimeGroupRow[],
  resolution: NullableRef<ReservationExtraTimeResolutionRow>
): ReservationExtraTime => {
  const groups = groupRows.map(
    mapReservationExtraTimeGroup
  );

  return {
    code: reservation.code,
    customerName: reservation.customer_name,
    groups,
    id: reservation.id,
    resolution:
      resolution === null
        ? null
        : {
            extraMinutes: resolution.extra_minutes,
            outcome: resolution.outcome,
          },
    status: reservation.status,
    totalMinutes: groups.reduce(
      (total, group) => total + group.extraMinutes,
      RESERVATION_EXTRA_TIME_NO_MINUTES
    ),
  };
};
