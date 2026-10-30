import type { NullableRef } from "@/app/types";

export interface ReservationCalendarDispatch {
  categoryId: string;
  categoryName: string;
  closedAt: NullableRef<string>;
  endsAt: NullableRef<string>;
  id: string;
  startsAt: string;
}
