import type { NullableRef } from "@/app/types";
import type { ReservationCancellationNamedRow } from "./ReservationCancellationNamedRow.interface";

export interface ReservationCancellationUnitRow {
  category: NullableRef<ReservationCancellationNamedRow>;
  code: string;
}
