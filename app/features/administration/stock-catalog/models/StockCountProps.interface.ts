import type { NullableUndefined } from "@/app/types";

export interface StockCountProps {
  categoryId: string;
  pageParam: NullableUndefined<string | string[]>;
}
