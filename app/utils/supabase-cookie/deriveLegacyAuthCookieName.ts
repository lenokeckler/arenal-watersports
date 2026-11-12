import {
  SUPABASE,
  SUPABASE_AUTH_COOKIE,
} from "@/app/constants";

export const deriveLegacyAuthCookieName = (
  supabaseUrl: string = SUPABASE.URL
): string =>
  `${SUPABASE_AUTH_COOKIE.LEGACY_PREFIX}${
    new URL(supabaseUrl).hostname.split(
      SUPABASE_AUTH_COOKIE.HOST_LABEL_SEPARATOR
    )[0]
  }${SUPABASE_AUTH_COOKIE.LEGACY_SUFFIX}`;
