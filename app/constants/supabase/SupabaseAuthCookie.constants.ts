export const SUPABASE_AUTH_COOKIE = {
  NAME: "sb-arenal-auth-token",
  CHUNK_SEPARATOR: ".",
  CHUNK_INDEX_PATTERN: /^\d+$/,
  VALUE_SEPARATOR: "=",
  LEGACY_PREFIX: "sb-",
  LEGACY_SUFFIX: "-auth-token",
  HOST_LABEL_SEPARATOR: ".",
  EXPIRY_ATTRIBUTES:
    "path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT",
} as const;

export const SUPABASE_COOKIE_OPTIONS = {
  name: SUPABASE_AUTH_COOKIE.NAME,
} as const;
