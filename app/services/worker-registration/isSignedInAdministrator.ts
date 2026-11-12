import { SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const isSignedInAdministrator = async (
  supabase: ServerSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.IS_ADMIN
  );

  throwIfSupabaseError(error, SUPABASE_RPC.IS_ADMIN);

  return data === true;
};
