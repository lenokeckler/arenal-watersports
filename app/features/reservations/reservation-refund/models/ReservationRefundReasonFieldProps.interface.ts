import type { NullableRef } from "@/app/types";
import type { ReservationRefundReason } from "./ReservationRefundReason.type";

export interface ReservationRefundReasonFieldProps {
  error?: string;
  isPending: boolean;
  onSelect: (reason: ReservationRefundReason) => void;
  reason: NullableRef<ReservationRefundReason>;
}
