import type { NullableRef } from "@/app/types";
import type { PriceLookupAmounts } from "./PriceLookupAmounts.interface";

export interface PriceLookupTariff {
  categoryId: string;
  categoryName: string;
  rental: NullableRef<PriceLookupAmounts>;
  tour: NullableRef<PriceLookupAmounts>;
}
