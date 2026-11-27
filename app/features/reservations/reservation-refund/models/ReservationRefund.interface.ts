import type { ReservationStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";

export interface ReservationRefund {
  code: string;
  customerName: string;
  date: string;
  id: string;
  parentReservationId: NullableRef<string>;
  refundable: ReservationRefundableAmount[];
  status: ReservationStatus;
  time: string;
}
