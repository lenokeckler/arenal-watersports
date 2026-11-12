import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { mapPasswordUpdateError } from "./mapPasswordUpdateError";

export const updateOwnPassword = async (
  supabase: ServerSupabaseClient,
  { currentPassword, newPassword }: PasswordChangeInput
): Promise<NullableRef<PasswordChangeError>> => {
  const { error } = await supabase.auth.updateUser({
    current_password: currentPassword,
    password: newPassword,
  });

  return error ? mapPasswordUpdateError(error) : null;
};
