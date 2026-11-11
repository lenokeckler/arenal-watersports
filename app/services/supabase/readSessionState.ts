import {
  SESSION_LIVENESS,
  SESSION_STATE,
  SUPABASE_RPC,
  type SessionState,
} from "@/app/constants";
import { isSessionState } from "@/app/utils/session-state/isSessionState";
import { isTransientSupabaseError } from "./isTransientSupabaseError";
import type { ServerSupabaseClient } from "./models/ServerSupabaseClient.type";

const resolveFailedSessionState = (
  status: number | undefined
): SessionState =>
  isTransientSupabaseError(status)
    ? SESSION_STATE.LIVE
    : SESSION_STATE.ENDED;

export const readSessionState = async (
  supabaseClient: ServerSupabaseClient
): Promise<SessionState> => {
  const { data, error, status } = await supabaseClient
    .rpc(SUPABASE_RPC.CURRENT_SESSION_STATE)
    .abortSignal(
      AbortSignal.timeout(SESSION_LIVENESS.TIMEOUT_MS)
    );

  if (error) {
    return resolveFailedSessionState(status);
  }

  return isSessionState(data) ? data : SESSION_STATE.ENDED;
};
