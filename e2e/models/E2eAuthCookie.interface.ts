import type { CookieOptions } from "@supabase/ssr";

export interface E2eAuthCookie {
  name: string;
  options: CookieOptions;
  value: string;
}
