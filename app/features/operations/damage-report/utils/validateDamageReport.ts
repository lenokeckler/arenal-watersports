import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportErrors } from "../models/DamageReportErrors.interface";

export const validateDamageReport = (
  draft: DamageReportDraft,
  detailLater: boolean
): DamageReportErrors => ({
  cause:
    detailLater || draft.cause
      ? null
      : DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR,
  description:
    detailLater || draft.description.trim()
      ? null
      : DAMAGE_REPORT_COPY.DESCRIPTION_REQUIRED_ERROR,
  unit: draft.unitId
    ? null
    : DAMAGE_REPORT_COPY.UNIT_REQUIRED_ERROR,
});
