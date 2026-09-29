import { createServerSupabaseClient } from "@/app/services/supabase";
import type { PendingDispatchDatabase } from "./PendingDispatchDatabase.type";

export type PendingDispatchSupabaseClient = Awaited<
  ReturnType<
    typeof createServerSupabaseClient<PendingDispatchDatabase>
  >
>;
