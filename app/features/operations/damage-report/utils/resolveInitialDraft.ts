import { STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import {
  DAMAGE_REPORT_DEFAULTS,
  DAMAGE_REPORT_STATE,
} from "../constants/DamageReport.constants";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import { resolveDefaultState } from "./resolveDefaultState";

export const resolveInitialDraft = ({
  pending,
  presetUnitId,
  units,
}: DamageReportScreen): DamageReportDraft => {
  const unitId = safeString(
    pending?.unitId ?? presetUnitId
  );
  const unit = units.find((item) => item.id === unitId);

  return {
    cause: pending?.cause ?? null,
    description: safeString(pending?.description),
    hits: pending?.hits ?? DAMAGE_REPORT_DEFAULTS.HITS,
    reservationId: STRING.Empty,
    state: pending
      ? DAMAGE_REPORT_STATE.KEEP
      : resolveDefaultState(unit),
    unitId,
  };
};
