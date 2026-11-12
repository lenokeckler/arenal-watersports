import type { NullableRef } from "@/app/types";

export interface ReservationCancellationEquipmentLine {
  id: string;
  label: string;
  quantity: NullableRef<number>;
}
