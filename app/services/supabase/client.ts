import { createBrowserClient } from "@supabase/ssr";
import {
  SUPABASE,
  SUPABASE_COOKIE_OPTIONS,
} from "@/app/constants";
import type { Database } from "@/app/types";

export const createBrowserSupabaseClient = () =>
  createBrowserClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    { cookieOptions: SUPABASE_COOKIE_OPTIONS }
  );
