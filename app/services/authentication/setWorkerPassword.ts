import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { mapPasswordUpdateError } from "./mapPasswordUpdateError";

export const setWorkerPassword = async (
  userId: string,
  password: string
): Promise<NullableRef<PasswordChangeError>> => {
  const { error } =
    await createServiceRoleSupabaseClient().auth.admin.updateUserById(
      userId,
      { password }
    );

  return error ? mapPasswordUpdateError(error) : null;
};
