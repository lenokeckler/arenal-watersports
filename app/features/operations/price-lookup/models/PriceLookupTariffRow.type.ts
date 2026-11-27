import type { QueryData } from "@supabase/supabase-js";
import type { buildPriceLookupTariffQuery } from "../services/buildPriceLookupTariffQuery";

export type PriceLookupTariffRow = QueryData<
  ReturnType<typeof buildPriceLookupTariffQuery>
>[number];
