import type { ReservationExtraTime } from "./ReservationExtraTime.interface";
import type { ReservationExtraTimeUnavailableReason } from "./ReservationExtraTimeUnavailableReason.type";

export interface ReservationExtraTimeUnavailableProps {
  extraTime: Pick<
    ReservationExtraTime,
    "code" | "customerName" | "id"
  >;
  reason: ReservationExtraTimeUnavailableReason;
}
