import type { ChoicePill } from "@/app/components/choice-pills/models/ChoicePill.interface";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

export const buildDamageStateOptions = (
  unit: NullableRef<DamageReportUnit>
): ChoicePill[] => [
  {
    label: DAMAGE_REPORT_COPY.STATE_DAMAGED,
    value: DAMAGE_REPORT_STATE.DAMAGED,
  },
  {
    label: DAMAGE_REPORT_COPY.STATE_MAINTENANCE,
    value: DAMAGE_REPORT_STATE.MAINTENANCE,
  },
  {
    label:
      unit?.status === INVENTORY_UNIT_STATUS.AVAILABLE
        ? DAMAGE_REPORT_COPY.STATE_KEEP_AVAILABLE
        : DAMAGE_REPORT_COPY.STATE_KEEP,
    value: DAMAGE_REPORT_STATE.KEEP,
  },
];
