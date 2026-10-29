import type { NullableRef } from "@/app/types";

export interface ReservationCalendarEquipment {
  categoryId: string;
  categoryName: string;
  quantity: number;
  unitCode: NullableRef<string>;
}
