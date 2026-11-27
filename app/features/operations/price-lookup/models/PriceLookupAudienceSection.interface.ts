import type { PriceLookupAudience } from "./PriceLookupAudience.type";
import type { PriceLookupRow } from "./PriceLookupRow.interface";

export interface PriceLookupAudienceSection {
  audience: PriceLookupAudience;
  combos: PriceLookupRow[];
  extras: PriceLookupRow[];
  heading: string;
}
