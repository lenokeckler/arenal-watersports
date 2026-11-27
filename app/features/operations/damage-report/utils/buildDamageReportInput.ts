import type { NullableRef } from "@/app/types";
import { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportInput } from "../models/DamageReportInput.interface";

export const buildDamageReportInput = (
  draft: DamageReportDraft,
  reportId: NullableRef<string>,
  detailLater: boolean
): DamageReportInput => ({
  cause: draft.cause,
  description: draft.description.trim(),
  detailLater,
  hits: draft.hits,
  reportId,
  reservationId: draft.reservationId || null,
  unitId: draft.unitId,
  unitStatus:
    draft.state === DAMAGE_REPORT_STATE.KEEP
      ? null
      : draft.state,
});
