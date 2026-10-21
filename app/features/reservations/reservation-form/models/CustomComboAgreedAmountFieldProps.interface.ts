import type { NullableRef } from "@/app/types";

export interface CustomComboAgreedAmountFieldProps {
  amount: NullableRef<number>;
  currency: string;
  id: string;
  label: string;
  onChange: (amount: NullableRef<number>) => void;
  suggestedAmount: NullableRef<number>;
}
