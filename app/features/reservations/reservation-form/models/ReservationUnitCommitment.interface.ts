import type { NullableRef } from "@/app/types";

export interface ReservationUnitCommitment {
  dispatch: NullableRef<{
    closed_at: NullableRef<string>;
    dispatched_at: string;
  }>;
  reservation: {
    ends_at: NullableRef<string>;
    starts_at: string;
  };
  unit_id: NullableRef<string>;
}
