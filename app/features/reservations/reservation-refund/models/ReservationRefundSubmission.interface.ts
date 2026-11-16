import type { NullableRef } from "@/app/types";
import type { ReservationRefundErrors } from "./ReservationRefundErrors.interface";
import type { ReservationRefundRecorded } from "./ReservationRefundRecorded.interface";

export interface ReservationRefundSubmission {
  clearErrors: () => void;
  errors: ReservationRefundErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  recorded: NullableRef<ReservationRefundRecorded>;
}
