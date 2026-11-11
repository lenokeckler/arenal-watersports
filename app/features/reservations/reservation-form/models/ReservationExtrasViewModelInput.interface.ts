import type { NullableUndefined } from "@/app/types";
import type { ReservationType } from "./ReservationType.type";

export interface ReservationExtrasViewModelInput {
  durationHours: number;
  extraIds: string[];
  reservationType: NullableUndefined<ReservationType>;
  unitId: string;
}
