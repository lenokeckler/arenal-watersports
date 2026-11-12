import type { NullableRef } from "@/app/types";
import type { ReservationPostponementQuantityCategoryRow } from "./ReservationPostponementQuantityCategoryRow.interface";
import type { ReservationPostponementDispatchRow } from "./ReservationPostponementDispatchRow.interface";
import type { ReservationPostponementUnitRow } from "./ReservationPostponementUnitRow.interface";

export interface ReservationPostponementItemRow {
  category: NullableRef<ReservationPostponementQuantityCategoryRow>;
  category_id: NullableRef<string>;
  dispatch: NullableRef<ReservationPostponementDispatchRow>;
  dispatch_id: NullableRef<string>;
  extra_id: NullableRef<string>;
  fuel_out: NullableRef<number>;
  id: string;
  quantity: NullableRef<number>;
  unit: NullableRef<ReservationPostponementUnitRow>;
  unit_id: NullableRef<string>;
  usage_out: NullableRef<number>;
}
