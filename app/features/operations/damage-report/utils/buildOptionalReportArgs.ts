import type { DamageReportInput } from "../models/DamageReportInput.interface";
import type { OptionalReportArgs } from "../models/OptionalReportArgs.interface";

export const buildOptionalReportArgs = ({
  reservationId,
  unitStatus,
}: DamageReportInput): OptionalReportArgs => ({
  p_reservation_id: reservationId ?? undefined,
  p_unit_status: unitStatus ?? undefined,
});
