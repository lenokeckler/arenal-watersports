import type { ReservationRefundErrors } from "./ReservationRefundErrors.interface";

export interface ReservationRefundErrorsState {
  clearErrors: () => void;
  errors: ReservationRefundErrors;
  formError: string;
  showErrors: (
    errors: ReservationRefundErrors,
    formError?: string
  ) => void;
}
