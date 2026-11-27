import type { ReservationRefundErrors } from "./ReservationRefundErrors.interface";

export interface ReservationRefundRefusal {
  errors?: ReservationRefundErrors;
  formError?: string;
  message: string;
}
