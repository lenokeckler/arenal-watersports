import type { NullableRef } from "@/app/types";

export interface StockLevels {
  available: number;
  damaged: number;
  expiryDate: NullableRef<string>;
  inRepair: number;
}
