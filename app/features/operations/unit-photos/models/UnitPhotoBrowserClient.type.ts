import type { createBrowserSupabaseClient } from "@/app/services/supabase/client";

export type UnitPhotoBrowserClient = ReturnType<
  typeof createBrowserSupabaseClient
>;
