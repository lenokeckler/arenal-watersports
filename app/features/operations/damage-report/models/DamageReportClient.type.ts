import type { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";

export type DamageReportClient = Awaited<
  ReturnType<typeof getOperationsSupabaseClient>
>;
