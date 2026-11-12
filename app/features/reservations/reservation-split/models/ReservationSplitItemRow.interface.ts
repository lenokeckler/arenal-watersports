import type { NullableRef } from "@/app/types";
import type { ReservationSplitCategoryRow } from "./ReservationSplitCategoryRow.interface";
import type { ReservationSplitUnitRow } from "./ReservationSplitUnitRow.interface";

export interface ReservationSplitItemRow {
  category: NullableRef<ReservationSplitCategoryRow>;
  category_id: NullableRef<string>;
  dispatch_id: NullableRef<string>;
  extra_id: NullableRef<string>;
  id: string;
  quantity: NullableRef<number>;
  unit: NullableRef<ReservationSplitUnitRow>;
  unit_id: NullableRef<string>;
}
