import type { CookieOptions } from "@supabase/ssr";

export interface E2eCapturedCookie {
  name: string;
  options: CookieOptions;
  value: string;
}
