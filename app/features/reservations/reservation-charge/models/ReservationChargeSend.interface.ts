import type { NullableRef } from "@/app/types";
import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export interface ReservationChargeSend {
  isSubmitting: boolean;
  recorded: NullableRef<ReservationChargeRecorded>;
  send: () => Promise<void>;
}
