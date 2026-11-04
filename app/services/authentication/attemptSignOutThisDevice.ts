import { signOutThisDevice } from "@/app/services/authentication/signOutThisDevice";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";

export const attemptSignOutThisDevice =
  async (): Promise<boolean> => {
    try {
      const { ok } = await signOutThisDevice(
        createBrowserSupabaseClient()
      );

      return ok;
    } catch {
      return false;
    }
  };
