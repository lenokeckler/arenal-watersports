import type { NullableUndefined } from "@/app/types";

export interface UnitReservationHistoryProps {
  categoryId: string;
  pageParam: NullableUndefined<string | string[]>;
  unitId: string;
}
