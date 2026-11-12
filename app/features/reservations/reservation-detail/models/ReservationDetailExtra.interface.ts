import type { NullableRef } from "@/app/types";

export interface ReservationDetailExtra {
  categoryName: NullableRef<string>;
  name: string;
  quantity: NullableRef<number>;
  unitCategoryName: NullableRef<string>;
  unitCode: NullableRef<string>;
}
