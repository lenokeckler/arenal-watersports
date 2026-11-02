import { createServerClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";
import {
  SUPABASE,
  SUPABASE_COOKIE_OPTIONS,
} from "@/app/constants";
import type { Database } from "@/app/types";
import { E2E_AUTH_ERROR } from "../constants/E2eInventory.constants";
import type { E2eAuthCookie } from "../models/E2eAuthCookie.interface";

export const createInventoryAuthCookies = async (
  session: Session
): Promise<E2eAuthCookie[]> => {
  const authCookies: E2eAuthCookie[] = [];
  const client = createServerClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    {
      cookieOptions: SUPABASE_COOKIE_OPTIONS,
      cookies: {
        getAll: () => [],
        setAll: (cookies) => {
          authCookies.push(...cookies);
        },
      },
    }
  );
  const { error } = await client.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
  if (error) {
    throw new Error(E2E_AUTH_ERROR.SESSION, {
      cause: error,
    });
  }
  return authCookies;
};
