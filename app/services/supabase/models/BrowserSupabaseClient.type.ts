import type { createBrowserSupabaseClient } from "../client";

export type BrowserSupabaseClient = ReturnType<
  typeof createBrowserSupabaseClient
>;
