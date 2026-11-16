import type { CurrencyCode } from "@/app/constants";
import type { ReservationChargePaymentChoice } from "./ReservationChargePaymentChoice.type";
import type { ReservationChargeValues } from "./ReservationChargeValues.interface";

export interface ReservationChargeValuesState {
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setOtherPaymentMethod: (method: string) => void;
  setPaymentChoice: (
    choice: ReservationChargePaymentChoice
  ) => void;
  setSecondAmountText: (text: string) => void;
  toggleSecondAmount: () => void;
  values: ReservationChargeValues;
}
