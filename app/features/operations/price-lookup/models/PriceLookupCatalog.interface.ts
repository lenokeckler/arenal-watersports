import type { PriceLookupCombo } from "./PriceLookupCombo.interface";
import type { PriceLookupExtra } from "./PriceLookupExtra.interface";
import type { PriceLookupTariff } from "./PriceLookupTariff.interface";

export interface PriceLookupCatalog {
  combos: PriceLookupCombo[];
  extras: PriceLookupExtra[];
  tariffs: PriceLookupTariff[];
}
