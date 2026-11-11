import type { NullableRef } from "@/app/types";
import type { ReservationPostponementCategoryRow } from "./ReservationPostponementCategoryRow.interface";

export interface ReservationPostponementUnitRow {
  category: NullableRef<ReservationPostponementCategoryRow>;
  code: string;
  fuel_max: number;
  usage_total: NullableRef<number>;
}
