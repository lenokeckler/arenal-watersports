import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { E2E_SUPABASE_CLIENT_OPTIONS } from "../constants/E2eSupabase.constants";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

export const createServiceRoleClient =
  (): SupabaseClient => {
    const { serviceRoleKey, url } =
      readLocalSupabaseEnvironment();

    return createClient(
      url,
      serviceRoleKey,
      E2E_SUPABASE_CLIENT_OPTIONS
    );
  };
