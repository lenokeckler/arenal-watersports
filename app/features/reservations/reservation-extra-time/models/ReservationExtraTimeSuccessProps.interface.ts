import type { ReservationExtraTime } from "./ReservationExtraTime.interface";
import type { ReservationExtraTimeRecorded } from "./ReservationExtraTimeRecorded.interface";

export interface ReservationExtraTimeSuccessProps {
  extraTime: Pick<ReservationExtraTime, "code" | "id">;
  recorded: ReservationExtraTimeRecorded;
}
