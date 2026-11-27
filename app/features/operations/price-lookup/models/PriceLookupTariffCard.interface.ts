import type { PriceLookupRow } from "./PriceLookupRow.interface";

export interface PriceLookupTariffCard {
  id: string;
  rows: PriceLookupRow[];
  title: string;
}
