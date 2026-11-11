import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { NotAuthorizedError } from "./NotAuthorizedError";

export const assertIsAdminWorker = async (
  supabase: ServerSupabaseClient
): Promise<string> => {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new NotAuthorizedError();
  }

  const { data: isAdmin, error: isAdminError } =
    await supabase.rpc("is_admin");
  throwIfSupabaseError(isAdminError, "is_admin");

  if (!isAdmin) {
    throw new NotAuthorizedError();
  }

  return userData.user.id;
};
