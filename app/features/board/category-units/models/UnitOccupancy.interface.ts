import type { NullableRef } from "@/app/types";

export interface UnitOccupancy {
  customerName: string;
  dispatchId: string;
  dispatchedAt: string;
  isOverdue: boolean;
  peopleCount: number;
  radioChannel: NullableRef<number>;
  reservationCode: string;
  reservationEndsAt: string;
  reservationId: string;
  reservationStartsAt: string;
  returnsAt: string;
}
