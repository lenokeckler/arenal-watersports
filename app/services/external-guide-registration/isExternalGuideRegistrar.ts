import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SUPABASE_RPC } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const isExternalGuideRegistrar = async (
  supabase: ServerSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.CAN_REGISTER_EXTERNAL_GUIDE
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.CAN_REGISTER_EXTERNAL_GUIDE
  );

  return data === true;
};
