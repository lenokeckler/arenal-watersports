import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { ExtraQueryCalls } from "./ExtraQueryCalls.interface";

export interface ExtraQueryClient {
  client: ServerSupabaseClient;
  calls: ExtraQueryCalls;
}
