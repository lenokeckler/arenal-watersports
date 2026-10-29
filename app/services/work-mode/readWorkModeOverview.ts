import {
  SUPABASE_RPC,
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkModeOverview } from "./models/WorkModeOverview.interface";

export const readWorkModeOverview = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<WorkModeOverview>> => {
  const userId = await readSignedInUserId(supabase);

  if (!userId) {
    return null;
  }

  const { data: areas, error } = await supabase
    .from(SUPABASE_TABLE.WORKER_AREAS)
    .select(SUPABASE_WORKER_COLUMN.AREA)
    .eq(SUPABASE_WORKER_COLUMN.WORKER_ID, userId);

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKER_AREAS);

  const { data: current, error: currentError } =
    await supabase.rpc(SUPABASE_RPC.CURRENT_WORK_AREA);

  throwIfSupabaseError(
    currentError,
    SUPABASE_RPC.CURRENT_WORK_AREA
  );

  return {
    areas: (areas ?? []).map(({ area }) => area),
    current: current ?? null,
  };
};
