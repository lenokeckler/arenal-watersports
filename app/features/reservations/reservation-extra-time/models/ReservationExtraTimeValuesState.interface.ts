import type {
  CurrencyCode,
  PaymentChoice,
} from "@/app/constants";
import type { ReservationExtraTimeOutcome } from "./ReservationExtraTimeOutcome.type";
import type { ReservationExtraTimeValues } from "./ReservationExtraTimeValues.interface";

export interface ReservationExtraTimeValuesState {
  setAmountText: (amountText: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setOtherPaymentMethod: (method: string) => void;
  setOutcome: (
    outcome: ReservationExtraTimeOutcome
  ) => void;
  setPaymentChoice: (choice: PaymentChoice) => void;
  values: ReservationExtraTimeValues;
}
