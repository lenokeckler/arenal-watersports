import type { PriceLookupAudience } from "@/app/features/operations/price-lookup/models/PriceLookupAudience.type";
import type { NullableRef } from "@/app/types";
import type { PriceLookupSeedStatus } from "./PriceLookupSeedStatus.type";

export interface PriceLookupComboSeed {
  audience: PriceLookupAudience;
  categoryId: string;
  name: string;
  packagePriceCrc: NullableRef<number>;
  packagePriceUsd: NullableRef<number>;
  status: PriceLookupSeedStatus;
}
