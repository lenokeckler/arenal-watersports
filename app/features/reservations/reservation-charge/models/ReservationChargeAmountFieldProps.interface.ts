import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface ReservationChargeAmountFieldProps {
  currency: CurrencyCode;
  error?: string;
  helperId: string;
  id: string;
  note?: string;
  noteId?: string;
  isDisabled: boolean;
  onChange: (text: string) => void;
  proposal: NullableRef<number>;
  value: string;
}
