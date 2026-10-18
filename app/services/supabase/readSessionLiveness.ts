import { SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "./models/ServerSupabaseClient.type";

export const readSessionLiveness = async (
  supabaseClient: ServerSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabaseClient.rpc(
    SUPABASE_RPC.CURRENT_SESSION_IS_LIVE
  );

  return error ? true : data !== false;
};
