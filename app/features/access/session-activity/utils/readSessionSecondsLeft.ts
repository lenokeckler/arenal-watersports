import { SUPABASE_RPC } from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { SESSION_CLOCK } from "../constants/SessionClock.constants";
import type { SessionClockReading } from "../models/SessionClockReading.type";

const UNKNOWN_READING: SessionClockReading = {
  kind: SESSION_CLOCK.UNKNOWN,
};

export const readSessionSecondsLeft =
  async (): Promise<SessionClockReading> => {
    try {
      const { data, error } =
        await createBrowserSupabaseClient().rpc(
          SUPABASE_RPC.CURRENT_SESSION_SECONDS_LEFT
        );

      if (error) {
        return UNKNOWN_READING;
      }

      if (data === null) {
        return { kind: SESSION_CLOCK.OVER };
      }

      return typeof data === "number"
        ? { kind: SESSION_CLOCK.LIVE, secondsLeft: data }
        : UNKNOWN_READING;
    } catch {
      return UNKNOWN_READING;
    }
  };
