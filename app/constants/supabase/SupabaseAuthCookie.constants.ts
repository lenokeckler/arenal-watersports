export const SUPABASE_AUTH_COOKIE = {
  NAME: "sb-arenal-auth-token",
  CHUNK_SEPARATOR: ".",
  VALUE_SEPARATOR: "=",
  EXPIRY_ATTRIBUTES:
    "path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT",
} as const;

export const SUPABASE_COOKIE_OPTIONS = {
  name: SUPABASE_AUTH_COOKIE.NAME,
} as const;
