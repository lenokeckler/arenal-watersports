import type { NullableRef } from "@/app/types";

export interface ReservationPostponementEquipmentLine {
  id: string;
  label: string;
  quantity: NullableRef<number>;
}
