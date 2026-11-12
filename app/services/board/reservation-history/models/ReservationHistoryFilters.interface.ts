import type {
  NullableRef,
  ReservationType,
} from "@/app/types";

export interface ReservationHistoryFilters {
  categoryId: NullableRef<string>;
  from: NullableRef<string>;
  to: NullableRef<string>;
  type: NullableRef<ReservationType>;
}
