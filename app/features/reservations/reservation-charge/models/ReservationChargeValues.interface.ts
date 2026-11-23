import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface ReservationChargeValues {
  amountText: string;
  currency: CurrencyCode;
  paymentMethod: string;
  secondAmountText: NullableRef<string>;
}
