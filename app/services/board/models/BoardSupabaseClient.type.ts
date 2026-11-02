import type { createServerSupabaseClient } from "@/app/services/supabase";

export type BoardSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;
