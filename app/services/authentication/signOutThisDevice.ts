import {
  SIGN_OUT_TIME_LIMIT_MS,
  SUPABASE_SIGN_OUT_SCOPE,
  TIME_LIMIT_REACHED,
} from "@/app/constants";
import type { BrowserSupabaseClient } from "@/app/services/supabase/models/BrowserSupabaseClient.type";
import { removeLegacySupabaseAuthCookies } from "@/app/utils/supabase-cookie/removeLegacySupabaseAuthCookies";
import { removeSupabaseAuthCookies } from "@/app/utils/supabase-cookie/removeSupabaseAuthCookies";
import { withTimeLimit } from "@/app/utils/time-limit/withTimeLimit";
import type { SignOutThisDeviceResult } from "./models/SignOutThisDeviceResult.interface";

const holdsNoSession = async (
  supabase: BrowserSupabaseClient
): Promise<boolean> => {
  const outcome = await withTimeLimit(
    supabase.auth.getSession(),
    SIGN_OUT_TIME_LIMIT_MS
  );

  if (outcome === TIME_LIMIT_REACHED) {
    return false;
  }

  return (
    outcome.error === null && outcome.data.session === null
  );
};

export const signOutThisDevice = async (
  supabase: BrowserSupabaseClient
): Promise<SignOutThisDeviceResult> => {
  const signOutOutcome = await withTimeLimit(
    supabase.auth.signOut({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    }),
    SIGN_OUT_TIME_LIMIT_MS
  );

  removeLegacySupabaseAuthCookies();

  if (
    signOutOutcome !== TIME_LIMIT_REACHED &&
    (await holdsNoSession(supabase))
  ) {
    return { ok: true };
  }

  removeSupabaseAuthCookies();

  return { ok: await holdsNoSession(supabase) };
};
