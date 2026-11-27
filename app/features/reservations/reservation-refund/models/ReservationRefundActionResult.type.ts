import type { ReservationRefundErrors } from "./ReservationRefundErrors.interface";
import type { ReservationRefundRecorded } from "./ReservationRefundRecorded.interface";

export type ReservationRefundActionResult =
  | {
      ok: true;
      recorded: ReservationRefundRecorded;
    }
  | {
      errors: ReservationRefundErrors;
      formError?: string;
      ok: false;
    };
