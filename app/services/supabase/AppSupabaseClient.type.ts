import { createClient as createServerSupabaseClient } from "./server";
import { createClient as createServiceRoleSupabaseClient } from "./serviceRole";

export type ServerSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;
export type ServiceRoleSupabaseClient = ReturnType<
  typeof createServiceRoleSupabaseClient
>;
