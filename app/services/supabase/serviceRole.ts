import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";

export const createClient = () =>
  createSupabaseClient<Database>(
    SUPABASE.URL,
    SUPABASE.SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
