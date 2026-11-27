import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

export const resolveDefaultState = (
  unit?: DamageReportUnit
): DamageReportDraft["state"] =>
  unit &&
  !unit.isOut &&
  unit.status === INVENTORY_UNIT_STATUS.AVAILABLE
    ? DAMAGE_REPORT_STATE.DAMAGED
    : DAMAGE_REPORT_STATE.KEEP;
