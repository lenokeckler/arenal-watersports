import type { NullableRef } from "@/app/types";
import type { ReservationCancellationNamedRow } from "./ReservationCancellationNamedRow.interface";
import type { ReservationCancellationUnitRow } from "./ReservationCancellationUnitRow.interface";

export interface ReservationCancellationItemRow {
  category: NullableRef<ReservationCancellationNamedRow>;
  extra_id: NullableRef<string>;
  id: string;
  quantity: NullableRef<number>;
  unit: NullableRef<ReservationCancellationUnitRow>;
  unit_id: NullableRef<string>;
}
