import { SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkArea } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const hasSignedInArea = async (
  supabase: ServerSupabaseClient,
  area: WorkArea
): Promise<boolean> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.HAS_AREA,
    { target: area }
  );

  throwIfSupabaseError(error, SUPABASE_RPC.HAS_AREA);

  return data === true;
};
