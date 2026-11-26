import type { CurrencyCode } from "@/app/constants";
import type { ReservationRefundReason } from "./ReservationRefundReason.type";
import type { ReservationRefundValues } from "./ReservationRefundValues.interface";

export interface ReservationRefundValuesState {
  available: number;
  currencyOptions: readonly CurrencyCode[];
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setOtherReasonText: (text: string) => void;
  setReason: (reason: ReservationRefundReason) => void;
  values: ReservationRefundValues;
}
