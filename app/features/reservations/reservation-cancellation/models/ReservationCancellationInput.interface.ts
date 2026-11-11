import type { NullableRef } from "@/app/types";
import type { ReservationCancellationCause } from "./ReservationCancellationCause.type";

export interface ReservationCancellationInput {
  cause: NullableRef<ReservationCancellationCause>;
  expectedUpdatedAt: string;
  reason: string;
  reservationId: string;
}
