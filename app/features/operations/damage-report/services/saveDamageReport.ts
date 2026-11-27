import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import type { DamageReportInput } from "../models/DamageReportInput.interface";
import type { DamageReportResult } from "../models/DamageReportResult.type";
import { completeDamageReport } from "./completeDamageReport";
import { raiseDamageReport } from "./raiseDamageReport";

export const saveDamageReport = async (
  input: DamageReportInput
): Promise<DamageReportResult> => {
  const supabase = await getOperationsSupabaseClient();
  const { reportId } = input;

  return reportId
    ? await completeDamageReport(supabase, {
        ...input,
        reportId,
      })
    : await raiseDamageReport(supabase, input);
};
