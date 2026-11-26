import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { PRICE_LOOKUP_STATUS } from "../constants/PriceLookupStatus.constants";

export const buildPriceLookupExtraQuery = (
  supabase: ServerSupabaseClient
) =>
  supabase
    .from("extras")
    .select("id, name, price_crc, price_usd")
    .eq("status", PRICE_LOOKUP_STATUS.ACTIVE)
    .order("name", { ascending: true })
    .order("id", { ascending: true });
