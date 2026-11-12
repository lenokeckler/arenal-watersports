import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import {
  SupabaseNoRowsAffectedError,
  throwIfNoRowsAffected,
} from "@/app/utils/supabase-error/SupabaseNoRowsAffectedError";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { readSignedInUserId } from "./readSignedInUserId";

export const updateOwnPersonalEmail = async (
  supabase: ServerSupabaseClient,
  address: NullableRef<string>
): Promise<void> => {
  const userId = await readSignedInUserId(supabase);

  if (!userId) {
    throw new SupabaseNoRowsAffectedError(
      SUPABASE_TABLE.WORKERS
    );
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .update({
      [SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL]: address,
    })
    .eq(SUPABASE_WORKER_COLUMN.ID, userId)
    .select(SUPABASE_WORKER_COLUMN.ID);

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);
  throwIfNoRowsAffected(data ?? [], SUPABASE_TABLE.WORKERS);
};
