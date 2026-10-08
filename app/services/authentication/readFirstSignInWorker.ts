import { isAuthSessionMissingError } from "@supabase/supabase-js";
import {
  SUPABASE_AUTH_OPERATION,
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { FirstSignInWorker } from "./models/FirstSignInWorker.interface";

export const readFirstSignInWorker = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<FirstSignInWorker>> => {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (isAuthSessionMissingError(userError)) {
    return null;
  }

  throwIfSupabaseAuthError(
    userError,
    SUPABASE_AUTH_OPERATION.GET_USER
  );

  if (!userData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .select(SUPABASE_WORKER_COLUMN.FIRST_SIGN_IN)
    .eq(SUPABASE_WORKER_COLUMN.ID, userData.user.id)
    .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  if (!data) {
    return null;
  }

  return {
    id: userData.user.id,
    mustChangePassword: data.must_change_password,
    username: data.username,
  };
};
