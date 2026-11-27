import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationChargePaymentFields } from "./ReservationChargePaymentFields.interface";

export interface ReservationChargeValues extends ReservationChargePaymentFields {
  amountText: string;
  currency: CurrencyCode;
  secondAmountText: NullableRef<string>;
}
