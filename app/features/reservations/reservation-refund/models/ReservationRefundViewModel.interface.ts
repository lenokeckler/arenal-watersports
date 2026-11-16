import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationRefundErrors } from "./ReservationRefundErrors.interface";
import type { ReservationRefundReason } from "./ReservationRefundReason.type";
import type { ReservationRefundRecorded } from "./ReservationRefundRecorded.interface";

export interface ReservationRefundViewModel {
  amountText: string;
  available: number;
  currency: CurrencyCode;
  currencyOptions: readonly CurrencyCode[];
  errors: ReservationRefundErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  isSubmitDisabled: boolean;
  mayBeRecorded: boolean;
  otherReasonText: string;
  reason: NullableRef<ReservationRefundReason>;
  recorded: NullableRef<ReservationRefundRecorded>;
  setAmountText: (text: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setOtherReasonText: (text: string) => void;
  setReason: (reason: ReservationRefundReason) => void;
}
