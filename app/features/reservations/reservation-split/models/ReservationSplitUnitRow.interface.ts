import type { NullableRef } from "@/app/types";
import type { ReservationSplitCategoryRow } from "./ReservationSplitCategoryRow.interface";

export interface ReservationSplitUnitRow {
  category: NullableRef<ReservationSplitCategoryRow>;
  code: string;
}
