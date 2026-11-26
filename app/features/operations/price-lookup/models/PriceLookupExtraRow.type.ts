import type { QueryData } from "@supabase/supabase-js";
import type { buildPriceLookupExtraQuery } from "../services/buildPriceLookupExtraQuery";

export type PriceLookupExtraRow = QueryData<
  ReturnType<typeof buildPriceLookupExtraQuery>
>[number];
