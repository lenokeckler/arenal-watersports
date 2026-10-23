import type { NullableRef } from "@/app/types";

export interface ReservationDetailEquipment {
  categoryName: NullableRef<string>;
  dispatchId: NullableRef<string>;
  fuelIn: NullableRef<number>;
  fuelOut: NullableRef<number>;
  quantity: NullableRef<number>;
  unitCode: NullableRef<string>;
  usageIn: NullableRef<number>;
  usageOut: NullableRef<number>;
}
