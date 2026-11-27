import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeSource } from "./ReservationExtraTimeSource.type";

export interface ReservationExtraTimeGroup {
  arrivedAt: NullableRef<string>;
  categoryId: string;
  categoryName: string;
  dispatchedAt: string;
  extendedMinutes: number;
  extraMinutes: number;
  plannedReturnsAt: string;
  source: ReservationExtraTimeSource;
}
