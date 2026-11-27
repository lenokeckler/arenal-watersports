import type { QueryData } from "@supabase/supabase-js";
import type { buildPriceLookupComboQuery } from "../services/buildPriceLookupComboQuery";

export type PriceLookupComboRow = QueryData<
  ReturnType<typeof buildPriceLookupComboQuery>
>[number];
