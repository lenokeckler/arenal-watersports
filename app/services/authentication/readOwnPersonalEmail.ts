import {
  SUPABASE_TABLE,
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { OwnPersonalEmail } from "./models/OwnPersonalEmail.interface";
import { readSignedInUserId } from "./readSignedInUserId";

export const readOwnPersonalEmail = async (
  supabase?: ServerSupabaseClient
): Promise<NullableRef<OwnPersonalEmail>> => {
  const client =
    supabase ?? (await createServerSupabaseClient());
  const userId = await readSignedInUserId(client);

  if (!userId) {
    return null;
  }

  const { data, error } = await client
    .from(SUPABASE_TABLE.WORKERS)
    .select(SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL_STATE)
    .eq(SUPABASE_WORKER_COLUMN.ID, userId)
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
