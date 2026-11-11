import type { NullableRef } from "@/app/types";

export interface CategoryQuantityRow {
  category_id: NullableRef<string>;
  current_quantity: NullableRef<number>;
}
