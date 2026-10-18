import { SUPABASE_AUTH_COOKIE } from "@/app/constants";

export const isAuthCookieName = (name: string): boolean => {
  const chunkPrefix = `${SUPABASE_AUTH_COOKIE.NAME}${SUPABASE_AUTH_COOKIE.CHUNK_SEPARATOR}`;

  return (
    name === SUPABASE_AUTH_COOKIE.NAME ||
    (name.startsWith(chunkPrefix) &&
      SUPABASE_AUTH_COOKIE.CHUNK_INDEX_PATTERN.test(
        name.slice(chunkPrefix.length)
      ))
  );
};
