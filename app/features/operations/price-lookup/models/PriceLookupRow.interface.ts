import type { NullableRef } from "@/app/types";
import type { PriceLookupAmountLine } from "./PriceLookupAmountLine.interface";

export interface PriceLookupRow {
  amounts: PriceLookupAmountLine[];
  detail: NullableRef<string>;
  id: string;
  label: string;
}
