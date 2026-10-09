import { isAuthSessionMissingError } from "@supabase/supabase-js";
import {
  SUPABASE_AUTH_OPERATION,
  SUPABASE_TABLE,
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseAuthError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { OwnPersonalEmail } from "./models/OwnPersonalEmail.interface";

export const readOwnPersonalEmail = async (
  supabase?: ServerSupabaseClient
): Promise<NullableRef<OwnPersonalEmail>> => {
  const client =
    supabase ?? (await createServerSupabaseClient());
  const { data: userData, error: userError } =
    await client.auth.getUser();

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

  const { data, error } = await client
    .from(SUPABASE_TABLE.WORKERS)
    .select(SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL_STATE)
    .eq(SUPABASE_WORKER_COLUMN.ID, userData.user.id)
    .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  if (!data) {
    return null;
  }

  return {
    address: data.personal_email,
    isRequired:
      data.base_role === SUPABASE_WORK_AREA.ADMINISTRATION,
  };
};
