import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeOutcome } from "./ReservationExtraTimeOutcome.type";
import type { ReservationExtraTimeRecordedCharge } from "./ReservationExtraTimeRecordedCharge.interface";

export interface ReservationExtraTimeRecorded {
  charge: NullableRef<ReservationExtraTimeRecordedCharge>;
  extraMinutes: number;
  outcome: ReservationExtraTimeOutcome;
  recordedByName: string;
}
