import {
  SESSION_STATE,
  SUPABASE_RPC,
  type SessionState,
} from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { isSessionState } from "@/app/utils/session-state/isSessionState";

export const reportSessionActivity =
  async (): Promise<SessionState> => {
    try {
      const { data, error } =
        await createBrowserSupabaseClient().rpc(
          SUPABASE_RPC.TOUCH_CURRENT_SESSION_ACTIVITY
        );

      if (error || !isSessionState(data)) {
        return SESSION_STATE.LIVE;
      }

      return data;
    } catch {
      return SESSION_STATE.LIVE;
    }
  };
