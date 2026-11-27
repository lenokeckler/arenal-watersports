import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";
import type { ReservationChargePaymentChoice } from "./ReservationChargePaymentChoice.type";
import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export interface ReservationChargeViewModel {
  amountText: string;
  currency: CurrencyCode;
  errors: ReservationChargeErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  isMixed: boolean;
  isSubmitDisabled: boolean;
  otherPaymentMethod: string;
  paymentChoice: NullableRef<ReservationChargePaymentChoice>;
  recorded: NullableRef<ReservationChargeRecorded>;
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  secondAmountText: NullableRef<string>;
  secondCurrency: CurrencyCode;
  setOtherPaymentMethod: (method: string) => void;
  setPaymentChoice: (
    choice: ReservationChargePaymentChoice
  ) => void;
  setSecondAmountText: (text: string) => void;
  toggleSecondAmount: () => void;
}
