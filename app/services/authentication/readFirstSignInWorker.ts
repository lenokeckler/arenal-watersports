import { SUPABASE_TABLE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { FirstSignInWorker } from "./models/FirstSignInWorker.interface";

const WORKER_COLUMNS = "username, must_change_password";

export const readFirstSignInWorker = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<FirstSignInWorker>> => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .select(WORKER_COLUMNS)
    .eq("id", userData.user.id)
    .maybeSingle();

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);

  if (!data?.must_change_password) {
    return null;
  }

  return { id: userData.user.id, username: data.username };
};
