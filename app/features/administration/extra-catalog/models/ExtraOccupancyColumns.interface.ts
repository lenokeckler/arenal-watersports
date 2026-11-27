import type { NullableRef } from "@/app/types";

export interface ExtraOccupancyColumns {
  occupies_category_id: NullableRef<string>;
  occupies_quantity: NullableRef<number>;
}
