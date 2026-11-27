import type { DamageReportUnitStatus } from "./DamageReportUnitStatus.type";

export interface OptionalReportArgs {
  p_reservation_id?: string;
  p_unit_status?: DamageReportUnitStatus;
}
