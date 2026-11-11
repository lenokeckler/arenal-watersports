import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { SUPABASE_AUTH_OPERATION } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";

export const readSignedInUserId = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<string>> => {
  const { data, error } = await supabase.auth.getUser();

  if (isAuthSessionMissingError(error)) {
    return null;
  }

  throwIfSupabaseAuthError(
    error,
    SUPABASE_AUTH_OPERATION.GET_USER
  );

  return data.user?.id ?? null;
};
