import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import {
  E2E_AUTH_ERROR,
  E2E_LOCAL_SUPABASE_HOSTS,
  E2E_SUPABASE_AUTH_OPTIONS,
} from "../constants/E2eInventory.constants";

export const createLocalInventoryClient = () => {
  const supabaseUrl = new URL(SUPABASE.URL);
  const isLocal = E2E_LOCAL_SUPABASE_HOSTS.some(
    (hostname) => hostname === supabaseUrl.hostname
  );

  if (!isLocal) {
    throw new Error(E2E_AUTH_ERROR.NON_LOCAL_URL);
  }

  return createClient<Database>(
    SUPABASE.URL,
    SUPABASE.SERVICE_ROLE_KEY,
    { auth: E2E_SUPABASE_AUTH_OPTIONS }
  );
};
