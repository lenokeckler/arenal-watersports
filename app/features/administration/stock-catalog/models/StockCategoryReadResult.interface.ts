import type { NullableRef } from "@/app/types";
import type { StockCategory } from "./StockCategory.interface";

export interface StockCategoryReadResult {
  category: NullableRef<StockCategory>;
  isReadFailed: boolean;
}
