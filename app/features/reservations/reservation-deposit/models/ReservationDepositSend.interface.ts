import type { NullableRef } from "@/app/types";
import type { ReservationDepositRecorded } from "./ReservationDepositRecorded.interface";

export interface ReservationDepositSend {
  isSubmitting: boolean;
  mayBeRecorded: boolean;
  recorded: NullableRef<ReservationDepositRecorded>;
  send: () => Promise<void>;
}
