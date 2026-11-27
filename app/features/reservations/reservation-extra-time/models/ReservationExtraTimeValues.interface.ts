import type {
  CurrencyCode,
  PaymentChoice,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeOutcome } from "./ReservationExtraTimeOutcome.type";

export interface ReservationExtraTimeValues {
  amountText: string;
  currency: CurrencyCode;
  otherPaymentMethod: string;
  outcome: NullableRef<ReservationExtraTimeOutcome>;
  paymentChoice: NullableRef<PaymentChoice>;
}
