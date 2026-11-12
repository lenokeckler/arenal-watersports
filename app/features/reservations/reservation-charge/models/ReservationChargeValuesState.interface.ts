import type { CurrencyCode } from "@/app/constants";
import type { ReservationChargeValues } from "./ReservationChargeValues.interface";

export interface ReservationChargeValuesState {
  currencyOptions: readonly CurrencyCode[];
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setPaymentMethod: (method: string) => void;
  values: ReservationChargeValues;
}
