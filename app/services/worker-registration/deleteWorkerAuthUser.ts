import { SUPABASE_AUTH_OPERATION } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";

export const deleteWorkerAuthUser = async (
  userId: string
): Promise<void> => {
  const { error } =
    await createServiceRoleSupabaseClient().auth.admin.deleteUser(
      userId
    );

  throwIfSupabaseAuthError(
    error,
    SUPABASE_AUTH_OPERATION.DELETE_USER
  );
};
