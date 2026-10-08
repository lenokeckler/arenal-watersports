import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import { mapPasswordUpdateError } from "./mapPasswordUpdateError";

export const updateSignedInPassword = async (
  supabase: ServerSupabaseClient,
  newPassword: string
): Promise<NullableRef<FirstSignInError>> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return error ? mapPasswordUpdateError(error) : null;
};
