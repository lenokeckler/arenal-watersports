import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface ReservationChargeEligibility {
  parentReservationId: NullableRef<string>;
  status: ReservationStatus;
}
