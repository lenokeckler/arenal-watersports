import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { E2E_SUPABASE_CLIENT_OPTIONS } from "../constants/E2eSupabase.constants";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

export const createAnonClient = (): SupabaseClient => {
  const { anonKey, url } = readLocalSupabaseEnvironment();

  return createClient(
    url,
    anonKey,
    E2E_SUPABASE_CLIENT_OPTIONS
  );
};
