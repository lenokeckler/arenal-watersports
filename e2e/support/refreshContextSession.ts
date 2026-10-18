import type { BrowserContext } from "@playwright/test";
import { createServerClient } from "@supabase/ssr";
import type { AuthError } from "@supabase/supabase-js";
import type { NullableRef } from "@/app/types";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

export const refreshContextSession = async (
  context: BrowserContext
): Promise<NullableRef<AuthError>> => {
  const { anonKey, url } = readLocalSupabaseEnvironment();
  const cookies = await context.cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () =>
        cookies.map(({ name, value }) => ({ name, value })),
      setAll: () => undefined,
    },
  });
  const { error } = await supabase.auth.refreshSession();

  return error;
};
