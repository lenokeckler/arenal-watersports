import { SUPABASE_AUTH_COOKIE } from "@/app/constants";
import { listAuthCookieNames } from "./listAuthCookieNames";

export const expireCookieFamily = (
  baseName: string
): void => {
  listAuthCookieNames(document.cookie, baseName).forEach(
    (name) => {
      document.cookie = `${name}${SUPABASE_AUTH_COOKIE.VALUE_SEPARATOR}; ${SUPABASE_AUTH_COOKIE.EXPIRY_ATTRIBUTES}`;
    }
  );
};
