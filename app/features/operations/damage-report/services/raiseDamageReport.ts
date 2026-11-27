import { DAMAGE_REPORT_QUERY } from "../constants/DamageReport.constants";
import type { DamageReportClient } from "../models/DamageReportClient.type";
import type { DamageReportInput } from "../models/DamageReportInput.interface";
import type { DamageReportResult } from "../models/DamageReportResult.type";
import { buildOptionalReportArgs } from "../utils/buildOptionalReportArgs";
import { toDamageReportResult } from "../utils/toDamageReportResult";

export const raiseDamageReport = async (
  supabase: DamageReportClient,
  input: DamageReportInput
): Promise<DamageReportResult> => {
  const { error } = await supabase.rpc(
    DAMAGE_REPORT_QUERY.RPC_CREATE,
    {
      ...buildOptionalReportArgs(input),
      p_cause: input.cause ?? undefined,
      p_description: input.description || undefined,
      p_detail_later: input.detailLater,
      p_impact_delta: input.hits,
      p_unit_id: input.unitId,
    }
  );

  return toDamageReportResult(error);
};
