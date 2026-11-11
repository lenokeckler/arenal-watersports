import { deriveLegacyAuthCookieName } from "./deriveLegacyAuthCookieName";
import { expireCookieFamily } from "./expireCookieFamily";

export const removeLegacySupabaseAuthCookies = (): void => {
  expireCookieFamily(deriveLegacyAuthCookieName());
};
