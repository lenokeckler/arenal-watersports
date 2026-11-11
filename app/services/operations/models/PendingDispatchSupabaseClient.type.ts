import { createServerSupabaseClient } from "@/app/services/supabase";

export type PendingDispatchSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;
