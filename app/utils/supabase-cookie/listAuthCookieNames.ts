import {
  STRING,
  SUPABASE_AUTH_COOKIE,
} from "@/app/constants";

const isChunkOf = (
  name: string,
  baseName: string
): boolean => {
  const prefix = `${baseName}${SUPABASE_AUTH_COOKIE.CHUNK_SEPARATOR}`;

  return (
    name.startsWith(prefix) &&
    SUPABASE_AUTH_COOKIE.CHUNK_INDEX_PATTERN.test(
      name.slice(prefix.length)
    )
  );
};

export const listAuthCookieNames = (
  cookieHeader: string,
  baseName: string
): string[] =>
  cookieHeader
    .split(STRING.SEMICOLON)
    .map((pair) =>
      pair
        .split(SUPABASE_AUTH_COOKIE.VALUE_SEPARATOR)[0]
        .trim()
    )
    .filter(
      (name) =>
        name === baseName || isChunkOf(name, baseName)
    );
