import {
  STRING,
  SUPABASE_AUTH_COOKIE,
} from "@/app/constants";

const isAuthCookieName = (name: string): boolean =>
  name === SUPABASE_AUTH_COOKIE.NAME ||
  name.startsWith(
    `${SUPABASE_AUTH_COOKIE.NAME}${SUPABASE_AUTH_COOKIE.CHUNK_SEPARATOR}`
  );

export const listAuthCookieNames = (
  cookieHeader: string
): string[] =>
  cookieHeader
    .split(STRING.SEMICOLON)
    .map((pair) =>
      pair
        .split(SUPABASE_AUTH_COOKIE.VALUE_SEPARATOR)[0]
        .trim()
    )
    .filter(isAuthCookieName);
