import type { NullableRef } from "@/app/types";
import type { ReservationChargePaymentChoice } from "./ReservationChargePaymentChoice.type";

export interface ReservationChargePaymentFields {
  otherPaymentMethod: string;
  paymentChoice: NullableRef<ReservationChargePaymentChoice>;
}
