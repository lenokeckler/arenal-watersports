import type { SUPABASE_RPC } from "@/app/constants";

export type TemporaryPasswordPreparation =
  | typeof SUPABASE_RPC.PREPARE_WORKER_TEMPORARY_PASSWORD
  | typeof SUPABASE_RPC.REHIRE_WORKER;
