import { DAMAGE_REPORT_QUERY } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportClient } from "../models/DamageReportClient.type";
import type { DamageReportCompletion } from "../models/DamageReportCompletion.type";
import type { DamageReportResult } from "../models/DamageReportResult.type";
import { buildOptionalReportArgs } from "../utils/buildOptionalReportArgs";
import { toDamageReportResult } from "../utils/toDamageReportResult";

export const completeDamageReport = async (
  supabase: DamageReportClient,
  input: DamageReportCompletion
): Promise<DamageReportResult> => {
  if (!input.cause) {
    return {
      message: DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR,
      ok: false,
    };
  }

  const { error } = await supabase.rpc(
    DAMAGE_REPORT_QUERY.RPC_COMPLETE,
    {
      ...buildOptionalReportArgs(input),
      p_cause: input.cause,
      p_description: input.description,
      p_impact_delta: input.hits,
      p_report_id: input.reportId,
    }
  );

  return toDamageReportResult(error);
};
