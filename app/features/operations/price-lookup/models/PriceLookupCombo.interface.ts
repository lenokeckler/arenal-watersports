import type { NullableRef } from "@/app/types";
import type { PriceLookupAudience } from "./PriceLookupAudience.type";
import type { PriceLookupComboItem } from "./PriceLookupComboItem.interface";

export interface PriceLookupCombo {
  audience: PriceLookupAudience;
  id: string;
  items: PriceLookupComboItem[];
  name: string;
  packagePrice: NullableRef<number>;
}
