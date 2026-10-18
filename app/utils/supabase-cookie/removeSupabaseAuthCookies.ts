import { SUPABASE_AUTH_COOKIE } from "@/app/constants";
import { expireCookieFamily } from "./expireCookieFamily";
import { removeLegacySupabaseAuthCookies } from "./removeLegacySupabaseAuthCookies";

export const removeSupabaseAuthCookies = (): void => {
  expireCookieFamily(SUPABASE_AUTH_COOKIE.NAME);
  removeLegacySupabaseAuthCookies();
};
