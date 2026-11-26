import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface ReservationDepositEligibility {
  parentReservationId: NullableRef<string>;
  status: ReservationStatus;
}
