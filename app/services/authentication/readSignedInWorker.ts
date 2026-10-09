import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { SignedInWorker } from "./models/SignedInWorker.interface";
import { readSignedInUserId } from "./readSignedInUserId";

export const readSignedInWorker = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<SignedInWorker>> => {
  const userId = await readSignedInUserId(supabase);

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .select(SUPABASE_WORKER_COLUMN.FIRST_SIGN_IN)
    .eq(SUPABASE_WORKER_COLUMN.ID, userId)
    .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  if (!data) {
    return null;
  }

  return {
    id: userId,
    mustChangePassword: data.must_change_password,
    username: data.username,
  };
};
