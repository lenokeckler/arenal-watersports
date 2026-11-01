import { createClient } from "@supabase/supabase-js";
import { SESSION_CLAIM } from "@/app/constants";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { E2E_SUPABASE_CLIENT_OPTIONS } from "../constants/E2eSupabase.constants";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

export const readPendingPasswordClaim = async (
  username: string,
  password: string
): Promise<unknown> => {
  const { anonKey, url } = readLocalSupabaseEnvironment();
  const supabase = createClient(
    url,
    anonKey,
    E2E_SUPABASE_CLIENT_OPTIONS
  );
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: toAuthEmail(username),
      password,
    });

  if (error) {
    throw error;
  }

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims(
      data.session.access_token
    );

  if (claimsError) {
    throw claimsError;
  }

  return claimsData?.claims[
    SESSION_CLAIM.MUST_CHANGE_PASSWORD
  ];
};
