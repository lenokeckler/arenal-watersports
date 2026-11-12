import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";

export interface CategoryImageStorageHost {
  storage: SupabaseClient<Database>["storage"];
}
