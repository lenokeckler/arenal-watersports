import { UUID_PATTERN } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  DAMAGE_REPORT_OPERATION,
  DAMAGE_REPORT_QUERY,
} from "../constants/DamageReport.constants";
import type { DamageReportClient } from "../models/DamageReportClient.type";
import type { PendingDamageReport } from "../models/PendingDamageReport.interface";

export const readPendingDamageReport = async (
  supabase: DamageReportClient,
  reportId: string
): Promise<NullableRef<PendingDamageReport>> => {
  if (!UUID_PATTERN.test(reportId)) {
    return null;
  }

  const { data: report, error } = await supabase
    .from("damage_reports")
    .select(DAMAGE_REPORT_QUERY.PENDING_COLUMNS)
    .eq("id", reportId)
    .eq("detail_pending", true)
    .maybeSingle();
  throwIfSupabaseError(error, DAMAGE_REPORT_OPERATION.LOAD);

  return report
    ? {
        cause: report.cause,
        description: safeString(report.description),
        hasTrip: report.reservation_id !== null,
        hits: report.impact_delta,
        id: report.id,
        unitId: report.unit_id,
      }
    : null;
};
