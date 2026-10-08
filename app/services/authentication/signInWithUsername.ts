import { createServerSupabaseClient } from "@/app/services/supabase";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { mapSignInAuthError } from "./mapSignInAuthError";
import { recordFailedSignIn } from "./recordFailedSignIn";
import { readMustChangePasswordClaim } from "./readMustChangePasswordClaim";
import { recordSuccessfulSignIn } from "./recordSuccessfulSignIn";
import type { AuthError } from "@supabase/supabase-js";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInResult } from "./models/SignInResult.type";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";

const rejectSignIn = async (
  error: AuthError,
  username: string
): Promise<SignInResult> => {
  if (isInvalidCredentialsAuthError(error)) {
    await recordFailedSignIn(username);
  }

  return { ok: false, error: mapSignInAuthError(error) };
};

const recordSuccessOrSignOut = async (
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  userId: string
): Promise<void> => {
  try {
    await recordSuccessfulSignIn(userId);
  } catch (error) {
    await supabase.auth.signOut();
    throw error;
  }
};

export const signInWithUsername = async (
  credentials: SignInCredentials
): Promise<SignInResult> => {
  const validationError =
    validateSignInCredentials(credentials);

  if (validationError) {
    return { ok: false, error: validationError };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: toAuthEmail(credentials.username),
      password: credentials.password,
    });

  if (error) {
    return rejectSignIn(error, credentials.username);
  }

  await recordSuccessOrSignOut(supabase, data.user.id);

  return {
    ok: true,
    mustChangePassword:
      await readMustChangePasswordClaim(supabase),
  };
};
