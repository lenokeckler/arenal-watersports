import type { PriceLookupRow } from "./PriceLookupRow.interface";

export interface PriceLookupGroupProps {
  emptyMessage: string;
  headingId: string;
  rows: PriceLookupRow[];
  title: string;
}
