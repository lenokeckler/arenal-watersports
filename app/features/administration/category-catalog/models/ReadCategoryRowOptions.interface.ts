import type { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";

export interface ReadCategoryRowOptions<Row, Category> {
  query: (
    supabase: ServerSupabaseClient
  ) => PromiseLike<PostgrestMaybeSingleResponse<Row>>;
  map: (row: Row) => Category;
  operation: string;
}
