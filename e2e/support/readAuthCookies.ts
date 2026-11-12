import type {
  BrowserContext,
  Cookie,
} from "@playwright/test";
import { isChunkLike } from "@supabase/ssr";
import { SUPABASE_AUTH_COOKIE } from "@/app/constants";

export const readAuthCookies = async (
  context: BrowserContext
): Promise<Cookie[]> =>
  (await context.cookies()).filter(
    ({ name }) =>
      name === SUPABASE_AUTH_COOKIE.NAME ||
      isChunkLike(name, SUPABASE_AUTH_COOKIE.NAME)
  );
