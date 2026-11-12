import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { mapPasswordUpdateError } from "./mapPasswordUpdateError";

export const updateSignedInPassword = async (
  supabase: ServerSupabaseClient,
  newPassword: string
): Promise<NullableRef<PasswordChangeError>> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return error ? mapPasswordUpdateError(error) : null;
};
