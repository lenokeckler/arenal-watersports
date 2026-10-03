import { createServerSupabaseClient } from "@/app/services/supabase";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { mapSignInAuthError } from "./mapSignInAuthError";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInResult } from "./models/SignInResult.type";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";

export const signInWithUsername = async (
  credentials: SignInCredentials
): Promise<SignInResult> => {
  const validationError =
    validateSignInCredentials(credentials);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: toAuthEmail(credentials.username),
    password: credentials.password,
  });

  if (error) {
    return { ok: false, error: mapSignInAuthError(error) };
  }

  return { ok: true };
};
