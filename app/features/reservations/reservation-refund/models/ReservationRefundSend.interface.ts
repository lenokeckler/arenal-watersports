import type { NullableRef } from "@/app/types";
import type { ReservationRefundRecorded } from "./ReservationRefundRecorded.interface";

export interface ReservationRefundSend {
  isSubmitting: boolean;
  mayBeRecorded: boolean;
  recorded: NullableRef<ReservationRefundRecorded>;
  send: () => Promise<void>;
}
