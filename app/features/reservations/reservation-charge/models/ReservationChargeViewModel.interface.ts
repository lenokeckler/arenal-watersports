import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";
import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export interface ReservationChargeViewModel {
  amountText: string;
  currency: CurrencyCode;
  currencyOptions: readonly CurrencyCode[];
  errors: ReservationChargeErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  isSubmitDisabled: boolean;
  paymentMethod: string;
  recorded: NullableRef<ReservationChargeRecorded>;
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setPaymentMethod: (method: string) => void;
}
