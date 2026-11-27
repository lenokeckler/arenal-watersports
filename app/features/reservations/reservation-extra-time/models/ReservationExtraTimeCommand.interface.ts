import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeCharge } from "./ReservationExtraTimeCharge.interface";
import type { ReservationExtraTimeOutcome } from "./ReservationExtraTimeOutcome.type";

export interface ReservationExtraTimeCommand {
  charge: NullableRef<ReservationExtraTimeCharge>;
  outcome: ReservationExtraTimeOutcome;
  reservationId: string;
}
