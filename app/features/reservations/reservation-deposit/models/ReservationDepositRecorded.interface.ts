import type { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationDepositDecision } from "@/app/utils/reservations/models/ReservationDepositDecision.type";

export interface ReservationDepositRecorded {
  decision: Exclude<
    ReservationDepositDecision,
    {
      kind: typeof RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED;
    }
  >;
  id: NullableRef<string>;
  recordedByName: NullableRef<string>;
}
