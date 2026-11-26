import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationRefundReason } from "./ReservationRefundReason.type";

export interface ReservationRefundValues {
  amountText: string;
  currency: CurrencyCode;
  otherReasonText: string;
  reason: NullableRef<ReservationRefundReason>;
}
