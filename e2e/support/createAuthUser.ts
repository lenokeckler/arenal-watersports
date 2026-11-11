import type { SupabaseClient } from "@supabase/supabase-js";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { failE2eOperation } from "./failE2eOperation";

export const createAuthUser = async (
  supabase: SupabaseClient,
  username: string,
  password: string
): Promise<string> => {
  const { data, error } =
    await supabase.auth.admin.createUser({
      email: toAuthEmail(username),
      email_confirm: true,
      password,
    });
  if (error) {
    return failE2eOperation(
      "create the auth user",
      error.message
    );
  }

  return data.user.id;
};
