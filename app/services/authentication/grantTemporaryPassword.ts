import { SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { issueTemporaryPassword } from "./issueTemporaryPassword";
import type { TemporaryPasswordGrant } from "./models/TemporaryPasswordGrant.type";

export const grantTemporaryPassword = (
  supabase: ServerSupabaseClient,
  workerId: string
): Promise<TemporaryPasswordGrant> =>
  issueTemporaryPassword(
    supabase,
    SUPABASE_RPC.PREPARE_WORKER_TEMPORARY_PASSWORD,
    workerId
  );
