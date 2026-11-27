import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeRecorded } from "./ReservationExtraTimeRecorded.interface";

export interface ReservationExtraTimeSend {
  isSubmitting: boolean;
  recorded: NullableRef<ReservationExtraTimeRecorded>;
  send: () => Promise<void>;
}
