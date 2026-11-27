import type { PriceLookupCombo } from "./PriceLookupCombo.interface";
import type { PriceLookupExtra } from "./PriceLookupExtra.interface";

export interface PriceLookupAudienceSources {
  combos: PriceLookupCombo[];
  extras: PriceLookupExtra[];
}
