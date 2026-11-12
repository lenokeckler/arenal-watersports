import type { createClient } from "../server";

export type ServerSupabaseClient = Awaited<
  ReturnType<typeof createClient>
>;
