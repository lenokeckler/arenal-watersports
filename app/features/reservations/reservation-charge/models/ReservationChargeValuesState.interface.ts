import type { CurrencyCode } from "@/app/constants";
import type { ReservationChargeValues } from "./ReservationChargeValues.interface";

export interface ReservationChargeValuesState {
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setPaymentMethod: (method: string) => void;
  setSecondAmountText: (text: string) => void;
  toggleSecondAmount: () => void;
  values: ReservationChargeValues;
}
