import type { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";

export type DamageReportUnitStatus = Exclude<
  (typeof DAMAGE_REPORT_STATE)[keyof typeof DAMAGE_REPORT_STATE],
  typeof DAMAGE_REPORT_STATE.KEEP
>;
