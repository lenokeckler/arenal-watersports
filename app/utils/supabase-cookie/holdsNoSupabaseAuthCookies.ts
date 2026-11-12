import { SUPABASE_AUTH_COOKIE } from "@/app/constants";
import { deriveLegacyAuthCookieName } from "./deriveLegacyAuthCookieName";
import { listAuthCookieNames } from "./listAuthCookieNames";

export const holdsNoSupabaseAuthCookies = (
  cookieHeader: string = document.cookie
): boolean =>
  [
    SUPABASE_AUTH_COOKIE.NAME,
    deriveLegacyAuthCookieName(),
  ].every(
    (baseName) =>
      listAuthCookieNames(cookieHeader, baseName).length ===
      0
  );
