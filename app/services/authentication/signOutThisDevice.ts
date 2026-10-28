import { SUPABASE_SIGN_OUT_SCOPE } from "@/app/constants";
import type { BrowserSupabaseClient } from "@/app/services/supabase/models/BrowserSupabaseClient.type";
import { removeLegacySupabaseAuthCookies } from "@/app/utils/supabase-cookie/removeLegacySupabaseAuthCookies";
import { removeSupabaseAuthCookies } from "@/app/utils/supabase-cookie/removeSupabaseAuthCookies";
import type { SignOutThisDeviceResult } from "./models/SignOutThisDeviceResult.interface";

const holdsNoSession = async (
  supabase: BrowserSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabase.auth.getSession();

  return error === null && data.session === null;
};

export const signOutThisDevice = async (
  supabase: BrowserSupabaseClient
): Promise<SignOutThisDeviceResult> => {
  await supabase.auth.signOut({
    scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
  });

  removeLegacySupabaseAuthCookies();

  if (await holdsNoSession(supabase)) {
    return { ok: true };
  }

  removeSupabaseAuthCookies();

  return { ok: await holdsNoSession(supabase) };
};
