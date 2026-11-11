import { SUPABASE_SIGN_OUT_SCOPE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";

export const signOutBrowserLocally = (): Promise<void> =>
  runWithFallback(
    async () => {
      const supabase = await createServerSupabaseClient();
      await supabase.auth.signOut({
        scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
      });
    },
    undefined,
    (): void => undefined
  );
