import type { NullableRef } from "@/app/types";

export interface ReservationDetailEquipment {
  categoryName: NullableRef<string>;
  dispatchId: NullableRef<string>;
  quantity: NullableRef<number>;
  unitCode: NullableRef<string>;
}
