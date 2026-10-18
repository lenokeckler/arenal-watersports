import {
  SESSION_LIVENESS,
  SUPABASE_RPC,
} from "@/app/constants";
import { isTransientSupabaseError } from "./isTransientSupabaseError";
import type { ServerSupabaseClient } from "./models/ServerSupabaseClient.type";

export const readSessionLiveness = async (
  supabaseClient: ServerSupabaseClient
): Promise<boolean> => {
  const { data, error, status } = await supabaseClient
    .rpc(SUPABASE_RPC.CURRENT_SESSION_IS_LIVE)
    .abortSignal(
      AbortSignal.timeout(SESSION_LIVENESS.TIMEOUT_MS)
    );

  return error
    ? isTransientSupabaseError(status)
    : data !== false;
};
