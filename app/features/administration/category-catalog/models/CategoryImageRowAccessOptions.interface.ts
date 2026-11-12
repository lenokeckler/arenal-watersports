import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";

export interface CategoryImageRowAccessOptions {
  categoryId: string;
  supabase: ServerSupabaseClient;
}
